import Button from "./ui/Button";
import styles from "./WorkspaceActions.module.css";

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
    <div className={styles.actions}>
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