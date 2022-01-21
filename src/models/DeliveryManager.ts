import { Schema, model } from "mongoose";
import { IDeliveryManager } from "@interfaces/mongoose.types";

const schema = new Schema<IDeliveryManager>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "Manager",
    }
  },
  { timestamps: true }
);

export const DeliveryManager = model<IDeliveryManager>("DeliveryManager", schema);
