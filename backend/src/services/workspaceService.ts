import crypto from "crypto";
import { NotFoundError } from "../errors/NotFoundError";
import {
  createWorkspace as createWorkspaceRepository,
  findById,
  findByUserId,
  deleteWorkspace,
  updateWorkspaceStatus,
  updateContainerId,
} from "../repositories/workspaceRepository";

import { createContainer, startContainer, stopContainer, removeContainer, } from "./dockerService";

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

export async function startWorkspace(
  workspaceId: string
): Promise<void> {
  const workspace =
    await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  let containerId =
    workspace.container_id;

  if (!containerId) {
    containerId =
      await createContainer(
        workspace.id
      );

    await updateContainerId(
      workspace.id,
      containerId
    );
  }

  await startContainer(containerId);

  await updateWorkspaceStatus(
    workspace.id,
    "running"
  );

  await createActivityLog(
    crypto.randomUUID(),
    workspace.id,
    "START_WORKSPACE"
  );
}

export async function stopWorkspace(
  workspaceId: string
): Promise<void> {
  const workspace =
    await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  if (!workspace.container_id) {
    return;
  }

  await stopContainer(
    workspace.container_id
  );

  await updateWorkspaceStatus(
    workspace.id,
    "stopped"
  );

  await createActivityLog(
    crypto.randomUUID(),
    workspace.id,
    "STOP_WORKSPACE"
  );
}

export async function deleteUserWorkspace(
  workspaceId: string
): Promise<void> {
  const workspace =
    await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  if (workspace.container_id) {
    await removeContainer(
      workspace.container_id
    );
  }

  await createActivityLog(
    crypto.randomUUID(),
    workspace.id,
    "DELETE_WORKSPACE"
  );

  await deleteWorkspace(workspace.id);
}