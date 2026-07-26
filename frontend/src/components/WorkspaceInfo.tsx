import type { Workspace } from "../types/workspace";

import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";

import StatusBadge from "./StatusBadge";

interface WorkspaceInfoProps {
  workspace: Workspace;
}

export default function WorkspaceInfo({
  workspace,
}: WorkspaceInfoProps) {
  return (
    <Card>
      <SectionTitle>
        Workspace
      </SectionTitle>

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
        <strong>Updated:</strong>{" "}
        {new Date(
          workspace.updated_at
        ).toLocaleString()}
      </p>
    </Card>
  );
}