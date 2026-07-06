import fs from "fs";
import path from "path";
import { pool } from "../src/config/database";

async function migrate() {
  const migrationsPath = path.join(__dirname, "migrations");

  const files = fs
    .readdirSync(migrationsPath)
    .filter(file => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    console.log(`Running ${file}`);

    const sql = fs.readFileSync(
      path.join(migrationsPath, file),
      "utf8"
    );

    await pool.query(sql);
  }

  console.log("All migrations completed.");

  process.exit();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});