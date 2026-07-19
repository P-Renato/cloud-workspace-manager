import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import * as workspaceApi from "../api/workspaces";

import type { Workspace } from "../types/workspace";
import type { ActivityLog } from "../types/activityLogs";
import type { ContainerMetadata } from "../types/activityLogs";

import WorkspaceInfo from "../components/WorkspaceInfo";
import ContainerInfo from "../components/ContainerInfo";
import ActivityLogList from "../components/ActivityLogList";
import WorkspaceActions from "../components/WorkspaceActions";

export default function WorkspaceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [workspace, setWorkspace] =
    useState<Workspace | null>(null);

  const [metadata, setMetadata] =
    useState<ContainerMetadata | null>(null);

  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadWorkspace() {
    if (!token || !id) {
      return;
    }

    try {
      const [
        workspace,
        metadata,
        logs,
      ] = await Promise.all([
        workspaceApi.getWorkspace(
          token,
          id
        ),
        workspaceApi.getWorkspaceMetadata(
          token,
          id
        ),
        workspaceApi.getWorkspaceLogs(
          token,
          id
        ),
      ]);

      setWorkspace(workspace);
      setMetadata(metadata);
      setLogs(logs);
    } catch {
      setError(
        "Failed to load workspace."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkspace();
  }, [token, id]);

  async function handleStart() {
    if (!token || !id) {
      return;
    }

    await workspaceApi.startWorkspace(
      token,
      id
    );

    await loadWorkspace();
  }

  async function handleStop() {
    if (!token || !id) {
      return;
    }

    await workspaceApi.stopWorkspace(
      token,
      id
    );

    await loadWorkspace();
  }

  async function handleDelete() {
    if (!token || !id) {
      return;
    }

    await workspaceApi.deleteWorkspace(
      token,
      id
    );

    navigate("/");
  }

  if (loading) {
    return <p>Loading workspace...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!workspace) {
    return <p>Workspace not found.</p>;
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: 20,
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>{workspace.name}</h1>

      <WorkspaceInfo
        workspace={workspace}
      />

      <div
        style={{
          marginTop: 20,
        }}
      >
        <ContainerInfo
          metadata={metadata}
        />
      </div>

      <WorkspaceActions
        status={workspace.status}
        onStart={handleStart}
        onStop={handleStop}
        onDelete={handleDelete}
      />

      <div
        style={{
          marginTop: 30,
        }}
      >
        <ActivityLogList
          logs={logs}
        />
      </div>
    </div>
  );
}