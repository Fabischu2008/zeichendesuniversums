import * as Astronomy from "astronomy-engine";
import { normalizeDegrees } from "@/lib/astro/signs";

function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}

function rad2deg(r: number) {
  return (r * 180) / Math.PI;
}

function trueObliquityDegrees(dateUtc: Date) {
  const J2000 = new Date("2000-01-01T12:00:00Z");
  const days = (dateUtc.getTime() - J2000.getTime()) / 86400000;
  const T = days / 36525;
  return 23.4392911 - 0.0130042 * T;
}

export function ascendantLongitudeDegrees(input: {
  dateUtc: Date;
  latitudeDegrees: number;
  longitudeDegrees: number;
}) {
  const gmstHours = Astronomy.SiderealTime(input.dateUtc);
  const ramcDeg = normalizeDegrees(gmstHours * 15 + input.longitudeDegrees);
  const eps = deg2rad(trueObliquityDegrees(input.dateUtc));
  const lat = deg2rad(input.latitudeDegrees);
  const ramc = deg2rad(ramcDeg);

  const top = Math.cos(ramc);
  const bottom =
    -Math.sin(ramc) * Math.cos(eps) - Math.tan(lat) * Math.sin(eps);

  const ac = Math.atan2(top, bottom);
  return normalizeDegrees(rad2deg(ac));
}

