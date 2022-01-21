"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverLogin = exports.createDelivery = exports.deliveryManagerLogin = exports.adminLogin = void 0;
var admin_1 = require("./admin");
Object.defineProperty(exports, "adminLogin", { enumerable: true, get: function () { return admin_1.login; } });
var deliverymanager_1 = require("./deliverymanager");
Object.defineProperty(exports, "deliveryManagerLogin", { enumerable: true, get: function () { return deliverymanager_1.login; } });
Object.defineProperty(exports, "createDelivery", { enumerable: true, get: function () { return deliverymanager_1.create; } });
var driver_1 = require("./driver");
Object.defineProperty(exports, "driverLogin", { enumerable: true, get: function () { return driver_1.login; } });
//# sourceMappingURL=index.js.map