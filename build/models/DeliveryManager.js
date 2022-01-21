"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryManager = void 0;
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
    manager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Manager",
    }
}, { timestamps: true });
exports.DeliveryManager = (0, mongoose_1.model)("DeliveryManager", schema);
//# sourceMappingURL=DeliveryManager.js.map