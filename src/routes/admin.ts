import express from "express";
import { createManagerValidation, handleMiddleValidation, loginValidation, } from "@middlewares/validation";
import { createManager } from "@controllers/admin";
import { adminLogin } from "@controllers/index";
import { auth } from "@middlewares/auth";

const router = express.Router();

router.post("/login", loginValidation, handleMiddleValidation, adminLogin);


router.use(auth("ADMIN"));
// create manager by admin
router.post("/create", createManagerValidation, handleMiddleValidation, createManager);

export { router };
