"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = exports.stop = exports.start = exports.remove = exports.getById = exports.getAll = exports.create = void 0;
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const ForbiddenError_1 = require("../errors/ForbiddenError");
const NotFoundError_1 = require("../errors/NotFoundError");
const dockerService_1 = require("../services/dockerService");
const workspaceService_1 = require("../services/workspaceService");
const create = async (req, res) => {
    if (!req.userId) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const workspace = await (0, workspaceService_1.createWorkspace)(req.userId, req.body.name);
    return res.status(201).json(workspace);
};
exports.create = create;
const getAll = async (req, res) => {
    if (!req.userId) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const workspaces = await (0, workspaceService_1.getUserWorkspaces)(req.userId);
    return res.json(workspaces);
};
exports.getAll = getAll;
const getById = async (req, res) => {
    if (!req.userId) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const workspace = await (0, workspaceService_1.getWorkspaceById)(req.params.id);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError();
    }
    if (workspace.user_id !== req.userId) {
        throw new ForbiddenError_1.ForbiddenError();
    }
    return res.json(workspace);
};
exports.getById = getById;
const remove = async (req, res) => {
    if (!req.userId) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const workspace = await (0, workspaceService_1.getWorkspaceById)(req.params.id);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError();
    }
    if (workspace.user_id !== req.userId) {
        throw new ForbiddenError_1.ForbiddenError();
    }
    await (0, workspaceService_1.deleteUserWorkspace)(workspace.id);
    return res.status(204).send();
};
exports.remove = remove;
const start = async (req, res) => {
    if (!req.userId) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const workspace = await (0, workspaceService_1.getWorkspaceById)(req.params.id);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError();
    }
    if (workspace.user_id !== req.userId) {
        throw new ForbiddenError_1.ForbiddenError();
    }
    await (0, workspaceService_1.startWorkspace)(workspace.id);
    return res.json({
        message: "Workspace started",
    });
};
exports.start = start;
const stop = async (req, res) => {
    if (!req.userId) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const workspace = await (0, workspaceService_1.getWorkspaceById)(req.params.id);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError();
    }
    if (workspace.user_id !== req.userId) {
        throw new ForbiddenError_1.ForbiddenError();
    }
    await (0, workspaceService_1.stopWorkspace)(workspace.id);
    return res.json({
        message: "Workspace stopped",
    });
};
exports.stop = stop;
const metadata = async (req, res) => {
    if (!req.userId) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const workspace = await (0, workspaceService_1.getWorkspaceById)(req.params.id);
    if (!workspace) {
        throw new NotFoundError_1.NotFoundError();
    }
    if (workspace.user_id !==
        req.userId) {
        throw new ForbiddenError_1.ForbiddenError();
    }
    if (!workspace.container_id) {
        return res.json(null);
    }
    const metadata = await (0, dockerService_1.getContainerMetadata)(workspace.container_id);
    return res.json(metadata);
};
exports.metadata = metadata;
//# sourceMappingURL=workspaceController.js.map