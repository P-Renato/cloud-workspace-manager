interface WorkspaceActionsProps {
  status: "running" | "stopped" | "error";

  onStart: () => void;

  onStop: () => void;

  onDelete: () => void;
}

export default function WorkspaceActions({
  status,
  onStart,
  onStop,
  onDelete,
}: WorkspaceActionsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginTop: 20,
      }}
    >
      {status === "stopped" ? (
        <button onClick={onStart}>
          Start Workspace
        </button>
      ) : (
        <button onClick={onStop}>
          Stop Workspace
        </button>
      )}

      <button onClick={onDelete}>
        Delete Workspace
      </button>
    </div>
  );
}