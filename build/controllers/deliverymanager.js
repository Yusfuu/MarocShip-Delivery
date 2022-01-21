"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.login = void 0;
const index_1 = require("../models/index");
const jwt_1 = require("../utils/jwt");
const catchAsync_1 = require("../utils/catchAsync");
const password_1 = require("../utils/password");
const mail_1 = require("../utils/mail");
const calculate_1 = require("../utils/calculate");
const index_2 = require("../errors/index");
// @route   POST api/deliverymanager/login
// @desc    Login delivery manager
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    const user = await index_1.DeliveryManager.findOne({ email });
    const deiveryManager = user ? user.toJSON() : null;
    // if no delivery manager found
    if (!deiveryManager) {
        return res.json({ error: index_2.error.credentials });
    }
    // compare password
    const verifiedPassword = await (0, password_1.passwordCompare)(password, deiveryManager.password);
    if (!verifiedPassword) {
        return res.json({ ererror: index_2.error.credentials });
    }
    delete deiveryManager.password;
    const token = (0, jwt_1.createToken)(deiveryManager, "DELIVERYMANAGER");
    res.status(200).json({ token });
});
exports.login = login;
// @route   GET api/deliverymanager/create
// @desc    Create new delivery
const create = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { from, to, weight, zone } = req.body;
    // calculate price base on zone and weight
    const [price, vehicle] = (0, calculate_1.getPriceAndVehicle)(zone, weight);
    const distance = await (0, calculate_1.distanceInKm)(from, to);
    // get drivers
    let drivers = await index_1.Driver.find({ vehicle }).select('email').catch(_ => _);
    const currency = (0, calculate_1.convertTo)(+price);
    const delivery = await index_1.Deliverie.create({
        from, to, weight, zone, price, vehicle, distance, currency
    });
    // create delivery manager token
    const driverToken = (0, jwt_1.createToken)({
        _id: delivery._id,
    }, "DRIVER");
    const link = `${process.env.APP_URL}/api/driver/confirmDelivery/${driverToken}`;
    const template = {
        type: 'delivery',
        data: { from, to, weight, zone, link, }
    };
    const mails = drivers.map(({ email }) => email) || [];
    res.json({ delivery });
    // send mail to drivers
    return await (0, mail_1.mail)(mails, template);
});
exports.create = create;
//# sourceMappingURL=deliverymanager.js.map