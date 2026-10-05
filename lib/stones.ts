export type StoneIntent =
  | "schutz"
  | "liebe"
  | "klarheit"
  | "energie"
  | "ruhe"
  | "manifestation";

export type StoneMood =
  | "ueberreizt"
  | "leer"
  | "blockiert"
  | "offen"
  | "unsicher";

export type StoneLifeArea =
  | "beziehung"
  | "arbeit"
  | "schlaf"
  | "abgrenzung"
  | "kreativitaet"
  | "allgemein";

export type StoneEnergy = "sanft" | "kraftvoll";

export type Stone = {
  id: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  intents: StoneIntent[];
  moods: StoneMood[];
  lifeAreas: StoneLifeArea[];
  energy: StoneEnergy;
  chakras: string[];
  zodiac: string[];
  hardness: string;
  shortEffect: string;
  howToUse: string;
  forWhom: string;
};

export type StoneQuizAnswers = {
  intent: StoneIntent;
  mood: StoneMood;
  lifeArea: StoneLifeArea;
  energy: StoneEnergy | "egal";
  zodiac?: string;
};

export const STONE_INTENTS: Array<{
  value: StoneIntent;
  label: string;
  hint: string;
}> = [
  { value: "schutz", label: "Schutz", hint: "Abgrenzung, Stabilität" },
  { value: "liebe", label: "Liebe", hint: "Herz, Beziehungen" },
  { value: "klarheit", label: "Klarheit", hint: "Fokus, Entscheidungen" },
  { value: "energie", label: "Energie", hint: "Antrieb, Mut" },
  { value: "ruhe", label: "Ruhe", hint: "Schlaf, Nervensystem" },
  {
    value: "manifestation",
    label: "Manifestation",
    hint: "Ziele, Umsetzung",
  },
];

export const STONE_MOODS: Array<{
  value: StoneMood;
  label: string;
  hint: string;
}> = [
  { value: "ueberreizt", label: "Überreizt", hint: "Zu viel Input, zu wenig Pause" },
  { value: "leer", label: "Leer / erschöpft", hint: "Wenig Kraft im Tank" },
  { value: "blockiert", label: "Blockiert", hint: "Festgefahren, kein Vorwärts" },
  { value: "offen", label: "Offen & neugierig", hint: "Bereit für Neues" },
  { value: "unsicher", label: "Unsicher", hint: "Zweifel, Orientierung fehlt" },
];

export const STONE_LIFE_AREAS: Array<{
  value: StoneLifeArea;
  label: string;
  hint: string;
}> = [
  { value: "beziehung", label: "Beziehung / Herz", hint: "Nähe, Selbstliebe, Kommunikation" },
  { value: "arbeit", label: "Arbeit / Fokus", hint: "Klarheit, Durchhalten, Entscheidungen" },
  { value: "schlaf", label: "Schlaf / Erholung", hint: "Runterkommen, Nachtruhe" },
  { value: "abgrenzung", label: "Abgrenzung", hint: "Schutz vor Überforderung" },
  { value: "kreativitaet", label: "Kreativität", hint: "Ideen, Ausdruck, Flow" },
  { value: "allgemein", label: "Allgemein", hint: "Alltag, Begleitung, Balance" },
];

/**
 * Lokale kuratierte Steine-Datenbank für Shop + Stone Finder.
 */
const stones: Stone[] = [
  {
    id: "stone_amethyst",
    slug: "stein-amethyst",
    name: "Amethyst",
    price: 24,
    stock: 18,
    image: "/images/stones/amethyst.svg",
    intents: ["ruhe", "klarheit", "schutz"],
    moods: ["ueberreizt", "unsicher"],
    lifeAreas: ["schlaf", "arbeit", "allgemein"],
    energy: "sanft",
    chakras: ["Kronen", "Drittes Auge"],
    zodiac: ["Fische", "Wassermann", "Schütze"],
    hardness: "7",
    shortEffect:
      "Beruhigt den Geist, unterstützt klaren Schlaf und sanfte innere Ordnung.",
    howToUse:
      "Nachts neben dem Bett oder tagsüber bei Meditation in der Hand halten.",
    forWhom: "Wenn du überreizt bist und wieder runterkommen willst.",
  },
  {
    id: "stone_rose_quartz",
    slug: "stein-rosenquarz",
    name: "Rosenquarz",
    price: 22,
    stock: 22,
    image: "/images/stones/rose-quartz.svg",
    intents: ["liebe", "ruhe"],
    moods: ["leer", "unsicher", "offen"],
    lifeAreas: ["beziehung", "allgemein"],
    energy: "sanft",
    chakras: ["Herz"],
    zodiac: ["Stier", "Krebs", "Waage"],
    hardness: "7",
    shortEffect:
      "Öffnet sanft das Herz – Selbstliebe, Nähe und weichere Kommunikation.",
    howToUse: "Am Körper tragen oder im Wohnraum sichtbar ablegen.",
    forWhom: "Wenn Beziehungen oder Selbstwert gerade wehtun.",
  },
  {
    id: "stone_clear_quartz",
    slug: "stein-bergkristall",
    name: "Bergkristall",
    price: 19,
    stock: 25,
    image: "/images/stones/clear-quartz.svg",
    intents: ["klarheit", "energie", "manifestation"],
    moods: ["blockiert", "offen", "unsicher"],
    lifeAreas: ["arbeit", "kreativitaet", "allgemein"],
    energy: "sanft",
    chakras: ["Kronen", "Alle"],
    zodiac: ["Widder", "Löwe", "Zwillinge"],
    hardness: "7",
    shortEffect:
      "Verstärker und Klarheitsstein – sortiert Gedanken und fokussiert Absichten.",
    howToUse: "Bei Entscheidungen in der Hand halten oder am Schreibtisch platzieren.",
    forWhom: "Wenn du Überblick und klare Prioritäten brauchst.",
  },
  {
    id: "stone_obsidian",
    slug: "stein-obsidian",
    name: "Obsidian",
    price: 26,
    stock: 14,
    image: "/images/stones/obsidian.svg",
    intents: ["schutz", "klarheit"],
    moods: ["ueberreizt", "unsicher", "blockiert"],
    lifeAreas: ["abgrenzung", "arbeit"],
    energy: "kraftvoll",
    chakras: ["Wurzel"],
    zodiac: ["Skorpion", "Steinbock", "Schütze"],
    hardness: "5–5.5",
    shortEffect:
      "Erdung und Schutz – hilft, Unnötiges abzuschneiden und klar zu bleiben.",
    howToUse: "In der Tasche tragen oder beim Reflexionstagebuch daneben legen.",
    forWhom: "Wenn du Grenzen brauchst und emotionale Klarheit willst.",
  },
  {
    id: "stone_citrine",
    slug: "stein-citrin",
    name: "Citrin",
    price: 28,
    stock: 12,
    image: "/images/stones/citrine.svg",
    intents: ["manifestation", "energie", "klarheit"],
    moods: ["leer", "blockiert", "offen"],
    lifeAreas: ["arbeit", "kreativitaet", "allgemein"],
    energy: "kraftvoll",
    chakras: ["Solarplexus"],
    zodiac: ["Löwe", "Zwillinge", "Waage"],
    hardness: "7",
    shortEffect:
      "Sonnige Energie für Selbstvertrauen, Fokus und sichtbare Umsetzung.",
    howToUse: "Morgens tragen oder am Arbeitsplatz als Fokus-Anker.",
    forWhom: "Wenn du Ziele angehen und Selbstzweifel leiser machen willst.",
  },
  {
    id: "stone_tigers_eye",
    slug: "stein-tigerauge",
    name: "Tigerauge",
    price: 21,
    stock: 16,
    image: "/images/stones/tigers-eye.svg",
    intents: ["schutz", "energie", "klarheit"],
    moods: ["unsicher", "blockiert", "leer"],
    lifeAreas: ["arbeit", "abgrenzung", "allgemein"],
    energy: "kraftvoll",
    chakras: ["Solarplexus", "Wurzel"],
    zodiac: ["Löwe", "Widder", "Steinbock"],
    hardness: "6.5–7",
    shortEffect:
      "Mut und Bodenhaftung – stärkt Entschlossenheit ohne Hektik.",
    howToUse: "Bei wichtigen Gesprächen oder Entscheidungen am Körper tragen.",
    forWhom: "Wenn du standfester und mutiger auftreten willst.",
  },
  {
    id: "stone_hematite",
    slug: "stein-haematit",
    name: "Hämatit",
    price: 18,
    stock: 20,
    image: "/images/stones/hematite.svg",
    intents: ["schutz", "ruhe", "klarheit"],
    moods: ["ueberreizt", "leer"],
    lifeAreas: ["abgrenzung", "arbeit", "schlaf"],
    energy: "kraftvoll",
    chakras: ["Wurzel"],
    zodiac: ["Steinbock", "Wassermann", "Widder"],
    hardness: "5.5–6.5",
    shortEffect:
      "Stark erdend – bringt dich zurück in den Körper und stoppt Gedankenkreisen.",
    howToUse: "In der Hosentasche oder als Armband bei stressigen Tagen.",
    forWhom: "Wenn du dich zerstreut oder „neben dir“ fühlst.",
  },
  {
    id: "stone_amazonite",
    slug: "stein-amazonit",
    name: "Amazonit",
    price: 23,
    stock: 15,
    image: "/images/stones/amazonite.svg",
    intents: ["ruhe", "liebe", "klarheit"],
    moods: ["ueberreizt", "unsicher", "offen"],
    lifeAreas: ["beziehung", "arbeit", "allgemein"],
    energy: "sanft",
    chakras: ["Hals", "Herz"],
    zodiac: ["Jungfrau", "Wassermann", "Krebs"],
    hardness: "6–6.5",
    shortEffect:
      "Beruhigt Kommunikation – hilft, ehrlich und gleichzeitig sanft zu sein.",
    howToUse: "Vor Gesprächen in der Hand halten oder am Schreibtisch ablegen.",
    forWhom: "Wenn du klar sprechen willst, ohne hart zu werden.",
  },
  {
    id: "stone_black_tourmaline",
    slug: "stein-schoerl",
    name: "Schörl (Schwarzer Turmalin)",
    price: 27,
    stock: 11,
    image: "/images/stones/black-tourmaline.svg",
    intents: ["schutz", "ruhe"],
    moods: ["ueberreizt", "unsicher"],
    lifeAreas: ["abgrenzung", "arbeit", "schlaf"],
    energy: "kraftvoll",
    chakras: ["Wurzel"],
    zodiac: ["Skorpion", "Steinbock", "Krebs"],
    hardness: "7–7.5",
    shortEffect:
      "Klassischer Schutzstein – filtert Reizüberflutung und stärkt Stabilität.",
    howToUse: "Am Eingang, am Schreibtisch oder in der Tasche.",
    forWhom: "Wenn du dich vor äußeren Einflüssen abschirmen willst.",
  },
  {
    id: "stone_carnelian",
    slug: "stein-karneol",
    name: "Karneol",
    price: 20,
    stock: 17,
    image: "/images/stones/carnelian.svg",
    intents: ["energie", "manifestation", "liebe"],
    moods: ["leer", "blockiert", "offen"],
    lifeAreas: ["kreativitaet", "beziehung", "arbeit"],
    energy: "kraftvoll",
    chakras: ["Sakral", "Wurzel"],
    zodiac: ["Widder", "Löwe", "Jungfrau"],
    hardness: "6.5–7",
    shortEffect:
      "Wärme und Lebenslust – aktiviert Kreativität und Handlungsfreude.",
    howToUse: "Morgens tragen oder bei kreativer Arbeit neben dich legen.",
    forWhom: "Wenn du Motivation und „Feuer im Bauch“ brauchst.",
  },
];

const INTENT_LABEL: Record<StoneIntent, string> = {
  schutz: "Schutz",
  liebe: "Liebe",
  klarheit: "Klarheit",
  energie: "Energie",
  ruhe: "Ruhe",
  manifestation: "Manifestation",
};

export function getStones(): Stone[] {
  return stones;
}

export function getStoneBySlug(slug: string): Stone | undefined {
  return stones.find((s) => s.slug === slug);
}

export function findStones(
  input: StoneQuizAnswers,
): Array<{ stone: Stone; score: number; reasons: string[] }> {
  const { intent, mood, lifeArea, energy, zodiac } = input;

  const ranked = stones
    .map((stone) => {
      let score = 0;
      const reasons: string[] = [];

      if (stone.intents.includes(intent)) {
        score += 4;
        reasons.push(`Passt zu deiner Absicht „${INTENT_LABEL[intent]}“`);
      } else if (stone.intents[0]) {
        // partial relatedness: minor score if secondary themes overlap later
      }

      if (stone.moods.includes(mood)) {
        score += 3;
        reasons.push("Trifft deinen aktuellen Zustand");
      }

      if (stone.lifeAreas.includes(lifeArea)) {
        score += 3;
        reasons.push("Sinnvoll für deinen Fokusbereich");
      }

      if (energy !== "egal") {
        if (stone.energy === energy) {
          score += 2;
          reasons.push(
            energy === "sanft"
              ? "Sanfte Begleitung – wie gewünscht"
              : "Kraftvolle Energie – wie gewünscht",
          );
        } else {
          score -= 0.5;
        }
      }

      if (zodiac && stone.zodiac.includes(zodiac)) {
        score += 2;
        reasons.push(`Klassisch passend zu ${zodiac}`);
      }

      if (stone.stock > 15) score += 0.15;

      return { stone, score, reasons: reasons.slice(0, 3) };
    })
    .filter((r) => r.score >= 3)
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, 3);
}
