import * as Astronomy from "astronomy-engine";
import { normalizeDegrees } from "@/lib/astro/signs";

function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}

function rad2deg(r: number) {
  return (r * 180) / Math.PI;
}

/**
 * Tropical ascendant (ecliptic longitude of the eastern horizon), using the same
 * apparent sidereal time and true obliquity of date as `astronomy-engine` (GAST + e_tilt).
 */
export function ascendantLongitudeDegrees(input: {
  dateUtc: Date;
  latitudeDegrees: number;
  longitudeDegrees: number;
}) {
  const time = Astronomy.MakeTime(input.dateUtc);
  const gmstHours = Astronomy.SiderealTime(time);
  const ramcDeg = normalizeDegrees(gmstHours * 15 + input.longitudeDegrees);
  const eps = deg2rad(Astronomy.e_tilt(time).tobl);
  const lat = deg2rad(input.latitudeDegrees);
  const ramc = deg2rad(ramcDeg);

  const top = Math.cos(ramc);
  const bottom =
    -Math.sin(ramc) * Math.cos(eps) - Math.tan(lat) * Math.sin(eps);

  const ac = Math.atan2(top, bottom);
  return normalizeDegrees(rad2deg(ac));
}

/**
 * Tropical Midheaven (MC) ecliptic longitude from local sidereal time.
 * Uses true obliquity of date, consistent with astronomy-engine inputs.
 */
export function midheavenLongitudeDegrees(input: {
  dateUtc: Date;
  longitudeDegrees: number;
}) {
  const time = Astronomy.MakeTime(input.dateUtc);
  const gstHours = Astronomy.SiderealTime(time);
  const ramcDeg = normalizeDegrees(gstHours * 15 + input.longitudeDegrees);
  const eps = deg2rad(Astronomy.e_tilt(time).tobl);
  const ramc = deg2rad(ramcDeg);

  // λ_MC from right ascension of meridian and obliquity
  const mc = Math.atan2(Math.sin(ramc) / Math.cos(eps), Math.cos(ramc));
  return normalizeDegrees(rad2deg(mc));
}

