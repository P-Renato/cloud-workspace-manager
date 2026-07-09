"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspace = createWorkspace;
exports.getUserWorkspaces = getUserWorkspaces;
exports.getWorkspaceById = getWorkspaceById;
exports.startWorkspace = startWorkspace;
exports.stopWorkspace = stopWorkspace;
exports.deleteUserWorkspace = deleteUserWorkspace;
const crypto_1 = __importDefault(require("crypto"));
const NotFoundError_1 = require("../errors/NotFoundError");
const workspaceRepository_1 = require("../repositories/workspaceRepository");
const dockerService_1 = require("./dockerService");
const activityLogRepository_1 = require("../repositories/activityLogRepository");
async function createWorkspace(userId, name) {
    const id = crypto_1.default.randomUUID();
    await (0, workspaceRepository_1.createWorkspace)(id, userId, name);
    await (0, activityLogRepository_1.createActivityLog)(crypto_1.default.randomUUID(), id, "CREATE_WORKSPACE");
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
async function startWorkspace(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    let containerId = workspace.container_id;
    if (!containerId) {
        containerId =
            await (0, dockerService_1.createContainer)(workspace.id);
        await (0, workspaceRepository_1.updateContainerId)(workspace.id, containerId);
    }
    await (0, dockerService_1.startContainer)(containerId);
    await (0, workspaceRepository_1.updateWorkspaceStatus)(workspace.id, "running");
    await (0, activityLogRepository_1.createActivityLog)(crypto_1.default.randomUUID(), workspace.id, "START_WORKSPACE");
}
async function stopWorkspace(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    if (!workspace.container_id) {
        return;
    }
    await (0, dockerService_1.stopContainer)(workspace.container_id);
    await (0, workspaceRepository_1.updateWorkspaceStatus)(workspace.id, "stopped");
    await (0, activityLogRepository_1.createActivityLog)(crypto_1.default.randomUUID(), workspace.id, "STOP_WORKSPACE");
}
async function deleteUserWorkspace(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    if (workspace.container_id) {
        await (0, dockerService_1.removeContainer)(workspace.container_id);
    }
    await (0, activityLogRepository_1.createActivityLog)(crypto_1.default.randomUUID(), workspace.id, "DELETE_WORKSPACE");
    await (0, workspaceRepository_1.deleteWorkspace)(workspace.id);
}
//# sourceMappingURL=workspaceService.js.map