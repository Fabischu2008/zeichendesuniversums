import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Bitte eine gültige E‑Mail eingeben." },
      { status: 400 },
    );
  }

  // MVP Stub: hier würdest du ConvertKit/Mailchimp integrieren.
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({ ok: true });
}

