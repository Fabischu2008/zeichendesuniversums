import { NextResponse } from "next/server";
import { verifyProfileAccessToken } from "@/lib/profile-access-token";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { token?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token.trim() : "";

  if (!token || !verifyProfileAccessToken(token)) {
    return NextResponse.json(
      { ok: false, message: "Ungültiger oder abgelaufener Link." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
