"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspace = createWorkspace;
exports.getUserWorkspaces = getUserWorkspaces;
exports.getWorkspaceById = getWorkspaceById;
exports.deleteUserWorkspace = deleteUserWorkspace;
const crypto_1 = __importDefault(require("crypto"));
const workspaceRepository_1 = require("../repositories/workspaceRepository");
async function createWorkspace(userId, name) {
    const id = crypto_1.default.randomUUID();
    await (0, workspaceRepository_1.createWorkspace)(id, userId, name);
    return {
        id,
        name,
        status: "stopped",
    };
}
async function getUserWorkspaces(userId) {
    return (0, workspaceRepository_1.findByUserId)(userId);
}
async function getWorkspaceById(workspaceId) {
    return (0, workspaceRepository_1.findById)(workspaceId);
}
async function deleteUserWorkspace(workspaceId) {
    await (0, workspaceRepository_1.deleteWorkspace)(workspaceId);
}
//# sourceMappingURL=workspaceService.js.map