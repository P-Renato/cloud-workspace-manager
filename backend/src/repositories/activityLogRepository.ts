import { pool } from "../config/database";
import { ActivityAction } from "../types/activityLog";

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