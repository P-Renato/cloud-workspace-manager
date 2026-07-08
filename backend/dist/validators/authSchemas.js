"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(100),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});
//# sourceMappingURL=authSchemas.js.map