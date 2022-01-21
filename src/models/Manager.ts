import { Schema, model } from "mongoose";
import { IManager } from "@interfaces/mongoose.types";

const schema = new Schema<IManager>(
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
    }
  },
  { timestamps: true }
);

export const Manager = model<IManager>("Manager", schema);
