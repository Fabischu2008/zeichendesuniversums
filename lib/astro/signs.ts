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

