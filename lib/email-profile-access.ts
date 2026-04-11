import { Resend } from "resend";
import { defaultResendFrom } from "@/lib/email-lead";
import { getResendApiKeyForProfileMail } from "@/lib/email-resend-env";

export function isValidProfileEmail(addr: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sendet den Profil-Zugangslink per Resend (gleicher Inhalt wie /api/email/profile-access).
 */
export async function sendProfileAccessEmail(params: {
  to: string;
  profileUrl: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const { to, profileUrl } = params;

  if (!to || !isValidProfileEmail(to)) {
    return { ok: false, message: "Bitte eine gültige E-Mail eingeben." };
  }

  if (!profileUrl.startsWith("http")) {
    return { ok: false, message: "Ungültiger Profil-Link." };
  }

  const apiKey = getResendApiKeyForProfileMail();
  const from = process.env.RESEND_FROM?.trim() || defaultResendFrom();

  if (!apiKey) {
    return {
      ok: false,
      message:
        "E-Mail-Versand ist nicht konfiguriert (ZD_RESEND_PROFILE_KEY oder RESEND_API_KEY). Speichere den Link lokal oder kopiere ihn.",
    };
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

  const hrefAttr = profileUrl.replace(/"/g, "&quot;");
  const html = `
    <p>Hallo,</p>
    <p>hier ist dein <strong>dauerhafter Link</strong> zum astrologischen Vollprofil:</p>
    <p><a href="${hrefAttr}">${escapeHtml(profileUrl)}</a></p>
    <p>Bitte speichere die E-Mail oder den Link – so kommst du jederzeit wieder auf deine Auswertung.</p>
  `;

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      html,
    });

    if (result.error) {
      return {
        ok: false,
        message: result.error.message || "Versand fehlgeschlagen.",
      };
    }

    return { ok: true };
  } catch (e) {
    console.error("[email-profile-access]", e);
    return {
      ok: false,
      message: "Versand fehlgeschlagen. Bitte später erneut versuchen.",
    };
  }
}
