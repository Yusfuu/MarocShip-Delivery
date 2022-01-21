"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.createDriver = exports.createDeliveryManager = exports.login = void 0;
const DeliveryManager_1 = require("../models/DeliveryManager");
const Driver_1 = require("../models/Driver");
const Manager_1 = require("../models/Manager");
const catchAsync_1 = require("../utils/catchAsync");
const jwt_1 = require("../utils/jwt");
const mail_1 = require("../utils/mail");
const password_1 = require("../utils/password");
const index_1 = require("../errors/index");
// @route   POST api/manager/login
// @desc    Login manager
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    // get manager by email
    const user = await Manager_1.Manager.findOne({ email }).catch(_ => _);
    // conver user to json
    const manager = user ? user.toJSON() : null;
    // if no manager found
    if (!manager) {
        return res.status(401).json({ error: index_1.error.email });
    }
    // compare password
    const ismatch = await (0, password_1.passwordCompare)(password, manager.password);
    // if password is incorrect
    if (!ismatch) {
        return res.status(401).json({ error: index_1.error.password });
    }
    delete manager?.password;
    // create token
    const token = (0, jwt_1.createToken)(manager, "MANAGER");
    return res.status(200).json({ token });
});
exports.login = login;
// @route   POST api/manager/create/deliverymanager
// @desc    Create new delivery manager
const createDeliveryManager = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { name, email } = req.body;
    const password = (0, password_1.passwordGenerator)();
    const hash = await (0, password_1.passwordHash)(password);
    // @ts-ignore
    const manager = req.user._id;
    // create new delivery manager
    const deliveryManager = await DeliveryManager_1.DeliveryManager.create({ name, email, password: hash, manager });
    const template = {
        type: 'loginInfo',
        data: { name, email, password }
    };
    res.json({ deliveryManager, password });
    // send email
    return await (0, mail_1.mail)([email], template);
});
exports.createDeliveryManager = createDeliveryManager;
// @route   POST api/manager/create/driver
// @desc    Create new driver
const createDriver = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { name, email, vehicle } = req.body;
    // generate password
    const password = (0, password_1.passwordGenerator)();
    const hash = await (0, password_1.passwordHash)(password);
    // @ts-ignore
    const manager = req.user._id;
    // create new driver
    const driver = await Driver_1.Driver.create({ name, email, password: hash, vehicle, manager });
    res.json({ driver, password });
});
exports.createDriver = createDriver;
// @route   GET api/manager/stats
// @desc    Get all stats
const getStats = (0, catchAsync_1.catchAsync)(async (req, res) => {
    // get driver stats
    const stats = await Driver_1.Driver.aggregate([
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
exports.getStats = getStats;
//# sourceMappingURL=manager.js.map