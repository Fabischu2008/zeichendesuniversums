import { NextResponse } from "next/server";
import {
  isValidProfileEmail,
  sendCompatibilityAccessEmail,
} from "@/lib/email-profile-access";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        email?: unknown;
        compatibilityUrl?: unknown;
        profileUrlA?: unknown;
        profileUrlB?: unknown;
      }
    | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const compatibilityUrl =
    typeof body?.compatibilityUrl === "string" ? body.compatibilityUrl.trim() : "";
  const profileUrlA =
    typeof body?.profileUrlA === "string" ? body.profileUrlA.trim() : "";
  const profileUrlB =
    typeof body?.profileUrlB === "string" ? body.profileUrlB.trim() : "";

  if (!email || !isValidProfileEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Bitte eine gültige E-Mail eingeben." },
      { status: 400 },
    );
  }
  if (!compatibilityUrl || !compatibilityUrl.startsWith("http")) {
    return NextResponse.json(
      { ok: false, message: "Ungültiger Paaranalyse-Link." },
      { status: 400 },
    );
  }
  if (!profileUrlA || !profileUrlA.startsWith("http")) {
    return NextResponse.json(
      { ok: false, message: "Ungültiger Profil-Link A." },
      { status: 400 },
    );
  }
  if (!profileUrlB || !profileUrlB.startsWith("http")) {
    return NextResponse.json(
      { ok: false, message: "Ungültiger Profil-Link B." },
      { status: 400 },
    );
  }

  const result = await sendCompatibilityAccessEmail({
    to: email,
    compatibilityUrl,
    profileUrlA,
    profileUrlB,
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message });
  }
  return NextResponse.json({ ok: true, sent: true });
}
