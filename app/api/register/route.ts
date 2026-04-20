import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createUser, findUserByEmail } from "@/lib/user-service";
import { buildSessionCookieOptions, sessionCookieName, sessionDurationMs } from "@/lib/auth";
import { createSession } from "@/lib/session-service";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const contrasena = String(formData.get("contrasena") ?? "");
    if (!name || !email || !contrasena) {
      return NextResponse.redirect(new URL("/register?error=missing", request.url));
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.redirect(new URL("/register?error=exists", request.url));
    }

    const userId = crypto.randomUUID();
    const contrasenaHash = await hash(contrasena, 10);
    await createUser({ id: userId, name, email, contrasenaHash });

    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + sessionDurationMs);
    await createSession({ id: sessionId, userId, expiresAt });

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set(sessionCookieName, sessionId, buildSessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Error al registrar usuario", error);
    return NextResponse.redirect(new URL("/register?error=server", request.url));
  }
}
