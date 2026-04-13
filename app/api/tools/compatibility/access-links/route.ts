import { NextResponse } from "next/server";
import { createProfileAccessToken } from "@/lib/profile-access-token";
import { buildProfileAccessWithUnlockUrl } from "@/lib/profile-unlock-url";
import { getSiteUrl } from "@/lib/site";

export const runtime = "nodejs";

type PlaceBody = {
  id?: unknown;
  label?: unknown;
  city?: unknown;
  country?: unknown;
  countryCode?: unknown;
  lat?: unknown;
  lon?: unknown;
};

type PersonBody = {
  birthdate?: unknown;
  birthtime?: unknown;
  place?: unknown;
};

function parsePerson(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as PersonBody;
  const birthdate = typeof o.birthdate === "string" ? o.birthdate : "";
  const birthtime = typeof o.birthtime === "string" ? o.birthtime : "";
  const place = (o.place ?? null) as PlaceBody | null;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(birthdate) ||
    !/^\d{2}:\d{2}$/.test(birthtime) ||
    !place ||
    typeof place.label !== "string" ||
    typeof place.countryCode !== "string" ||
    typeof place.lat !== "number" ||
    typeof place.lon !== "number"
  ) {
    return null;
  }
  return {
    birthdate,
    birthtime,
    place: {
      id: typeof place.id === "string" ? place.id : "zd:compat",
      label: place.label,
      city: typeof place.city === "string" ? place.city : place.label,
      country: typeof place.country === "string" ? place.country : "",
      countryCode: place.countryCode,
      lat: place.lat,
      lon: place.lon,
    },
  };
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { a?: unknown; b?: unknown }
    | null;
  const a = parsePerson(body?.a);
  const b = parsePerson(body?.b);
  if (!a || !b) {
    return NextResponse.json(
      { message: "Bitte für beide Personen Datum, Zeit und Ort senden." },
      { status: 400 },
    );
  }

  const tokenA = createProfileAccessToken(365, {
    d: a.birthdate,
    t: a.birthtime,
    lat: a.place.lat,
    lon: a.place.lon,
    cc: a.place.countryCode,
    lb: a.place.label,
    id: a.place.id,
    ci: a.place.city,
    co: a.place.country,
  });
  const tokenB = createProfileAccessToken(365, {
    d: b.birthdate,
    t: b.birthtime,
    lat: b.place.lat,
    lon: b.place.lon,
    cc: b.place.countryCode,
    lb: b.place.label,
    id: b.place.id,
    ci: b.place.city,
    co: b.place.country,
  });

  if (!tokenA || !tokenB) {
    return NextResponse.json(
      { message: "Links konnten nicht erstellt werden." },
      { status: 503 },
    );
  }

  const site = getSiteUrl();
  return NextResponse.json({
    ok: true,
    links: {
      a: buildProfileAccessWithUnlockUrl(site, tokenA),
      b: buildProfileAccessWithUnlockUrl(site, tokenB),
    },
  });
}
