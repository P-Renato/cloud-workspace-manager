import crypto from "crypto";

import {
  createWorkspace as createWorkspaceRepository,
  findById,
  findByUserId,
  deleteWorkspace,
} from "../repositories/workspaceRepository";

import { Workspace } from "../types/workspace";

export async function createWorkspace(
  userId: string,
  name: string
): Promise<Pick<Workspace, "id" | "name" | "status">> {
  const id = crypto.randomUUID();

  await createWorkspaceRepository(id, userId, name);

  return {
    id,
    name,
    status: "stopped",
  };
}

export async function getUserWorkspaces(
  userId: string
): Promise<Workspace[]> {
  return findByUserId(userId);
}

export async function getWorkspaceById(
  workspaceId: string
): Promise<Workspace | null> {
  return findById(workspaceId);
}

export async function deleteUserWorkspace(
  workspaceId: string
): Promise<void> {
  await deleteWorkspace(workspaceId);
}