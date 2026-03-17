import { NextResponse } from "next/server";

type NominatimResult = {
  place_id: number | string;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    country?: string;
    country_code?: string;
  };
};

function clampQuery(q: string) {
  return q.trim().slice(0, 80);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = clampQuery(searchParams.get("q") || "");
  const cc = (searchParams.get("countrycodes") || "de,at,ch")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 3)
    .join(",");

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "8");
  url.searchParams.set("q", q);
  url.searchParams.set("countrycodes", cc);

  const res = await fetch(url.toString(), {
    headers: {
      "user-agent": "zeichendesuniversums/1.0 (Big3 tool)",
      accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Geocoding Service nicht verfügbar." },
      { status: 503 },
    );
  }

  const data = (await res.json()) as NominatimResult[];

  const results = data.map((r) => {
    const lat = Number(r.lat);
    const lon = Number(r.lon);
    const city =
      r.address?.city ||
      r.address?.town ||
      r.address?.village ||
      r.address?.municipality ||
      "";
    const countryCode = (r.address?.country_code || "").toUpperCase();
    const country = r.address?.country || "";

    return {
      id: String(r.place_id),
      label: r.display_name,
      city,
      country,
      countryCode,
      lat,
      lon,
    };
  });

  return NextResponse.json({ results });
}

