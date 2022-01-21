"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const validation_1 = require("../middlewares/validation");
const deliverymanager_1 = require("../controllers/deliverymanager");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
exports.router = router;
router.post("/login", validation_1.loginValidation, validation_1.handleMiddleValidation, deliverymanager_1.login);
router.use((0, auth_1.auth)('DELIVERYMANAGER'));
router.post('/create', validation_1.createDelivery, validation_1.handleMiddleValidation, deliverymanager_1.create);
//# sourceMappingURL=deliverymanager.js.map