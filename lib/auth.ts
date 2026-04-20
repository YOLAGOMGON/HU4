import { cookies } from "next/headers";
import { findSession } from "@/lib/session-service";
import { findUserById } from "@/lib/user-service";

export const sessionCookieName = "session_token";
export const sessionDurationMs = 1000 * 60 * 60 * 24 * 7;

export function buildSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionDurationMs / 1000,
  };
}

export async function getSessionUser() {
  const cookieStore = cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  const session = await findSession(token);

  if (!session) {
    return null;
  }

  if (session.expires_at.getTime() < Date.now()) {
    return null;
  }

  return await findUserById(session.user_id);
}
