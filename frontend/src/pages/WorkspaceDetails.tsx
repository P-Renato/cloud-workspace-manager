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
import ContainerStats from "../components/ContainerStats";
import type { ContainerStatsType } from "../api/workspaces";
import Page from "../components/ui/Page";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Grid from "../components/ui/Grid";
import Terminal from "../components/Terminal";

export default function WorkspaceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  const [metadata, setMetadata] = useState<ContainerMetadata | null>(null);

  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
    
  const [stats, setStats] = useState<ContainerStatsType | null>(null);

  async function loadWorkspace() {
    if (!token || !id) {
      return;
    }

    try {
      const [
        workspace,
        metadata,
        logs,
        stats
      ] = await Promise.all([
        workspaceApi.getWorkspace(token, id),
        workspaceApi.getWorkspaceMetadata(token, id),
        workspaceApi.getWorkspaceLogs(token, id),
        workspaceApi.getWorkspaceStats(token, id),
      ]);

      setWorkspace(workspace);
      setMetadata(metadata);
      setLogs(logs);
      setStats(stats);
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
    <Page>
      <Button onClick={() => navigate("/")}>
        ← Back to Dashboard
      </Button>

      <SectionTitle>{workspace.name}</SectionTitle>

      <Grid>
        <Card>
          <WorkspaceInfo workspace={workspace}/>
        </Card>

        <Card>
          <ContainerInfo metadata={metadata}/>
        </Card>

        <Card>
          <ContainerStats stats={stats}/>
        </Card>
        <Card>
          <Terminal workspaceId={workspace.id}/>
      </Card>
      </Grid>



      <WorkspaceActions
        status={workspace.status}
        onStart={handleStart}
        onStop={handleStop}
        onDelete={handleDelete}
      />

      <Card>
        <ActivityLogList logs={logs}/>
      </Card>
    </Page>
  );
}