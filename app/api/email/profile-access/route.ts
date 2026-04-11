import { NextResponse } from "next/server";
import { Resend } from "resend";
import { defaultResendFrom } from "@/lib/email-lead";

export const runtime = "nodejs";

function isValidEmail(addr: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr);
}

/**
 * Sendet den Profil-Wiederherstellungslink an die Kundin / den Kunden.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; profileUrl?: unknown }
    | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const profileUrl =
    typeof body?.profileUrl === "string" ? body.profileUrl.trim() : "";

  if (!email || !isValidEmail(email)) {
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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim() || defaultResendFrom();

  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      message:
        "E-Mail-Versand ist nicht konfiguriert (RESEND_API_KEY). Speichere den Link lokal oder kopiere ihn.",
    });
  }

  const resend = new Resend(apiKey);

  const subject = "Dein Zugang zum astrologischen Vollprofil";
  const text = [
    "Hallo,",
    "",
    "hier ist dein dauerhafter Link zum Vollprofil (bitte aufbewahren):",
    "",
    profileUrl,
    "",
    "Der Link ist personalisiert – teile ihn nicht öffentlich.",
    "",
    "Viele Grüße",
  ].join("\n");

  const html = `
    <p>Hallo,</p>
    <p>hier ist dein <strong>dauerhafter Link</strong> zum astrologischen Vollprofil:</p>
    <p><a href="${profileUrl.replace(/"/g, "&quot;")}">${profileUrl.replace(/</g, "&lt;")}</a></p>
    <p>Bitte speichere die E-Mail oder den Link – so kommst du jederzeit wieder auf deine Auswertung.</p>
  `;

  try {
    const result = await resend.emails.send({
      from,
      to: [email],
      subject,
      text,
      html,
    });

    if (result.error) {
      return NextResponse.json({
        ok: false,
        message: result.error.message || "Versand fehlgeschlagen.",
      });
    }

    return NextResponse.json({ ok: true, sent: true });
  } catch (e) {
    console.error("[email/profile-access]", e);
    return NextResponse.json({
      ok: false,
      message: "Versand fehlgeschlagen. Bitte später erneut versuchen.",
    });
  }
}
