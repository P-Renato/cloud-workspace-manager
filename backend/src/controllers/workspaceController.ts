import { Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { AuthRequest } from "../middleware/authenticate";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { getContainerMetadata } from "../services/dockerService";

import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  deleteUserWorkspace,
  startWorkspace,
  stopWorkspace,
  getWorkspaceLogs,
  syncWorkspaceStatus
} from "../services/workspaceService";

interface WorkspaceParams {
  id: string;
}

export const create = async (
  req: AuthRequest<ParamsDictionary, unknown, { name: string; templateId: string }>,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspace = await createWorkspace(
    req.userId,
    req.body.name,
    req.body.templateId,
  );

  return res.status(201).json(workspace);
};

export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspaces = await getUserWorkspaces(req.userId);

  return res.json(workspaces);
};

export const getById = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspace = await getWorkspaceById(req.params.id);

  if (!workspace) {
    throw new NotFoundError();
  }

  if (workspace.user_id !== req.userId) {
    throw new ForbiddenError();
  }

  return res.json(workspace);
};

export const remove = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspace = await getWorkspaceById(req.params.id);

  if (!workspace) {
    throw new NotFoundError();
  }

  if (workspace.user_id !== req.userId) {
    throw new ForbiddenError();
  }

  await deleteUserWorkspace(workspace.id);

  return res.status(204).send();
};

export const start = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspace = await getWorkspaceById(
    req.params.id
  );

  if (!workspace) {
    throw new NotFoundError();
  }

  if (workspace.user_id !== req.userId) {
    throw new ForbiddenError();
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
    throw new UnauthorizedError();
  }

  const workspace = await getWorkspaceById(
    req.params.id
  );

  if (!workspace) {
    throw new NotFoundError();
  }

  if (workspace.user_id !== req.userId) {
    throw new ForbiddenError();
  }

  await stopWorkspace(workspace.id);

  return res.json({
    message: "Workspace stopped",
  });
};

export const syncStatus = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspace = await getWorkspaceById(req.params.id);

  if (!workspace) {
    throw new NotFoundError();
  }

  if (workspace.user_id !== req.userId) {
    throw new ForbiddenError();
  }

  const status = await syncWorkspaceStatus(workspace.id);

  return res.json({
    status,
  });
};

export const metadata = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspace =
    await getWorkspaceById(
      req.params.id
    );

  if (!workspace) {
    throw new NotFoundError();
  }

  if (
    workspace.user_id !==
    req.userId
  ) {
    throw new ForbiddenError();
  }

  if (
    !workspace.container_id
  ) {
    return res.json(null);
  }

  const metadata =
    await getContainerMetadata(
      workspace.container_id
    );

  return res.json(metadata);
};

export const logs = async (
  req: AuthRequest<WorkspaceParams>,
  res: Response
) => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }

  const workspace =
    await getWorkspaceById(
      req.params.id
    );

  if (!workspace) {
    throw new NotFoundError();
  }

  if (
    workspace.user_id !==
    req.userId
  ) {
    throw new ForbiddenError();
  }

  const logs =
    await getWorkspaceLogs(
      workspace.id
    );

  return res.json(logs);
};