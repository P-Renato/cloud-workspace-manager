import type { AdminMetrics as AdminMetricsData } from "../api/workspaces";

import SectionTitle from "./ui/SectionTitle";

import styles from "./AdminMetrics.module.css";

interface Props {
  metrics: AdminMetricsData | null;
}

export default function AdminMetricsHeader({
  metrics,
}: Props) {
  if (!metrics) {
    return (
      <>
        <SectionTitle>
          Application Metrics
        </SectionTitle>

        <p>No metrics available.</p>
      </>
    );
  }

  return (
    <>
      <SectionTitle>
        Application Metrics
      </SectionTitle>

      <div className={styles.grid}>
        <div className={styles.card}>
          <strong>HTTP Requests / Second</strong>
          <span>
            {metrics.httpRequestRate}
          </span>
        </div>

        <div className={styles.card}>
          <strong>Average HTTP Duration</strong>
          <span>
            {(metrics.httpRequestDuration * 1000).toFixed(2)} ms
          </span>
        </div>

        <div className={styles.card}>
          <strong>CPU Usage</strong>
          <span>
            {metrics.cpuUsage.toFixed(2)}%
          </span>
        </div>

        <div className={styles.card}>
          <strong>Workspace Starts</strong>
          <span>
            {metrics.workspaceStarts}
          </span>
        </div>

        <div className={styles.card}>
          <strong>Workspace Stops</strong>
          <span>
            {metrics.workspaceStops}
          </span>
        </div>

        <div className={styles.card}>
          <strong>Workspace Creations</strong>
          <span>
            {metrics.workspaceCreations}
          </span>
        </div>

        <div className={styles.card}>
          <strong>Workspace Deletions</strong>
          <span>
            {metrics.workspaceDeletions}
          </span>
        </div>
      </div>
    </>
  );
}

