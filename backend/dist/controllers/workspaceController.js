"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getById = exports.getAll = exports.create = void 0;
const workspaceService_1 = require("../services/workspaceService");
const create = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const workspace = await (0, workspaceService_1.createWorkspace)(req.userId, req.body.name);
    return res.status(201).json(workspace);
};
exports.create = create;
const getAll = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const workspaces = await (0, workspaceService_1.getUserWorkspaces)(req.userId);
    return res.json(workspaces);
};
exports.getAll = getAll;
const getById = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const workspace = await (0, workspaceService_1.getWorkspaceById)(req.params.id);
    if (!workspace) {
        return res.status(404).json({
            message: "Workspace not found",
        });
    }
    if (workspace.user_id !== req.userId) {
        return res.status(403).json({
            message: "Forbidden",
        });
    }
    return res.json(workspace);
};
exports.getById = getById;
const remove = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const workspace = await (0, workspaceService_1.getWorkspaceById)(req.params.id);
    if (!workspace) {
        return res.status(404).json({
            message: "Workspace not found",
        });
    }
    if (workspace.user_id !== req.userId) {
        return res.status(403).json({
            message: "Forbidden",
        });
    }
    await (0, workspaceService_1.deleteUserWorkspace)(workspace.id);
    return res.status(204).send();
};
exports.remove = remove;
//# sourceMappingURL=workspaceController.js.map