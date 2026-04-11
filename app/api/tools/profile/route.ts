import { NextResponse } from "next/server";
import { computeProfileFromBirth } from "@/lib/astro/birth-to-profile";

export const runtime = "nodejs";

type LocationInput = {
  name: string;
  lat: number;
  lon: number;
  countryCode?: string;
};

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

    if (
      !location ||
      typeof location.name !== "string" ||
      typeof location.lat !== "number" ||
      typeof location.lon !== "number"
    ) {
      return NextResponse.json({ message: "Ungültiger Ort." }, { status: 400 });
    }

    const { profile, big3, meta } = computeProfileFromBirth({
      date,
      time,
      location,
    });

    return NextResponse.json({
      big3,
      profile,
      meta,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unbekannter Serverfehler.";
    const status = message.startsWith("Ungült") ? 400 : 500;
    return NextResponse.json(
      { message: `Serverfehler bei Profil-Berechnung: ${message}` },
      { status },
    );
  }
}
