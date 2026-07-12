import fs from "fs";
import path from "path";
import { pool } from "../src/config/database";

async function migrate() {
   await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  const migrationsPath = path.join(__dirname, "migrations");

  const files = fs
    .readdirSync(migrationsPath)
    .filter(file => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const alreadyApplied = await pool.query(
      `
      SELECT version
      FROM schema_migrations
      WHERE version = $1
      `,
      [file]
    );

    if (alreadyApplied.rowCount) {
      console.log(`Skipping ${file}`);
      continue;
    }

    console.log(`Running ${file}`);

    const sql = fs.readFileSync(
      path.join(migrationsPath, file),
      "utf8"
    );

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      await client.query(sql);

      await client.query(
        `
        INSERT INTO schema_migrations (version)
        VALUES ($1)
        `,
        [file]
      );

      await client.query("COMMIT");

      console.log(`Applied ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  console.log("All migrations completed.");

  await pool.end();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});