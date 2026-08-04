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
import { getContainerStats } from "./dockerService";
import { ContainerStats } from "../types/containerStats";

import { createContainer, startContainer, stopContainer, removeContainer, } from "./dockerService";

import { createActivityLog, findByWorkspaceId } from "../repositories/activityLogRepository";

import { Workspace, WorkspaceStatus } from "../types/workspace";

import { ActivityLog } from "../types/activityLog";

import { BadRequestError } from "../errors/BadRequestError";

import { WORKSPACE_TEMPLATES } from "../config/workspaceTemplates";

import { getContainerStatus } from "./dockerService";
import { mapDockerStatus } from "./dockerStatusMapper";


export async function createWorkspace(
  userId: string,
  name: string,
  templateId: string,
): Promise<Pick<Workspace, "id" | "name" | "status">> {
  const template = WORKSPACE_TEMPLATES[templateId];

  if (!template) {
      throw new BadRequestError("Invalid workspace template");
  }

  const id = crypto.randomUUID();

  await createWorkspaceRepository(id, userId, name, template.id, template.image);

  await createActivityLog(crypto.randomUUID(),id, "CREATE_WORKSPACE");

  return { id, name, status: "stopped",};
}

export async function getUserWorkspaces(
  userId: string
): Promise<Workspace[]> {

  const workspaces =
    await findByUserId(userId);

  for (const workspace of workspaces) {
    await syncWorkspaceStatus(workspace.id);
  }

  return findByUserId(userId);
}

export async function getWorkspaceById(
  workspaceId: string
): Promise<Workspace | null> {

  const workspace = await findById(workspaceId);

  if (!workspace) {
    return null;
  }

  await syncWorkspaceStatus(workspace.id);

  return findById(workspace.id);
}

export async function startWorkspace(
  workspaceId: string
): Promise<void> {
  console.log("Starting workspace:", workspaceId);
  const workspace = await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  console.log("Workspace found:", workspace);

  let containerId = workspace.container_id;

  if (!containerId) {
    console.log("Creating container with image:", workspace.image);
    containerId = await createContainer(workspace.id, workspace.image);

    console.log("Container created:", containerId);
    
    await updateContainerId( workspace.id, containerId);

    console.log("Container ID saved to database.");
  }
  console.log("Starting container...");
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
};

export async function getWorkspaceLogs(
  workspaceId: string
): Promise<ActivityLog[]> {
  const workspace =
    await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError(
      "Workspace not found"
    );
  }

  return findByWorkspaceId(
    workspaceId
  );
}

export async function syncWorkspaceStatus(
  workspaceId: string
): Promise<WorkspaceStatus> {

  const workspace = await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  if (!workspace.container_id) {
    await updateWorkspaceStatus(
      workspace.id,
      "stopped"
    );

    return "stopped";
  }

  const dockerStatus =
    await getContainerStatus(
      workspace.container_id
    );

  const status =
    mapDockerStatus(dockerStatus);

  await updateWorkspaceStatus(
    workspace.id,
    status
  );

  return status;
}

export async function getWorkspaceStats(
  workspaceId: string
): Promise<ContainerStats> {

  const workspace =
    await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError(
      "Workspace not found"
    );
  }

  if (!workspace.container_id) {
    throw new BadRequestError(
      "Workspace has no container"
    );
  }

  return getContainerStats(
    workspace.container_id
  );
}

export async function getWorkspaceTerminalCommand(
  workspaceId: string
): Promise<{
  command: string;
  args: string[];
}> {
  const workspace = await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  if (!workspace.container_id) {
    throw new BadRequestError(
      "Workspace has not been started."
    );
  }

  return {
    command: "script",
    args: [
      "-q",
      "-c",
      `docker exec -it ${workspace.container_id} sh`,
      "/dev/null",
    ],
  };
}

export async function getWorkspaceContainerId(
  workspaceId: string
): Promise<string> {
  const workspace = await findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  if (!workspace.container_id) {
    throw new BadRequestError(
      "Workspace has not been started yet."
    );
  }

  return workspace.container_id;
}