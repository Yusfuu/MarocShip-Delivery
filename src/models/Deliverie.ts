import { Schema, model } from "mongoose";
import { IDeliverie } from "@interfaces/mongoose.types";

const schema = new Schema<IDeliverie>(
    {
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
            type: Schema.Types.ObjectId,
            refPath: 'Driver'
        }
    },
    { timestamps: true }
);

export const Deliverie = model<IDeliverie>("Deliverie", schema);
