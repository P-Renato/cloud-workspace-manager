import { pool } from "../config/database";
import { Workspace } from "../types/workspace";

export async function createWorkspace(
  id: string,
  userId: string,
  name: string
): Promise<void> {
  await pool.query(
    `
    INSERT INTO workspaces
    (id, user_id, name)
    VALUES ($1, $2, $3)
    `,
    [id, userId, name]
  );
}

export async function findByUserId(
  userId: string
): Promise<Workspace[]> {
  const result = await pool.query(
    `
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
    `,
    [userId]
  );

  return result.rows;
}

export async function findById(
  id: string
): Promise<Workspace | null> {
  const result = await pool.query(
    `
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
    `,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function deleteWorkspace(
  id: string
): Promise<void> {
  await pool.query(
    `
    DELETE FROM workspaces
    WHERE id = $1
    `,
    [id]
  );
}