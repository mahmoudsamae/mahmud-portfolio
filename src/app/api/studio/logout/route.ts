import { NextResponse } from "next/server";
import { clearStudioSessionCookie } from "@/lib/studio-auth";

export async function POST() {
  await clearStudioSessionCookie();
  return NextResponse.json({ ok: true });
}
