import { EMAIL_FROM_DISPLAY } from "@/lib/brand";
import { defaultResendFrom } from "@/lib/email-lead";
import { getSiteUrl } from "@/lib/site";

function isLocalOrPreviewHost(host: string): boolean {
  return (
    !host ||
    host === "localhost" ||
    host.endsWith(".vercel.app") ||
    host.endsWith(".now.sh")
  );
}

/**
 * Absender für Profil-Mails.
 * - `RESEND_FROM` hat Vorrang.
 * - `ZD_MAIL_DOMAIN` (nur Hostname, z. B. zeichendesuniversums.com): feste Domain, falls
 *   Site-URL und bei Resend verifizierte Domain nicht zusammenpassen (.com vs .info o. Ä.).
 * - Sonst: `noreply@` + Hostname aus `getSiteUrl()` (ohne www), außer localhost / Preview.
 *   Die Domain muss bei Resend unter demselben Account wie der API-Key verifiziert sein.
 */
export function getResendFromForProfileMail(): string {
  const explicit = process.env.RESEND_FROM?.trim();
  if (explicit) return explicit;

  const domainOverride = process.env.ZD_MAIL_DOMAIN?.trim();
  if (domainOverride) {
    const clean = domainOverride.replace(/^https?:\/\//, "").split("/")[0];
    return `${EMAIL_FROM_DISPLAY} <noreply@${clean}>`;
  }

  try {
    const host = new URL(getSiteUrl()).hostname;
    if (isLocalOrPreviewHost(host)) {
      return defaultResendFrom();
    }
    const fromDomain = host.startsWith("www.") ? host.slice(4) : host;
    return `${EMAIL_FROM_DISPLAY} <noreply@${fromDomain}>`;
  } catch {
    return defaultResendFrom();
  }
}
