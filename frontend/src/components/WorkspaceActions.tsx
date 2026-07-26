import Button from "./ui/Button";

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
        gap: "1rem",
        marginTop: "1.5rem",
      }}
    >
      {status === "stopped" ? (
        <Button onClick={onStart}>
          Start Workspace
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={onStop}
        >
          Stop Workspace
        </Button>
      )}

      <Button
        variant="danger"
        onClick={onDelete}
      >
        Delete Workspace
      </Button>
    </div>
  );
}