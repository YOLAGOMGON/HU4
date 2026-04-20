import { pool } from "@/lib/db";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  contrasena: string;
};

export async function findUserByEmail(email: string) {
  const result = await pool.query<UserRecord>(
    "select id, name, email, contrasena from yolanda_gomez.users where email = $1",
    [email]
  );

  return result.rows[0] ?? null;
}

export async function findUserById(id: string) {
  const result = await pool.query<UserRecord>(
    "select id, name, email, contrasena from yolanda_gomez.users where id = $1",
    [id]
  );

  return result.rows[0] ?? null;
}

export async function createUser({
  id,
  name,
  email,
  contrasenaHash,
}: {
  id: string;
  name: string;
  email: string;
  contrasenaHash: string;
}) {
  await pool.query(
    "insert into yolanda_gomez.users (id, name, email, contrasena) values ($1, $2, $3, $4)",
    [id, name, email, contrasenaHash]
  );
}
