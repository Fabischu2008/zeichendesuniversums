/* eslint-disable no-console */
import { computeProfileFromBirth } from "@/lib/astro/birth-to-profile";
import { spawnSync } from "node:child_process";

type CityFeature = {
  type: "Feature";
  properties?: { name?: string; adm0name?: string };
  geometry?: { type: "Point"; coordinates?: [number, number] };
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
  const year = 1970 + Math.floor(r() * 56); // 1970..2025
  const month = 1 + Math.floor(r() * 12);
  const day = 1 + Math.floor(r() * 28);
  const hour = Math.floor(r() * 24);
  const minute = Math.floor(r() * 60);
  return {
    date: `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
  };
}

function parseArgs() {
  const countArg = process.argv.find((a) => a.startsWith("--count="));
  const seedArg = process.argv.find((a) => a.startsWith("--seed="));
  const count = countArg ? Number(countArg.split("=")[1]) : 1000;
  const seed = seedArg ? Number(seedArg.split("=")[1]) : 42;
  return { count, seed };
}

async function loadPublicCities(): Promise<Array<{ city: string; country: string; lat: number; lon: number }>> {
  const url =
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_populated_places_simple.geojson";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`City dataset fetch failed: HTTP ${res.status}`);
  }
  const json = (await res.json()) as { features?: CityFeature[] };
  const rows =
    json.features
      ?.map((f) => {
        const coords = f.geometry?.coordinates;
        if (!coords || coords.length < 2) return null;
        return {
          city: f.properties?.name || "Unknown",
          country: f.properties?.adm0name || "Unknown",
          lon: coords[0],
          lat: coords[1],
        };
      })
      .filter((x): x is { city: string; country: string; lat: number; lon: number } => Boolean(x)) || [];
  return rows;
}

async function main() {
  const { count, seed } = parseArgs();
  const r = rng(seed);
  const cities = await loadPublicCities();
  if (cities.length === 0) {
    throw new Error("No cities loaded from public dataset.");
  }

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

  const appResults = new Map<
    number,
    { sun: string; moon: string; ascendant: string; ok: boolean; error?: string }
  >();

  for (const c of cases) {
    try {
      const result = computeProfileFromBirth({
        date: c.date,
        time: c.time,
        location: {
          name: `${c.city}, ${c.country}`,
          lat: c.lat,
          lon: c.lon,
        },
      });
      appResults.set(c.id, {
        sun: result.big3.sun.replace("ö", "oe").replace("ü", "ue"),
        moon: result.big3.moon.replace("ö", "oe").replace("ü", "ue"),
        ascendant: result.big3.ascendant.replace("ö", "oe").replace("ü", "ue"),
        ok: true,
      });
    } catch (e) {
      appResults.set(c.id, {
        sun: "",
        moon: "",
        ascendant: "",
        ok: false,
        error: e instanceof Error ? e.message : "unknown",
      });
    }
  }

  const py = spawnSync("python3", ["scripts/swiss_big3_batch.py"], {
    input: JSON.stringify({
      cases: cases.map((c) => ({
        id: c.id,
        date: c.date,
        time: c.time,
        lat: c.lat,
        lon: c.lon,
      })),
    }),
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  if (py.status !== 0) {
    throw new Error(`Python comparison failed: ${py.stderr || py.stdout}`);
  }

  const pyParsed = JSON.parse(py.stdout) as {
    results: Array<{ id: number; sun: string; moon: string; ascendant: string; tz: string }>;
    skipped: number;
  };

  let compared = 0;
  let fullMatch = 0;
  let sunMatch = 0;
  let moonMatch = 0;
  let ascMatch = 0;
  const mismatches: Array<{
    id: number;
    city: string;
    country: string;
    date: string;
    time: string;
    app: { sun: string; moon: string; ascendant: string };
    swiss: { sun: string; moon: string; ascendant: string; tz: string };
  }> = [];

  for (const ref of pyParsed.results) {
    const app = appResults.get(ref.id);
    const c = cases[ref.id - 1];
    if (!app || !app.ok) continue;
    compared += 1;
    const s = app.sun === ref.sun;
    const m = app.moon === ref.moon;
    const a = app.ascendant === ref.ascendant;
    if (s) sunMatch += 1;
    if (m) moonMatch += 1;
    if (a) ascMatch += 1;
    if (s && m && a) {
      fullMatch += 1;
    } else {
      mismatches.push({
        id: ref.id,
        city: c.city,
        country: c.country,
        date: c.date,
        time: c.time,
        app: { sun: app.sun, moon: app.moon, ascendant: app.ascendant },
        swiss: {
          sun: ref.sun,
          moon: ref.moon,
          ascendant: ref.ascendant,
          tz: ref.tz,
        },
      });
    }
  }

  const pct = (x: number, n: number) => (n === 0 ? "0.00" : ((x / n) * 100).toFixed(2));

  console.log("=== Big3 Public Dataset Comparison ===");
  console.log(`Public dataset source: Natural Earth populated places`);
  console.log(`Generated cases: ${cases.length}`);
  console.log(`Compared cases: ${compared}`);
  console.log(`Skipped by Swiss side (no timezone): ${pyParsed.skipped}`);
  console.log(`Full match (Sun+Moon+Asc): ${fullMatch}/${compared} (${pct(fullMatch, compared)}%)`);
  console.log(`Sun match: ${sunMatch}/${compared} (${pct(sunMatch, compared)}%)`);
  console.log(`Moon match: ${moonMatch}/${compared} (${pct(moonMatch, compared)}%)`);
  console.log(`Asc match: ${ascMatch}/${compared} (${pct(ascMatch, compared)}%)`);
  console.log("");
  console.log("Top 20 mismatches:");
  for (const row of mismatches.slice(0, 20)) {
    console.log(
      `#${row.id} ${row.city}, ${row.country} ${row.date} ${row.time} tz=${row.swiss.tz}` +
        ` | app=(${row.app.sun},${row.app.moon},${row.app.ascendant})` +
        ` | swiss=(${row.swiss.sun},${row.swiss.moon},${row.swiss.ascendant})`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
