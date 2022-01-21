"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordGenerator = exports.passwordCompare = exports.passwordHash = void 0;
const bcrypt_1 = require("bcrypt");
const generate_password_1 = require("generate-password");
// hash the password 
const passwordHash = async (password) => await (0, bcrypt_1.hash)(password, 8);
exports.passwordHash = passwordHash;
// compare the password 
const passwordCompare = async (password, hash) => await (0, bcrypt_1.compare)(password, hash);
exports.passwordCompare = passwordCompare;
// generate random  password 
const passwordGenerator = () => (0, generate_password_1.generate)({ length: 15, numbers: true });
exports.passwordGenerator = passwordGenerator;
//# sourceMappingURL=password.js.map