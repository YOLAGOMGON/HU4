import { pool } from "@/lib/db";

export type SessionRecord = {
  id: string;
  user_id: string;
  expires_at: Date;
};

export async function createSession({
  id,
  userId,
  expiresAt,
}: {
  id: string;
  userId: string;
  expiresAt: Date;
}) {
  await pool.query(
    "insert into yolanda_gomez.sessions (id, user_id, expires_at) values ($1, $2, $3)",
    [id, userId, expiresAt]
  );
}

export async function findSession(id: string) {
  const result = await pool.query<SessionRecord>(
    "select id, user_id, expires_at from yolanda_gomez.sessions where id = $1",
    [id]
  );

  return result.rows[0] ?? null;
}

export async function deleteSession(id: string) {
  await pool.query("delete from yolanda_gomez.sessions where id = $1", [id]);
}
