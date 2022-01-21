"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDelivery = exports.createDriverValidation = exports.createDeliveryManagerValidation = exports.createManagerValidation = exports.loginValidation = exports.handleMiddleValidation = void 0;
const index_1 = require("../models/index");
const express_validator_1 = require("express-validator");
const isEmailExist = (model) => async (email) => {
    const user = await model.findOne({ email }).catch((_) => _);
    if (user) {
        return Promise.reject('E-mail already in use');
    }
};
const handleMiddleValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.handleMiddleValidation = handleMiddleValidation;
exports.loginValidation = [
    (0, express_validator_1.check)("email").exists().isEmail().normalizeEmail(),
    (0, express_validator_1.check)("password").exists().notEmpty(),
];
exports.createManagerValidation = [
    (0, express_validator_1.check)("email").exists().isEmail().normalizeEmail().custom(isEmailExist(index_1.Manager)),
    (0, express_validator_1.check)("name").exists().not().isEmpty().trim().escape(),
];
exports.createDeliveryManagerValidation = [
    (0, express_validator_1.check)("email").exists().isEmail().normalizeEmail().custom(isEmailExist(index_1.DeliveryManager)),
    (0, express_validator_1.check)("name").exists().not().isEmpty().trim().escape(),
];
exports.createDriverValidation = [
    (0, express_validator_1.check)("email").exists().isEmail().normalizeEmail().custom(isEmailExist(index_1.Driver)),
    (0, express_validator_1.check)("name").exists().not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('vehicle').exists().not().isEmpty().trim().escape().isIn(["car", "small truck", "big truck", "planes"]),
];
exports.createDelivery = [
    (0, express_validator_1.check)('from').exists().not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('to').exists().not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('zone').exists().not().isEmpty().trim().escape().isIn(['National', 'Europe', 'America', 'Asia', 'Australia']),
    (0, express_validator_1.check)('weight').exists().not().isEmpty().trim().escape().isNumeric(),
];
//# sourceMappingURL=validation.js.map