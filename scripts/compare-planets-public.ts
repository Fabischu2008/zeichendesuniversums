/* eslint-disable no-console */
import { computeProfileFromBirth } from "@/lib/astro/birth-to-profile";
import { spawnSync } from "node:child_process";

type CityFeature = {
  properties?: { name?: string; adm0name?: string };
  geometry?: { coordinates?: [number, number] };
};

type Case = {
  id: number;
  city: string;
  country: string;
  lat: number;
  lon: number;
  date: string;
  time: string;
};

const PLANET_KEYS = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
] as const;

function rng(seed: number) {
  let x = seed >>> 0;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

function pickDateTime(r: () => number) {
  const year = 1970 + Math.floor(r() * 56);
  const month = 1 + Math.floor(r() * 12);
  const day = 1 + Math.floor(r() * 28);
  const hour = Math.floor(r() * 24);
  const minute = Math.floor(r() * 60);
  return {
    date: `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
  };
}

function angularDiffDeg(a: number, b: number) {
  const x = ((a % 360) + 360) % 360;
  const y = ((b % 360) + 360) % 360;
  const d = Math.abs(x - y);
  return d > 180 ? 360 - d : d;
}

function signIndex(lon: number) {
  const x = ((lon % 360) + 360) % 360;
  return Math.floor(x / 30) % 12;
}

function parseArgs() {
  const countArg = process.argv.find((a) => a.startsWith("--count="));
  const seedArg = process.argv.find((a) => a.startsWith("--seed="));
  return {
    count: countArg ? Number(countArg.split("=")[1]) : 1000,
    seed: seedArg ? Number(seedArg.split("=")[1]) : 43,
  };
}

async function loadCities() {
  const url =
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_populated_places_simple.geojson";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`City dataset fetch failed: HTTP ${res.status}`);
  const data = (await res.json()) as { features?: CityFeature[] };
  return (
    data.features
      ?.map((f) => {
        const c = f.geometry?.coordinates;
        if (!c) return null;
        return {
          city: f.properties?.name || "Unknown",
          country: f.properties?.adm0name || "Unknown",
          lon: c[0],
          lat: c[1],
        };
      })
      .filter((x): x is { city: string; country: string; lat: number; lon: number } => Boolean(x)) || []
  );
}

async function main() {
  const { count, seed } = parseArgs();
  const r = rng(seed);
  const cities = await loadCities();
  if (cities.length === 0) throw new Error("No public cities loaded.");

  const cases: Case[] = Array.from({ length: count }, (_, i) => {
    const city = cities[Math.floor(r() * cities.length)];
    const dt = pickDateTime(r);
    return {
      id: i + 1,
      city: city.city,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      ...dt,
    };
  });

  const app = new Map<
    number,
    { planets: Record<(typeof PLANET_KEYS)[number], number>; utc: string }
  >();
  for (const c of cases) {
    const out = computeProfileFromBirth({
      date: c.date,
      time: c.time,
      location: { name: `${c.city}, ${c.country}`, lat: c.lat, lon: c.lon },
    });
    const row = {} as Record<(typeof PLANET_KEYS)[number], number>;
    for (const k of PLANET_KEYS) {
      const p = out.profile.planets.find((x) => x.key === k);
      if (!p) throw new Error(`Missing planet ${k}`);
      row[k] = p.longitude;
    }
    app.set(c.id, { planets: row, utc: out.meta.utc });
  }

  const py = spawnSync("python3", ["scripts/swiss_planets_batch.py"], {
    input: JSON.stringify({
      cases: cases.map((c) => ({
        id: c.id,
        date: c.date,
        time: c.time,
        lat: c.lat,
        lon: c.lon,
        utc: app.get(c.id)?.utc,
      })),
    }),
    encoding: "utf8",
    maxBuffer: 15 * 1024 * 1024,
  });
  if (py.status !== 0) throw new Error(`Python failed: ${py.stderr || py.stdout}`);
  const ref = JSON.parse(py.stdout) as {
    results: Array<{ id: number; tz: string; planets: Record<string, number> }>;
    skipped: number;
  };

  const stats = Object.fromEntries(
    PLANET_KEYS.map((k) => [k, { n: 0, sumDiff: 0, maxDiff: 0, signMatch: 0 }]),
  ) as Record<(typeof PLANET_KEYS)[number], { n: number; sumDiff: number; maxDiff: number; signMatch: number }>;

  let compared = 0;
  const worstRows: Array<{ id: number; city: string; country: string; date: string; time: string; planet: string; diff: number }> = [];

  for (const row of ref.results) {
    const a = app.get(row.id);
    if (!a) continue;
    compared += 1;
    const c = cases[row.id - 1];
    for (const k of PLANET_KEYS) {
      const ours = a.planets[k];
      const theirs = row.planets[k];
      const d = angularDiffDeg(ours, theirs);
      const s = stats[k];
      s.n += 1;
      s.sumDiff += d;
      if (d > s.maxDiff) s.maxDiff = d;
      if (signIndex(ours) === signIndex(theirs)) s.signMatch += 1;
      worstRows.push({
        id: row.id,
        city: c.city,
        country: c.country,
        date: c.date,
        time: c.time,
        planet: k,
        diff: d,
      });
    }
  }

  worstRows.sort((a, b) => b.diff - a.diff);

  console.log("=== Planets Public Comparison (App vs Swiss Ephemeris) ===");
  console.log(`Generated cases: ${cases.length}`);
  console.log(`Compared cases: ${compared}`);
  console.log(`Skipped by Swiss side: ${ref.skipped}`);
  console.log("");
  console.log("Per-planet accuracy:");
  for (const k of PLANET_KEYS) {
    const s = stats[k];
    const mean = s.n === 0 ? 0 : s.sumDiff / s.n;
    const signPct = s.n === 0 ? 0 : (s.signMatch / s.n) * 100;
    console.log(
      `${k.padEnd(8)} signMatch=${s.signMatch}/${s.n} (${signPct.toFixed(2)}%)` +
        ` | meanDiff=${mean.toFixed(4)}° | maxDiff=${s.maxDiff.toFixed(4)}°`,
    );
  }
  console.log("");
  console.log("Top 20 worst angular diffs:");
  for (const w of worstRows.slice(0, 20)) {
    console.log(
      `#${w.id} ${w.city}, ${w.country} ${w.date} ${w.time} ${w.planet} diff=${w.diff.toFixed(4)}°`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
