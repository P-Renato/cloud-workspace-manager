import type { HealthResponse } from "../../api/health";
import styles from "./SystemStatus.module.css";

interface SystemStatusProps {
  health: HealthResponse | null;
  error: string | null;
}

export default function SystemStatus({
  health,
  error,
}: SystemStatusProps) {
  return (
    <section className={styles.section}>
      <h2>System Status</h2>

      {error && (
        <p>{error}</p>
      )}

      {!health ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            <strong>Status:</strong>{" "}
            {health.status}
          </p>

          <p>
            <strong>Message:</strong>{" "}
            {health.message}
          </p>

          <p>
            <strong>Version:</strong>{" "}
            {health.version}
          </p>
        </>
      )}
    </section>
  );
}