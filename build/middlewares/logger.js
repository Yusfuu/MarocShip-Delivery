"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGetRole = exports.loggerGetId = exports.logger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = require("fs");
// =========== morgan logger  middleware ============
exports.logger = (0, morgan_1.default)(':id :role :method :url :status :date[web] :remote-addr', { stream: (0, fs_1.createWriteStream)(('./app.log'), { flags: 'a' }) });
const loggerGetId = (req) => req?.user?.id || 'anonymous';
exports.loggerGetId = loggerGetId;
const loggerGetRole = (req) => req?.user?.role || 'user';
exports.loggerGetRole = loggerGetRole;
//# sourceMappingURL=logger.js.map