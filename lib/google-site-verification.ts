/**
 * Next.js `metadata.verification.google` erwartet nur den Token (Inhalt des
 * Meta-Tags). Nutzer tragen manchmal fälschlich den kompletten String
 * `google-site-verification=…` ein – den stutzen wir.
 *
 * Hinweis: Die **Domain-Property** in der Search Console wird per **DNS-TXT**
 * beim Domain-Anbieter bestätigt, nicht über diese Variable.
 */
export function normalizeGoogleSiteVerificationToken(raw: string): string {
  const t = raw.trim();
  const prefix = "google-site-verification=";
  if (t.toLowerCase().startsWith(prefix)) {
    return t.slice(prefix.length).trim();
  }
  return t;
}
