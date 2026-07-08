"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDatabaseConnection = testDatabaseConnection;
const database_1 = require("./database");
async function testDatabaseConnection() {
    try {
        const result = await database_1.pool.query("SELECT NOW()");
        console.log("✅ Database connected");
        console.log(result.rows[0]);
    }
    catch (error) {
        console.error("❌ Database connection failed");
        console.error(error);
    }
}
//# sourceMappingURL=testDatabase.js.map