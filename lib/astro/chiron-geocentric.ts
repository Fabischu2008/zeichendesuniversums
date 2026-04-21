/**
 * Geozentrische ekliptikale Länge von (2060) Chiron (Näherung).
 * Nutzt oszillierende Bahnelemente der NASA/JPL SBDB (Epoch JD 2461000.5, Stand 2026)
 * plus Erde aus astronomy-engine für eine einfache Geo-Korrektur.
 */
import * as Astronomy from "astronomy-engine";

const DEG2RAD = Astronomy.DEG2RAD;
const RAD2DEG = Astronomy.RAD2DEG;

/** Julianisches Datum (UT) aus JavaScript-Date. */
function julianDayUt(dateUtc: Date): number {
  return dateUtc.getTime() / 86400000 + 2440587.5;
}

function normalizeDegrees(deg: number): number {
  let x = deg % 360;
  if (x < 0) x += 360;
  return x;
}

/** Kepler-Gleichung M = E - e sin(E), Newton-Iteration in Radiant. */
function solveKepler(meanAnomalyRad: number, e: number): number {
  let E = meanAnomalyRad;
  for (let i = 0; i < 25; i += 1) {
    const f = E - e * Math.sin(E) - meanAnomalyRad;
    const fp = 1 - e * Math.cos(E);
    const step = f / fp;
    E -= step;
    if (Math.abs(step) < 1e-12) break;
  }
  return E;
}

/**
 * Chiron-Geolänge [0,360) in Grad (ekliptikal, konsistent zu astronomy-engine / GeoVector).
 */
export function chironGeocentricLongitudeDegrees(dateUtc: Date): number {
  // JPL SBDB API (2060 Chiron), Equinox J2000
  const JD0 = 2461000.5;
  const a = 13.7; // AU
  const e = 0.379;
  const i = 6.93 * DEG2RAD;
  const om = 209 * DEG2RAD;
  const w = 339 * DEG2RAD;
  const nDegPerDay = 0.0195;

  const jd = julianDayUt(dateUtc);
  const dt = jd - JD0;
  const Mdeg = normalizeDegrees(213 + nDegPerDay * dt);
  const Mrad = Mdeg * DEG2RAD;

  const E = solveKepler(Mrad, e);
  const sinE = Math.sin(E);
  const cosE = Math.cos(E);
  const sinNu = (Math.sqrt(1 - e * e) * sinE) / (1 - e * cosE);
  const cosNu = (cosE - e) / (1 - e * cosE);
  const nu = Math.atan2(sinNu, cosNu);
  const r = a * (1 - e * cosE);

  const u = w + nu;
  const cosu = Math.cos(u);
  const sinu = Math.sin(u);

  const xh =
    r * (Math.cos(om) * cosu - Math.sin(om) * sinu * Math.cos(i));
  const yh =
    r * (Math.sin(om) * cosu + Math.cos(om) * sinu * Math.cos(i));
  const zh = r * sinu * Math.sin(i);

  const earthHelio = Astronomy.HelioVector(Astronomy.Body.Earth, dateUtc);
  const earthEcl = Astronomy.Ecliptic(earthHelio);
  const rEarth = earthHelio.Length();
  const le = earthEcl.elon * DEG2RAD;
  const be = earthEcl.elat * DEG2RAD;
  const xe = rEarth * Math.cos(be) * Math.cos(le);
  const ye = rEarth * Math.cos(be) * Math.sin(le);
  const ze = rEarth * Math.sin(be);

  const xg = xh - xe;
  const yg = yh - ye;
  const zg = zh - ze;

  const lon = RAD2DEG * Math.atan2(yg, xg);
  return normalizeDegrees(lon);
}
