import { IDeliveryManager, IDriver, IUser } from "@interfaces/mongoose.types";
import { DeliveryManager } from "@models/DeliveryManager";
import { Driver } from "@models/Driver";
import { Manager } from "@models/Manager";
import { catchAsync } from "@utils/catchAsync";
import { createToken } from "@utils/jwt";
import { mail } from "@utils/mail";
import { passwordCompare, passwordGenerator, passwordHash } from "@utils/password";
import { Request, Response } from "express";
import { error } from "@errors/index";

// @route   POST api/manager/login
// @desc    Login manager
const login = catchAsync(async (req: Request, res: Response) => {

  const { email, password } = req.body;

  // get manager by email
  const user: IUser = await Manager.findOne({ email }).catch(_ => _);

  // conver user to json
  const manager = user ? user.toJSON() : null;

  // if no manager found
  if (!manager) {
    return res.status(401).json({ error: error.email });
  }

  // compare password
  const ismatch = await passwordCompare(password, manager.password!);

  // if password is incorrect
  if (!ismatch) {
    return res.status(401).json({ error: error.password });
  }

  delete manager?.password;
  // create token
  const token = createToken(manager, "MANAGER");
  return res.status(200).json({ token });
});


// @route   POST api/manager/create/deliverymanager
// @desc    Create new delivery manager
const createDeliveryManager = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const password = passwordGenerator();
  const hash = await passwordHash(password);

  // @ts-ignore
  const manager = req.user._id;

  // create new delivery manager
  const deliveryManager: IDeliveryManager = await DeliveryManager.create({ name, email, password: hash, manager });

  const template: any = {
    type: 'loginInfo',
    data: { name, email, password }
  }

  res.json({ deliveryManager, password });
  // send email
  return await mail([email], template);
});

// @route   POST api/manager/create/driver
// @desc    Create new driver
const createDriver = catchAsync(async (req: Request, res: Response) => {
  const { name, email, vehicle } = req.body;

  // generate password
  const password = passwordGenerator();

  const hash = await passwordHash(password);

  // @ts-ignore
  const manager = req.user._id;

  // create new driver
  const driver: IDriver = await Driver.create({ name, email, password: hash, vehicle, manager });

  res.json({ driver, password });
});

// @route   GET api/manager/stats
// @desc    Get all stats
const getStats = catchAsync(async (req: Request, res: Response) => {
  // get driver stats
  const stats = await Driver.aggregate([
    {
      $project: {
        total: { $sum: "$bonus.value" },
        email: "$email",
        name: "$name",
        vehicle: "$vehicle",
        dates: "$bonus",
      }
    }
  ]).catch(_ => _);
  res.json(stats);
});


export { login, createDeliveryManager, createDriver, getStats };