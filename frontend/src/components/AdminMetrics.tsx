import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getAdminMetrics,
  type AdminMetrics as AdminMetricsData,
} from "../api/workspaces";

import AdminMetricsHeader from "../components/AdminMetricsHeader";
import AdminMetricsCharts from "../components/AdminMetricsCharts";

export default function AdminMetrics() {
  const { token } = useAuth();

  const [metrics, setMetrics] = useState<AdminMetricsData | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        if (!token) {
            return;
        }

      async function loadMetrics() {
          try {
          if (!token) {
            return;
          }
        const data = await getAdminMetrics(token);

        setMetrics(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Failed to load admin metrics."
          );
        }
      }
    }

    loadMetrics();
  }, [token]);

  return (
    <div>
      {error && (
        <p>{error}</p>
      )}

      <AdminMetricsHeader
        metrics={metrics}
      />

      <AdminMetricsCharts
        metrics={metrics}
      />
    </div>
  );
}
