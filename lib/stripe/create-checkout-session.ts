import Stripe from "stripe";
import {
  getProducts,
  PRICE_ASTRO_VOLLPROFIL,
  PRODUCT_ID_ASTRO_VOLLPROFIL,
  PRODUCT_ID_COMPAT_PAARANALYSE,
} from "@/lib/cms";
import {
  encodeAstroSuccessPack,
  type ProfileTokenBirthPayload,
} from "@/lib/profile-access-token";
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

function checkoutAstroToBirthPayload(
  a: CheckoutAstroPayload,
): ProfileTokenBirthPayload {
  return {
    d: a.birthdate,
    t: a.birthtime,
    lat: a.place.lat,
    lon: a.place.lon,
    cc: a.place.countryCode,
    lb: a.place.label,
    id: a.place.id,
    ci: a.place.city,
    co: a.place.country,
  };
}

/** Stripe erlaubt max. 500 Zeichen pro Metadaten-Wert – niemals JSON mit slice kürzen (ungültiges JSON). */
function stripeMetadataAstroJson(
  a: CheckoutAstroPayload,
  maxLen = 490,
): string {
  const d = a.birthdate;
  const t = a.birthtime;
  const lat = a.place.lat;
  const lon = a.place.lon;
  const cc = a.place.countryCode;

  let lbMax = 160;
  let idMax = 80;
  let ciMax = 80;
  let coMax = 60;

  for (let round = 0; round < 16; round++) {
    const o = {
      d,
      t,
      lat,
      lon,
      cc,
      lb: a.place.label.slice(0, lbMax),
      id: a.place.id.slice(0, idMax),
      ci: a.place.city.slice(0, ciMax),
      co: a.place.country.slice(0, coMax),
    };
    const s = JSON.stringify(o);
    if (s.length <= maxLen) return s;
    if (lbMax > 24) {
      lbMax = Math.max(24, Math.floor(lbMax * 0.55));
      continue;
    }
    if (idMax > 12) {
      idMax = Math.max(12, Math.floor(idMax * 0.5));
      continue;
    }
    if (ciMax > 12) {
      ciMax = Math.max(12, Math.floor(ciMax * 0.5));
      continue;
    }
    if (coMax > 8) {
      coMax = Math.max(8, Math.floor(coMax * 0.5));
      continue;
    }
    break;
  }

  return JSON.stringify({
    d,
    t,
    lat,
    lon,
    cc,
    lb: a.place.label.slice(0, 20),
  });
}

const VOLLPROFIL_CHECKOUT_NAME = "Astrologisches Vollprofil";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

function requiresRealStripeCheckout(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  );
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
function isValidCompatPayload(
  c: { a: CheckoutAstroPayload; b: CheckoutAstroPayload },
): boolean {
  const check = (x: CheckoutAstroPayload) =>
    /^\d{4}-\d{2}-\d{2}$/.test(x.birthdate) &&
    /^\d{2}:\d{2}$/.test(x.birthtime) &&
    x.place &&
    typeof x.place.lat === "number" &&
    typeof x.place.lon === "number";
  return check(c.a) && check(c.b);
}

export async function createCheckoutSessionForProduct(
  productId: string,
  options?: {
    astro?: CheckoutAstroPayload;
    compat?: { a: CheckoutAstroPayload; b: CheckoutAstroPayload };
  },
): Promise<{ url: string } | { error: string }> {
  const product = resolveProduct(productId);
  if (!product) {
    return { error: "Unbekanntes Produkt." };
  }

  if (product.id === PRODUCT_ID_COMPAT_PAARANALYSE) {
    const c = options?.compat;
    if (!c || !isValidCompatPayload(c)) {
      return {
        error:
          "Für die Paaranalyse werden vollständige Geburtsdaten für Person A und B benötigt.",
      };
    }
  }

  const stripe = getStripe();
  if (!stripe) {
    if (requiresRealStripeCheckout()) {
      return {
        error:
          "Checkout ist aktuell nicht konfiguriert. Bitte STRIPE_SECRET_KEY in Production setzen.",
      };
    }

    let url = `/success?productId=${encodeURIComponent(product.id)}`;
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
      const ap = encodeAstroSuccessPack(checkoutAstroToBirthPayload(astro));
      if (ap) {
        url += `&ap=${encodeURIComponent(ap)}`;
      }
    }
    const compat = options?.compat;
    if (
      product.id === PRODUCT_ID_COMPAT_PAARANALYSE &&
      compat?.a &&
      compat?.b &&
      /^\d{4}-\d{2}-\d{2}$/.test(compat.a.birthdate) &&
      /^\d{2}:\d{2}$/.test(compat.a.birthtime) &&
      /^\d{4}-\d{2}-\d{2}$/.test(compat.b.birthdate) &&
      /^\d{2}:\d{2}$/.test(compat.b.birthtime) &&
      compat.a.place &&
      compat.b.place
    ) {
      const apa = encodeAstroSuccessPack(
        checkoutAstroToBirthPayload(compat.a),
      );
      const apb = encodeAstroSuccessPack(
        checkoutAstroToBirthPayload(compat.b),
      );
      if (apa && apb) {
        url += `&apa=${encodeURIComponent(apa)}&apb=${encodeURIComponent(apb)}`;
      }
    }
    return { url };
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

  const compat = options?.compat;
  if (
    product.id === PRODUCT_ID_COMPAT_PAARANALYSE &&
    compat?.a &&
    compat?.b &&
    /^\d{4}-\d{2}-\d{2}$/.test(compat.a.birthdate) &&
    /^\d{2}:\d{2}$/.test(compat.a.birthtime) &&
    /^\d{4}-\d{2}-\d{2}$/.test(compat.b.birthdate) &&
    /^\d{2}:\d{2}$/.test(compat.b.birthtime) &&
    compat.a.place &&
    compat.b.place &&
    typeof compat.a.place.lat === "number" &&
    typeof compat.a.place.lon === "number" &&
    typeof compat.b.place.lat === "number" &&
    typeof compat.b.place.lon === "number"
  ) {
    metadata.zd_astro_a = stripeMetadataAstroJson(compat.a, 480);
    metadata.zd_astro_b = stripeMetadataAstroJson(compat.b, 480);
  }

  const cancelUrl =
    product.id === PRODUCT_ID_COMPAT_PAARANALYSE
      ? `${site}/tools/compatibility`
      : `${site}/shop`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Keep checkout behavior consistent across all products.
      payment_method_types: ["card"],
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
      cancel_url: cancelUrl,
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
