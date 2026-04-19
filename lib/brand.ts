/** Zentrale Marketing-/Brand-Werte (Site, E-Mail, OG). */
export const SITE_NAME = "Zeichen des Universums";

/** Öffentliche Live-Domain (https, ohne Slash). Für OG/WhatsApp, wenn keine SITE_URL-Env gesetzt ist. */
export const CANONICAL_SITE_ORIGIN = "https://zeichendesuniversums.com";

export const SITE_DESCRIPTION =
  "Zeichen des Universums: praktische Astrologie und Bewusstsein – Sternzeichen, Geburtshoroskop, Kompatibilität und Human Design. Kostenloser Guide und klare Tools ohne esoterisches Geschwurbel.";

/** Meta-Keywords (Startseiten-Defaults); unterseiten können ergänzen. */
export const SITE_SEO_KEYWORDS = [
  "Zeichen des Universums",
  "zeichendesuniversums",
  "Astrologie",
  "Bewusstsein",
  "persönliche Entwicklung",
  "Sternzeichen",
  "Geburtshoroskop",
  "Big Three",
  "Aszendent",
  "Synastrie",
  "Kompatibilität Beziehung",
  "Human Design",
  "Astro Karte",
] as const;

/** schema.org `sameAs` – gleiche Handles wie auf /links (für Google Knowledge Panel). */
export const SITE_SAME_AS = [
  "https://www.instagram.com/zeichen.des.universums",
  "https://www.youtube.com/@Zeichen.des.Universums",
  "https://www.tiktok.com/@zeichen.des.unive",
] as const;

export const SITE_TAGLINE = "Astrology, aber praktisch.";

export const THEME_COLOR = "#7c3aed";

/** Link-Vorschau (WhatsApp, Telegram, Social): Datei unter `public/`. */
export const SOCIAL_PREVIEW_IMAGE = "/auge.jpg";
export const SOCIAL_PREVIEW_IMAGE_SIZE = { width: 1024, height: 1024 } as const;

/** Anzeigename für Resend `from`, falls kein RESEND_FROM gesetzt ist. */
export const EMAIL_FROM_DISPLAY = "Zeichen des Universums";

/** Cache-Buster für Favicon-URLs (`favicon.svg` + `favicon.jpg`); bei neuem Favicon hochzählen. */
export const FAVICON_QUERY = "v=20260410-4";
