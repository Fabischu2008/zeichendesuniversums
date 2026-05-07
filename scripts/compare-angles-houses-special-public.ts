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

function norm(x: number) {
  const v = x % 360;
  return v < 0 ? v + 360 : v;
}

function angDiff(a: number, b: number) {
  const d = Math.abs(norm(a) - norm(b));
  return d > 180 ? 360 - d : d;
}

function signIndex(lon: number) {
  return Math.floor(norm(lon) / 30) % 12;
}

function wholeSignHouseFromAsc(ascLon: number, pointLon: number) {
  const ascSignIndex = signIndex(ascLon);
  const pointSignIndex = signIndex(pointLon);
  return ((pointSignIndex - ascSignIndex + 12) % 12) + 1;
}

function parseArgs() {
  const countArg = process.argv.find((a) => a.startsWith("--count="));
  const seedArg = process.argv.find((a) => a.startsWith("--seed="));
  return {
    count: countArg ? Number(countArg.split("=")[1]) : 1000,
    seed: seedArg ? Number(seedArg.split("=")[1]) : 44,
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

  const cases: Case[] = Array.from({ length: count }, (_, i) => {
    const city = cities[Math.floor(r() * cities.length)];
    const dt = pickDateTime(r);
    return { id: i + 1, city: city.city, country: city.country, lat: city.lat, lon: city.lon, ...dt };
  });

  const app = new Map<
    number,
    {
      utc: string;
      angles: { asc: number; mc: number; dsc: number; ic: number };
      sunLon: number;
      moonLon: number;
      sunHouse: number;
      moonHouse: number;
      special: Partial<Record<"north_node" | "south_node" | "lilith" | "chiron", number>>;
    }
  >();

  for (const c of cases) {
    const out = computeProfileFromBirth({
      date: c.date,
      time: c.time,
      location: { name: `${c.city}, ${c.country}`, lat: c.lat, lon: c.lon },
    });
    const sun = out.profile.planets.find((p) => p.key === "sun");
    const moon = out.profile.planets.find((p) => p.key === "moon");
    if (!sun || !moon) throw new Error("Sun/Moon missing");
    const sp: Partial<Record<"north_node" | "south_node" | "lilith" | "chiron", number>> = {};
    for (const key of ["north_node", "south_node", "lilith", "chiron"] as const) {
      const item = out.profile.specialPoints.find((s) => s.key === key);
      if (item) sp[key] = item.longitude;
    }
    app.set(c.id, {
      utc: out.meta.utc,
      angles: out.profile.chart.angles,
      sunLon: sun.longitude,
      moonLon: moon.longitude,
      sunHouse: sun.house,
      moonHouse: moon.house,
      special: sp,
    });
  }

  const py = spawnSync("python3", ["scripts/swiss_angles_special_batch.py"], {
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
    results: Array<{
      id: number;
      angles: { asc: number; mc: number; dsc: number; ic: number };
      planets: { sun: number; moon: number };
      special: { north_node: number; south_node: number; lilith: number; chiron: number | null };
      tz: string;
    }>;
    skipped: number;
  };

  let compared = 0;
  let ascSignMatch = 0;
  let mcSignMatch = 0;
  let sunHouseMatch = 0;
  let moonHouseMatch = 0;
  let ascDiffSum = 0;
  let mcDiffSum = 0;
  let ascDiffMax = 0;
  let mcDiffMax = 0;

  let nodeDiffSum = 0;
  let lilithDiffSum = 0;
  let chironDiffSum = 0;
  let nodeN = 0;
  let lilithN = 0;
  let chironN = 0;

  const worstAsc: Array<{ id: number; city: string; country: string; date: string; time: string; diff: number }> = [];

  for (const row of ref.results) {
    const a = app.get(row.id);
    if (!a) continue;
    compared += 1;
    const c = cases[row.id - 1];

    const ascD = angDiff(a.angles.asc, row.angles.asc);
    const mcD = angDiff(a.angles.mc, row.angles.mc);
    ascDiffSum += ascD;
    mcDiffSum += mcD;
    if (ascD > ascDiffMax) ascDiffMax = ascD;
    if (mcD > mcDiffMax) mcDiffMax = mcD;

    if (signIndex(a.angles.asc) === signIndex(row.angles.asc)) ascSignMatch += 1;
    if (signIndex(a.angles.mc) === signIndex(row.angles.mc)) mcSignMatch += 1;

    const sunHouseRef = wholeSignHouseFromAsc(row.angles.asc, row.planets.sun);
    const moonHouseRef = wholeSignHouseFromAsc(row.angles.asc, row.planets.moon);
    if (a.sunHouse === sunHouseRef) sunHouseMatch += 1;
    if (a.moonHouse === moonHouseRef) moonHouseMatch += 1;

    const appNorth = a.special.north_node;
    const appLilith = a.special.lilith;
    if (typeof appNorth === "number") {
      nodeDiffSum += angDiff(appNorth, row.special.north_node);
      nodeN += 1;
    }
    if (typeof appLilith === "number") {
      lilithDiffSum += angDiff(appLilith, row.special.lilith);
      lilithN += 1;
    }
    const appChiron = a.special.chiron;
    if (typeof appChiron === "number" && typeof row.special.chiron === "number") {
      chironDiffSum += angDiff(appChiron, row.special.chiron);
      chironN += 1;
    }

    worstAsc.push({
      id: row.id,
      city: c.city,
      country: c.country,
      date: c.date,
      time: c.time,
      diff: ascD,
    });
  }

  worstAsc.sort((x, y) => y.diff - x.diff);
  const pct = (x: number, n: number) => (n === 0 ? "0.00" : ((x / n) * 100).toFixed(2));

  console.log("=== Angles/Houses/Special Comparison (App vs Swiss) ===");
  console.log(`Generated cases: ${cases.length}`);
  console.log(`Compared cases: ${compared}`);
  console.log(`Skipped by Swiss side: ${ref.skipped}`);
  console.log("");
  console.log(`Asc sign match: ${ascSignMatch}/${compared} (${pct(ascSignMatch, compared)}%)`);
  console.log(`MC sign match: ${mcSignMatch}/${compared} (${pct(mcSignMatch, compared)}%)`);
  console.log(`Asc mean diff: ${(ascDiffSum / Math.max(1, compared)).toFixed(4)}° | max: ${ascDiffMax.toFixed(4)}°`);
  console.log(`MC mean diff: ${(mcDiffSum / Math.max(1, compared)).toFixed(4)}° | max: ${mcDiffMax.toFixed(4)}°`);
  console.log("");
  console.log(`Sun house match (whole-sign): ${sunHouseMatch}/${compared} (${pct(sunHouseMatch, compared)}%)`);
  console.log(`Moon house match (whole-sign): ${moonHouseMatch}/${compared} (${pct(moonHouseMatch, compared)}%)`);
  console.log("");
  console.log(`North Node mean diff: ${(nodeDiffSum / Math.max(1, nodeN)).toFixed(4)}° (n=${nodeN})`);
  console.log(`Lilith(mean apogee) mean diff: ${(lilithDiffSum / Math.max(1, lilithN)).toFixed(4)}° (n=${lilithN})`);
  if (chironN > 0) {
    console.log(`Chiron mean diff: ${(chironDiffSum / chironN).toFixed(4)}° (n=${chironN})`);
  } else {
    console.log("Chiron mean diff: n/a (Swiss reference unavailable for compared rows)");
  }
  console.log("");
  console.log("Top 20 Asc diff outliers:");
  for (const w of worstAsc.slice(0, 20)) {
    console.log(`#${w.id} ${w.city}, ${w.country} ${w.date} ${w.time} ascDiff=${w.diff.toFixed(4)}°`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
