import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getHealth,
  type HealthResponse,
} from "../api/health";

import {
  getWorkspaces,
  createWorkspace,
  deleteWorkspace,
  startWorkspace,
  stopWorkspace,
} from "../api/workspaces";

import type { Workspace } from "../types/workspace";

import DashboardHeader from "../components/DashboardHeader";
import WorkspaceForm from "../components/WorkspaceForm";
import WorkspaceList from "../components/WorkspaceList";
import SystemStatus from "../components/SystemStatus";

export default function Dashboard() {
  const {
    user,
    token,
    logout,
  } = useAuth();

  const [health, setHealth] =
    useState<HealthResponse | null>(
      null
    );

  const [healthError, setHealthError] =
    useState<string | null>(null);

  const [workspaces, setWorkspaces] =
    useState<Workspace[]>([]);

  const [workspaceError, setWorkspaceError] =
    useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((err) =>
        setHealthError(err.message)
      );
  }, []);

  async function refreshWorkspaces() {
    if (!token) {
      return;
    }

    try {
      const data =
        await getWorkspaces(token);

      setWorkspaces(data);
    } catch (err) {
      if (err instanceof Error) {
        setWorkspaceError(
          err.message
        );
      }
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    refreshWorkspaces();

    const interval =
      setInterval(
        refreshWorkspaces,
        5000
      );

    return () =>
      clearInterval(interval);
  }, [token]);

  async function handleCreate(
    name: string
  ) {
    if (!token) {
      return;
    }

    await createWorkspace(
      token,
      name
    );

    await refreshWorkspaces();
  }

  async function handleStart(
    workspaceId: string
  ) {
    if (!token) {
      return;
    }

    await startWorkspace(
      token,
      workspaceId
    );

    await refreshWorkspaces();
  }

  async function handleStop(
    workspaceId: string
  ) {
    if (!token) {
      return;
    }

    await stopWorkspace(
      token,
      workspaceId
    );

    await refreshWorkspaces();
  }

  async function handleDelete(
    workspaceId: string
  ) {
    if (!token) {
      return;
    }

    await deleteWorkspace(
      token,
      workspaceId
    );

    await refreshWorkspaces();
  }

  return (
    <div>
      <DashboardHeader
        userId={user?.userId}
        onLogout={logout}
      />

      <WorkspaceForm
        onCreate={handleCreate}
      />

      {workspaceError && (
        <p>{workspaceError}</p>
      )}

      <WorkspaceList
        workspaces={workspaces}
        onStart={handleStart}
        onStop={handleStop}
        onDelete={handleDelete}
      />

      <SystemStatus
        health={health}
        error={healthError}
      />
    </div>
  );
}