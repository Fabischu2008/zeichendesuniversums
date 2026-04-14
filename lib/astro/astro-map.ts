import * as Astronomy from "astronomy-engine";

export type AstroMapAngle = "MC" | "IC" | "AC" | "DC";

export type AstroMapPoint = {
  lat: number;
  lon: number;
};

export type AstroMapLine = {
  id: string;
  planetKey: string;
  planetName: string;
  glyph: string;
  angle: AstroMapAngle;
  theme: string;
  color: string;
  points: AstroMapPoint[];
};

export type AstroPlanetAnalysis = {
  planetKey: string;
  planetName: string;
  glyph: string;
  theme: string;
  color: string;
  summary: string;
  activationHint: string;
  angles: Array<{
    angle: AstroMapAngle;
    title: string;
    meaning: string;
    opportunities: string[];
    challenges: string[];
    practices: string[];
    lineId: string | null;
  }>;
};

export type AstroMapQuality = {
  mcIcHourAngleMaxErrorHours: number;
  acDcAltitudeMaxErrorDegrees: number;
  sampledPoints: number;
};

type PlanetConfig = {
  key: string;
  name: string;
  glyph: string;
  body: Astronomy.Body;
  theme: string;
  color: string;
};

const PLANETS: PlanetConfig[] = [
  {
    key: "sun",
    name: "Sonne",
    glyph: "☉",
    body: Astronomy.Body.Sun,
    theme: "Sichtbarkeit, Selbstvertrauen, Führung",
    color: "#f59e0b",
  },
  {
    key: "moon",
    name: "Mond",
    glyph: "☾",
    body: Astronomy.Body.Moon,
    theme: "Emotionale Sicherheit, Zuhause, Intuition",
    color: "#60a5fa",
  },
  {
    key: "mercury",
    name: "Merkur",
    glyph: "☿",
    body: Astronomy.Body.Mercury,
    theme: "Denken, Sprache, Lernen, Handel",
    color: "#14b8a6",
  },
  {
    key: "venus",
    name: "Venus",
    glyph: "♀",
    body: Astronomy.Body.Venus,
    theme: "Liebe, Harmonie, Beziehungsqualität",
    color: "#ec4899",
  },
  {
    key: "mars",
    name: "Mars",
    glyph: "♂",
    body: Astronomy.Body.Mars,
    theme: "Antrieb, Durchsetzung, körperliche Energie",
    color: "#ef4444",
  },
  {
    key: "jupiter",
    name: "Jupiter",
    glyph: "♃",
    body: Astronomy.Body.Jupiter,
    theme: "Wachstum, Chancen, Weitblick",
    color: "#22c55e",
  },
  {
    key: "saturn",
    name: "Saturn",
    glyph: "♄",
    body: Astronomy.Body.Saturn,
    theme: "Verantwortung, Struktur, Langfristigkeit",
    color: "#8b5cf6",
  },
  {
    key: "uranus",
    name: "Uranus",
    glyph: "♅",
    body: Astronomy.Body.Uranus,
    theme: "Freiheit, Innovation, Brüche, Erwachen",
    color: "#06b6d4",
  },
  {
    key: "neptune",
    name: "Neptun",
    glyph: "♆",
    body: Astronomy.Body.Neptune,
    theme: "Spiritualität, Vision, Kunst, Auflösung",
    color: "#6366f1",
  },
  {
    key: "pluto",
    name: "Pluto",
    glyph: "♇",
    body: Astronomy.Body.Pluto,
    theme: "Tiefe Transformation, Macht, Regeneration",
    color: "#7c3aed",
  },
];

function normalizeLongitude(degrees: number): number {
  let x = degrees % 360;
  if (x < -180) x += 360;
  if (x > 180) x -= 360;
  return x;
}

function isFiniteNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

function computeMeridianPoints(longitude: number): AstroMapPoint[] {
  return [
    { lat: -80, lon: normalizeLongitude(longitude) },
    { lat: 80, lon: normalizeLongitude(longitude) },
  ];
}

function computeHorizonCurvePoints(input: {
  raHours: number;
  decDegrees: number;
  gstHours: number;
  rising: boolean;
}): AstroMapPoint[] {
  const points: AstroMapPoint[] = [];
  const decRad = (input.decDegrees * Math.PI) / 180;

  for (let lat = -80; lat <= 80; lat += 1) {
    const latRad = (lat * Math.PI) / 180;
    const rawCosH = -Math.tan(latRad) * Math.tan(decRad);
    if (!isFiniteNumber(rawCosH)) continue;
    if (rawCosH < -1 || rawCosH > 1) continue;
    const cosH = Math.max(-1, Math.min(1, rawCosH));

    const hRad = Math.acos(cosH);
    const hHours = ((hRad * 180) / Math.PI) / 15;
    const lstHours = input.rising
      ? input.raHours - hHours
      : input.raHours + hHours;
    const lon = normalizeLongitude((lstHours - input.gstHours) * 15);

    points.push({ lat, lon });
  }

  return points;
}

function normalizeHours(hours: number): number {
  let h = hours % 24;
  if (h < 0) h += 24;
  return h;
}

function shortestHourDistance(a: number, b: number): number {
  const d = Math.abs(a - b);
  return d > 12 ? 24 - d : d;
}

export function buildAstrocartographyLines(dateUtc: Date): AstroMapLine[] {
  const t = new Astronomy.AstroTime(dateUtc);
  const gstHours = Astronomy.SiderealTime(t);
  const lines: AstroMapLine[] = [];

  for (const p of PLANETS) {
    // Astrocartography uses geocentric planetary positions; this avoids
    // observer-dependent parallax shifts (especially relevant for the Moon).
    const geoVec = Astronomy.GeoVector(p.body, dateUtc, true);
    const eq = Astronomy.EquatorFromVector(geoVec);
    const raHours = eq.ra;
    const decDegrees = eq.dec;
    const mcLon = normalizeLongitude((raHours - gstHours) * 15);
    const icLon = normalizeLongitude(mcLon + 180);

    lines.push({
      id: `${p.key}-mc`,
      planetKey: p.key,
      planetName: p.name,
      glyph: p.glyph,
      angle: "MC",
      theme: p.theme,
      color: p.color,
      points: computeMeridianPoints(mcLon),
    });
    lines.push({
      id: `${p.key}-ic`,
      planetKey: p.key,
      planetName: p.name,
      glyph: p.glyph,
      angle: "IC",
      theme: p.theme,
      color: p.color,
      points: computeMeridianPoints(icLon),
    });

    const acPoints = computeHorizonCurvePoints({
      raHours,
      decDegrees,
      gstHours,
      rising: true,
    });
    if (acPoints.length >= 2) {
      lines.push({
        id: `${p.key}-ac`,
        planetKey: p.key,
        planetName: p.name,
        glyph: p.glyph,
        angle: "AC",
        theme: p.theme,
        color: p.color,
        points: acPoints,
      });
    }

    const dcPoints = computeHorizonCurvePoints({
      raHours,
      decDegrees,
      gstHours,
      rising: false,
    });
    if (dcPoints.length >= 2) {
      lines.push({
        id: `${p.key}-dc`,
        planetKey: p.key,
        planetName: p.name,
        glyph: p.glyph,
        angle: "DC",
        theme: p.theme,
        color: p.color,
        points: dcPoints,
      });
    }
  }

  return lines;
}

function angleMeaningText(planet: string): Record<AstroMapAngle, string> {
  return {
    MC: `${planet} am MC stärkt Sichtbarkeit im Außen: Beruf, Ruf, Wirkung und Richtung.`,
    IC: `${planet} am IC wirkt im Inneren: Zuhause, Familie, Wurzeln und emotionale Basis.`,
    AC: `${planet} am AC zeigt sich direkt im Auftreten: erste Wirkung, Energie, neue Starts.`,
    DC: `${planet} am DC wird über Beziehungen aktiviert: Partnerschaft, Begegnungen, Spiegelung.`,
  };
}

function angleCoaching(angle: AstroMapAngle): {
  opportunities: string[];
  challenges: string[];
  practices: string[];
} {
  if (angle === "MC") {
    return {
      opportunities: [
        "Karriere-Sichtbarkeit und klarere berufliche Richtung",
        "Öffentliche Anerkennung und stärkere Außenwirkung",
      ],
      challenges: [
        "Druck, ständig zu performen",
        "Überidentifikation mit Status oder Erfolg",
      ],
      practices: [
        "Berufliche Ziele schriftlich priorisieren",
        "Aktive Netzwerkarbeit mit klarer Positionierung",
      ],
    };
  }
  if (angle === "IC") {
    return {
      opportunities: [
        "Tiefe emotionale Stabilisierung und inneres Ankommen",
        "Heilsame Arbeit mit Familie, Herkunft und Zuhause",
      ],
      challenges: [
        "Rückzugstendenz oder emotionale Überflutung",
        "Alte Familienthemen werden reaktiviert",
      ],
      practices: [
        "Routinen für Nervensystem und Erholung aufbauen",
        "Wohnraum bewusst als Kraftort gestalten",
      ],
    };
  }
  if (angle === "AC") {
    return {
      opportunities: [
        "Schnellere Neuanfänge und persönlicher Momentum-Boost",
        "Stärkere Präsenz und unmittelbare Selbstwirksamkeit",
      ],
      challenges: [
        "Impulsivität oder Identitäts-Übersteuerung",
        "Zu viele parallele Neustarts",
      ],
      practices: [
        "Klarer Fokus auf 1-2 Kernprojekte",
        "Körperliche Regulation zur Erdung der Energie",
      ],
    };
  }
  return {
    opportunities: [
      "Wichtige Begegnungen, Kooperationen und Spiegelprozesse",
      "Beschleunigte Beziehungs- und Team-Lernkurven",
    ],
    challenges: [
      "Abhängigkeiten, Projektionen oder Grenzthemen",
      "Konflikte durch unausgesprochene Erwartungen",
    ],
    practices: [
      "Beziehungsabsprachen explizit formulieren",
      "Aktive Kommunikations- und Konflikthygiene",
    ],
  };
}

export function buildAstroPlanetAnalyses(lines: AstroMapLine[]): AstroPlanetAnalysis[] {
  const byPlanet = new Map<string, AstroMapLine[]>();
  for (const line of lines) {
    const list = byPlanet.get(line.planetKey) ?? [];
    list.push(line);
    byPlanet.set(line.planetKey, list);
  }

  return PLANETS.map((planet) => {
    const planetLines = byPlanet.get(planet.key) ?? [];
    const lineByAngle = new Map<AstroMapAngle, AstroMapLine>();
    for (const line of planetLines) lineByAngle.set(line.angle, line);
    const meanings = angleMeaningText(planet.name);
    return {
      planetKey: planet.key,
      planetName: planet.name,
      glyph: planet.glyph,
      theme: planet.theme,
      color: planet.color,
      summary: `${planet.name} steht für ${planet.theme.toLowerCase()}. Diese Linie wirkt besonders stark bei Reisen, Umzug oder längeren Aufenthalten in Liniennähe.`,
      activationHint:
        "Praxisregel: Je näher du an einer Linie bist (ca. bis 250-300 km), desto deutlicher spürst du das Thema.",
      angles: (["MC", "IC", "AC", "DC"] as AstroMapAngle[]).map((angle) => {
        const coaching = angleCoaching(angle);
        return {
          angle,
          title: `${planet.glyph} ${planet.name} ${angle}`,
          meaning: meanings[angle],
          opportunities: coaching.opportunities,
          challenges: coaching.challenges,
          practices: coaching.practices,
          lineId: lineByAngle.get(angle)?.id ?? null,
        };
      }),
    };
  });
}

export function evaluateAstroMapQuality(input: {
  dateUtc: Date;
  lines: AstroMapLine[];
}): AstroMapQuality {
  const t = new Astronomy.AstroTime(input.dateUtc);
  const gstHours = Astronomy.SiderealTime(t);

  let mcIcHourAngleMaxErrorHours = 0;
  let acDcAltitudeMaxErrorDegrees = 0;
  let sampledPoints = 0;

  const bodyByPlanet = new Map<string, Astronomy.Body>(
    PLANETS.map((p) => [p.key, p.body]),
  );

  for (const line of input.lines) {
    const body = bodyByPlanet.get(line.planetKey);
    if (body === undefined) continue;
    const eq = Astronomy.EquatorFromVector(Astronomy.GeoVector(body, input.dateUtc, true));

    if (line.angle === "MC" || line.angle === "IC") {
      const lon = line.points[0]?.lon;
      if (!isFiniteNumber(lon)) continue;
      const hourAngle = normalizeHours(gstHours + lon / 15 - eq.ra);
      const target = line.angle === "MC" ? 0 : 12;
      const err = shortestHourDistance(hourAngle, target);
      if (err > mcIcHourAngleMaxErrorHours) mcIcHourAngleMaxErrorHours = err;
      continue;
    }

    if (line.angle === "AC" || line.angle === "DC") {
      const step = Math.max(1, Math.floor(line.points.length / 10));
      for (let i = 0; i < line.points.length; i += step) {
        const pt = line.points[i];
        if (!pt) continue;
        const obs = new Astronomy.Observer(pt.lat, pt.lon, 0);
        const h = Astronomy.Horizon(input.dateUtc, obs, eq.ra, eq.dec, "normal");
        const altAbs = Math.abs(h.altitude);
        if (altAbs > acDcAltitudeMaxErrorDegrees) acDcAltitudeMaxErrorDegrees = altAbs;
        sampledPoints += 1;
      }
    }
  }

  return {
    mcIcHourAngleMaxErrorHours,
    acDcAltitudeMaxErrorDegrees,
    sampledPoints,
  };
}
