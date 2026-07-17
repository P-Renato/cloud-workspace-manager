import type { HealthResponse } from "../api/health";

interface SystemStatusProps {
  health: HealthResponse | null;
  error: string | null;
}

export default function SystemStatus({
  health,
  error,
}: SystemStatusProps) {
  return (
    <section
      style={{
        marginTop: 40,
        borderTop: "1px solid #ddd",
        paddingTop: 24,
      }}
    >
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