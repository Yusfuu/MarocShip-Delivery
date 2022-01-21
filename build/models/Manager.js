"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
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
    }
}, { timestamps: true });
exports.Manager = (0, mongoose_1.model)("Manager", schema);
//# sourceMappingURL=Manager.js.map