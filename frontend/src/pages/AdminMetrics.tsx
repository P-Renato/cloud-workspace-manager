import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getAdminMetrics } from "../api/workspaces";

import type { AdminMetrics } from "../api/workspaces";

import AdminMetricsHeader from "../components/AdminMetricsHeader";

export default function AdminMetrics() {
  const { token } = useAuth();

  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!token) {
    return;
  }

  async function loadMetrics() {
    try {
      const data = await getAdminMetrics(token as string);
      setMetrics(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
          setError("Failed to load metrics.");
      }
    }
  }

  loadMetrics();

  const interval = setInterval(loadMetrics, 5000);

  return () => {
    clearInterval(interval);
  };
}, [token]);

  if (!token) {
    return <p>Authentication required.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!metrics) {
    return <p>Loading metrics...</p>;
  }

  return (
    <AdminMetricsHeader
      metrics={metrics}
    />
  );
}