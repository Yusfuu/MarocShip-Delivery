import { Request } from "express";
import { Content } from "mailgen";

export interface ICurrentUser extends Request {
  user?: object
}

export interface CustomContent extends Content {
  type: string
  data: object
}


export interface IMorgantoken extends Request {
  user: {
    id: string
    role: string
  }
}