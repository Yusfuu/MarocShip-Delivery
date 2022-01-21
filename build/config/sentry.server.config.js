"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentery = void 0;
const node_1 = require("@sentry/node");
const tracing_1 = require("@sentry/tracing");
exports.sentery = {
    init: (app) => (0, node_1.init)({
        dsn: process.env.SENTRY_DSN, integrations: [
            new node_1.Integrations.Http({ tracing: true }),
            new tracing_1.Integrations.Express({ app }),
        ]
    }),
    requestHandler: node_1.Handlers.requestHandler(),
    errorHandler: node_1.Handlers.errorHandler(),
    tracingHandler: node_1.Handlers.tracingHandler(),
};
//# sourceMappingURL=sentry.server.config.js.map