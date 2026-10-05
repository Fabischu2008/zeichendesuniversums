/** Deutsches Langdatum für Artikel ("12. Mai 2026"). Erwartet ISO `YYYY-MM-DD`. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
