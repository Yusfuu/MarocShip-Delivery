"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawBody = void 0;
const raw_body_1 = __importDefault(require("raw-body"));
const content_type_1 = __importDefault(require("content-type"));
const rawBody = (req, res, next) => {
    (0, raw_body_1.default)(req, {
        length: req.headers['content-length'],
        limit: '1mb',
        encoding: content_type_1.default.parse(req).parameters.charset
    }, (err, string) => {
        if (err)
            return next(err);
        //@ts-ignore
        req.text = string;
        next();
    });
};
exports.rawBody = rawBody;
//# sourceMappingURL=raw.js.map