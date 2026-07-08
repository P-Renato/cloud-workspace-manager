"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByEmail = findByEmail;
exports.createUser = createUser;
const database_1 = require("../config/database");
async function findByEmail(email) {
    const result = await database_1.pool.query(`
    SELECT id,
           email,
           password_hash,
           created_at
    FROM users
    WHERE email = $1
    `, [email]);
    return result.rows[0] ?? null;
}
async function createUser(id, email, passwordHash) {
    await database_1.pool.query(`
        INSERT INTO users
        (id, email, password_hash)
        VALUES ($1, $2, $3)
        `, [id, email, passwordHash]);
}
//# sourceMappingURL=userRepository.js.map