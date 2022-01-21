"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driver = exports.deliverymanager = exports.manager = exports.admin = void 0;
var admin_1 = require("./admin");
Object.defineProperty(exports, "admin", { enumerable: true, get: function () { return admin_1.router; } });
var manager_1 = require("./manager");
Object.defineProperty(exports, "manager", { enumerable: true, get: function () { return manager_1.router; } });
var deliverymanager_1 = require("./deliverymanager");
Object.defineProperty(exports, "deliverymanager", { enumerable: true, get: function () { return deliverymanager_1.router; } });
var driver_1 = require("./driver");
Object.defineProperty(exports, "driver", { enumerable: true, get: function () { return driver_1.router; } });
//# sourceMappingURL=index.js.map