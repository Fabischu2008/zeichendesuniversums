import tzLookup from "tz-lookup";
import { DateTime } from "luxon";
import * as Astronomy from "astronomy-engine";
import {
  ascendantLongitudeDegrees,
  midheavenLongitudeDegrees,
} from "@/lib/astro/ascendant";
import { signFromEclipticLongitude } from "@/lib/astro/signs";
import {
  calculateAstroProfile,
  type AstroProfileResult,
} from "@/lib/astro/profile";

export type BirthLocationInput = {
  name: string;
  lat: number;
  lon: number;
  countryCode?: string;
};

function isFiniteNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

/** Validiert und berechnet Profil + Big 3 aus Datum, Uhrzeit, Ort (wie `/api/tools/profile`). */
export function computeProfileFromBirth(input: {
  date: string;
  time: string;
  location: BirthLocationInput;
}): {
  profile: AstroProfileResult;
  big3: { sun: string; moon: string; ascendant: string };
  ascendantLongitude: number;
  meta: { tz: string; utc: string };
} {
  const { date, time, location } = input;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Ungültiges Datum.");
  }
  if (!/^\d{2}:\d{2}$/.test(time)) {
    throw new Error("Ungültige Zeit.");
  }
  if (
    typeof location.name !== "string" ||
    !isFiniteNumber(location.lat) ||
    !isFiniteNumber(location.lon)
  ) {
    throw new Error("Ungültiger Ort.");
  }

  const tz = tzLookup(location.lat, location.lon);
  const local = DateTime.fromISO(`${date}T${time}`, { zone: tz });
  if (!local.isValid) {
    throw new Error("Zeit konnte nicht verarbeitet werden.");
  }

  const utc = local.toUTC();
  const utcIso = utc.toISO();
  if (!utcIso) {
    throw new Error("UTC-Konvertierung fehlgeschlagen.");
  }
  const dateUtc = new Date(utcIso);

  const t = new Astronomy.AstroTime(dateUtc);
  const sunLon = Astronomy.SunPosition(t).elon;
  const moonVec = Astronomy.GeoVector(Astronomy.Body.Moon, dateUtc, true);
  const moonLon = Astronomy.Ecliptic(moonVec).elon;
  const ascLon = ascendantLongitudeDegrees({
    dateUtc,
    latitudeDegrees: location.lat,
    longitudeDegrees: location.lon,
  });
  const mcLon = midheavenLongitudeDegrees({
    dateUtc,
    longitudeDegrees: location.lon,
  });

  const profile = calculateAstroProfile({
    dateUtc,
    ascendantLongitude: ascLon,
    midheavenLongitude: mcLon,
  });

  return {
    profile,
    big3: {
      sun: signFromEclipticLongitude(sunLon),
      moon: signFromEclipticLongitude(moonLon),
      ascendant: signFromEclipticLongitude(ascLon),
    },
    ascendantLongitude: ascLon,
    meta: { tz, utc: utcIso },
  };
}
