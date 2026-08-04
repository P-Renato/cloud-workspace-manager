import type { Workspace } from "../types/workspace";
import styles from "./WorkspaceInfo.module.css"
import SectionTitle from "./ui/SectionTitle";

import StatusBadge from "./StatusBadge";

interface WorkspaceInfoProps {
  workspace: Workspace;
}

export default function WorkspaceInfo({
  workspace,
}: WorkspaceInfoProps) {
  return (
    <div className={styles.grid}>

        <SectionTitle>
          Workspace
        </SectionTitle>

        <div className={styles.item}>
          <strong>Name:</strong> {workspace.name}
        </div>

        <div className={styles.item}>
          <strong>ID:</strong> {workspace.id}
        </div>

        <div className={styles.item}>
          <strong>Status:</strong>{" "}
          <StatusBadge status={workspace.status} />
        </div>

        <div className={styles.item}>
          <strong>Created:</strong>{" "}
          {new Date(
            workspace.created_at
          ).toLocaleString()}
        </div>

        <div className={styles.item}>
          <strong>Updated:</strong>{" "}
          {new Date(
            workspace.updated_at
          ).toLocaleString()}
        </div>
    </div>
    
  );
}