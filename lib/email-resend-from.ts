import { CANONICAL_SITE_ORIGIN, EMAIL_FROM_DISPLAY } from "@/lib/brand";
import { defaultResendFrom } from "@/lib/email-lead";
import { getSiteUrl } from "@/lib/site";

function normalizeResendFromEnv(raw: string | undefined): string {
  let s = raw?.trim() ?? "";
  if (!s) return "";
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function noreplyFromCanonicalHost(): string {
  const host = new URL(CANONICAL_SITE_ORIGIN).hostname;
  return `${EMAIL_FROM_DISPLAY} <noreply@${host}>`;
}

function isLocalOrPreviewHost(host: string): boolean {
  return (
    !host ||
    host === "localhost" ||
    host.endsWith(".vercel.app") ||
    host.endsWith(".now.sh")
  );
}

/**
 * Absender für Profil-Mails und Lead-Mail (`/api/email/subscribe`).
 * - `RESEND_FROM` hat Vorrang (nach Normalisierung; Anführungszeichen werden entfernt).
 * - In Vercel **Production** wird ein expliziter Absender mit `onboarding@resend.dev`
 *   ignoriert, damit der automatische `noreply@…`-Absender greifen kann.
 * - `ZD_MAIL_DOMAIN` (nur Hostname): feste Domain, falls Site-URL und Resend-Domain divergieren.
 * - Sonst: `noreply@` + Hostname aus `getSiteUrl()`; localhost / Preview → Sandbox-Absender,
 *   außer Production mit kaputter Site-URL → Fallback auf kanonische Domain.
 *   Domain und API-Key müssen zum selben Resend-Account passen.
 */
export function getResendFromForProfileMail(): string {
  let explicit = normalizeResendFromEnv(process.env.RESEND_FROM);
  if (
    explicit &&
    process.env.VERCEL_ENV === "production" &&
    explicit.toLowerCase().includes("onboarding@resend.dev")
  ) {
    console.warn(
      "[email] RESEND_FROM enthält onboarding@resend.dev – in Production ignoriert; nutze noreply@ deiner verifizierten Domain.",
    );
    explicit = "";
  }
  if (explicit) return explicit;

  const domainOverride = process.env.ZD_MAIL_DOMAIN?.trim();
  if (domainOverride) {
    const clean = domainOverride.replace(/^https?:\/\//, "").split("/")[0];
    return `${EMAIL_FROM_DISPLAY} <noreply@${clean}>`;
  }

  try {
    const host = new URL(getSiteUrl()).hostname;
    if (isLocalOrPreviewHost(host)) {
      if (process.env.VERCEL_ENV === "production") {
        return noreplyFromCanonicalHost();
      }
      return defaultResendFrom();
    }
    const fromDomain = host.startsWith("www.") ? host.slice(4) : host;
    return `${EMAIL_FROM_DISPLAY} <noreply@${fromDomain}>`;
  } catch {
    if (process.env.VERCEL_ENV === "production") {
      return noreplyFromCanonicalHost();
    }
    return defaultResendFrom();
  }
}
