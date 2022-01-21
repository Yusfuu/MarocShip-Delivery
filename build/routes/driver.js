"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const validation_1 = require("../middlewares/validation");
const index_1 = require("../controllers/index");
const driver_1 = require("../controllers/driver");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
exports.router = router;
router.post("/login", validation_1.loginValidation, validation_1.handleMiddleValidation, index_1.driverLogin);
router.use((0, auth_1.auth)('DRIVER'));
router.get("/getPendingDeliveries", driver_1.getPendingDeliveries);
router.get("/getSelfDeliveries", driver_1.getSelfDeliveries);
router.get("/confirmDelivery/:token", driver_1.confirmDelivery);
//# sourceMappingURL=driver.js.map