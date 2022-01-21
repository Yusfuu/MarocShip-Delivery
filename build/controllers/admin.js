"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManager = exports.login = void 0;
const index_1 = require("../models/index");
const jwt_1 = require("../utils/jwt");
const catchAsync_1 = require("../utils/catchAsync");
const password_1 = require("../utils/password");
const mail_1 = require("../utils/mail");
// @route   POST api/admin/login
// @desc    Login admin
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    const _email = "test@admin.com";
    const _password = "rYPQTPLYf6AJNi";
    if (email !== _email || password !== _password) {
        return res.status(401).json({ error: "unauthorized" });
    }
    const payload = {
        id: 1,
        email: _email,
        role: "ADMIN",
    };
    const token = (0, jwt_1.createToken)(payload, "ADMIN");
    return res.status(200).json({ token });
});
exports.login = login;
// @route   POST api/admin/create
// @desc    Create new manager
const createManager = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, name } = req.body;
    // generate password
    const password = (0, password_1.passwordGenerator)();
    const hash = await (0, password_1.passwordHash)(password);
    const manager = await index_1.Manager.create({ email, name, password: hash }).catch(_ => _);
    const template = {
        type: 'loginInfo',
        data: { name, email, password }
    };
    res.json({ manager, password });
    return await (0, mail_1.mail)([email], template);
});
exports.createManager = createManager;
//# sourceMappingURL=admin.js.map