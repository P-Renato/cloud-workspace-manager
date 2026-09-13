import { Pool } from "pg";
import { env } from "./env";

export async function testDatabaseConnection() {
  console.log("Entering testDatabaseConnection()");

  try {
    console.log("Before query");

    const result = await pool.query("SELECT NOW()");

    console.log("After query");
    console.log(result.rows[0]);

    console.log("✅ Database connected");
  } catch (err) {
    console.log("Inside catch");
    console.error(err);
  }

  console.log("Leaving function");
}

console.log("Database configuration:");
console.log({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD ? "***loaded***" : "missing",
});

export const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,

  ssl: false,

  connectionTimeoutMillis: 5000,
});