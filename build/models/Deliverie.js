"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deliverie = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    from: {
        type: String,
        required: true,
        trim: true,
    },
    to: {
        type: String,
        required: true,
        trim: true,
    },
    zone: {
        type: String,
        required: true,
        trim: true,
        enum: ["National", "Europe", "America", "Asia", "Australia"],
        default: "National"
    },
    price: {
        type: Number,
        required: true,
    },
    currency: [{
            zone: {
                type: String,
            },
            price: {
                type: Number,
            },
            curr: {
                type: String,
            },
        }],
    weight: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "inactive", "delivered", "taken", "idle"],
        default: "pending"
    },
    vehicle: {
        type: String,
        required: true,
        enum: ["car", "small truck", "big truck", "planes"],
    },
    deliveredBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: 'Driver'
    }
}, { timestamps: true });
exports.Deliverie = (0, mongoose_1.model)("Deliverie", schema);
//# sourceMappingURL=Deliverie.js.map