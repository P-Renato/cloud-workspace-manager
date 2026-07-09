"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivityLog = createActivityLog;
const database_1 = require("../config/database");
async function createActivityLog(id, workspaceId, action) {
    await database_1.pool.query(`
    INSERT INTO activity_logs
    (id, workspace_id, action)
    VALUES ($1, $2, $3)
    `, [id, workspaceId, action]);
}
//# sourceMappingURL=activityLogRepository.js.map