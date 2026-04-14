import { NextResponse } from "next/server";
import { computeProfileFromBirth } from "@/lib/astro/birth-to-profile";
import {
  buildDeepCompatibilityReport,
  buildSynastryReport,
  computeSynastryAspects,
} from "@/lib/astro/synastry";

export const runtime = "nodejs";

type LocationBody = {
  name?: unknown;
  lat?: unknown;
  lon?: unknown;
  countryCode?: unknown;
};

function isFiniteNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

function parseLocation(loc: unknown): { name: string; lat: number; lon: number; countryCode?: string } | null {
  if (!loc || typeof loc !== "object") return null;
  const o = loc as LocationBody;
  if (typeof o.name !== "string" || !isFiniteNumber(o.lat) || !isFiniteNumber(o.lon)) {
    return null;
  }
  const countryCode =
    typeof o.countryCode === "string" ? o.countryCode : undefined;
  return { name: o.name, lat: o.lat, lon: o.lon, countryCode };
}

function parsePerson(
  raw: unknown,
  label: string,
): { date: string; time: string; location: { name: string; lat: number; lon: number; countryCode?: string } } | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as { date?: unknown; time?: unknown; location?: unknown };
  const date = typeof o.date === "string" ? o.date : "";
  const time = typeof o.time === "string" ? o.time : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${label}: Ungültiges Datum.`);
  }
  if (!/^\d{2}:\d{2}$/.test(time)) {
    throw new Error(`${label}: Ungültige Zeit.`);
  }
  const location = parseLocation(o.location);
  if (!location) {
    throw new Error(`${label}: Ungültiger Ort.`);
  }
  return { date, time, location };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { a?: unknown; b?: unknown }
      | null;

    const aIn = parsePerson(body?.a, "Person A");
    const bIn = parsePerson(body?.b, "Person B");
    if (!aIn || !bIn) {
      return NextResponse.json(
        { message: "Bitte Person A und Person B mit Datum, Uhrzeit und Ort senden." },
        { status: 400 },
      );
    }

    const resA = computeProfileFromBirth(aIn);
    const resB = computeProfileFromBirth(bIn);

    const aspects = computeSynastryAspects(
      resA.profile.planets,
      resB.profile.planets,
    );

    const report = buildSynastryReport({
      aspects,
      sunA: resA.big3.sun,
      sunB: resB.big3.sun,
      moonA: resA.big3.moon,
      moonB: resB.big3.moon,
    });
    const deep = buildDeepCompatibilityReport({
      profileA: resA.profile,
      profileB: resB.profile,
      synastry: report,
    });

    return NextResponse.json({
      a: {
        profile: resA.profile,
        big3: resA.big3,
        meta: resA.meta,
      },
      b: {
        profile: resB.profile,
        big3: resB.big3,
        meta: resB.meta,
      },
      synastry: report,
      deepComparison: deep,
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Unbekannter Serverfehler bei Synastry.";
    const status = message.includes("Ungültig") ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}
