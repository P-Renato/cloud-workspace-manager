import Button from "../ui/Button";
import styles from "./DashboardHeader.module.css";

interface DashboardHeaderProps {
  onLogout: () => void;
}

export default function DashboardHeader({
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <h1 className={styles.title}>
          Cloud Workspace Manager
        </h1>
      </div>

      <Button onClick={onLogout}>
        Logout
      </Button>
    </header>
  );
}