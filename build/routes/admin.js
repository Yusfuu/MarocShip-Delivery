"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const admin_1 = require("../controllers/admin");
const index_1 = require("../controllers/index");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
exports.router = router;
router.post("/login", validation_1.loginValidation, validation_1.handleMiddleValidation, index_1.adminLogin);
router.use((0, auth_1.auth)("ADMIN"));
// create manager by admin
router.post("/create", validation_1.createManagerValidation, validation_1.handleMiddleValidation, admin_1.createManager);
//# sourceMappingURL=admin.js.map