/**
 * Smoke-Test: Vollprofil wie `/api/tools/profile` (Vollreport-Basis) für mehrere Welt-Orte.
 * Prüft u. a. Mondknoten, Chiron und Narrativ-Felder.
 * Ausführen: TSX_DISABLE_IPC=1 npx tsx scripts/test-world-full-profile.ts
 */
import { computeProfileFromBirth } from "@/lib/astro/birth-to-profile";

type Case = {
  label: string;
  date: string;
  time: string;
  location: { name: string; lat: number; lon: number; countryCode?: string };
};

const cases: Case[] = [
  {
    label: "Tokyo",
    date: "1995-06-15",
    time: "14:30",
    location: { name: "Tokyo", lat: 35.6762, lon: 139.6503, countryCode: "JP" },
  },
  {
    label: "New York",
    date: "1988-03-22",
    time: "09:15",
    location: {
      name: "New York",
      lat: 40.7128,
      lon: -74.006,
      countryCode: "US",
    },
  },
  {
    label: "Sydney",
    date: "2000-12-01",
    time: "18:45",
    location: {
      name: "Sydney",
      lat: -33.8688,
      lon: 151.2093,
      countryCode: "AU",
    },
  },
  {
    label: "Nairobi",
    date: "1975-01-10",
    time: "06:00",
    location: {
      name: "Nairobi",
      lat: -1.2921,
      lon: 36.8219,
      countryCode: "KE",
    },
  },
  {
    label: "São Paulo",
    date: "1992-11-28",
    time: "23:40",
    location: {
      name: "São Paulo",
      lat: -23.5505,
      lon: -46.6333,
      countryCode: "BR",
    },
  },
  {
    label: "Mumbai",
    date: "1980-07-04",
    time: "12:00",
    location: { name: "Mumbai", lat: 19.076, lon: 72.8777, countryCode: "IN" },
  },
  {
    label: "Reykjavik",
    date: "2003-01-20",
    time: "08:00",
    location: { name: "Reykjavik", lat: 64.1466, lon: -21.9426, countryCode: "IS" },
  },
  {
    label: "Anchorage",
    date: "2011-07-07",
    time: "16:20",
    location: { name: "Anchorage", lat: 61.2181, lon: -149.9003, countryCode: "US" },
  },
  {
    label: "Cape Town",
    date: "1999-04-02",
    time: "05:10",
    location: { name: "Cape Town", lat: -33.9249, lon: 18.4241, countryCode: "ZA" },
  },
  {
    label: "Bangkok",
    date: "1984-08-18",
    time: "19:00",
    location: { name: "Bangkok", lat: 13.7563, lon: 100.5018, countryCode: "TH" },
  },
  {
    label: "Mexico City",
    date: "1972-12-12",
    time: "03:45",
    location: {
      name: "Mexico City",
      lat: 19.4326,
      lon: -99.1332,
      countryCode: "MX",
    },
  },
];

function shortProfileSummary(p: ReturnType<typeof computeProfileFromBirth>["profile"]) {
  const sun = p.planets.find((x) => x.key === "sun");
  const moon = p.planets.find((x) => x.key === "moon");
  const venus = p.planets.find((x) => x.key === "venus");
  const mc = p.chart.angles.mc;
  const asc = p.chart.angles.asc;
  return {
    archetype: p.archetype.title,
    sun: sun ? `${sun.sign} H${sun.house}` : "?",
    moon: moon ? `${moon.sign} H${moon.house}` : "?",
    venus: venus ? `${venus.sign} H${venus.house}` : "?",
    ascDeg: asc.toFixed(2),
    mcDeg: mc.toFixed(2),
    points: p.chart.points.length,
  };
}

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}

let chironMissing = 0;

for (const c of cases) {
  const { profile, big3, meta } = computeProfileFromBirth({
    date: c.date,
    time: c.time,
    location: c.location,
  });
  console.log("\n===", c.label, "===");
  console.log("tz:", meta.tz, "| utc:", meta.utc);
  console.log("big3:", big3);
  console.log("summary:", shortProfileSummary(profile));

  const keys = new Set(profile.specialPoints.map((s) => s.key));
  assert(keys.has("north_node"), `${c.label}: Nordknoten fehlt`);
  assert(keys.has("south_node"), `${c.label}: Südknoten fehlt`);
  assert(
    profile.narrative.nodesInsight.length > 80,
    `${c.label}: nodesInsight zu kurz`,
  );

  if (keys.has("chiron")) {
    assert(
      Boolean(profile.narrative.chironInsight),
      `${c.label}: Chiron ohne chironInsight`,
    );
  } else {
    chironMissing += 1;
    console.warn(`WARN ${c.label}: Chiron nicht in specialPoints`);
  }
}

if (chironMissing === cases.length) {
  throw new Error("Chiron fehlt in allen Fällen – Engine/Version prüfen.");
}

console.log("\nOK: alle Fälle mit Mondknoten; Chiron in", cases.length - chironMissing, "/", cases.length, "Fällen.");
