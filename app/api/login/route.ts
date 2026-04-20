import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { findUserByEmail } from "@/lib/user-service";
import { createSession } from "@/lib/session-service";
import {
  buildSessionCookieOptions,
  sessionCookieName,
  sessionDurationMs,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const contrasena = String(formData.get("contrasena") ?? "");

    if (!email || !contrasena) {
      return NextResponse.redirect(new URL("/login?error=missing", request.url));
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.redirect(new URL("/login?error=invalid", request.url));
    }

    const isValid = await compare(contrasena, user.contrasena);
    if (!isValid) {
      return NextResponse.redirect(new URL("/login?error=invalid", request.url));
    }

    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + sessionDurationMs);
    await createSession({ id: sessionId, userId: user.id, expiresAt });

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set(sessionCookieName, sessionId, buildSessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Error al iniciar sesion", error);
    return NextResponse.redirect(new URL("/login?error=server", request.url));
  }
}
