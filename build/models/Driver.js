"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
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
    vehicle: {
        type: String,
        enum: ["car", "small truck", "big truck", "planes"]
    },
    bonus: [{
            date: Date,
            value: Number,
        }],
    deliveries: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Deliverie",
        }
    ],
    manager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Manager",
    }
}, { timestamps: true });
exports.Driver = (0, mongoose_1.model)("Driver", schema);
//# sourceMappingURL=Driver.js.map