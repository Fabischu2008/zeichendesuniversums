import { NextResponse } from "next/server";
import {
  isValidProfileEmail,
  sendProfileAccessEmail,
} from "@/lib/email-profile-access";

export const runtime = "nodejs";

/**
 * Manueller Versand (Formular auf /success) – gleiche Logik wie serverseitiger Auto-Versand.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; profileUrl?: unknown }
    | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const profileUrl =
    typeof body?.profileUrl === "string" ? body.profileUrl.trim() : "";

  if (!email || !isValidProfileEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Bitte eine gültige E-Mail eingeben." },
      { status: 400 },
    );
  }

  if (!profileUrl || !profileUrl.startsWith("http")) {
    return NextResponse.json(
      { ok: false, message: "Ungültiger Profil-Link." },
      { status: 400 },
    );
  }

  const result = await sendProfileAccessEmail({ to: email, profileUrl });
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message });
  }

  return NextResponse.json({ ok: true, sent: true });
}
