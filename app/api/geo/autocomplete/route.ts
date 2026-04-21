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

/** Optional 2-letter ISO country codes (comma-separated). Omit Nominatim param for worldwide search. */
function parseCountryCodes(raw: string | null): string | null {
  if (raw === null) return null;
  const t = raw.trim();
  if (t === "" || t === "*") return null;
  const codes = t
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => /^[a-z]{2}$/.test(s));
  if (codes.length === 0) return null;
  return [...new Set(codes)].slice(0, 12).join(",");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = clampQuery(searchParams.get("q") || "");
  const countryCodes = parseCountryCodes(searchParams.get("countrycodes"));

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "8");
  url.searchParams.set("q", q);
  if (countryCodes) {
    url.searchParams.set("countrycodes", countryCodes);
  }

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

