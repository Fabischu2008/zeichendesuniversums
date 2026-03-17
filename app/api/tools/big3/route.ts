import { NextResponse } from "next/server";
import tzLookup from "tz-lookup";
import { DateTime } from "luxon";
import * as Astronomy from "astronomy-engine";
import { ascendantLongitudeDegrees } from "@/lib/astro/ascendant";
import { signFromEclipticLongitude } from "@/lib/astro/signs";

type LocationInput = {
  name: string;
  lat: number;
  lon: number;
  countryCode?: string;
};

function isFiniteNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | {
          date?: unknown;
          time?: unknown;
          location?: unknown;
        }
      | null;

    const date = typeof body?.date === "string" ? body.date : "";
    const time = typeof body?.time === "string" ? body.time : "";
    const location = (body?.location ?? null) as LocationInput | null;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { message: "Ungültiges Datum." },
        { status: 400 },
      );
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ message: "Ungültige Zeit." }, { status: 400 });
    }
    if (
      !location ||
      typeof location.name !== "string" ||
      !isFiniteNumber(location.lat) ||
      !isFiniteNumber(location.lon)
    ) {
      return NextResponse.json({ message: "Ungültiger Ort." }, { status: 400 });
    }

    const tz = tzLookup(location.lat, location.lon);
    const local = DateTime.fromISO(`${date}T${time}`, { zone: tz });
    if (!local.isValid) {
      return NextResponse.json(
        { message: "Zeit konnte nicht verarbeitet werden." },
        { status: 400 },
      );
    }

    const utc = local.toUTC();
    const utcIso = utc.toISO();
    if (!utcIso) {
      return NextResponse.json(
        { message: "UTC-Konvertierung fehlgeschlagen." },
        { status: 400 },
      );
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

    return NextResponse.json({
      sun: signFromEclipticLongitude(sunLon),
      moon: signFromEclipticLongitude(moonLon),
      ascendant: signFromEclipticLongitude(ascLon),
      meta: { tz, utc: utcIso },
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Unbekannter Serverfehler.";
    return NextResponse.json(
      { message: `Serverfehler bei Big‑3 Berechnung: ${message}` },
      { status: 500 },
    );
  }
}

