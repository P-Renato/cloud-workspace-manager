import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { AdminMetrics } from "../api/workspaces";

interface Props {
  metrics: AdminMetrics | null;
}

export default function AdminMetricsCharts({
  metrics,
}: Props) {
  if (!metrics) {
    return (
      <p>
        No chart data available.
      </p>
    );
  }

  const requestData = [
    {
      name: "Current",
      value: metrics.httpRequestRate,
    },
  ];

  const durationData = [
    {
      name: "Current",
      value: metrics.httpRequestDuration,
    },
  ];

  const workspaceData = [
    {
      name: "Starts",
      value: metrics.workspaceStarts,
    },
    {
      name: "Stops",
      value: metrics.workspaceStops,
    },
    {
      name: "Creations",
      value: metrics.workspaceCreations,
    },
    {
      name: "Deletions",
      value: metrics.workspaceDeletions,
    },
  ];

  const cpuData = [
    {
      name: "Current",
      value: metrics.cpuUsage,
    },
  ];

  return (
    <div>
      <h2>Monitoring</h2>

      <section>
        <h3>HTTP Requests / Second</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <LineChart data={requestData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h3>HTTP Request Duration</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <LineChart data={durationData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h3>Workspace Operations</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <LineChart data={workspaceData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h3>CPU Usage</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <LineChart data={cpuData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}