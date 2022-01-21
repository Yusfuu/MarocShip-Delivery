import { handleMiddleValidation, loginValidation, } from "@middlewares/validation";
import { driverLogin } from "@controllers/index";
import { confirmDelivery, getPendingDeliveries, getSelfDeliveries } from "@controllers/driver";
import express from "express";
import { auth } from "@middlewares/auth";

const router = express.Router();

router.post("/login", loginValidation, handleMiddleValidation, driverLogin);



router.use(auth('DRIVER'));
router.get("/getPendingDeliveries", getPendingDeliveries);
router.get("/getSelfDeliveries", getSelfDeliveries);
router.get("/confirmDelivery/:token", confirmDelivery)
export { router };
