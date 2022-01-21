"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys = {
    ADMIN: process.env.ADMIN_SECRET_KEY,
    MANAGER: process.env.MANAGER_SECRET_KEY,
    DELIVERYMANAGER: process.env.DELIVERYMANAGER_SECRET_KEY,
    DRIVER: process.env.DRIVER_SECRET_KEY,
};
// generate tokens :
const createToken = (payload = null, role = null) => {
    if (!payload) {
        throw new Error("payload is required");
    }
    ;
    if (!role) {
        throw new Error("role is required");
    }
    ;
    const _key = keys[role];
    if (!_key) {
        throw new Error("role is not found");
    }
    return jsonwebtoken_1.default.sign(payload, _key, { expiresIn: "1h" });
};
exports.createToken = createToken;
// verify tokens
const verifyToken = (token = null, role = null) => {
    if (!token) {
        throw new Error("token is required");
    }
    ;
    if (!role) {
        throw new Error("role is required");
    }
    ;
    const _key = keys[role];
    try {
        return jsonwebtoken_1.default.verify(token, _key);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map