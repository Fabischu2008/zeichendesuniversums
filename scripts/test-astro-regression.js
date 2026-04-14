/* eslint-disable no-console */
const Astronomy = require("astronomy-engine");
const { DateTime } = require("luxon");
const tzLookup = require("tz-lookup");

function normalizeDegrees(deg) {
  let x = deg % 360;
  if (x < 0) x += 360;
  return x;
}

function deg2rad(d) {
  return (d * Math.PI) / 180;
}

function rad2deg(r) {
  return (r * 180) / Math.PI;
}

function signFromLongitude(lon) {
  const signs = [
    "Widder",
    "Stier",
    "Zwillinge",
    "Krebs",
    "Löwe",
    "Jungfrau",
    "Waage",
    "Skorpion",
    "Schütze",
    "Steinbock",
    "Wassermann",
    "Fische",
  ];
  return signs[Math.floor(normalizeDegrees(lon) / 30) % 12];
}

function wholeSignHouseFromAsc(ascLon, pointLon) {
  const ascSignIndex = Math.floor(normalizeDegrees(ascLon) / 30);
  const pointSignIndex = Math.floor(normalizeDegrees(pointLon) / 30);
  return ((pointSignIndex - ascSignIndex + 12) % 12) + 1;
}

function angularDistance(a, b) {
  const d = Math.abs(normalizeDegrees(a) - normalizeDegrees(b));
  return d > 180 ? 360 - d : d;
}

function ascendantLongitudeDegrees(input) {
  const time = Astronomy.MakeTime(input.dateUtc);
  const gstHours = Astronomy.SiderealTime(time);
  const ramcDeg = normalizeDegrees(gstHours * 15 + input.longitudeDegrees);
  const eps = deg2rad(Astronomy.e_tilt(time).tobl);
  const lat = deg2rad(input.latitudeDegrees);
  const ramc = deg2rad(ramcDeg);
  const top = Math.cos(ramc);
  const bottom =
    -Math.sin(ramc) * Math.cos(eps) - Math.tan(lat) * Math.sin(eps);
  return normalizeDegrees(rad2deg(Math.atan2(top, bottom)));
}

function midheavenLongitudeDegrees(input) {
  const time = Astronomy.MakeTime(input.dateUtc);
  const gstHours = Astronomy.SiderealTime(time);
  const ramcDeg = normalizeDegrees(gstHours * 15 + input.longitudeDegrees);
  const eps = deg2rad(Astronomy.e_tilt(time).tobl);
  const ramc = deg2rad(ramcDeg);
  return normalizeDegrees(
    rad2deg(Math.atan2(Math.sin(ramc) / Math.cos(eps), Math.cos(ramc))),
  );
}

const CASES = [
  {
    key: "kl",
    date: "1998-08-20",
    time: "14:51",
    lat: 49.4401,
    lon: 7.7491,
    expected: {
      ascSign: "Skorpion",
      mcSign: "Jungfrau",
      icSign: "Fische",
      mcHouse: 11,
      icHouse: 5,
      sunSign: "Löwe",
      sunHouse: 10,
      moonSign: "Löwe",
      moonHouse: 10,
    },
  },
  {
    key: "berlin",
    date: "1990-01-15",
    time: "06:30",
    lat: 52.52,
    lon: 13.405,
    expected: {
      ascSign: "Schütze",
      mcSign: "Skorpion",
      icSign: "Stier",
      mcHouse: 12,
      icHouse: 6,
      sunSign: "Steinbock",
      sunHouse: 2,
      moonSign: "Jungfrau",
      moonHouse: 10,
    },
  },
  {
    key: "nyc",
    date: "1985-07-04",
    time: "22:15",
    lat: 40.7128,
    lon: -74.006,
    expected: {
      ascSign: "Wassermann",
      mcSign: "Schütze",
      icSign: "Zwillinge",
      mcHouse: 11,
      icHouse: 5,
      sunSign: "Krebs",
      sunHouse: 6,
      moonSign: "Wassermann",
      moonHouse: 1,
    },
  },
  {
    key: "tokyo",
    date: "2001-11-09",
    time: "03:05",
    lat: 35.6762,
    lon: 139.6503,
    expected: {
      ascSign: "Waage",
      mcSign: "Krebs",
      icSign: "Steinbock",
      mcHouse: 10,
      icHouse: 4,
      sunSign: "Skorpion",
      sunHouse: 2,
      moonSign: "Löwe",
      moonHouse: 11,
    },
  },
  {
    key: "sydney",
    date: "1977-03-27",
    time: "18:40",
    lat: -33.8688,
    lon: 151.2093,
    expected: {
      ascSign: "Waage",
      mcSign: "Krebs",
      icSign: "Steinbock",
      mcHouse: 10,
      icHouse: 4,
      sunSign: "Widder",
      sunHouse: 7,
      moonSign: "Krebs",
      moonHouse: 10,
    },
  },
  {
    key: "saopaulo",
    date: "1993-12-01",
    time: "11:20",
    lat: -23.5505,
    lon: -46.6333,
    expected: {
      ascSign: "Wassermann",
      mcSign: "Skorpion",
      icSign: "Stier",
      mcHouse: 10,
      icHouse: 4,
      sunSign: "Schütze",
      sunHouse: 11,
      moonSign: "Krebs",
      moonHouse: 6,
    },
  },
];

let failures = 0;

for (const c of CASES) {
  const tz = tzLookup(c.lat, c.lon);
  const utc = DateTime.fromISO(`${c.date}T${c.time}`, { zone: tz }).toUTC();
  const dateUtc = new Date(utc.toISO());

  const t = new Astronomy.AstroTime(dateUtc);
  const sunLon = Astronomy.SunPosition(t).elon;
  const moonLon = Astronomy.Ecliptic(
    Astronomy.GeoVector(Astronomy.Body.Moon, dateUtc, true),
  ).elon;
  const ascLon = ascendantLongitudeDegrees({
    dateUtc,
    latitudeDegrees: c.lat,
    longitudeDegrees: c.lon,
  });
  const mcLon = midheavenLongitudeDegrees({
    dateUtc,
    longitudeDegrees: c.lon,
  });
  const icLon = normalizeDegrees(mcLon + 180);

  const actual = {
    ascSign: signFromLongitude(ascLon),
    mcSign: signFromLongitude(mcLon),
    icSign: signFromLongitude(icLon),
    mcHouse: wholeSignHouseFromAsc(ascLon, mcLon),
    icHouse: wholeSignHouseFromAsc(ascLon, icLon),
    sunSign: signFromLongitude(sunLon),
    sunHouse: wholeSignHouseFromAsc(ascLon, sunLon),
    moonSign: signFromLongitude(moonLon),
    moonHouse: wholeSignHouseFromAsc(ascLon, moonLon),
  };

  const checks = Object.entries(c.expected).map(([k, v]) => ({
    key: k,
    ok: actual[k] === v,
    expected: v,
    actual: actual[k],
  }));
  const bad = checks.filter((x) => !x.ok);
  const angleOppositionOk = Math.abs(angularDistance(mcLon, icLon) - 180) < 1e-9;

  if (bad.length || !angleOppositionOk) {
    failures += 1;
    console.error(`\\n[FAIL] ${c.key}`);
    if (!angleOppositionOk) {
      console.error("  MC/IC are not exactly opposite.");
    }
    for (const b of bad) {
      console.error(`  ${b.key}: expected=${b.expected} actual=${b.actual}`);
    }
  } else {
    console.log(`[OK] ${c.key} (${tz})`);
  }
}

if (failures > 0) {
  console.error(`\\nRegression failed for ${failures}/${CASES.length} cases.`);
  process.exit(1);
}

console.log(`\\nAll ${CASES.length} astro regression cases passed.`);
