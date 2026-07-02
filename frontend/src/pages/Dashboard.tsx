import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "../api/health";

export default function Dashboard() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h3>System Status</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!data ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Version:</strong> {data.version}</p>
        </div>
      )}
    </div>
  );
}