import { createDelivery, handleMiddleValidation, loginValidation, } from "@middlewares/validation";
import { login, create } from "@controllers/deliverymanager";
import express from "express";
import { auth } from "@middlewares/auth";
const router = express.Router();

router.post("/login", loginValidation, handleMiddleValidation, login);


router.use(auth('DELIVERYMANAGER'));
router.post('/create', createDelivery, handleMiddleValidation, create);

export { router };
