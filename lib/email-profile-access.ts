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

/** Resend: Testmodus erlaubt oft nur die Account-E-Mail; sonst Domain + Absender. */
function mapResendErrorToUserMessage(raw: string): string {
  const lower = raw.toLowerCase();
  if (
    lower.includes("only send testing") ||
    lower.includes("verify a domain") ||
    lower.includes("testing emails")
  ) {
    return [
      "Resend erlaubt im Testmodus oft nur Mails an die Adresse deines Resend-Kontos.",
      "Für beliebige Empfänger: Domain unter resend.com/domains verifizieren und in Vercel RESEND_FROM auf eine Adresse dieser Domain setzen (z. B. noreply@deine-domain.de).",
      `Technische Meldung: ${raw}`,
    ].join(" ");
  }
  return raw;
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
    const devHint =
      process.env.NODE_ENV === "development"
        ? " Lege im Projektroot `.env.local` an mit `ZD_RESEND_PROFILE_KEY=re_…` oder `RESEND_API_KEY=re_…` (siehe `.env.example`), dann `npm run dev` neu starten."
        : "";
    return {
      ok: false,
      message:
        "E-Mail-Versand ist nicht konfiguriert (ZD_RESEND_PROFILE_KEY oder RESEND_API_KEY)." +
        devHint +
        " Alternativ kannst du den Link oben kopieren.",
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
      const raw = result.error.message || "Versand fehlgeschlagen.";
      return {
        ok: false,
        message: mapResendErrorToUserMessage(raw),
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
