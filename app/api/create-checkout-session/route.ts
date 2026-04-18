import { NextResponse } from "next/server";
import {
  createCheckoutSessionForProduct,
  type CheckoutAstroPayload,
} from "@/lib/stripe/create-checkout-session";

function parseCheckoutAstro(raw: unknown): CheckoutAstroPayload | null {
  if (!raw || typeof raw !== "object" || raw === null) return null;
  const a = raw as Record<string, unknown>;
  const place = a.place;
  if (
    typeof a.birthdate !== "string" ||
    typeof a.birthtime !== "string" ||
    !place ||
    typeof place !== "object" ||
    place === null
  ) {
    return null;
  }
  const p = place as Record<string, unknown>;
  if (
    typeof p.id !== "string" ||
    typeof p.label !== "string" ||
    typeof p.city !== "string" ||
    typeof p.country !== "string" ||
    typeof p.countryCode !== "string" ||
    typeof p.lat !== "number" ||
    typeof p.lon !== "number"
  ) {
    return null;
  }
  return {
    birthdate: a.birthdate,
    birthtime: a.birthtime,
    place: {
      id: p.id,
      label: p.label,
      city: p.city,
      country: p.country,
      countryCode: p.countryCode,
      lat: p.lat,
      lon: p.lon,
    },
  };
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { productId?: unknown; astro?: unknown; compat?: unknown }
    | null;
  const productId = typeof body?.productId === "string" ? body.productId : "";

  const rawCompat = body?.compat;
  let compat: { a: CheckoutAstroPayload; b: CheckoutAstroPayload } | undefined;
  if (rawCompat && typeof rawCompat === "object" && rawCompat !== null) {
    const c = rawCompat as Record<string, unknown>;
    const pa = parseCheckoutAstro(c.a);
    const pb = parseCheckoutAstro(c.b);
    if (pa && pb) {
      compat = { a: pa, b: pb };
    }
  }

  const astro = !compat ? parseCheckoutAstro(body?.astro) : undefined;

  const result = await createCheckoutSessionForProduct(
    productId,
    compat
      ? { compat }
      : astro
        ? { astro }
        : undefined,
  );
  if ("error" in result) {
    const status = result.error.includes("Unbekanntes Produkt") ? 400 : 503;
    return NextResponse.json({ message: result.error }, { status });
  }

  return NextResponse.json({ url: result.url });
}
