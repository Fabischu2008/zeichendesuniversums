import type { ProfileTokenBirthPayload } from "@/lib/profile-access-token";
import {
  PRODUCT_ID_ASTRO_VOLLPROFIL,
  PRODUCT_ID_COMPAT_PAARANALYSE,
} from "@/lib/cms";
import Stripe from "stripe";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

/**
 * Nach Checkout-Redirect ist die Session meist `complete` + `paid`; seltene Zahlarten
 * können kurz abweichen – zu strikte Prüfung bricht sonst die Success-Seite online.
 */
function checkoutSessionPaymentOk(session: Stripe.Checkout.Session): boolean {
  if (
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required"
  ) {
    return true;
  }
  if (session.status === "complete" && session.payment_status !== "unpaid") {
    return true;
  }
  return false;
}

function numish(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return Number.NaN;
}

function parseBirthFromStripeMetadataKey(
  meta: Record<string, string | undefined>,
  key: "zd_astro" | "zd_astro_a" | "zd_astro_b",
): ProfileTokenBirthPayload | null {
  const raw = meta[key]?.trim();
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    const d = typeof o.d === "string" ? o.d : "";
    const t = typeof o.t === "string" ? o.t : "";
    const lat = numish(o.lat);
    const lon = numish(o.lon);
    const cc = typeof o.cc === "string" ? o.cc : "";
    const lb = typeof o.lb === "string" ? o.lb : "";
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(d) ||
      !/^\d{2}:\d{2}$/.test(t) ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      !cc ||
      !lb
    ) {
      return null;
    }
    const out: ProfileTokenBirthPayload = {
      d,
      t,
      lat,
      lon,
      cc,
      lb,
    };
    if (typeof o.id === "string" && o.id) out.id = o.id.slice(0, 120);
    if (typeof o.ci === "string" && o.ci) out.ci = o.ci.slice(0, 120);
    if (typeof o.co === "string" && o.co) out.co = o.co.slice(0, 80);
    return out;
  } catch {
    return null;
  }
}

function parseBirthFromStripeMetadata(
  meta: Record<string, string | undefined>,
): ProfileTokenBirthPayload | null {
  return parseBirthFromStripeMetadataKey(meta, "zd_astro");
}

async function retrieveCheckoutSession(
  sessionId: string,
): Promise<Stripe.Checkout.Session | null> {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (e) {
    console.error("[stripe] checkout.sessions.retrieve", sessionId, e);
    return null;
  }
}

/**
 * Lädt eine Checkout Session – bezahlt, Vollprofil-Produkt, Kunden-E-Mail.
 */
export async function getPaidProfileCheckoutSessionInfo(sessionId: string): Promise<{
  ok: boolean;
  customerEmail: string | null;
  birthPayload: ProfileTokenBirthPayload | null;
}> {
  const session = await retrieveCheckoutSession(sessionId);
  if (!session) {
    return { ok: false, customerEmail: null, birthPayload: null };
  }

  if (!checkoutSessionPaymentOk(session)) {
    return { ok: false, customerEmail: null, birthPayload: null };
  }

  const meta = session.metadata ?? {};
  const productMatch =
    meta.cms_product_id === PRODUCT_ID_ASTRO_VOLLPROFIL ||
    meta.productId === PRODUCT_ID_ASTRO_VOLLPROFIL;

  if (!productMatch) {
    return { ok: false, customerEmail: null, birthPayload: null };
  }

  const birthPayload = parseBirthFromStripeMetadata(meta);

  const raw =
    (typeof session.customer_details?.email === "string"
      ? session.customer_details.email
      : null) ||
    (typeof session.customer_email === "string" ? session.customer_email : null);
  const trimmed = raw?.trim() ?? "";
  const customerEmail = trimmed.length > 0 ? trimmed : null;

  return { ok: true, customerEmail, birthPayload };
}

/**
 * Bezahlte Checkout-Session für exakte Paaranalyse: Produkt + Geburtsdaten A & B in Metadaten.
 */
export async function getPaidCompatibilityCheckoutSessionInfo(sessionId: string): Promise<{
  ok: boolean;
  customerEmail: string | null;
  birthA: ProfileTokenBirthPayload | null;
  birthB: ProfileTokenBirthPayload | null;
}> {
  const session = await retrieveCheckoutSession(sessionId);
  if (!session) {
    return { ok: false, customerEmail: null, birthA: null, birthB: null };
  }

  if (!checkoutSessionPaymentOk(session)) {
    return { ok: false, customerEmail: null, birthA: null, birthB: null };
  }

  const meta = session.metadata ?? {};
  const productMatch =
    meta.cms_product_id === PRODUCT_ID_COMPAT_PAARANALYSE ||
    meta.productId === PRODUCT_ID_COMPAT_PAARANALYSE;

  if (!productMatch) {
    return { ok: false, customerEmail: null, birthA: null, birthB: null };
  }

  const birthA = parseBirthFromStripeMetadataKey(meta, "zd_astro_a");
  const birthB = parseBirthFromStripeMetadataKey(meta, "zd_astro_b");
  if (!birthA || !birthB) {
    return { ok: false, customerEmail: null, birthA: null, birthB: null };
  }

  const raw =
    (typeof session.customer_details?.email === "string"
      ? session.customer_details.email
      : null) ||
    (typeof session.customer_email === "string" ? session.customer_email : null);
  const trimmed = raw?.trim() ?? "";
  const customerEmail = trimmed.length > 0 ? trimmed : null;

  return { ok: true, customerEmail, birthA, birthB };
}

/**
 * Prüft eine Stripe Checkout Session: bezahlt und unser Vollprofil-Produkt.
 */
export async function isPaidAstroVollprofilSession(
  sessionId: string,
): Promise<boolean> {
  const { ok } = await getPaidProfileCheckoutSessionInfo(sessionId);
  return ok;
}
