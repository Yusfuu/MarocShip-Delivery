import express from "express";
import { handleMiddleValidation, loginValidation, createDriverValidation, createDeliveryManagerValidation } from "@middlewares/validation";
import { createDeliveryManager, createDriver, getStats, login } from "@controllers/manager";
import { auth } from "@middlewares/auth";

const router = express.Router();

router.post("/login", loginValidation, handleMiddleValidation, login);
router.use(auth('MANAGER'));

router.post("/create/deliverymanager", createDeliveryManagerValidation, handleMiddleValidation, createDeliveryManager);
router.post("/create/driver", createDriverValidation, handleMiddleValidation, createDriver);
router.get("/stats", getStats);

export { router };
