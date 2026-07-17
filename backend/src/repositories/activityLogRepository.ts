import { pool } from "../config/database";
import { ActivityAction } from "../types/activityLog";
import { ActivityLog } from "../types/activityLog";

export async function findByWorkspaceId(
  workspaceId: string
): Promise<ActivityLog[]> {
  const result = await pool.query(
    `
    SELECT
      id,
      workspace_id,
      action,
      created_at
    FROM activity_logs
    WHERE workspace_id = $1
    ORDER BY created_at DESC
    `,
    [workspaceId]
  );

  return result.rows;
}

export async function createActivityLog(
  id: string,
  workspaceId: string,
  action: ActivityAction
): Promise<void> {
  await pool.query(
    `
    INSERT INTO activity_logs
    (id, workspace_id, action)
    VALUES ($1, $2, $3)
    `,
    [id, workspaceId, action]
  );
}

