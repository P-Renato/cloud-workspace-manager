import { pool } from "../config/database";
import { WorkspaceStatus } from "../types/workspace";
import { Workspace } from "../types/workspace";

export async function createWorkspace(
  id: string,
  userId: string,
  name: string,
  templateId: string,
  image: string
): Promise<void> {
  await pool.query(
    `
    INSERT INTO workspaces
    (
      id,
      user_id,
      name,
      template_id,
      image
    )
    VALUES ($1,$2,$3,$4,$5)
    `,
    [
      id,
      userId,
      name,
      templateId,
      image
    ]
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
      template_id,
      image,
      status,
      container_id
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
      template_id,
      image,
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

export async function updateWorkspaceStatus(
  workspaceId: string,
  status: WorkspaceStatus
): Promise<void> {
  await pool.query(
    `
    UPDATE workspaces
    SET status = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    `,
    [status, workspaceId]
  );
}
export async function updateContainerId(
  workspaceId: string,
  containerId: string | null
): Promise<void> {
  await pool.query(
    `
    UPDATE workspaces
    SET container_id = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    `,
    [containerId, workspaceId]
  );
}

export async function findByContainerId(
  containerId: string
): Promise<Workspace | null> {
  const result = await pool.query(
    `
    SELECT
      id,
      user_id,
      name,
      template_id,
      image,
      status,
      container_id,
      created_at,
      updated_at
    FROM workspaces
    WHERE container_id = $1
    `,
    [containerId]
  );

  return result.rows[0] ?? null;
}