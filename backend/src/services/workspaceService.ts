import crypto from "crypto";

import {
  createWorkspace as createWorkspaceRepository,
  findById,
  findByUserId,
  deleteWorkspace,
  updateWorkspaceStatus,
} from "../repositories/workspaceRepository";

import { createActivityLog } from "../repositories/activityLogRepository";

import { Workspace } from "../types/workspace";

export async function createWorkspace(
  userId: string,
  name: string
): Promise<Pick<Workspace, "id" | "name" | "status">> {
  const id = crypto.randomUUID();

  await createWorkspaceRepository(id, userId, name);

  await createActivityLog(
    crypto.randomUUID(),
    id,
    "CREATE_WORKSPACE"
  );

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
  await createActivityLog(
    crypto.randomUUID(),
    workspaceId,
    "DELETE_WORKSPACE"
  );

  await deleteWorkspace(workspaceId);
}

export async function startWorkspace(
  workspaceId: string
): Promise<void> {
  await updateWorkspaceStatus(
    workspaceId,
    "running"
  );

  await createActivityLog(
    crypto.randomUUID(),
    workspaceId,
    "START_WORKSPACE"
  );
}

export async function stopWorkspace(
  workspaceId: string
): Promise<void> {
  await updateWorkspaceStatus(
    workspaceId,
    "stopped"
  );

  await createActivityLog(
    crypto.randomUUID(),
    workspaceId,
    "STOP_WORKSPACE"
  );
}