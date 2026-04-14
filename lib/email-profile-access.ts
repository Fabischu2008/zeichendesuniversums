import { Resend } from "resend";
import { getResendApiKeyForProfileMail } from "@/lib/email-resend-env";
import { getResendFromForProfileMail } from "@/lib/email-resend-from";

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
      "Resend blockiert den Versand: meist falscher Absender (muss eine Adresse auf deiner bei Resend verifizierten Domain sein).",
      "In Vercel: RESEND_FROM=Zeichen des Universums <noreply@DEINE-DOMAIN> oder ZD_MAIL_DOMAIN=DEINE-DOMAIN setzen (Domain exakt wie in resend.com/domains), dann Redeploy.",
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
  const from = getResendFromForProfileMail();

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

/** Sendet den Zugangslink zur Paaranalyse (Vergleichsseite) per Resend. */
export async function sendCompatibilityAccessEmail(params: {
  to: string;
  compatibilityUrl: string;
  profileUrlA: string;
  profileUrlB: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const { to, compatibilityUrl, profileUrlA, profileUrlB } = params;
  if (!to || !isValidProfileEmail(to)) {
    return { ok: false, message: "Bitte eine gültige E-Mail eingeben." };
  }
  if (!compatibilityUrl.startsWith("http")) {
    return { ok: false, message: "Ungültiger Paaranalyse-Link." };
  }
  if (!profileUrlA.startsWith("http") || !profileUrlB.startsWith("http")) {
    return { ok: false, message: "Ungültige Profil-Links." };
  }

  const apiKey = getResendApiKeyForProfileMail();
  const from = getResendFromForProfileMail();
  if (!apiKey) {
    return {
      ok: false,
      message:
        "E-Mail-Versand ist nicht konfiguriert (RESEND_API_KEY). Alternativ Link kopieren.",
    };
  }

  const resend = new Resend(apiKey);
  const subject = "Dein Zugang zur exakten Paaranalyse";
  const text = [
    "Hallo,",
    "",
    "hier sind deine drei Zugangslinks:",
    "",
    "Paaranalyse-Link:",
    compatibilityUrl,
    "",
    "Profil-Link Person A:",
    profileUrlA,
    "",
    "Profil-Link Person B:",
    profileUrlB,
    "",
    "So nutzt du ihn:",
    "1) Paaranalyse-Link öffnen -> beide Profile + Vergleich direkt laden",
    "2) Profil-Link A/B nur bei Bedarf einzeln öffnen",
    "3) Du kannst diese Mail beliebig oft an weitere Adressen senden (z. B. Person A und B)",
    "",
    "Viele Grüße",
  ].join("\n");

  const hrefAttr = compatibilityUrl.replace(/"/g, "&quot;");
  const hrefA = profileUrlA.replace(/"/g, "&quot;");
  const hrefB = profileUrlB.replace(/"/g, "&quot;");
  const html = `
    <p>Hallo,</p>
    <p>hier sind deine <strong>drei Zugangslinks</strong>:</p>
    <p><strong>Paaranalyse-Link:</strong><br /><a href="${hrefAttr}">${escapeHtml(compatibilityUrl)}</a></p>
    <p><strong>Profil-Link Person A:</strong><br /><a href="${hrefA}">${escapeHtml(profileUrlA)}</a></p>
    <p><strong>Profil-Link Person B:</strong><br /><a href="${hrefB}">${escapeHtml(profileUrlB)}</a></p>
    <p><strong>So nutzt du sie:</strong></p>
    <ol>
      <li>Paaranalyse-Link öffnen - beide Profile und Vergleich werden direkt geladen</li>
      <li>Profil-Link A/B nur bei Bedarf einzeln öffnen</li>
      <li>Du kannst diese Mail beliebig oft an weitere Adressen senden (z. B. Person A und B)</li>
    </ol>
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
      return { ok: false, message: mapResendErrorToUserMessage(raw) };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email-compatibility-access]", e);
    return {
      ok: false,
      message: "Versand fehlgeschlagen. Bitte später erneut versuchen.",
    };
  }
}
