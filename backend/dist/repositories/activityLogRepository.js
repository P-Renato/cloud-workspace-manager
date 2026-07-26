"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByWorkspaceId = findByWorkspaceId;
exports.createActivityLog = createActivityLog;
const database_1 = require("../config/database");
async function findByWorkspaceId(workspaceId) {
    const result = await database_1.pool.query(`
    SELECT
      id,
      workspace_id,
      action,
      created_at
    FROM activity_logs
    WHERE workspace_id = $1
    ORDER BY created_at DESC
    `, [workspaceId]);
    return result.rows;
}
async function createActivityLog(id, workspaceId, action) {
    await database_1.pool.query(`
    INSERT INTO activity_logs
    (id, workspace_id, action)
    VALUES ($1, $2, $3)
    `, [id, workspaceId, action]);
}
//# sourceMappingURL=activityLogRepository.js.map