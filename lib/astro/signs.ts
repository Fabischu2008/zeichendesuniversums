export const ZODIAC_SIGNS = [
  "Widder",
  "Stier",
  "Zwillinge",
  "Krebs",
  "Löwe",
  "Jungfrau",
  "Waage",
  "Skorpion",
  "Schütze",
  "Steinbock",
  "Wassermann",
  "Fische",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Widder: "♈",
  Stier: "♉",
  Zwillinge: "♊",
  Krebs: "♋",
  Löwe: "♌",
  Jungfrau: "♍",
  Waage: "♎",
  Skorpion: "♏",
  Schütze: "♐",
  Steinbock: "♑",
  Wassermann: "♒",
  Fische: "♓",
};

/** Pfade zu SVGs unter `public/Symbole/` (Dateinamen ≠ immer Sternzeichen-Label). */
export const ZODIAC_PUBLIC_SVG: Record<ZodiacSign, string> = {
  Widder: "/Symbole/widder.svg",
  Stier: "/Symbole/stier.svg",
  Zwillinge: "/Symbole/zwilling.svg",
  Krebs: "/Symbole/krebs.svg",
  Löwe: "/Symbole/löwe.svg",
  Jungfrau: "/Symbole/jungfrau.svg",
  Waage: "/Symbole/waage.svg",
  Skorpion: "/Symbole/skorpio.svg",
  Schütze: "/Symbole/schuetze.svg",
  Steinbock: "/Symbole/steinbock.svg",
  Wassermann: "/Symbole/wassermann.svg",
  Fische: "/Symbole/fische.svg",
};

export function isZodiacSign(value: string): value is ZodiacSign {
  return (ZODIAC_SIGNS as readonly string[]).includes(value);
}

export function publicZodiacSvgPath(sign: ZodiacSign): string {
  return ZODIAC_PUBLIC_SVG[sign];
}

export function normalizeDegrees(deg: number) {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

export function signFromEclipticLongitude(deg: number): ZodiacSign {
  const lon = normalizeDegrees(deg);
  const idx = Math.floor(lon / 30) % 12;
  return ZODIAC_SIGNS[idx]!;
}

export function symbolFromSign(sign: ZodiacSign) {
  return ZODIAC_SYMBOLS[sign];
}

