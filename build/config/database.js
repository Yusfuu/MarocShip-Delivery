"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const node_1 = require("@sentry/node");
const connectDB = async () => {
    const DATABASE_URL = process.env.DATABASE_URL;
    const connection = await (0, mongoose_1.connect)(DATABASE_URL).catch(err => {
        const message = `😵 Error connecting to database: ${err.message}`;
        (0, node_1.captureMessage)(`Something went wrong : ${err.message}`);
        console.error(message);
        process.exit(1);
    });
    return connection;
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map