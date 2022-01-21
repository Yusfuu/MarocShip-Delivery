"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const compression_1 = __importDefault(require("compression"));
const limiter_1 = require("./middlewares/limiter");
const error_1 = require("./middlewares/error");
const sentry_server_config_1 = require("./config/sentry.server.config");
const index_1 = require("./routes/index");
const helmet_1 = __importDefault(require("helmet"));
const calculate_1 = require("./utils/calculate");
const jobs_1 = require("./lib/jobs");
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./middlewares/logger");
const job = new jobs_1.Jobs();
const app = (0, express_1.default)();
sentry_server_config_1.sentery.init(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(limiter_1.limiter);
app.use(sentry_server_config_1.sentery.requestHandler);
app.use(sentry_server_config_1.sentery.tracingHandler);
// init logger
morgan_1.default.token('id', logger_1.loggerGetId);
morgan_1.default.token('role', logger_1.loggerGetRole);
app.use(logger_1.logger);
// All routes should live here
app.use("/api/admin", index_1.admin);
app.use("/api/deliverymanager", index_1.deliverymanager);
app.use("/api/manager", index_1.manager);
app.use("/api/driver", index_1.driver);
app.get("/error", () => {
    throw new Error("test error 🙃🙃");
});
// fallthrough error handler
app.use(sentry_server_config_1.sentery.errorHandler);
// handling 404 errors
app.use(error_1.notFound);
// // handling internal server errors
app.use(error_1.handleError);
const port = process.env.PORT || 3000;
const host = process.env.APP_HOSTNAME || "localhost";
const url = process.env.APP_URL || `http://${host}:${port}`;
// listen to port
app.listen(port, async () => {
    console.log(`🚀 Server ready at: ${url}`);
    // connect to database
    const { connection } = await (0, database_1.connectDB)();
    console.log(`👋 Connected to database successfully: ${connection.name}`);
    // run job
    job.register('0 0 1 * *', calculate_1.setBonusEveryMonth);
    // register job every 10 seconds '0 0 1 * *'*/10 * * * * *
});
//# sourceMappingURL=server.js.map