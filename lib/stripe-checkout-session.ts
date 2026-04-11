import type { ProfileTokenBirthPayload } from "@/lib/profile-access-token";
import { PRODUCT_ID_ASTRO_VOLLPROFIL } from "@/lib/cms";

type StripeSessionJson = {
  payment_status?: string;
  metadata?: Record<string, string | undefined>;
  customer_details?: { email?: string | null };
  customer_email?: string | null;
};

function parseBirthFromStripeMetadata(
  meta: Record<string, string | undefined>,
): ProfileTokenBirthPayload | null {
  const raw = meta.zd_astro?.trim();
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    const d = typeof o.d === "string" ? o.d : "";
    const t = typeof o.t === "string" ? o.t : "";
    const lat = typeof o.lat === "number" ? o.lat : Number.NaN;
    const lon = typeof o.lon === "number" ? o.lon : Number.NaN;
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

/**
 * Lädt eine Checkout Session (ein Request) – bezahlt, Vollprofil-Produkt, Kunden-E-Mail.
 */
export async function getPaidProfileCheckoutSessionInfo(sessionId: string): Promise<{
  ok: boolean;
  customerEmail: string | null;
  birthPayload: ProfileTokenBirthPayload | null;
}> {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || !sessionId) {
    return { ok: false, customerEmail: null, birthPayload: null };
  }

  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return { ok: false, customerEmail: null, birthPayload: null };
  }

  const session = (await res.json()) as StripeSessionJson;

  if (session.payment_status !== "paid") {
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
 * Prüft eine Stripe Checkout Session: bezahlt und unser Vollprofil-Produkt.
 */
export async function isPaidAstroVollprofilSession(
  sessionId: string,
): Promise<boolean> {
  const { ok } = await getPaidProfileCheckoutSessionInfo(sessionId);
  return ok;
}
