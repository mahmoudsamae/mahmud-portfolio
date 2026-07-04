import { NextResponse } from "next/server";
import { checkStudioPassword, setStudioSessionCookie } from "@/lib/studio-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkStudioPassword(password)) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }

  await setStudioSessionCookie();
  return NextResponse.json({ ok: true });
}
