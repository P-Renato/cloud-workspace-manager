import { useNavigate } from "react-router-dom";
import type { Workspace } from "../../types/workspace";

import StatusBadge from "../StatusBadge/StatusBadge";
import Button from "../ui/Button";
import Card from "../ui/Card";

import styles from "./WorkspaceList.module.css";

interface WorkspaceListProps {
  workspaces: Workspace[];
  onStart: (workspaceId: string) => Promise<void>;
  onStop: (workspaceId: string) => Promise<void>;
  onDelete: (workspaceId: string) => Promise<void>;
}

export default function WorkspaceList({
  workspaces,
  onStart,
  onStop,
  onDelete,
}: WorkspaceListProps) {
  const navigate = useNavigate();

  if (workspaces.length === 0) {
    return <p>No workspaces found.</p>;
  }

  return (
    <div>
      <h2 className={styles.heading}>Your Workspaces</h2>

      {workspaces.map((workspace) => (
        <Card key={workspace.id}>
          <p>
            <strong>Name:</strong> {workspace.name}
          </p>

          <div className={styles.status}>
            <StatusBadge status={workspace.status} />
          </div>

          <div className={styles.actions}>
            {workspace.status === "stopped" ? (
              <Button onClick={() => onStart(workspace.id)}>
                Start
              </Button>
            ) : (
              <Button onClick={() => onStop(workspace.id)}>
                Stop
              </Button>
            )}

            <Button
              onClick={() =>
                navigate(`/workspaces/${workspace.id}`)
              }
            >
              Details
            </Button>

            <Button onClick={() => onDelete(workspace.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}