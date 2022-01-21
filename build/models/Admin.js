"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
schema.methods.generateHash = (password) => {
    return password;
};
exports.Admin = (0, mongoose_1.model)("Admin", schema);
//# sourceMappingURL=Admin.js.map