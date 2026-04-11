import Stripe from "stripe";
import {
  getProducts,
  PRICE_ASTRO_VOLLPROFIL,
  PRODUCT_ID_ASTRO_VOLLPROFIL,
} from "@/lib/cms";
import { getSiteUrl } from "@/lib/site";

/** Geburtsdaten für Stripe metadata + später signiertes Profil-Token (mobiler Link ohne localStorage). */
export type CheckoutAstroPayload = {
  birthdate: string;
  birthtime: string;
  place: {
    id: string;
    label: string;
    city: string;
    country: string;
    countryCode: string;
    lat: number;
    lon: number;
  };
};

function stripeMetadataAstroJson(a: CheckoutAstroPayload): string {
  const o = {
    d: a.birthdate,
    t: a.birthtime,
    lat: a.place.lat,
    lon: a.place.lon,
    cc: a.place.countryCode,
    lb: a.place.label.slice(0, 160),
    id: a.place.id.slice(0, 80),
    ci: a.place.city.slice(0, 80),
    co: a.place.country.slice(0, 60),
  };
  let s = JSON.stringify(o);
  if (s.length > 490) {
    s = JSON.stringify({ ...o, lb: o.lb.slice(0, 40) }).slice(0, 490);
  }
  return s;
}

const VOLLPROFIL_CHECKOUT_NAME = "Astrologisches Vollprofil";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

type ResolvedCheckoutProduct = {
  id: string;
  name: string;
  price: number;
};

function resolveProduct(productId: string): ResolvedCheckoutProduct | null {
  const fromCatalog = getProducts().find((p) => p.id === productId);
  if (fromCatalog) {
    return {
      id: fromCatalog.id,
      name: fromCatalog.name,
      price: fromCatalog.price,
    };
  }
  if (productId === PRODUCT_ID_ASTRO_VOLLPROFIL) {
    return {
      id: PRODUCT_ID_ASTRO_VOLLPROFIL,
      name: VOLLPROFIL_CHECKOUT_NAME,
      price: PRICE_ASTRO_VOLLPROFIL,
    };
  }
  return null;
}

/**
 * Erstellt eine Stripe Checkout Session und gibt die Hosted-Checkout-URL zurück.
 * Ohne `STRIPE_SECRET_KEY`: MVP – Weiterleitung zur lokalen Success-Seite (kein Stripe).
 */
export async function createCheckoutSessionForProduct(
  productId: string,
  options?: { astro?: CheckoutAstroPayload },
): Promise<{ url: string } | { error: string }> {
  const product = resolveProduct(productId);
  if (!product) {
    return { error: "Unbekanntes Produkt." };
  }

  const stripe = getStripe();
  if (!stripe) {
    return {
      url: `/success?productId=${encodeURIComponent(product.id)}`,
    };
  }

  const site = getSiteUrl();
  const unitAmount = Math.round(product.price * 100);

  const metadata: Record<string, string> = {
    cms_product_id: product.id,
    productId: product.id,
  };
  const astro = options?.astro;
  if (
    product.id === PRODUCT_ID_ASTRO_VOLLPROFIL &&
    astro &&
    /^\d{4}-\d{2}-\d{2}$/.test(astro.birthdate) &&
    /^\d{2}:\d{2}$/.test(astro.birthtime) &&
    astro.place &&
    typeof astro.place.lat === "number" &&
    typeof astro.place.lon === "number"
  ) {
    metadata.zd_astro = stripeMetadataAstroJson(astro);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: unitAmount,
            product_data: {
              name: product.name,
            },
          },
        },
      ],
      success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}&productId=${encodeURIComponent(product.id)}`,
      cancel_url: `${site}/shop`,
      metadata,
    });

    if (!session.url) {
      return { error: "Stripe hat keine Checkout-URL zurückgegeben." };
    }
    return { url: session.url };
  } catch (e) {
    console.error("[stripe] checkout.sessions.create", e);
    const msg =
      e instanceof Error ? e.message : "Checkout konnte nicht gestartet werden.";
    return { error: msg };
  }
}
