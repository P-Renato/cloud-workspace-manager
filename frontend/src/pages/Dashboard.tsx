import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getHealth, type HealthResponse } from "../api/health";

import { getWorkspaces, createWorkspace, deleteWorkspace, startWorkspace, stopWorkspace,} from "../api/workspaces";

import type { Workspace } from "../types/workspace";

import WorkspaceForm from "../components/WorkspaceForm";
import WorkspaceList from "../components/WorkspaceList";

export default function Dashboard() {
  const { user, token, logout } =
    useAuth();

  const [health, setHealth] =
    useState<HealthResponse | null>(null);

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

  useEffect(() => {
    if (!token) {
      return;
    }

    loadWorkspaces();
  }, [token]);

  async function loadWorkspaces() {
    if (!token) {
      return;
    }

    try {
      const data =
        await getWorkspaces(token);

      setWorkspaces(data);
    } catch (err) {
      if (err instanceof Error) {
        setWorkspaceError(err.message);
      }
    }
  }

  async function handleCreate(
    name: string
  ) {
    if (!token) {
      return;
    }

    await createWorkspace(token, name);

    await loadWorkspaces();
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

    await loadWorkspaces();
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

    await loadWorkspaces();
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

    await loadWorkspaces();
  }

  return (
    <div>
      <h1>Cloud Workspace Manager</h1>

      <p>
        <strong>User ID:</strong>{" "}
        {user?.userId}
      </p>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

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

      <hr />

      <h2>System Status</h2>

      {healthError && (
        <p>{healthError}</p>
      )}

      {!health ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            Status: {health.status}
          </p>

          <p>
            Message: {health.message}
          </p>

          <p>
            Version: {health.version}
          </p>
        </>
      )}
    </div>
  );
}