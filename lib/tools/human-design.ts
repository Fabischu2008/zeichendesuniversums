import * as Astronomy from "astronomy-engine";
import { signFromEclipticLongitude } from "@/lib/astro/signs";

export type HumanDesignType =
  | "Generator"
  | "Manifesting Generator"
  | "Projector"
  | "Manifestor"
  | "Reflector";

export type HumanDesignAuthority =
  | "Emotional"
  | "Sacral"
  | "Splenic"
  | "Ego"
  | "Self-Projected"
  | "Lunar";

export type HumanDesignResult = {
  type: HumanDesignType;
  strategy: string;
  authority: HumanDesignAuthority;
  profile: `${number}/${number}`;
  incarnationTheme: string;
  signature: string;
  notSelfTheme: string;
  definition: "Single Definition" | "Split Definition";
  centersHint: string[];
  gatesHint: string[];
  channels: string[];
  gates: number[];
  openCenters: string[];
  definedCenters: string[];
  incarnationCross: string;
  digestion: string;
  environment: string;
  motivation: string;
  perspective: string;
  cognition: string;
  designSense: string;
  profileData: HumanDesignProfileData;
};

export type HumanDesignCore = {
  type: HumanDesignType;
  strategy: string;
  authority: HumanDesignAuthority;
  profile: `${number}/${number}`;
  signature: string;
  notSelfTheme: string;
};

export type HumanDesignMechanics = {
  definition: "Single Definition" | "Split Definition";
  definedCenters: string[];
  openCenters: string[];
  channels: string[];
  gates: number[];
};

export type HumanDesignAdvanced = {
  incarnationTheme: string;
  incarnationCross: string;
  digestion: string;
  environment: string;
  motivation: string;
  perspective: string;
  cognition: string;
  designSense: string;
};

export type HumanDesignGuidance = {
  today: string[];
  week: string[];
  avoid: string[];
};

export type HumanDesignProfileData = {
  core: HumanDesignCore;
  mechanics: HumanDesignMechanics;
  advanced: HumanDesignAdvanced;
  guidance: HumanDesignGuidance;
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const GATE_SPAN = 360 / 64;
const LINE_SPAN = GATE_SPAN / 6;
const GATE_OFFSET_DEG = 304.5; // aligns tropical longitude to common HD wheel examples
const GATE_ORDER = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2,
  23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40,
  64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10,
  58, 38, 54, 61, 60,
] as const;

type Center =
  | "Kopf"
  | "Ajna"
  | "Kehle"
  | "G"
  | "Herzzentrum"
  | "Milz"
  | "Solarplexus-Zentrum"
  | "Sakralzentrum"
  | "Wurzelzentrum";

type Channel = {
  a: number;
  b: number;
  centers: [Center, Center];
};

const CHANNELS: Channel[] = [
  { a: 64, b: 47, centers: ["Kopf", "Ajna"] },
  { a: 61, b: 24, centers: ["Kopf", "Ajna"] },
  { a: 63, b: 4, centers: ["Kopf", "Ajna"] },
  { a: 43, b: 23, centers: ["Ajna", "Kehle"] },
  { a: 17, b: 62, centers: ["Ajna", "Kehle"] },
  { a: 11, b: 56, centers: ["Ajna", "Kehle"] },
  { a: 48, b: 16, centers: ["Milz", "Kehle"] },
  { a: 57, b: 20, centers: ["Milz", "Kehle"] },
  { a: 45, b: 21, centers: ["Kehle", "Herzzentrum"] },
  { a: 12, b: 22, centers: ["Kehle", "Solarplexus-Zentrum"] },
  { a: 35, b: 36, centers: ["Kehle", "Solarplexus-Zentrum"] },
  { a: 31, b: 7, centers: ["Kehle", "G"] },
  { a: 8, b: 1, centers: ["Kehle", "G"] },
  { a: 33, b: 13, centers: ["Kehle", "G"] },
  { a: 20, b: 10, centers: ["Kehle", "G"] },
  { a: 20, b: 34, centers: ["Kehle", "Sakralzentrum"] },
  { a: 10, b: 57, centers: ["G", "Milz"] },
  { a: 10, b: 34, centers: ["G", "Sakralzentrum"] },
  { a: 25, b: 51, centers: ["G", "Herzzentrum"] },
  { a: 2, b: 14, centers: ["G", "Sakralzentrum"] },
  { a: 15, b: 5, centers: ["G", "Sakralzentrum"] },
  { a: 46, b: 29, centers: ["G", "Sakralzentrum"] },
  { a: 44, b: 26, centers: ["Milz", "Herzzentrum"] },
  { a: 32, b: 54, centers: ["Milz", "Wurzelzentrum"] },
  { a: 28, b: 38, centers: ["Milz", "Wurzelzentrum"] },
  { a: 18, b: 58, centers: ["Milz", "Wurzelzentrum"] },
  { a: 27, b: 50, centers: ["Milz", "Sakralzentrum"] },
  { a: 34, b: 57, centers: ["Sakralzentrum", "Milz"] },
  { a: 59, b: 6, centers: ["Sakralzentrum", "Solarplexus-Zentrum"] },
  { a: 3, b: 60, centers: ["Sakralzentrum", "Wurzelzentrum"] },
  { a: 42, b: 53, centers: ["Sakralzentrum", "Wurzelzentrum"] },
  { a: 9, b: 52, centers: ["Sakralzentrum", "Wurzelzentrum"] },
  { a: 37, b: 40, centers: ["Solarplexus-Zentrum", "Herzzentrum"] },
  { a: 41, b: 30, centers: ["Wurzelzentrum", "Solarplexus-Zentrum"] },
  { a: 39, b: 55, centers: ["Wurzelzentrum", "Solarplexus-Zentrum"] },
  { a: 19, b: 49, centers: ["Wurzelzentrum", "Solarplexus-Zentrum"] },
];

function gateFromLongitude(longitude: number): number {
  const normalized = mod(longitude - GATE_OFFSET_DEG, 360);
  const gateIndex = Math.floor(normalized / GATE_SPAN);
  return GATE_ORDER[gateIndex] as number;
}

function lineFromLongitude(longitude: number): number {
  const normalized = mod(longitude - GATE_OFFSET_DEG, 360);
  const inGate = mod(normalized, GATE_SPAN);
  return Math.min(6, Math.floor(inGate / LINE_SPAN) + 1);
}

function strategyForType(type: HumanDesignType): string {
  switch (type) {
    case "Generator":
      return "Warten, um zu reagieren.";
    case "Manifesting Generator":
      return "Reagieren, dann informieren und handeln.";
    case "Projector":
      return "Auf Einladung und Anerkennung warten.";
    case "Manifestor":
      return "Informieren, bevor du initiierst.";
    case "Reflector":
      return "Einen Mondzyklus abwarten, bevor du entscheidest.";
  }
}

function signatureForType(type: HumanDesignType): string {
  switch (type) {
    case "Generator":
    case "Manifesting Generator":
      return "Zufriedenheit";
    case "Projector":
      return "Erfolg";
    case "Manifestor":
      return "Frieden";
    case "Reflector":
      return "Überraschung";
  }
}

function notSelfForType(type: HumanDesignType): string {
  switch (type) {
    case "Generator":
    case "Manifesting Generator":
      return "Frustration";
    case "Projector":
      return "Verbitterung";
    case "Manifestor":
      return "Wut";
    case "Reflector":
      return "Enttäuschung";
  }
}

function guidanceForType(type: HumanDesignType): HumanDesignGuidance {
  switch (type) {
    case "Generator":
      return {
        today: [
          "Achte auf das erste Bauch-„Ja“/„Nein“, bevor du zusagst.",
          "Arbeite in klaren Blöcken an Aufgaben, die echte Resonanz erzeugen.",
        ],
        week: [
          "Streiche eine Verpflichtung, die nur aus Pflichtgefühl läuft.",
          "Plane zwei Reaktionsfenster, in denen du bewusst auf Chancen antwortest.",
        ],
        avoid: [
          "Aus dem Kopf initiieren, wenn dein Sakral kein klares Signal gibt.",
        ],
      };
    case "Manifesting Generator":
      return {
        today: [
          "Erst reagieren, dann kurz informieren und erst danach handeln.",
          "Erlaube dir, iterativ zu arbeiten statt sofort perfekt zu liefern.",
        ],
        week: [
          "Bündle ähnliche Aufgaben in Sprints, um dein Tempo sinnvoll zu nutzen.",
          "Baue bewusst Puffer ein, damit Kurswechsel nicht in Stress kippen.",
        ],
        avoid: ["Mehrere große Starts ohne Abschlussfenster parallel aufzuziehen."],
      };
    case "Projector":
      return {
        today: [
          "Setze auf Qualität statt Quantität: ein klarer Beitrag mit Tiefe.",
          "Achte auf Anerkennungssignale, bevor du Energie investierst.",
        ],
        week: [
          "Plane Regenerationsfenster, damit deine Wahrnehmung scharf bleibt.",
          "Führe ein kurzes Log: Wo wurdest du eingeladen – und wo nicht?",
        ],
        avoid: ["Dauerhaft wie ein Motor-Typ zu arbeiten und dich zu überlasten."],
      };
    case "Manifestor":
      return {
        today: [
          "Informiere betroffene Personen vor einem Richtungswechsel.",
          "Nutze deinen Initiationsimpuls für einen klaren ersten Schritt.",
        ],
        week: [
          "Definiere 1–2 Initiativen, die wirklich dir gehören.",
          "Setze Grenzen bei Mikro-Management von außen.",
        ],
        avoid: ["Impulse zu unterdrücken, bis Frust oder Wut hochkochen."],
      };
    case "Reflector":
      return {
        today: [
          "Beobachte dein Umfeld: Wo fühlst du Weite, wo Enge?",
          "Notiere deine Stimmung im Tagesverlauf ohne sofort zu bewerten.",
        ],
        week: [
          "Große Entscheidungen über mehrere Tage spiegeln.",
          "Zeit in unterstützenden Räumen und Menschen bewusst erhöhen.",
        ],
        avoid: ["Schnelle Festlegungen unter Druck ohne inneren Zyklus."],
      };
  }
}

function authorityTip(authority: HumanDesignAuthority) {
  switch (authority) {
    case "Emotional":
      return "Wichtige Entscheidungen nicht im emotionalen Peak treffen, sondern über Wellen klären.";
    case "Sacral":
      return "Auf den unmittelbaren Körperimpuls achten: expansiv = ja, zusammenziehend = nein.";
    case "Splenic":
      return "Der erste leise Sicherheitsimpuls ist oft der richtige – nicht zerdenken.";
    case "Ego":
      return "Prüfen, ob du wirklich willst – nicht nur, ob du kannst.";
    case "Self-Projected":
      return "Entscheidungen laut aussprechen und auf innere Klarheit in der Stimme achten.";
    case "Lunar":
      return "Entscheidungen über Zeit und Spiegelung reifen lassen.";
  }
}

function sunLongitudeAt(dateUtc: Date): number {
  return Astronomy.SunPosition(new Astronomy.AstroTime(dateUtc)).elon;
}

function findDesignDateUtc(birthDateUtc: Date): Date {
  const birthSunLon = sunLongitudeAt(birthDateUtc);
  const target = mod(birthSunLon - 88, 360);
  let bestDate = new Date(birthDateUtc.getTime() - 88 * 86400000);
  let bestDelta = Number.POSITIVE_INFINITY;
  for (let h = 20 * 24; h <= 110 * 24; h += 6) {
    const date = new Date(birthDateUtc.getTime() - h * 3600000);
    const lon = sunLongitudeAt(date);
    const delta = Math.min(mod(lon - target, 360), mod(target - lon, 360));
    if (delta < bestDelta) {
      bestDelta = delta;
      bestDate = date;
    }
  }
  return bestDate;
}

function collectPlanetLongitudes(dateUtc: Date): Record<string, number> {
  const t = new Astronomy.AstroTime(dateUtc);
  const moonLon = Astronomy.Ecliptic(
    Astronomy.GeoVector(Astronomy.Body.Moon, dateUtc, true),
  ).elon;
  return {
    sun: Astronomy.SunPosition(t).elon,
    earth: mod(Astronomy.SunPosition(t).elon + 180, 360),
    moon: moonLon,
    mercury: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Mercury, dateUtc, true))
      .elon,
    venus: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Venus, dateUtc, true)).elon,
    mars: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Mars, dateUtc, true)).elon,
    jupiter: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Jupiter, dateUtc, true))
      .elon,
    saturn: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Saturn, dateUtc, true)).elon,
    uranus: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Uranus, dateUtc, true)).elon,
    neptune: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Neptune, dateUtc, true))
      .elon,
    pluto: Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Pluto, dateUtc, true)).elon,
  };
}

function hasPath(adjacency: Map<Center, Set<Center>>, from: Center, to: Center): boolean {
  if (from === to) return true;
  const seen = new Set<Center>([from]);
  const queue: Center[] = [from];
  while (queue.length > 0) {
    const current = queue.shift() as Center;
    const neighbors = adjacency.get(current) ?? new Set<Center>();
    for (const n of neighbors) {
      if (n === to) return true;
      if (!seen.has(n)) {
        seen.add(n);
        queue.push(n);
      }
    }
  }
  return false;
}

export function buildHumanDesignResult(input: {
  dateUtc: Date;
  ascendantLongitude: number;
}): HumanDesignResult {
  const birthLongitudes = collectPlanetLongitudes(input.dateUtc);
  const designDateUtc = findDesignDateUtc(input.dateUtc);
  const designLongitudes = collectPlanetLongitudes(designDateUtc);

  const consciousSunGate = gateFromLongitude(birthLongitudes.sun);
  const consciousEarthGate = gateFromLongitude(birthLongitudes.earth);
  const designSunGate = gateFromLongitude(designLongitudes.sun);
  const designEarthGate = gateFromLongitude(designLongitudes.earth);
  const ascGate = gateFromLongitude(input.ascendantLongitude);

  const consciousSunLine = lineFromLongitude(birthLongitudes.sun);
  const designSunLine = lineFromLongitude(designLongitudes.sun);
  const profile = `${consciousSunLine}/${designSunLine}` as const;

  const activatedGates = new Set<number>([ascGate]);
  for (const lon of Object.values(birthLongitudes)) {
    activatedGates.add(gateFromLongitude(lon));
  }
  for (const lon of Object.values(designLongitudes)) {
    activatedGates.add(gateFromLongitude(lon));
  }
  const gates = Array.from(activatedGates).sort((a, b) => a - b);

  const definedChannelObjects = CHANNELS.filter(
    (c) => activatedGates.has(c.a) && activatedGates.has(c.b),
  );
  const channels = definedChannelObjects.map((c) => `${c.a}-${c.b}`);

  const definedCenterSet = new Set<Center>();
  for (const c of definedChannelObjects) {
    definedCenterSet.add(c.centers[0]);
    definedCenterSet.add(c.centers[1]);
  }
  const allCenters: Center[] = [
    "Kopf",
    "Ajna",
    "Kehle",
    "G",
    "Herzzentrum",
    "Milz",
    "Solarplexus-Zentrum",
    "Sakralzentrum",
    "Wurzelzentrum",
  ];
  const definedCenters = allCenters.filter((x) => definedCenterSet.has(x));
  const openCenters = allCenters.filter((x) => !definedCenterSet.has(x));

  const adjacency = new Map<Center, Set<Center>>();
  for (const center of allCenters) adjacency.set(center, new Set<Center>());
  for (const c of definedChannelObjects) {
    adjacency.get(c.centers[0])?.add(c.centers[1]);
    adjacency.get(c.centers[1])?.add(c.centers[0]);
  }

  const sacralDefined = definedCenterSet.has("Sakralzentrum");
  const solarDefined = definedCenterSet.has("Solarplexus-Zentrum");
  const splenicDefined = definedCenterSet.has("Milz");
  const egoDefined = definedCenterSet.has("Herzzentrum");
  const gDefined = definedCenterSet.has("G");
  const throatDefined = definedCenterSet.has("Kehle");

  const motorCenters: Center[] = [
    "Sakralzentrum",
    "Herzzentrum",
    "Solarplexus-Zentrum",
    "Wurzelzentrum",
  ];
  const throatMotorConnected =
    throatDefined &&
    motorCenters.some(
      (mc) => definedCenterSet.has(mc) && hasPath(adjacency, mc, "Kehle"),
    );

  const type: HumanDesignType =
    definedChannelObjects.length === 0
      ? "Reflector"
      : sacralDefined
        ? throatMotorConnected
          ? "Manifesting Generator"
          : "Generator"
        : throatMotorConnected
          ? "Manifestor"
          : "Projector";

  const authority: HumanDesignAuthority =
    type === "Reflector"
      ? "Lunar"
      : solarDefined
        ? "Emotional"
        : sacralDefined
          ? "Sacral"
          : splenicDefined
            ? "Splenic"
            : egoDefined && hasPath(adjacency, "Herzzentrum", "Kehle")
              ? "Ego"
              : gDefined && hasPath(adjacency, "G", "Kehle")
                ? "Self-Projected"
                : "Lunar";

  const components = new Set<Center>();
  let componentCount = 0;
  for (const c of definedCenters) {
    if (components.has(c)) continue;
    componentCount += 1;
    const queue: Center[] = [c];
    while (queue.length > 0) {
      const cur = queue.shift() as Center;
      if (components.has(cur)) continue;
      components.add(cur);
      for (const n of adjacency.get(cur) ?? new Set<Center>()) {
        if (!components.has(n)) queue.push(n);
      }
    }
  }

  const definition =
    componentCount <= 1 ? "Single Definition" : "Split Definition";

  const incarnationTheme = `${signFromEclipticLongitude(
    birthLongitudes.sun,
  )} · Gate ${consciousSunGate}/${consciousEarthGate}`;
  const incarnationCross = `Rechtwinkeliges Kreuz (${consciousSunGate}/${consciousEarthGate} | ${designSunGate}/${designEarthGate})`;

  const digestionOptions = ["Konsekutiv", "Alternierend", "Heiß", "Kalt", "Hochsensibel", "Wechselnd"];
  const environmentOptions = ["Küsten", "Märkte", "Täler", "Berge", "Küchen", "Höhlen"];
  const motivationOptions = ["Unschuld", "Wunsch", "Schuld", "Hoffnung", "Bedürfnis", "Angst"];
  const perspectiveOptions = ["Überblick", "Macht", "Möglichkeit", "Wahrscheinlichkeit", "Personal", "Kollektiv"];
  const cognitionOptions = ["Riechen", "Schmecken", "Sehen", "Fühlen", "Hören", "Inneres Wissen"];
  const designSenseOptions = ["Gefühl", "Berührung", "Rhythmus", "Klarheit", "Druck", "Wärme"];
  const digestion = digestionOptions[mod(designSunGate, digestionOptions.length)];
  const environment = environmentOptions[mod(designEarthGate, environmentOptions.length)];
  const motivation = motivationOptions[mod(consciousSunGate, motivationOptions.length)];
  const perspective = perspectiveOptions[mod(ascGate, perspectiveOptions.length)];
  const cognition = cognitionOptions[mod(consciousSunGate + designSunGate, cognitionOptions.length)];
  const designSense =
    designSenseOptions[mod(consciousEarthGate + ascGate, designSenseOptions.length)];
  const baseGuidance = guidanceForType(type);
  const profileData: HumanDesignProfileData = {
    core: {
      type,
      strategy: strategyForType(type),
      authority,
      profile,
      signature: signatureForType(type),
      notSelfTheme: notSelfForType(type),
    },
    mechanics: {
      definition,
      definedCenters,
      openCenters,
      channels,
      gates,
    },
    advanced: {
      incarnationTheme,
      incarnationCross,
      digestion,
      environment,
      motivation,
      perspective,
      cognition,
      designSense,
    },
    guidance: {
      today: [...baseGuidance.today, authorityTip(authority)],
      week: baseGuidance.week,
      avoid: baseGuidance.avoid,
    },
  };

  return {
    type,
    strategy: strategyForType(type),
    authority,
    profile,
    incarnationTheme,
    signature: signatureForType(type),
    notSelfTheme: notSelfForType(type),
    definition,
    centersHint: [
      `Conscious Sun aktiviert Gate ${consciousSunGate}`,
      `Design Sun aktiviert Gate ${designSunGate}`,
      `Aszendent aktiviert Gate ${ascGate}`,
    ],
    gatesHint: [
      `Conscious Sun/Earth: ${consciousSunGate}/${consciousEarthGate}`,
      `Design Sun/Earth: ${designSunGate}/${designEarthGate}`,
      `Profil: ${profile}`,
    ],
    channels,
    gates,
    openCenters,
    definedCenters,
    incarnationCross,
    digestion,
    environment,
    motivation,
    perspective,
    cognition,
    designSense,
    profileData,
  };
}
