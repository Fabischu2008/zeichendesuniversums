import { CANONICAL_SITE_ORIGIN } from "@/lib/brand";

/**
 * Kanonische Basis-URL der Site (OG, Sitemap, E-Mails).
 *
 * 1) `NEXT_PUBLIC_SITE_URL` / `SITE_URL` — manuell (z. B. Staging).
 * 2) Vercel **Production** ohne Env → `CANONICAL_SITE_ORIGIN` (zeichendesuniversums.com),
 *    damit geteilte Links genau diese Domain in `og:image` / `og:url` nutzen.
 * 3) Vercel **Preview** → `VERCEL_URL`.
 * 4) Lokal → localhost.
 */
export function getSiteUrl() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  if (process.env.VERCEL_ENV === "production") {
    return CANONICAL_SITE_ORIGIN;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").split("/")[0];
    return `https://${host}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
