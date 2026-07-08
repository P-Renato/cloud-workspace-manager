import { Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { AuthRequest } from "../middleware/authenticate";

import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  deleteUserWorkspace,
  startWorkspace,
  stopWorkspace,
} from "../services/workspaceService";

interface WorkspaceParams {
  id: string;
}

export const create = async (
  req: AuthRequest<ParamsDictionary, unknown, { name: string }>,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const workspace = await createWorkspace(
    req.userId,
    req.body.name
  );

  return res.status(201).json(workspace);
};

export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const workspaces = await getUserWorkspaces(req.userId);

  return res.json(workspaces);
};

export const getById = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const workspace = await getWorkspaceById(req.params.id);

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

export const remove = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const workspace = await getWorkspaceById(req.params.id);

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

  await deleteUserWorkspace(workspace.id);

  return res.status(204).send();
};

export const start = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const workspace = await getWorkspaceById(
    req.params.id
  );

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

  await startWorkspace(workspace.id);

  return res.json({
    message: "Workspace started",
  });
};

export const stop = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const workspace = await getWorkspaceById(
    req.params.id
  );

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

  await stopWorkspace(workspace.id);

  return res.json({
    message: "Workspace stopped",
  });
};