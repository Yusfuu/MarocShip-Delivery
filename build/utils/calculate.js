"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBonusEveryMonth = exports.bonus = exports.convertTo = exports.getPriceAndVehicle = exports.distanceInKm = void 0;
//@ts-ignore
const node_fetch_1 = __importDefault(require("node-fetch"));
const Driver_1 = require("../models/Driver");
const distanceInKm = async (from, to) => {
    const response = await (0, node_fetch_1.default)(`https://www.distance24.org/route.json?stops=${from}|${to}`);
    const data = await response.json();
    return data.distance;
};
exports.distanceInKm = distanceInKm;
const getPriceAndVehicle = (zone, weight) => {
    const international = {
        Europe: 160,
        America: 220,
        Asia: 240,
        Australia: 260,
    };
    let price = 0;
    let vehicle = 'car';
    if (+weight > 200)
        vehicle = 'small truck';
    if (+weight > 800)
        vehicle = 'big truck';
    if (zone === 'National') {
        price = +weight > 3 ? ((+weight - 3) * 5) + 120 : +weight * 40;
    }
    else {
        price = international[zone] * +weight;
        vehicle = 'planes';
    }
    return [price, vehicle];
};
exports.getPriceAndVehicle = getPriceAndVehicle;
const convertTo = (price) => {
    if (!price)
        return null;
    const currencies = [
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
    ];
    const converted = currencies.map((x) => {
        x.price = x.price * price;
        return x;
    });
    return converted;
};
exports.convertTo = convertTo;
const bonus = async () => {
    return await Driver_1.Driver.aggregate([
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
};
exports.bonus = bonus;
const setBonusEveryMonth = async (date) => {
    console.log('running job 👋');
    const drivers = await (0, exports.bonus)().catch(_ => _);
    const bulk = drivers.map(({ _id, total }) => ({
        updateOne: {
            filter: { _id },
            update: {
                $set: { deliveries: [], $push: { bonus: { value: total, date } } }
            },
            upsert: true,
        }
    }));
    const records = await Driver_1.Driver.bulkWrite(bulk).catch(_ => _);
    console.log('all jobs done 👋');
};
exports.setBonusEveryMonth = setBonusEveryMonth;
//# sourceMappingURL=calculate.js.map