/**
 * Anbieter- und Pflichtangaben für Impressum, Datenschutz, AGB, Widerruf.
 * USt-ID: nach Erhalt hier und im Impressum ergänzen (Feld unten).
 */
export const LEGAL_STAND = "27. April 2026";

export const LEGAL_PROVIDER = {
  name: "Dominik Grad de Oliveira",
  street: "Steinstraße 34",
  zipCity: "67657 Kaiserslautern",
  country: "Deutschland",
  email: "zeichendesuniversums.info@gmail.com",
} as const;

/** Optional: z. B. "+49 …" — leer lassen, wenn kein Telefon im Impressum erscheinen soll. */
export const LEGAL_PHONE: string | null = null;

/**
 * Umsatzsteuer-ID nach § 27 a UStG — sobald vorliegend, Wert setzen und im Impressum anzeigen.
 * Beispiel: "DE123456789"
 */
export const LEGAL_UST_ID: string | null = null;
