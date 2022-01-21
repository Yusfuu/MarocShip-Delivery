import { Manager, Driver, DeliveryManager } from "@models/index";
import { NextFunction, Response, Request, RequestHandler } from "express";
import { check, CustomValidator, validationResult } from "express-validator";

const isEmailExist: any = (model: any): CustomValidator => async (email: string) => {
  const user = await model.findOne({ email }).catch((_: any) => _);
  if (user) {
    return Promise.reject('E-mail already in use');
  }
};

export const handleMiddleValidation: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

export const loginValidation: Array<RequestHandler> = [
  check("email").exists().isEmail().normalizeEmail(),
  check("password").exists().notEmpty(),
];

export const createManagerValidation: Array<RequestHandler> = [
  check("email").exists().isEmail().normalizeEmail().custom(isEmailExist(Manager)),
  check("name").exists().not().isEmpty().trim().escape(),
];


export const createDeliveryManagerValidation: Array<RequestHandler> = [
  check("email").exists().isEmail().normalizeEmail().custom(isEmailExist(DeliveryManager)),
  check("name").exists().not().isEmpty().trim().escape(),
];

export const createDriverValidation: Array<RequestHandler> = [
  check("email").exists().isEmail().normalizeEmail().custom(isEmailExist(Driver)),
  check("name").exists().not().isEmpty().trim().escape(),
  check('vehicle').exists().not().isEmpty().trim().escape().isIn(["car", "small truck", "big truck", "planes"]),
];


export const createDelivery: Array<RequestHandler> = [
  check('from').exists().not().isEmpty().trim().escape(),
  check('to').exists().not().isEmpty().trim().escape(),
  check('zone').exists().not().isEmpty().trim().escape().isIn(['National', 'Europe', 'America', 'Asia', 'Australia']),
  check('weight').exists().not().isEmpty().trim().escape().isNumeric(),
];
