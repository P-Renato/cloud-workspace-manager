import type { ActivityLog } from "../types/activityLogs";

interface ActivityLogListProps {
  logs: ActivityLog[];
}

export default function ActivityLogList({
  logs,
}: ActivityLogListProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h2>Activity</h2>

      {logs.length === 0 ? (
        <p>No activity recorded.</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.action}</strong>

              {" — "}

              {new Date(
                log.created_at
              ).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}