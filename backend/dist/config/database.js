"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.testDatabaseConnection = testDatabaseConnection;
const pg_1 = require("pg");
const env_1 = require("./env");
async function testDatabaseConnection() {
    console.log("Entering testDatabaseConnection()");
    try {
        console.log("Before query");
        const result = await exports.pool.query("SELECT NOW()");
        console.log("After query");
        console.log(result.rows[0]);
        console.log("✅ Database connected");
    }
    catch (err) {
        console.log("Inside catch");
        console.error(err);
    }
    console.log("Leaving function");
}
console.log("Database configuration:");
console.log({
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    database: env_1.env.DB_NAME,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD ? "***loaded***" : "missing",
});
exports.pool = new pg_1.Pool({
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    database: env_1.env.DB_NAME,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    ssl: false,
    connectionTimeoutMillis: 5000,
});
//# sourceMappingURL=database.js.map