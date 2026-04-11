import type { PlanetKey, PlanetPlacement } from "@/lib/astro/profile";

export type AspectKind =
  | "conjunction"
  | "opposition"
  | "trine"
  | "square"
  | "sextile";

export type SynastryAspect = {
  planetA: PlanetKey;
  planetB: PlanetKey;
  nameA: string;
  nameB: string;
  aspect: AspectKind;
  aspectLabelDe: string;
  angleExact: number;
  orb: number;
  /** harmonisch / gemischt / herausfordernd */
  tone: "harmonisch" | "gemischt" | "herausfordernd";
  weight: number;
};

const ASPECT_DEFS: Array<{
  kind: AspectKind;
  angle: number;
  orb: number;
  labelDe: string;
}> = [
  { kind: "conjunction", angle: 0, orb: 8, labelDe: "Konjunktion" },
  { kind: "opposition", angle: 180, orb: 8, labelDe: "Opposition" },
  { kind: "trine", angle: 120, orb: 7, labelDe: "Trigon" },
  { kind: "square", angle: 90, orb: 7, labelDe: "Quadrat" },
  { kind: "sextile", angle: 60, orb: 5, labelDe: "Sextil" },
];

const SYNASTRY_PLANETS: PlanetKey[] = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
];

function normalizeDeg(deg: number) {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

/** Kleinster Winkel zwischen zwei Ekliptik-Längen (0–180°). */
export function angularSeparationDegrees(lonA: number, lonB: number): number {
  const a = normalizeDeg(lonA);
  const b = normalizeDeg(lonB);
  let d = Math.abs(a - b);
  if (d > 180) d = 360 - d;
  return d;
}

function matchAspect(separation: number): {
  kind: AspectKind;
  orb: number;
  labelDe: string;
} | null {
  for (const def of ASPECT_DEFS) {
    const diff = Math.abs(separation - def.angle);
    if (diff <= def.orb) {
      return { kind: def.kind, orb: diff, labelDe: def.labelDe };
    }
  }
  return null;
}

function toneForAspect(kind: AspectKind): SynastryAspect["tone"] {
  if (kind === "trine" || kind === "sextile") return "harmonisch";
  if (kind === "square") return "herausfordernd";
  return "gemischt";
}

/** Heuristische Gewichtung für Sortierung (höher = relevanter für Paardynamik). */
function pairWeight(a: PlanetKey, b: PlanetKey): number {
  const pairs: Record<string, number> = {
    "venus-mars": 120,
    "mars-venus": 120,
    "moon-moon": 110,
    "sun-moon": 105,
    "moon-sun": 105,
    "sun-sun": 100,
    "venus-venus": 95,
    "mars-mars": 85,
    "mercury-mercury": 80,
    "sun-venus": 88,
    "venus-sun": 88,
    "moon-venus": 90,
    "venus-moon": 90,
    "moon-mars": 88,
    "mars-moon": 88,
    "sun-mars": 82,
    "mars-sun": 82,
    "saturn-sun": 92,
    "sun-saturn": 92,
    "saturn-moon": 90,
    "moon-saturn": 90,
    "saturn-venus": 88,
    "venus-saturn": 88,
    "jupiter-sun": 75,
    "sun-jupiter": 75,
  };
  return pairs[`${a}-${b}`] ?? 40;
}

export function computeSynastryAspects(
  planetsA: PlanetPlacement[],
  planetsB: PlanetPlacement[],
): SynastryAspect[] {
  const mapA = new Map(planetsA.map((p) => [p.key, p]));
  const mapB = new Map(planetsB.map((p) => [p.key, p]));
  const out: SynastryAspect[] = [];

  for (const ka of SYNASTRY_PLANETS) {
    for (const kb of SYNASTRY_PLANETS) {
      const pa = mapA.get(ka);
      const pb = mapB.get(kb);
      if (!pa || !pb) continue;
      const sep = angularSeparationDegrees(pa.longitude, pb.longitude);
      const hit = matchAspect(sep);
      if (!hit) continue;

      const base = pairWeight(ka, kb);
      const aspectBonus =
        hit.kind === "trine" || hit.kind === "sextile"
          ? 25
          : hit.kind === "square"
            ? 15
            : hit.kind === "opposition"
              ? 20
              : 18;
      const orbPenalty = hit.orb * 2;
      const weight = Math.round(base + aspectBonus - orbPenalty);

      out.push({
        planetA: ka,
        planetB: kb,
        nameA: pa.name,
        nameB: pb.name,
        aspect: hit.kind,
        aspectLabelDe: hit.labelDe,
        angleExact: Math.round(sep * 10) / 10,
        orb: Math.round(hit.orb * 10) / 10,
        tone: toneForAspect(hit.kind),
        weight,
      });
    }
  }

  out.sort((a, b) => b.weight - a.weight);
  return out;
}

function aspectSentence(a: SynastryAspect): string {
  const asp = a.aspectLabelDe;
  const t = a.tone;
  const p = `${a.nameA} (Person A) und ${a.nameB} (Person B) stehen in ${asp} (${a.angleExact}°, Orb ca. ${a.orb}°).`;

  if (a.planetA === "venus" && a.planetB === "mars") {
    return `${p} Das spricht oft für Anziehung, Leidenschaft und spielerische Dynamik – wie stark, hängt vom Kontext eurer Beziehung ab.`;
  }
  if (a.planetA === "mars" && a.planetB === "venus") {
    return `${p} Klassisches „Magnetfeld“: Wunsch und Durchsetzung treffen aufeinander – kann Funken schlagen und gleichzeitig Klarheit über Bedürfnisse fordern.`;
  }
  if (a.planetA === "moon" && a.planetB === "moon") {
    return `${p} Emotional ähnliche oder spiegelnde Schwingungen: Verständnis fürs Gefühl des anderen fällt leichter – oder Trigger werden doppelt spürbar.`;
  }
  if (a.planetA === "sun" && a.planetB === "sun") {
    return `${p} Kern-Themen und Lebensentwürfe berühren sich: Gemeinsame Richtung ist möglich, starre Rollen können Reibung erzeugen.`;
  }
  if (
    (a.planetA === "sun" && a.planetB === "moon") ||
    (a.planetA === "moon" && a.planetB === "sun")
  ) {
    return `${p} Sonne und Mond zwischen euch: gute Basis für „ich sehe dich“ vs. „ich fühle dich“ – Nähe wächst über Anerkennung und emotionale Ehrlichkeit.`;
  }
  if (a.aspect === "square") {
    return `${p} Spannungsaspekt: Thema ist nicht „falsch“, sondern **Wachstum durch Reibung** – klare Absprachen helfen.`;
  }
  if (a.aspect === "opposition") {
    return `${p} Polarität: Ihr könnt wie zwei Seiten einer Medaille wirken – Anziehung durch Unterschied, Balance braucht bewusste Gegenpolung.`;
  }
  if (a.aspect === "trine" || a.aspect === "sextile") {
    return `${p} Fließende Energie: Dieses Thema lässt sich oft natürlicher ausgleichen – nutzt es, um gemeinsam voranzukommen.`;
  }
  if (a.aspect === "conjunction") {
    return `${p} Starke Verschmelzung des Themas: sehr direkt erlebbar – Achtsamkeit, wenn Grenzen zu verschwimmen drohen.`;
  }
  return `${p} Ton: überwiegend ${t === "harmonisch" ? "unterstützend" : t === "herausfordernd" ? "anstrengend, aber entwicklungsfähig" : "ambivalent – je nach Reifegrad"}.`;
}

export type SynastryReport = {
  harmonyScore: number;
  summary: string;
  chemistryLine: string;
  aspects: SynastryAspect[];
  aspectTexts: string[];
  sections: { title: string; body: string }[];
  disclaimer: string;
};

export function buildSynastryReport(input: {
  aspects: SynastryAspect[];
  sunA: string;
  sunB: string;
  moonA: string;
  moonB: string;
}): SynastryReport {
  const { aspects, sunA, sunB } = input;

  let harmony = 50;
  for (const a of aspects) {
    if (a.tone === "harmonisch") harmony += 4;
    else if (a.tone === "herausfordernd") harmony -= 5;
    else harmony += 0;
  }
  harmony = Math.max(12, Math.min(94, Math.round(harmony)));

  const top = aspects.slice(0, 12);
  const aspectTexts = top.map(aspectSentence);

  const chemistryLine =
    aspects.length > 0
      ? `Aus astrologischer Sicht gibt es ${aspects.length} markante Winkel zwischen euren klassischen Paar-Planeten (Sonne bis Saturn) – die stärksten siehst du unten.`
      : "Zwischen den berechneten Planetenlagen gibt es in der gewählten Orb-Toleranz keine klassischen Hauptaspekte – das heißt nicht „weniger Paar-Potenzial“, sondern andere Schwerpunkte (z. B. Häuser, langsame Planeten).";

  const summary = `Sonnenzeichen: **${sunA}** trifft auf **${sunB}**. Die folgende Auswertung basiert auf **Synastry**: echten Planetenpositionen zum Geburtszeitpunkt und -ort beider Personen, verglichen über Aspekte (Winkel) zwischen Sonne, Mond, Merkur, Venus, Mars, Jupiter und Saturn.`;

  const sections: { title: string; body: string }[] = [
    {
      title: "Was Synastry hier leistet",
      body:
        "Synastry vergleicht zwei Horoskope: Wo eure Planeten „im Dialog“ stehen (z. B. Trigon, Quadrat), zeigt sich, **wie** Themen wie Nähe, Kommunikation, Konflikt und Unterstützung zusammenspielen können. Es ist ein **Deutungsrahmen**, kein Schicksalsurteil.",
    },
    {
      title: "Harmonie-Score (heuristisch)",
      body: `Der Score ${harmony}/100 fasst harmonische vs. herausfordernde Aspekte grob zusammen – **rein illustrativ**, nicht wissenschaftlich messbar.`,
    },
  ];

  const disclaimer =
    "Hinweis: Diese Analyse ersetzt keine Beratung in Psychotherapie, Medizin oder Recht. Astrologische Deutungen sind subjektiv und sollen dich anregen, nicht entscheiden.";

  return {
    harmonyScore: harmony,
    summary,
    chemistryLine,
    aspects: top,
    aspectTexts,
    sections,
    disclaimer,
  };
}
