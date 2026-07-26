"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspaceSchema = exports.createWorkspaceSchema = void 0;
const zod_1 = require("zod");
exports.createWorkspaceSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(100),
    templateId: zod_1.z
        .string()
        .trim()
        .min(1),
});
exports.updateWorkspaceSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(100),
});
//# sourceMappingURL=workspaceSchemas.js.map