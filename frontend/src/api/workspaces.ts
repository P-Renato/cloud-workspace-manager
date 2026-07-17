import type { ActivityLog, ContainerMetadata } from "../types/activityLogs";
import type { Workspace } from "../types/workspace";

const API_URL = import.meta.env.VITE_API_URL;

function getHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getWorkspaces(
  token: string
): Promise<Workspace[]> {
  const response = await fetch(
    `${API_URL}/api/workspaces`,
    {
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load workspaces");
  }

  return response.json();
}

export async function createWorkspace(
  token: string,
  name: string
) {
  const response = await fetch(
    `${API_URL}/api/workspaces`,
    {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify({
        name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create workspace");
  }

  return response.json();
}

export async function deleteWorkspace(
  token: string,
  workspaceId: string
) {
  const response = await fetch(
    `${API_URL}/api/workspaces/${workspaceId}`,
    {
      method: "DELETE",
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete workspace");
  }
}

export async function startWorkspace(
  token: string,
  workspaceId: string
) {
  const response = await fetch(
    `${API_URL}/api/workspaces/${workspaceId}/start`,
    {
      method: "PATCH",
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to start workspace");
  }

  return response.json();
}

export async function stopWorkspace(
  token: string,
  workspaceId: string
) {
  const response = await fetch(
    `${API_URL}/api/workspaces/${workspaceId}/stop`,
    {
      method: "PATCH",
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to stop workspace");
  }

  return response.json();
}

export async function getWorkspace(
  token: string,
  workspaceId: string
): Promise<Workspace> {
  const response = await fetch(
    `${API_URL}/api/workspaces/${workspaceId}`,
    {
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load workspace");
  }

  return response.json();
}

export async function getWorkspaceLogs(
  token: string,
  workspaceId: string
): Promise<ActivityLog[]> {
  const response = await fetch(
    `${API_URL}/api/workspaces/${workspaceId}/logs`,
    {
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load activity logs");
  }

  return response.json();
}

export async function getWorkspaceMetadata(
  token: string,
  workspaceId: string
): Promise<ContainerMetadata | null> {
  const response = await fetch(
    `${API_URL}/api/workspaces/${workspaceId}/metadata`,
    {
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load metadata");
  }

  return response.json();
}