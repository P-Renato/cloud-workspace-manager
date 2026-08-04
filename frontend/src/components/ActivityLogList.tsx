// import type { ActivityLog } from "../types/activityLogs";
// import SectionTitle from "../components/ui/SectionTitle";
// import Card from "../components/ui/Card";

// interface ActivityLogListProps {
//   logs: ActivityLog[];
// }

// export default function ActivityLogList({
//   logs,
// }: ActivityLogListProps) {
//   return (
//     <Card>
//       <SectionTitle>
//         Activity
//       </SectionTitle>
//       {logs.length === 0 ? (
//         <p>No activity recorded.</p>
//       ) : (
//         <ul>
//           {logs.map((log) => (
//             <li key={log.id}>
//               <strong>{log.action}</strong>

//               <br />

//               <small>
//                 {new Date(
//                   log.created_at
//                 ).toLocaleString()}
//               </small>

//             </li>
//           ))}
//         </ul>
//       )}

//     </Card>

//   );
// }


import type { ActivityLog } from "../types/activityLogs";
import SectionTitle from "../components/ui/SectionTitle";
import styles from "./ActivityLogList.module.css";

interface ActivityLogListProps {
  logs: ActivityLog[];
}

export default function ActivityLogList({
  logs,
}: ActivityLogListProps) {
  return (
    <>
      <SectionTitle>
        Activity Log
      </SectionTitle>

      {logs.length === 0 ? (
        <p>No activity recorded.</p>
      ) : (
        <div className={styles.list}>
          {logs.map((log) => (
            <div
              key={log.id}
              className={styles.item}
            >
              <strong>{log.action}</strong>

              <span>
                {new Date(
                  log.created_at
                ).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}