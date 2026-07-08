"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspaceSchema = exports.createWorkspaceSchema = void 0;
const zod_1 = require("zod");
exports.createWorkspaceSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, "Workspace name is required")
        .max(100, "Workspace name must be at most 100 characters"),
});
exports.updateWorkspaceSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, "Workspace name is required")
        .max(100, "Workspace name must be at most 100 characters"),
});
//# sourceMappingURL=workspaceSchemas.js.map