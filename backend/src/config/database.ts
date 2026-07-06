import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "cloud_workspace_manager",
  user: "cloudworkspace_app",
  password: "cloud-workspace123",
});