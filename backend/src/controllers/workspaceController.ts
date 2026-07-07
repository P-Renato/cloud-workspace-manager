import { Response } from "express";
import crypto from "crypto";
import { ParamsDictionary } from "express-serve-static-core";

import { AuthRequest } from "../middleware/authenticate";
import {
  createWorkspace,
  findById,
  findByUserId,
  deleteWorkspace,
} from "../repositories/workspaceRepository";

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
  const { name } = req.body;

  const id = crypto.randomUUID();

  await createWorkspace(
    id,
    req.userId,
    name
  );

  return res.status(201).json({
    id,
    name,
    status: "stopped",
  });
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
  const workspaces = await findByUserId(req.userId);

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
  const workspace = await findById(req.params.id);

  if (!workspace) {
    return res
      .status(404)
      .json({ message: "Workspace not found" });
  }

  if (workspace.user_id !== req.userId) {
    return res
      .status(403)
      .json({ message: "Forbidden" });
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
  const workspace = await findById(req.params.id);

  if (!workspace) {
    return res
      .status(404)
      .json({ message: "Workspace not found" });
  }

  if (workspace.user_id !== req.userId) {
    return res
      .status(403)
      .json({ message: "Forbidden" });
  }

  await deleteWorkspace(workspace.id);

  return res.status(204).send();
};