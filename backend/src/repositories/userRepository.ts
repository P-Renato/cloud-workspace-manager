import { pool } from "../config/database";

export async function findByEmail(email: string) {
  const result = await pool.query(
    `
    SELECT id,
           email,
           password_hash,
           created_at
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function createUser(
    id: string,
    email: string,
    passwordHash: string
) {
    await pool.query(
        `
        INSERT INTO users
        (id, email, password_hash)
        VALUES ($1, $2, $3)
        `,
        [id, email, passwordHash]
    );
}