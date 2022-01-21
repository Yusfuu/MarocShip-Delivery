"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const manager_1 = require("../controllers/manager");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
exports.router = router;
router.post("/login", validation_1.loginValidation, validation_1.handleMiddleValidation, manager_1.login);
router.use((0, auth_1.auth)('MANAGER'));
router.post("/create/deliverymanager", validation_1.createDeliveryManagerValidation, validation_1.handleMiddleValidation, manager_1.createDeliveryManager);
router.post("/create/driver", validation_1.createDriverValidation, validation_1.handleMiddleValidation, manager_1.createDriver);
router.get("/stats", manager_1.getStats);
//# sourceMappingURL=manager.js.map