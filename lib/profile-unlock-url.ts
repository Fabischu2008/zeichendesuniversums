/**
 * Profil-Zugangslinks: Standard ist ?unlock=…; zusätzlich zd-u= im Hash,
 * falls Mail-Apps oder Shortener den Query-String abschneiden.
 */
export function buildProfileAccessWithUnlockUrl(
  siteOrigin: string,
  token: string,
): string {
  const base = siteOrigin.replace(/\/+$/, "");
  const enc = encodeURIComponent(token);
  return `${base}/tools/birth-chart/profile?unlock=${enc}#vollreport&zd-u=${enc}`;
}

/**
 * Liest den Freischalt-Token aus ?unlock= oder aus dem Hash (#…&zd-u=…).
 */
export function readUnlockTokenFromBrowser(): string | null {
  if (typeof window === "undefined") return null;
  const fromQuery = new URLSearchParams(window.location.search)
    .get("unlock")
    ?.trim();
  if (fromQuery) return fromQuery;

  const hash = window.location.hash.replace(/^#/, "");
  if (!hash || !hash.includes("zd-u=")) return null;
  const idx = hash.indexOf("zd-u=");
  if (idx === -1) return null;
  const qs = hash.slice(idx);
  try {
    return new URLSearchParams(qs).get("zd-u")?.trim() || null;
  } catch {
    return null;
  }
}
