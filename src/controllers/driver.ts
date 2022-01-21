import { Request, Response } from "express";
import { Driver, Deliverie } from "@models/index";
import { createToken, verifyToken } from "@utils/jwt";
import { catchAsync } from "@utils/catchAsync";
import { passwordCompare } from "@utils/password";
import { IDriver } from "@interfaces/mongoose.types";
import { error } from "@errors/index";

// @route   POST api/driver/login
// @desc    Login driver
const login = catchAsync(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const user: IDriver = await Driver.findOne({ email }).select('-deliveries').catch(_ => _);

    const driver = user ? user.toJSON() : null;

    if (!driver) {
        return res.json({ error: error.credentials });
    }

    const verifiedPassword = await passwordCompare(password, driver.password as string);

    if (!verifiedPassword) {
        return res.json({ error: error.credentials });
    }

    delete driver.password;

    const token = createToken(driver, "DRIVER");
    res.status(200).json({ token });
});

// @route   GET api/driver/create/getPendingDeliveries
// @desc    Get pending deliveries
const getPendingDeliveries = catchAsync(async (req: Request, res: Response) => {

    // @ts-ignore
    const vehicle = req.user.driver.vehicle;

    const delivries = await Deliverie.find({ vehicle, status: 'pending' }).catch(_ => _);
    res.json({ delivries });
});

// @route   GET api/driver/create/getSelfDeliveries
// @desc    Get self deliveries
const getSelfDeliveries = catchAsync(async (req: Request, res: Response) => {

    // @ts-ignore
    const driver = req.user.driver._id;

    const delivries = await Deliverie.find({ deliveredBy: driver }).catch(_ => _);
    res.json({ delivries });
})

// @route   GET api/driver/confirmDelivery/:token
// @desc    Confirm delivery
const confirmDelivery = catchAsync(async (req: Request, res: Response) => {

    const { token } = req.params;
    const delivery: any = verifyToken(token, 'DRIVER');
    // @ts-ignore
    const driver: IDriver = req.user;

    const driverID = driver._id;
    const deliveryID = delivery._id;

    const checkDelivery = await Deliverie.find({ _id: deliveryID, status: 'pending' }).catch(_ => _);

    if (!checkDelivery || checkDelivery.length == 0) {
        return res.json({ error: 'Delivery already taken' });
    }

    if (!delivery) {
        return res.status(401).json({ error: 'something went wrong' });
    }

    // add delivery to driver array
    await Driver.findByIdAndUpdate(driverID, { $push: { deliveries: deliveryID } }).catch(_ => _);

    const updatedDelivery = await Deliverie.findOneAndUpdate({ _id: deliveryID },
        { $set: { status: "taken", deliveredBy: driverID } },
        { new: true }).catch(_ => _);

    res.json(updatedDelivery);
});


export { login, getPendingDeliveries, confirmDelivery, getSelfDeliveries };
