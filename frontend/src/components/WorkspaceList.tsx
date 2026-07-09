import type { Workspace } from "../types/workspace";

interface WorkspaceListProps {
  workspaces: Workspace[];
  onStart: (
    workspaceId: string
  ) => Promise<void>;
  onStop: (
    workspaceId: string
  ) => Promise<void>;
  onDelete: (
    workspaceId: string
  ) => Promise<void>;
}

export default function WorkspaceList({
  workspaces,
  onStart,
  onStop,
  onDelete,
}: WorkspaceListProps) {
  if (workspaces.length === 0) {
    return <p>No workspaces found.</p>;
  }

  return (
    <div>
      <h2>Your Workspaces</h2>

      {workspaces.map((workspace) => (
        <div key={workspace.id}>
          <p>
            <strong>Name:</strong>{" "}
            {workspace.name}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {workspace.status}
          </p>

          {workspace.status === "stopped" ? (
            <button
              onClick={() =>
                onStart(workspace.id)
              }
            >
              Start
            </button>
          ) : (
            <button
              onClick={() =>
                onStop(workspace.id)
              }
            >
              Stop
            </button>
          )}

          <button
            onClick={() =>
              onDelete(workspace.id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}