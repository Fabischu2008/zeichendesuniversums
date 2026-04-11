import { NextResponse } from "next/server";
import {
  createCheckoutSessionForProduct,
  type CheckoutAstroPayload,
} from "@/lib/stripe/create-checkout-session";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { productId?: unknown; astro?: unknown }
    | null;
  const productId = typeof body?.productId === "string" ? body.productId : "";
  const rawAstro = body?.astro;
  let astro: CheckoutAstroPayload | undefined;
  if (rawAstro && typeof rawAstro === "object" && rawAstro !== null) {
    const a = rawAstro as Record<string, unknown>;
    const place = a.place;
    if (
      typeof a.birthdate === "string" &&
      typeof a.birthtime === "string" &&
      place &&
      typeof place === "object" &&
      place !== null
    ) {
      const p = place as Record<string, unknown>;
      if (
        typeof p.id === "string" &&
        typeof p.label === "string" &&
        typeof p.city === "string" &&
        typeof p.country === "string" &&
        typeof p.countryCode === "string" &&
        typeof p.lat === "number" &&
        typeof p.lon === "number"
      ) {
        astro = {
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
    }
  }

  const result = await createCheckoutSessionForProduct(productId, astro ? { astro } : undefined);
  if ("error" in result) {
    const status = result.error.includes("Unbekanntes Produkt") ? 400 : 503;
    return NextResponse.json({ message: result.error }, { status });
  }

  return NextResponse.json({ url: result.url });
}
