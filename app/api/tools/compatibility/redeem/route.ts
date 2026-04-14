import { NextResponse } from "next/server";
import { decodeCompatibilityAccessToken } from "@/lib/compatibility-access-token";
import { createProfileAccessToken } from "@/lib/profile-access-token";
import { buildProfileAccessWithUnlockUrl } from "@/lib/profile-unlock-url";
import { getSiteUrl } from "@/lib/site";
import { computeProfileFromBirth } from "@/lib/astro/birth-to-profile";
import {
  buildDeepCompatibilityReport,
  buildSynastryReport,
  computeSynastryAspects,
} from "@/lib/astro/synastry";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { token?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  const decoded = decodeCompatibilityAccessToken(token);
  if (!decoded.ok || !decoded.a || !decoded.b) {
    return NextResponse.json(
      { message: "Ungültiger oder abgelaufener Paaranalyse-Link." },
      { status: 400 },
    );
  }

  const a = decoded.a;
  const b = decoded.b;
  const profileA = computeProfileFromBirth({
    date: a.d,
    time: a.t,
    location: {
      name: a.ci || a.lb,
      lat: a.lat,
      lon: a.lon,
      countryCode: a.cc,
    },
  });
  const profileB = computeProfileFromBirth({
    date: b.d,
    time: b.t,
    location: {
      name: b.ci || b.lb,
      lat: b.lat,
      lon: b.lon,
      countryCode: b.cc,
    },
  });

  const aspects = computeSynastryAspects(
    profileA.profile.planets,
    profileB.profile.planets,
  );
  const synastry = buildSynastryReport({
    aspects,
    sunA: profileA.big3.sun,
    sunB: profileB.big3.sun,
    moonA: profileA.big3.moon,
    moonB: profileB.big3.moon,
  });
  const deepComparison = buildDeepCompatibilityReport({
    profileA: profileA.profile,
    profileB: profileB.profile,
    synastry,
  });

  const tokenA = createProfileAccessToken(365, a);
  const tokenB = createProfileAccessToken(365, b);
  const site = getSiteUrl();

  return NextResponse.json({
    ok: true,
    a: { profile: profileA.profile, big3: profileA.big3, meta: profileA.meta },
    b: { profile: profileB.profile, big3: profileB.big3, meta: profileB.meta },
    synastry,
    deepComparison,
    links:
      tokenA && tokenB
        ? {
            a: buildProfileAccessWithUnlockUrl(site, tokenA),
            b: buildProfileAccessWithUnlockUrl(site, tokenB),
          }
        : null,
  });
}
