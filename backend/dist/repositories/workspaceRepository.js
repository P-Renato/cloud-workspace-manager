"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspace = createWorkspace;
exports.findByUserId = findByUserId;
exports.findById = findById;
exports.deleteWorkspace = deleteWorkspace;
const database_1 = require("../config/database");
async function createWorkspace(id, userId, name) {
    await database_1.pool.query(`
    INSERT INTO workspaces
    (id, user_id, name)
    VALUES ($1, $2, $3)
    `, [id, userId, name]);
}
async function findByUserId(userId) {
    const result = await database_1.pool.query(`
    SELECT
      id,
      user_id,
      name,
      status,
      container_id,
      created_at,
      updated_at
    FROM workspaces
    WHERE user_id = $1
    ORDER BY created_at DESC
    `, [userId]);
    return result.rows;
}
async function findById(id) {
    const result = await database_1.pool.query(`
    SELECT
      id,
      user_id,
      name,
      status,
      container_id,
      created_at,
      updated_at
    FROM workspaces
    WHERE id = $1
    `, [id]);
    return result.rows[0] ?? null;
}
async function deleteWorkspace(id) {
    await database_1.pool.query(`
    DELETE FROM workspaces
    WHERE id = $1
    `, [id]);
}
//# sourceMappingURL=workspaceRepository.js.map