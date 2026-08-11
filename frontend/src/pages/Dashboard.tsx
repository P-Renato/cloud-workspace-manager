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
  getAdminMetrics,
  type AdminMetrics,
} from "../api/workspaces";

import type { Workspace } from "../types/workspace";

import DashboardHeader from "../components/DashboardHeader";
import WorkspaceForm from "../components/WorkspaceForm";
import WorkspaceList from "../components/WorkspaceList";
import SystemStatus from "../components/SystemStatus";
import AdminMetricsHeader from "../components/AdminMetricsHeader";

export default function Dashboard() {
  const {
    user,
    token,
    logout,
  } = useAuth();

  const [health, setHealth] = useState<HealthResponse | null>(null);

  const [healthError, setHealthError] = useState<string | null>(null);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const [workspaceError, setWorkspaceError] = useState<string | null>(null);

  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics | null>(null);

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

  async function refreshAdminMetrics() {
    console.log("REFRESHING ADMIN METRICS");
    if (!token) {
      return;
    }

    try {
      const data = await getAdminMetrics(token);
      console.log("ADMIN METRICS:", data);

      setAdminMetrics(data);
    } catch (err) {
      console.error(
        "Failed to load admin metrics",
        err
      );
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    refreshWorkspaces();
    refreshAdminMetrics();

    const interval = setInterval(() => {
      refreshWorkspaces();                                        
      refreshAdminMetrics();
    }, 5000);

    return () =>
      clearInterval(interval);
  }, [token]);

  async function handleCreate( name: string, templateId: string) {
    if (!token) {
      return;
    }

    await createWorkspace(token,name,templateId);

    await refreshWorkspaces();
  }

  async function handleStart(workspaceId: string) {
    if (!token) {
      return;
    }

    await startWorkspace(token,workspaceId);

    await refreshWorkspaces();
  }

  async function handleStop(workspaceId: string) {
    if (!token) {
      return;
    }

    await stopWorkspace(token,workspaceId);

    await refreshWorkspaces();
  }

  async function handleDelete(workspaceId: string) {
    if (!token) {
      return;
    }

    await deleteWorkspace(token,workspaceId);

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

      <AdminMetricsHeader
        metrics={adminMetrics}
      />

      <SystemStatus
        health={health}
        error={healthError}
      />
    </div>
  );
}