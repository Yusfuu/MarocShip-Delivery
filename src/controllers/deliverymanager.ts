import { Request, Response } from "express";
import { DeliveryManager, Driver, Deliverie } from "@models/index";
import { createToken } from "@utils/jwt";
import { catchAsync } from "@utils/catchAsync";
import { passwordCompare } from "@utils/password";
import { mail } from "@utils/mail";
import { IDeliverie } from "@interfaces/mongoose.types";
import { distanceInKm, getPriceAndVehicle, convertTo } from "@utils/calculate";
import { error } from "@errors/index";

// @route   POST api/deliverymanager/login
// @desc    Login delivery manager
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await DeliveryManager.findOne({ email });

  const deiveryManager: any = user ? user.toJSON() : null;

  // if no delivery manager found
  if (!deiveryManager) {
    return res.json({ error: error.credentials });
  }

  // compare password
  const verifiedPassword = await passwordCompare(password, deiveryManager.password as string);

  if (!verifiedPassword) {
    return res.json({ ererror: error.credentials });
  }

  delete deiveryManager.password;

  const token = createToken(deiveryManager, "DELIVERYMANAGER");
  res.status(200).json({ token });
});


// @route   GET api/deliverymanager/create
// @desc    Create new delivery
const create = catchAsync(async (req: Request, res: Response) => {
  const { from, to, weight, zone } = req.body;

  // calculate price base on zone and weight
  const [price, vehicle] = getPriceAndVehicle(zone, weight);
  const distance = await distanceInKm(from, to);

  // get drivers
  let drivers = await Driver.find({ vehicle }).select('email').catch(_ => _);

  const currency = convertTo(+price);

  const delivery: IDeliverie = await Deliverie.create({
    from, to, weight, zone, price, vehicle, distance, currency
  });

  // create delivery manager token
  const driverToken = createToken({
    _id: delivery._id,
  }, "DRIVER");

  const link = `${process.env.APP_URL}/api/driver/confirmDelivery/${driverToken}`;

  const template: any = {
    type: 'delivery',
    data: { from, to, weight, zone, link, }
  }

  const mails = drivers.map(({ email }: any) => email) || [];

  res.json({ delivery });
  // send mail to drivers
  return await mail(mails, template);
});


export { login, create };
