import type { WorkspaceStatus } from "../../types/workspace";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: WorkspaceStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}