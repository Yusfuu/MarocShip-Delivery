//@ts-ignore
import fetch from 'node-fetch';
import { Driver } from '@models/Driver';

export const distanceInKm = async (from: string, to: string) => {
  const response = await fetch(`https://www.distance24.org/route.json?stops=${from}|${to}`);
  const data: any = await response.json();
  return data.distance;
}

export const getPriceAndVehicle = (zone: string, weight: number): Array<number | string> => {
  const international: any = {
    Europe: 160,
    America: 220,
    Asia: 240,
    Australia: 260,
  }

  let price: number = 0;
  let vehicle: string = 'car';

  if (+weight > 200) vehicle = 'small truck';
  if (+weight > 800) vehicle = 'big truck';

  if (zone === 'National') {
    price = +weight > 3 ? ((+weight - 3) * 5) + 120 : +weight * 40;
  } else {
    price = international[zone] * +weight;
    vehicle = 'planes';
  }

  return [price, vehicle];
};

export const convertTo = (price: number) => {
  if (!price) return null;

  const currencies: any = [
    {
      zone: "Europe",
      price: 0.095,
      curr: "Euro"
    },
    {
      zone: "America",
      price: 0.11,
      curre: "Dollar",
    }, {
      zone: "Asia",
      price: 0.11,
      curr: "Dollar",
    },
    {
      zone: "Australia",
      price: 0.11,
      curr: "Dollar",
    }
  ]

  const converted = currencies.map((x: any) => {
    x.price = x.price * price;
    return x;
  })
  return converted;
}


export const bonus = async () => {
  return await Driver.aggregate([
    {
      $lookup: {
        from: "deliveries",
        localField: "deliveries",
        foreignField: "_id",
        as: "deliveries",
      },
    },
    {
      $project: {
        prices: { $sum: "$deliveries.price" },
        distance: { $sum: "$deliveries.distance" },
      },
    },
    {
      $project: {
        total: {
          $switch: {
            branches: [
              {
                case: { $range: [1000, "$distance", 2000] }, then: { $multiply: ["$prices", 0.15] }
              },
              {
                case: { $range: [2000, "$distance", 2500] }, then: { $multiply: ["$prices", 0.22] }
              },
              {
                case: { $gte: ["$distance", "2500"] }, then: { $multiply: ["$prices", 0.300] }
              },
            ],
          }
        }
      }
    },
  ]);
}



export const setBonusEveryMonth = async (date: any) => {
  console.log('running job 👋');

  const drivers = await bonus().catch(_ => _);

  const bulk = drivers.map(({ _id, total }: any) => ({
    updateOne: {
      filter: { _id },
      update: {
        $set: { deliveries: [], $push: { bonus: { value: total, date } } }
      },
      upsert: true,
    }
  }));

  const records = await Driver.bulkWrite(bulk).catch(_ => _);

  console.log('all jobs done 👋');
}