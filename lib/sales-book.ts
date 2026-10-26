import {
  checkoutHrefForProduct,
  PRICE_BOOK_BALANCE,
  PRICE_BOOK_BALANCE_CALL,
  PRODUCT_ID_BOOK_BALANCE,
  PRODUCT_ID_BOOK_BALANCE_CALL,
} from "@/lib/cms";
import {
  ZODIAC_SIGNS,
  ZODIAC_SYMBOLS,
  type ZodiacSign,
} from "@/lib/astro/signs";

export const BOOK_CHECKOUT_HREF = checkoutHrefForProduct(PRODUCT_ID_BOOK_BALANCE);
export const CALL_CHECKOUT_HREF = checkoutHrefForProduct(
  PRODUCT_ID_BOOK_BALANCE_CALL,
);

export const BOOK_PRICE = PRICE_BOOK_BALANCE;
export const CALL_PRICE = PRICE_BOOK_BALANCE_CALL;

export const SIGN_WINDOW: Record<ZodiacSign, string> = {
  Widder: "21.3. – 20.4.",
  Stier: "21.4. – 20.5.",
  Zwillinge: "21.5. – 21.6.",
  Krebs: "22.6. – 22.7.",
  Löwe: "23.7. – 23.8.",
  Jungfrau: "24.8. – 23.9.",
  Waage: "24.9. – 23.10.",
  Skorpion: "24.10. – 22.11.",
  Schütze: "23.11. – 21.12.",
  Steinbock: "22.12. – 20.1.",
  Wassermann: "21.1. – 19.2.",
  Fische: "20.2. – 20.3.",
};

export const SIGN_OPPOSITE: Record<ZodiacSign, ZodiacSign> = {
  Widder: "Waage",
  Stier: "Skorpion",
  Zwillinge: "Schütze",
  Krebs: "Steinbock",
  Löwe: "Wassermann",
  Jungfrau: "Fische",
  Waage: "Widder",
  Skorpion: "Stier",
  Schütze: "Zwillinge",
  Steinbock: "Krebs",
  Wassermann: "Löwe",
  Fische: "Jungfrau",
};

export const SALES_SIGNS = ZODIAC_SIGNS.map((sign) => ({
  sign,
  symbol: ZODIAC_SYMBOLS[sign],
  window: SIGN_WINDOW[sign],
  opposite: SIGN_OPPOSITE[sign],
}));

export const SALES_FAQS = [
  {
    question: "Brauche ich meine Geburtszeit?",
    answer:
      "Nein. Dein Geburtsdatum genügt. Wenn du die Uhrzeit kennst, kannst du zusätzlich mit Mondzeichen und Aszendent arbeiten.",
  },
  {
    question: "Ich kenne mich mit Astrologie kaum aus. Ist das für mich?",
    answer:
      "Ja. Alles wird von Grund auf erklärt. Die Sternzeichen sind ein symbolischer Spiegel – Vorwissen brauchst du nicht.",
  },
  {
    question: "Wie erhalte ich das Buch?",
    answer:
      "Digital, direkt nach dem Kauf. Du liest es auf jedem Gerät oder druckst es im A4-Format. Am Ende liegen vier helle Vorlagen, die Tinte sparen.",
  },
  {
    question: "Wie läuft der Perspektivenwechsel ab?",
    answer:
      "Nach dem Kauf wählst du einen Termin. 20 bis 30 Minuten, eine konkrete Situation, die dich gerade beschäftigt. Das Buch musst du vorher nicht gelesen haben.",
  },
  {
    question: "Wann fange ich am besten an?",
    answer:
      "Jederzeit. Wer früh startet, beginnt mit dem Übergang ab dem Neumond am 9. Dezember 2026 und setzt am 7. Januar 2027 die Jahresabsicht.",
  },
  {
    question: "Ersetzt das eine Therapie oder Beratung?",
    answer:
      "Nein. Buch und Call sind Reflexion und ersetzen keine medizinische oder psychotherapeutische Begleitung. In einer akuten Krise wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.",
  },
] as const;
