import { cookies } from "next/headers";

const COOKIE_NAME = "studio_session";

function getExpectedSecret(): string {
  return process.env.STUDIO_SESSION_SECRET || "mahmud";
}

export function checkStudioPassword(password: string): boolean {
  return password.trim().toLowerCase() === getExpectedSecret().toLowerCase();
}

export async function isStudioAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === getExpectedSecret();
}

export async function setStudioSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, getExpectedSecret(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearStudioSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
