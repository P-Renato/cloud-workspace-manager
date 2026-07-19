import type { WorkspaceStatus } from "../types/workspace";

interface StatusBadgeProps {
  status: WorkspaceStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const colors = {
    running: "#16a34a",
    stopped: "#6b7280",
    error: "#dc2626",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        backgroundColor: colors[status],
        color: "white",
        fontSize: "0.85rem",
        fontWeight: 600,
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}