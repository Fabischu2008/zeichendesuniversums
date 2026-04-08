import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Standard-Empfänger; per LEAD_TO_EMAIL in .env überschreiben. */
const DEFAULT_LEAD_TO_EMAIL = "fabianschuck13@gmail.com";

/**
 * Leads per E-Mail (Resend) – kein Datenbank-Setup.
 * 1) Account: https://resend.com → API Key
 * 2) .env: RESEND_API_KEY (Pflicht zum Senden)
 * 3) Optional: LEAD_TO_EMAIL – sonst DEFAULT_LEAD_TO_EMAIL
 * 4) Absender: bis Domain verifiziert ist „onboarding@resend.dev“ nutzen (oder RESEND_FROM setzen)
 */

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        email?: unknown;
        source?: unknown;
        phone?: unknown;
        first_name?: unknown;
        last_name?: unknown;
      }
    | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source =
    typeof body?.source === "string" ? body.source.trim().slice(0, 64) : "";
  const phoneRaw =
    typeof body?.phone === "string" ? body.phone.trim().slice(0, 32) : "";
  const firstName =
    typeof body?.first_name === "string"
      ? body.first_name.trim().slice(0, 80)
      : "";
  const lastName =
    typeof body?.last_name === "string"
      ? body.last_name.trim().slice(0, 80)
      : "";

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, message: "Bitte Vor- und Nachname eingeben." },
      { status: 400 },
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Bitte eine gültige E‑Mail eingeben." },
      { status: 400 },
    );
  }

  const resolvedSource = source || "freebie";
  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.LEAD_TO_EMAIL?.trim() || DEFAULT_LEAD_TO_EMAIL;
  const from =
    process.env.RESEND_FROM?.trim() || "Zeichen des Universums <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[email/subscribe] RESEND_API_KEY fehlt – Lead nicht gesendet.");
    return NextResponse.json({
      ok: true,
      source: resolvedSource,
      saved: false,
    });
  }

  const lines = [
    `Quelle: ${resolvedSource}`,
    `Name: ${firstName} ${lastName}`,
    `E-Mail: ${email}`,
    phoneRaw ? `Telefon: ${phoneRaw}` : null,
  ].filter(Boolean);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Freebie-Lead: ${firstName} ${lastName}`,
      text: lines.join("\n"),
    }),
  });

  const raw = await res.text();
  let parsed: { message?: string } = {};
  try {
    parsed = JSON.parse(raw) as { message?: string };
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    console.error("[email/subscribe] Resend:", res.status, raw);
    return NextResponse.json(
      {
        ok: false,
        message:
          parsed.message || "Benachrichtigung konnte nicht gesendet werden.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, source: resolvedSource, saved: true });
}
