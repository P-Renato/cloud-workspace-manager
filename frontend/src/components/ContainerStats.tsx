import type { ContainerStatsType } from "../api/workspaces";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
interface Props {
  stats: ContainerStatsType | null;
}

function formatBytes(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

export default function ContainerStats({
  stats,
}: Props) {
  if (!stats) {
    return (
      <div>
        <h2>Container Stats</h2>
        <p>No statistics available.</p>
      </div>
    );
  }

  return (
    <Card>
        <SectionTitle>
            Container Stats
        </SectionTitle>
      <p>
        <strong>CPU Usage:</strong>{" "}
        {stats.cpuPercent.toFixed(2)}%
      </p>

      <p>
        <strong>Memory:</strong>{" "}
        {formatBytes(stats.memoryUsage)}
      </p>

      <p>
        <strong>Memory Limit:</strong>{" "}
        {formatBytes(stats.memoryLimit)}
      </p>

      <p>
        <strong>Memory Usage:</strong>{" "}
        {stats.memoryPercent.toFixed(2)}%
      </p>

      <p>
        <strong>Downloaded:</strong>{" "}
        {formatBytes(stats.networkRx)}
      </p>

      <p>
        <strong>Uploaded:</strong>{" "}
        {formatBytes(stats.networkTx)}
      </p>

      <p>
        <strong>Started:</strong>{" "}
        {new Date(stats.uptime).toLocaleString()}
      </p>
    </Card>
  );
}