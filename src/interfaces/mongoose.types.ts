import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string | undefined;
}

export interface IManager extends IUser { }

export interface IAdmin extends IUser { }

export interface IDriver extends IUser {
  vehicle: string;
  manager: IManager,
  deliveries: ObjectId[],
  points: number,
  bonus: any,
}

export interface IDeliveryManager extends IUser {
  manager: IManager
}
export interface IDeliverie extends Document {
  from: string;
  to: string;
  zone: string;
  price: number;
  currency: [object];
  weight: number;
  status: string;
  vehicle: string;
  deliveredBy: IDriver;
  distance: number;
}

