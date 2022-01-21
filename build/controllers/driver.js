"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelfDeliveries = exports.confirmDelivery = exports.getPendingDeliveries = exports.login = void 0;
const index_1 = require("../models/index");
const jwt_1 = require("../utils/jwt");
const catchAsync_1 = require("../utils/catchAsync");
const password_1 = require("../utils/password");
const index_2 = require("../errors/index");
// @route   POST api/driver/login
// @desc    Login driver
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    const user = await index_1.Driver.findOne({ email }).select('-deliveries').catch(_ => _);
    const driver = user ? user.toJSON() : null;
    if (!driver) {
        return res.json({ error: index_2.error.credentials });
    }
    const verifiedPassword = await (0, password_1.passwordCompare)(password, driver.password);
    if (!verifiedPassword) {
        return res.json({ error: index_2.error.credentials });
    }
    delete driver.password;
    const token = (0, jwt_1.createToken)(driver, "DRIVER");
    res.status(200).json({ token });
});
exports.login = login;
// @route   GET api/driver/create/getPendingDeliveries
// @desc    Get pending deliveries
const getPendingDeliveries = (0, catchAsync_1.catchAsync)(async (req, res) => {
    // @ts-ignore
    const vehicle = req.user.driver.vehicle;
    const delivries = await index_1.Deliverie.find({ vehicle, status: 'pending' }).catch(_ => _);
    res.json({ delivries });
});
exports.getPendingDeliveries = getPendingDeliveries;
// @route   GET api/driver/create/getSelfDeliveries
// @desc    Get self deliveries
const getSelfDeliveries = (0, catchAsync_1.catchAsync)(async (req, res) => {
    // @ts-ignore
    const driver = req.user.driver._id;
    const delivries = await index_1.Deliverie.find({ deliveredBy: driver }).catch(_ => _);
    res.json({ delivries });
});
exports.getSelfDeliveries = getSelfDeliveries;
// @route   GET api/driver/confirmDelivery/:token
// @desc    Confirm delivery
const confirmDelivery = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { token } = req.params;
    const delivery = (0, jwt_1.verifyToken)(token, 'DRIVER');
    // @ts-ignore
    const driver = req.user;
    const driverID = driver._id;
    const deliveryID = delivery._id;
    const checkDelivery = await index_1.Deliverie.find({ _id: deliveryID, status: 'pending' }).catch(_ => _);
    if (!checkDelivery || checkDelivery.length == 0) {
        return res.json({ error: 'Delivery already taken' });
    }
    if (!delivery) {
        return res.status(401).json({ error: 'something went wrong' });
    }
    // add delivery to driver array
    await index_1.Driver.findByIdAndUpdate(driverID, { $push: { deliveries: deliveryID } }).catch(_ => _);
    const updatedDelivery = await index_1.Deliverie.findOneAndUpdate({ _id: deliveryID }, { $set: { status: "taken", deliveredBy: driverID } }, { new: true }).catch(_ => _);
    res.json(updatedDelivery);
});
exports.confirmDelivery = confirmDelivery;
//# sourceMappingURL=driver.js.map