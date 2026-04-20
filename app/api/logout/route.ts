import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/session-service";
import { buildSessionCookieOptions, sessionCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (token) {
    await deleteSession(token);
  }

  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set(sessionCookieName, "", {
    ...buildSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
