import type { Workspace } from "../types/workspace";
import StatusBadge from "./StatusBadge";

interface WorkspaceInfoProps {
  workspace: Workspace;
}

export default function WorkspaceInfo({
  workspace,
}: WorkspaceInfoProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        background: "#fff",
      }}
    >
      <h2>Workspace</h2>

      <p>
        <strong>Name:</strong> {workspace.name}
      </p>

      <p>
        <strong>ID:</strong> {workspace.id}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <StatusBadge status={workspace.status} />
      </p>

      <p>
        <strong>Created:</strong>{" "}
        {new Date(
          workspace.created_at
        ).toLocaleString()}
      </p>

      <p>
        <strong>Last Updated:</strong>{" "}
        {new Date(
          workspace.updated_at
        ).toLocaleString()}
      </p>
    </div>
  );
}