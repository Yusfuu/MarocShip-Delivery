import { Schema, model } from "mongoose";
import { IDriver } from "@interfaces/mongoose.types";


const schema = new Schema<IDriver>(
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
        type: Schema.Types.ObjectId,
        ref: "Deliverie",
      }
    ],
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager",
    }
  },
  { timestamps: true }
);

export const Driver = model<IDriver>("Driver", schema);
