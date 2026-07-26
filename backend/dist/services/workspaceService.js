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
exports.getWorkspaceLogs = getWorkspaceLogs;
exports.syncWorkspaceStatus = syncWorkspaceStatus;
exports.getWorkspaceStats = getWorkspaceStats;
const crypto_1 = __importDefault(require("crypto"));
const NotFoundError_1 = require("../errors/NotFoundError");
const workspaceRepository_1 = require("../repositories/workspaceRepository");
const dockerService_1 = require("./dockerService");
const dockerService_2 = require("./dockerService");
const activityLogRepository_1 = require("../repositories/activityLogRepository");
const BadRequestError_1 = require("../errors/BadRequestError");
const workspaceTemplates_1 = require("../config/workspaceTemplates");
const dockerService_3 = require("./dockerService");
const dockerStatusMapper_1 = require("./dockerStatusMapper");
async function createWorkspace(userId, name, templateId) {
    const template = workspaceTemplates_1.WORKSPACE_TEMPLATES[templateId];
    if (!template) {
        throw new BadRequestError_1.BadRequestError("Invalid workspace template");
    }
    const id = crypto_1.default.randomUUID();
    await (0, workspaceRepository_1.createWorkspace)(id, userId, name, template.id, template.image);
    await (0, activityLogRepository_1.createActivityLog)(crypto_1.default.randomUUID(), id, "CREATE_WORKSPACE");
    return { id, name, status: "stopped", };
}
async function getUserWorkspaces(userId) {
    const workspaces = await (0, workspaceRepository_1.findByUserId)(userId);
    for (const workspace of workspaces) {
        await syncWorkspaceStatus(workspace.id);
    }
    return (0, workspaceRepository_1.findByUserId)(userId);
}
async function getWorkspaceById(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        return null;
    }
    await syncWorkspaceStatus(workspace.id);
    return (0, workspaceRepository_1.findById)(workspace.id);
}
async function startWorkspace(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    let containerId = workspace.container_id;
    if (!containerId) {
        containerId = await (0, dockerService_2.createContainer)(workspace.id, workspace.image);
        await (0, workspaceRepository_1.updateContainerId)(workspace.id, containerId);
    }
    await (0, dockerService_2.startContainer)(containerId);
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
    await (0, dockerService_2.stopContainer)(workspace.container_id);
    await (0, workspaceRepository_1.updateWorkspaceStatus)(workspace.id, "stopped");
    await (0, activityLogRepository_1.createActivityLog)(crypto_1.default.randomUUID(), workspace.id, "STOP_WORKSPACE");
}
async function deleteUserWorkspace(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    if (workspace.container_id) {
        await (0, dockerService_2.removeContainer)(workspace.container_id);
    }
    await (0, activityLogRepository_1.createActivityLog)(crypto_1.default.randomUUID(), workspace.id, "DELETE_WORKSPACE");
    await (0, workspaceRepository_1.deleteWorkspace)(workspace.id);
}
;
async function getWorkspaceLogs(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    return (0, activityLogRepository_1.findByWorkspaceId)(workspaceId);
}
async function syncWorkspaceStatus(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    if (!workspace.container_id) {
        await (0, workspaceRepository_1.updateWorkspaceStatus)(workspace.id, "stopped");
        return "stopped";
    }
    const dockerStatus = await (0, dockerService_3.getContainerStatus)(workspace.container_id);
    const status = (0, dockerStatusMapper_1.mapDockerStatus)(dockerStatus);
    await (0, workspaceRepository_1.updateWorkspaceStatus)(workspace.id, status);
    return status;
}
async function getWorkspaceStats(workspaceId) {
    const workspace = await (0, workspaceRepository_1.findById)(workspaceId);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError("Workspace not found");
    }
    if (!workspace.container_id) {
        throw new BadRequestError_1.BadRequestError("Workspace has no container");
    }
    return (0, dockerService_1.getContainerStats)(workspace.container_id);
}
//# sourceMappingURL=workspaceService.js.map