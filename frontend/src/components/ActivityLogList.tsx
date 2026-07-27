import type { ActivityLog } from "../types/activityLogs";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";

interface ActivityLogListProps {
  logs: ActivityLog[];
}

export default function ActivityLogList({
  logs,
}: ActivityLogListProps) {
  return (
    <Card>
      <SectionTitle>
        Activity
      </SectionTitle>
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

    </Card>

  );
}