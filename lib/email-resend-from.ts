import { CANONICAL_SITE_ORIGIN, EMAIL_FROM_DISPLAY } from "@/lib/brand";
import { defaultResendFrom } from "@/lib/email-lead";
import { getSiteUrl } from "@/lib/site";

function isApprovedMailHost(host: string): boolean {
  const canonical = new URL(CANONICAL_SITE_ORIGIN).hostname;
  return host === canonical || host.endsWith(`.${canonical}`);
}

/**
 * Absender für Profil-Mails.
 * - `RESEND_FROM` in Vercel hat Vorrang (empfohlen).
 * - Sonst: `noreply@…` auf der Live-Domain, damit Resend nicht im „nur Test-E-Mail“-Modus
 *   mit `onboarding@resend.dev` bleibt (Domain muss bei Resend verifiziert sein).
 * - Preview (`*.vercel.app`) / localhost: Fallback wie bisher.
 */
export function getResendFromForProfileMail(): string {
  const explicit = process.env.RESEND_FROM?.trim();
  if (explicit) return explicit;

  try {
    const host = new URL(getSiteUrl()).hostname;
    if (host && isApprovedMailHost(host)) {
      const fromDomain = host.startsWith("www.") ? host.slice(4) : host;
      return `${EMAIL_FROM_DISPLAY} <noreply@${fromDomain}>`;
    }
  } catch {
    /* */
  }

  return defaultResendFrom();
}
