"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const index_1 = require("../utils/index");
// =========== auth middleware ============
const auth = (role = null) => async (req, res, next) => {
    const bearer = req?.headers?.authorization;
    if (!bearer) {
        return res.status(401).json({ error: "unauthorized" });
    }
    const token = bearer.split(" ")[1];
    const payload = (0, index_1.verifyToken)(token, role);
    if (!payload) {
        return res.status(401).json({ error: "unauthenticated" });
    }
    // pass the current user data to the next middleware
    req.user = { ...payload };
    next();
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map