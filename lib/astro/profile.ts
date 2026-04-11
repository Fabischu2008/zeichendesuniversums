import * as Astronomy from "astronomy-engine";
import { buildElementAnalysis } from "@/lib/astro/element-analysis";
import {
  signFromEclipticLongitude,
  symbolFromSign,
  ZODIAC_SIGNS,
} from "@/lib/astro/signs";

export type Element = "Feuer" | "Erde" | "Luft" | "Wasser";

export const ELEMENT_BY_SIGN: Record<(typeof ZODIAC_SIGNS)[number], Element> = {
  Widder: "Feuer",
  Stier: "Erde",
  Zwillinge: "Luft",
  Krebs: "Wasser",
  Löwe: "Feuer",
  Jungfrau: "Erde",
  Waage: "Luft",
  Skorpion: "Wasser",
  Schütze: "Feuer",
  Steinbock: "Erde",
  Wassermann: "Luft",
  Fische: "Wasser",
};

export type PlanetKey =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export type SpecialPointKey =
  | "north_node"
  | "south_node"
  | "chiron"
  | "lilith"
  | "part_of_fortune";

const PLANET_GLYPHS: Record<PlanetKey, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇",
};

export type PlanetPlacement = {
  key: PlanetKey;
  name: string;
  glyph: string;
  longitude: number;
  degreeInSign: string;
  sign: (typeof ZODIAC_SIGNS)[number];
  signSymbol: string;
  element: Element;
  house: number;
};

export type SpecialPointPlacement = {
  key: SpecialPointKey;
  name: string;
  glyph: string;
  longitude: number;
  degreeInSign: string;
  sign: (typeof ZODIAC_SIGNS)[number];
  signSymbol: string;
  element: Element;
  house: number;
  note?: string;
};

const PLANETS: Array<{ key: PlanetKey; name: string; body: Astronomy.Body }> = [
  { key: "sun", name: "Sonne", body: Astronomy.Body.Sun },
  { key: "moon", name: "Mond", body: Astronomy.Body.Moon },
  { key: "mercury", name: "Merkur", body: Astronomy.Body.Mercury },
  { key: "venus", name: "Venus", body: Astronomy.Body.Venus },
  { key: "mars", name: "Mars", body: Astronomy.Body.Mars },
  { key: "jupiter", name: "Jupiter", body: Astronomy.Body.Jupiter },
  { key: "saturn", name: "Saturn", body: Astronomy.Body.Saturn },
  { key: "uranus", name: "Uranus", body: Astronomy.Body.Uranus },
  { key: "neptune", name: "Neptun", body: Astronomy.Body.Neptune },
  { key: "pluto", name: "Pluto", body: Astronomy.Body.Pluto },
];

function normalizeDegrees(deg: number) {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

function degreeWithinSign(longitude: number) {
  const d = normalizeDegrees(longitude) % 30;
  return `${d.toFixed(1)}°`;
}

function wholeSignHouseFromAsc(ascLon: number, planetLon: number) {
  const ascSignIndex = Math.floor(normalizeDegrees(ascLon) / 30);
  const planetSignIndex = Math.floor(normalizeDegrees(planetLon) / 30);
  return ((planetSignIndex - ascSignIndex + 12) % 12) + 1;
}

function julianDay(dateUtc: Date) {
  return dateUtc.getTime() / 86400000 + 2440587.5;
}

/** Mittlerer aufsteigender Mondknoten (ekliptikal, Näherung). */
function meanNorthNodeLongitude(dateUtc: Date) {
  const T = (julianDay(dateUtc) - 2451545.0) / 36525;
  return (
    125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000
  );
}

/** Mittleres Mondapogäum („Black Moon Lilith“, astronomische Näherung). */
function meanLilithLongitude(dateUtc: Date) {
  const T = (julianDay(dateUtc) - 2451545.0) / 36525;
  return (
    83.3532465 +
    4069.0137287 * T -
    0.010324 * T * T -
    (T * T * T) / 80053 +
    (T * T * T * T) / 153990000
  );
}

function elementNarrative(e: Element) {
  switch (e) {
    case "Feuer":
      return "viel Initiative, Mut und Drang nach Bewegung";
    case "Erde":
      return "starkes Bedürfnis nach Stabilität, Struktur und Verlässlichkeit";
    case "Luft":
      return "fokussierter Geist, Austausch und Perspektivwechsel";
    case "Wasser":
      return "hohe emotionale Tiefe, Intuition und Feinfühligkeit";
  }
}

function houseTheme(house: number) {
  const map: Record<number, string> = {
    1: "Auftreten und Selbstbild",
    2: "Werte, Sicherheit und Ressourcen",
    3: "Denken, Lernen und Kommunikation",
    4: "Zuhause, Herkunft und innere Basis",
    5: "Kreativität, Freude und Ausdruck",
    6: "Alltag, Routinen und Gesundheit",
    7: "Beziehungen und Bindung",
    8: "Tiefe Prozesse, Vertrauen und Wandlung",
    9: "Sinn, Weltbild und Wachstum",
    10: "Berufung, Richtung und Öffentlichkeit",
    11: "Freundschaften, Netzwerke und Visionen",
    12: "Rückzug, Unterbewusstes und Regeneration",
  };
  return map[house] ?? "Lebensthema";
}

function houseBucket(house: number) {
  if (house <= 3) return 1;
  if (house <= 6) return 2;
  if (house <= 9) return 3;
  return 4;
}

function archetypeFor(element: Element, primaryHouse: number) {
  const b = houseBucket(primaryHouse);
  const table: Record<string, { title: string; subtitle: string }> = {
    Feuer_1: {
      title: "Der schnelle Starter",
      subtitle:
        "Du setzt dich sichtbar in Szene und willst Dinge in Bewegung bringen.",
    },
    Feuer_2: {
      title: "Der Werteschöpfer",
      subtitle:
        "Du willst spüren, was sich lohnt – und gibst Energie dort, wo es zählt.",
    },
    Feuer_3: {
      title: "Der Ideenmotor",
      subtitle:
        "Neugier und Austausch treiben dich an; du brauchst intellektuelle Luft.",
    },
    Feuer_4: {
      title: "Der Strahlkraft-Macher",
      subtitle:
        "Sichtbarkeit, Richtung und größere Ziele ziehen dich magnetisch an.",
    },
    Erde_1: {
      title: "Der Bodenständige",
      subtitle:
        "Du baust Vertrauen über Konstanz – Schritt für Schritt, nicht im Rausch.",
    },
    Erde_2: {
      title: "Der Strukturierer",
      subtitle:
        "Sicherheit und Qualität sind kein Luxus für dich, sondern Strategie.",
    },
    Erde_3: {
      title: "Der pragmatische Kopf",
      subtitle:
        "Du denkst gern konkret: Was funktioniert wirklich im Alltag?",
    },
    Erde_4: {
      title: "Der langfristige Baumeister",
      subtitle:
        "Du denkst in Etappen und willst etwas stehen sehen – auch beruflich.",
    },
    Luft_1: {
      title: "Der leichte Eröffner",
      subtitle:
        "Du kommst schnell ins Gespräch und willst neue Perspektiven testen.",
    },
    Luft_2: {
      title: "Der faire Verhandler",
      subtitle:
        "Ausgewogenheit und klare Worte sind dein Werkzeug für Nähe.",
    },
    Luft_3: {
      title: "Der Vernetzer",
      subtitle:
        "Kontakte, Stories und Ideen – du lebst von Austausch und Vielfalt.",
    },
    Luft_4: {
      title: "Der Visionär",
      subtitle:
        "Du denkst in Bildern fürs Große: Zukunft, Gemeinschaft, Sinn.",
    },
    Wasser_1: {
      title: "Der feinfühlige Ersteindruck",
      subtitle:
        "Du spürst Stimmungen schnell – und schützt, was dir wichtig ist.",
    },
    Wasser_2: {
      title: "Der emotionale Anker",
      subtitle:
        "Nähe entsteht bei dir durch Vertrauen, Rituale und echte Zeit.",
    },
    Wasser_3: {
      title: "Der intuitive Denker",
      subtitle:
        "Logik allein reicht dir nicht – du willst den emotionalen Kern verstehen.",
    },
    Wasser_4: {
      title: "Der tiefe Transformator",
      subtitle:
        "Du wächst durch intensive Erfahrungen und ehrliche Intimität.",
    },
  };
  const key = `${element}_${b}` as keyof typeof table;
  return (
    table[key] ?? {
      title: "Dein Profil-Mix",
      subtitle:
        "Ein ausgewogener Ausdruck deiner Elemente und Lebensbereiche.",
    }
  );
}

function partOfFortuneLongitude(input: {
  ascendantLongitude: number;
  sunLongitude: number;
  moonLongitude: number;
  sunHouse: number;
}) {
  const dayChart = input.sunHouse >= 7 && input.sunHouse <= 12;
  const asc = normalizeDegrees(input.ascendantLongitude);
  const sun = normalizeDegrees(input.sunLongitude);
  const moon = normalizeDegrees(input.moonLongitude);
  return normalizeDegrees(
    dayChart ? asc + moon - sun : asc + sun - moon,
  );
}

export function calculateAstroProfile(input: {
  dateUtc: Date;
  ascendantLongitude: number;
}) {
  const t = new Astronomy.AstroTime(input.dateUtc);

  const planets: PlanetPlacement[] = PLANETS.map((p) => {
    let lon = 0;
    if (p.key === "sun") {
      lon = Astronomy.SunPosition(t).elon;
    } else {
      const vec = Astronomy.GeoVector(p.body, input.dateUtc, true);
      lon = Astronomy.Ecliptic(vec).elon;
    }
    const sign = signFromEclipticLongitude(lon);
    return {
      key: p.key,
      name: p.name,
      glyph: PLANET_GLYPHS[p.key],
      longitude: normalizeDegrees(lon),
      degreeInSign: degreeWithinSign(lon),
      sign,
      signSymbol: symbolFromSign(sign),
      element: ELEMENT_BY_SIGN[sign],
      house: wholeSignHouseFromAsc(input.ascendantLongitude, lon),
    };
  });

  const sun = planets.find((p) => p.key === "sun")!;
  const moon = planets.find((p) => p.key === "moon")!;

  const northNodeLon = normalizeDegrees(meanNorthNodeLongitude(input.dateUtc));
  const southNodeLon = normalizeDegrees(northNodeLon + 180);
  const northNodeSign = signFromEclipticLongitude(northNodeLon);
  const southNodeSign = signFromEclipticLongitude(southNodeLon);

  const fortuneLon = partOfFortuneLongitude({
    ascendantLongitude: input.ascendantLongitude,
    sunLongitude: sun.longitude,
    moonLongitude: moon.longitude,
    sunHouse: sun.house,
  });
  const fortuneSign = signFromEclipticLongitude(fortuneLon);

  const lilithLon = normalizeDegrees(meanLilithLongitude(input.dateUtc));
  const lilithSign = signFromEclipticLongitude(lilithLon);

  const specialPoints: SpecialPointPlacement[] = [
    {
      key: "north_node",
      name: "Nordknoten (mittel)",
      glyph: "☊",
      longitude: northNodeLon,
      degreeInSign: degreeWithinSign(northNodeLon),
      sign: northNodeSign,
      signSymbol: symbolFromSign(northNodeSign),
      element: ELEMENT_BY_SIGN[northNodeSign],
      house: wholeSignHouseFromAsc(input.ascendantLongitude, northNodeLon),
      note: "Wachstumsrichtung: hier darfst du dich bewusst weiterentwickeln.",
    },
    {
      key: "south_node",
      name: "Südknoten (mittel)",
      glyph: "☋",
      longitude: southNodeLon,
      degreeInSign: degreeWithinSign(southNodeLon),
      sign: southNodeSign,
      signSymbol: symbolFromSign(southNodeSign),
      element: ELEMENT_BY_SIGN[southNodeSign],
      house: wholeSignHouseFromAsc(input.ascendantLongitude, southNodeLon),
      note: "Vertrautes Muster: Stärke, aber leicht zu überziehen.",
    },
    {
      key: "lilith",
      name: "Lilith (mittel / Apogäum)",
      glyph: "✦",
      longitude: lilithLon,
      degreeInSign: degreeWithinSign(lilithLon),
      sign: lilithSign,
      signSymbol: symbolFromSign(lilithSign),
      element: ELEMENT_BY_SIGN[lilithSign],
      house: wholeSignHouseFromAsc(input.ascendantLongitude, lilithLon),
      note: "Thema Autonomie, Tabus und rohe Ehrlichkeit – nicht als Drama, sondern als Kraftquelle lesen.",
    },
    {
      key: "part_of_fortune",
      name: "Glückspunkt (Pars Fortunae)",
      glyph: "⊗",
      longitude: fortuneLon,
      degreeInSign: degreeWithinSign(fortuneLon),
      sign: fortuneSign,
      signSymbol: symbolFromSign(fortuneSign),
      element: ELEMENT_BY_SIGN[fortuneSign],
      house: wholeSignHouseFromAsc(input.ascendantLongitude, fortuneLon),
      note:
        sun.house >= 7 && sun.house <= 12
          ? "Tageshoroskop-Formel: Aszendent + Mond − Sonne."
          : "Nacht-Formel: Aszendent + Sonne − Mond.",
    },
  ];

  const chironBody = (Astronomy.Body as unknown as Record<
    string,
    Astronomy.Body | undefined
  >).Chiron;
  if (chironBody) {
    try {
      const chironVec = Astronomy.GeoVector(chironBody, input.dateUtc, true);
      const chironLon = normalizeDegrees(Astronomy.Ecliptic(chironVec).elon);
      const chironSign = signFromEclipticLongitude(chironLon);
      specialPoints.push({
        key: "chiron",
        name: "Chiron",
        glyph: "⚷",
        longitude: chironLon,
        degreeInSign: degreeWithinSign(chironLon),
        sign: chironSign,
        signSymbol: symbolFromSign(chironSign),
        element: ELEMENT_BY_SIGN[chironSign],
        house: wholeSignHouseFromAsc(input.ascendantLongitude, chironLon),
        note: "Heilungs- und Lehrthema: wo alte Wunden zu Kompetenz werden können.",
      });
    } catch {
      /* ignore */
    }
  }

  const elementCounts: Record<Element, number> = {
    Feuer: 0,
    Erde: 0,
    Luft: 0,
    Wasser: 0,
  };
  for (const p of planets) elementCounts[p.element] += 1;

  const totalPlanets = planets.length;
  const elementBalance = (Object.keys(elementCounts) as Element[]).map((e) => ({
    element: e,
    count: elementCounts[e],
    percentage: Math.round((elementCounts[e] / totalPlanets) * 100),
  }));
  elementBalance.sort((a, b) => b.count - a.count);

  const elementAnalysis = buildElementAnalysis(elementBalance);

  const houseCounts = new Map<number, number>();
  for (const p of planets) {
    houseCounts.set(p.house, (houseCounts.get(p.house) ?? 0) + 1);
  }
  const houseFocus = [...houseCounts.entries()]
    .map(([house, count]) => ({ house, count, theme: houseTheme(house) }))
    .sort((a, b) => b.count - a.count || a.house - b.house)
    .slice(0, 3);

  const topElement = elementBalance[0];
  const secondElement = elementBalance[1];
  const primaryHouse = houseFocus[0]?.house ?? 1;
  const archetype = archetypeFor(topElement.element, primaryHouse);

  const summary = `Dein Profil zeigt ${elementNarrative(
    topElement.element,
  )}. Als zweiter Schwerpunkt wirkt ${secondElement.element.toLowerCase()} mit.`;
  const relationshipStyle = houseFocus.some((h) => h.house === 7 || h.house === 8)
    ? "Beziehungen sind ein zentrales Lernfeld: Tiefe, Vertrauen und klare Grenzen spielen eine große Rolle."
    : "Beziehungen profitieren bei dir von Klarheit in Kommunikation und gemeinsamem Wachstum.";
  const growthPath = houseFocus.some((h) => h.house === 10 || h.house === 11)
    ? "Dein Wachstum passiert stark über Vision, Sichtbarkeit und mutige Entscheidungen."
    : "Dein Wachstum entsteht vor allem über stabile Routinen und bewusste Selbstführung.";

  const nodesInsight = `Dein Nordknoten steht in ${northNodeSign} (Haus ${wholeSignHouseFromAsc(
    input.ascendantLongitude,
    northNodeLon,
  )}) – ein Bereich, in dem du dich bewusst weiterentwickeln darfst. Der Südknoten in ${southNodeSign} zeigt Muster, die dir vertraut sind und die du nicht komplett verwerfen musst, aber nicht allein steuern sollen.`;

  const lilithInsight = `Lilith in ${lilithSign} (Haus ${wholeSignHouseFromAsc(
    input.ascendantLongitude,
    lilithLon,
  )}) weist auf Themen hin, bei denen du authentisch sein willst – auch wenn das unbequem ist.`;

  const fortuneInsight = `Der Glückspunkt in ${fortuneSign} (Haus ${wholeSignHouseFromAsc(
    input.ascendantLongitude,
    fortuneLon,
  )}) beschreibt, wo sich für dich Leichtigkeit und „Flow“ zeigen können, wenn du deine natürlichen Ressourcen nutzt.`;

  const chironPoint = specialPoints.find((s) => s.key === "chiron");
  const chironInsight = chironPoint
    ? `Chiron in ${chironPoint.sign} (Haus ${chironPoint.house}) kann zeigen, wo Verletzlichkeit zu Empathie und Beratung werden kann – für dich und andere.`
    : undefined;

  return {
    meta: {
      model: "Whole-Sign-Häuser, mittlerer Mondknoten, mittleres Lilith (Apogäum), Pars Fortunae klassisch Tag/Nacht.",
    },
    planets,
    specialPoints,
    dominantPlanets: ["sun", "moon", "ascendant"] as const,
    elementBalance,
    elementAnalysis,
    houseFocus,
    archetype,
    narrative: {
      summary,
      relationshipStyle,
      growthPath,
      nodesInsight,
      lilithInsight,
      fortuneInsight,
      chironInsight,
    },
  };
}

export type AstroProfileResult = ReturnType<typeof calculateAstroProfile>;
