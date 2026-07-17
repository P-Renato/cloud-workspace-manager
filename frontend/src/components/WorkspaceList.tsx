import type { Workspace } from "../types/workspace";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";



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
  const navigate = useNavigate();

  if (workspaces.length === 0) {
    return <p>No workspaces found.</p>;
  }

  return (
    <div>
      <h2>Your Workspaces</h2>

      {workspaces.map((workspace) => (
      <div
        key={workspace.id}
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
          background: "#fff",
          gap: 20,
          justifyContent: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column"

        }}
      >
          <p>
            <strong>Name:</strong>{" "}
            {workspace.name}
          </p>

          <p>
            <StatusBadge
              status={workspace.status}
            />
          </p>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: 10,
              marginTop: 16,

            }}
          >


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
              onClick={()=> navigate(`/workspaces/${workspace.id}`)}>
                Details
              </button>
            
            

            <button
              onClick={() =>
                onDelete(workspace.id)
              }
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}