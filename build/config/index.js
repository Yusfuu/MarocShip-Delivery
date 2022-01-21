"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
exports.configs = {
    isProduction: process.env.NODE_ENV === 'production',
    database: process.env.DATABASE_URL,
    mailFrom: `noreply@${process.env.APP_HOSTNAME}`
};
//# sourceMappingURL=index.js.map