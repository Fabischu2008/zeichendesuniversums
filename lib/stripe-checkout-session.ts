import { PRODUCT_ID_ASTRO_VOLLPROFIL } from "@/lib/cms";

type StripeSessionJson = {
  payment_status?: string;
  metadata?: Record<string, string | undefined>;
  customer_details?: { email?: string | null };
  customer_email?: string | null;
};

/**
 * Lädt eine Checkout Session (ein Request) – bezahlt, Vollprofil-Produkt, Kunden-E-Mail.
 */
export async function getPaidProfileCheckoutSessionInfo(sessionId: string): Promise<{
  ok: boolean;
  customerEmail: string | null;
}> {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || !sessionId) {
    return { ok: false, customerEmail: null };
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
    return { ok: false, customerEmail: null };
  }

  const session = (await res.json()) as StripeSessionJson;

  if (session.payment_status !== "paid") {
    return { ok: false, customerEmail: null };
  }

  const meta = session.metadata ?? {};
  const productMatch =
    meta.cms_product_id === PRODUCT_ID_ASTRO_VOLLPROFIL ||
    meta.productId === PRODUCT_ID_ASTRO_VOLLPROFIL;

  if (!productMatch) {
    return { ok: false, customerEmail: null };
  }

  const raw =
    (typeof session.customer_details?.email === "string"
      ? session.customer_details.email
      : null) ||
    (typeof session.customer_email === "string" ? session.customer_email : null);
  const trimmed = raw?.trim() ?? "";
  const customerEmail = trimmed.length > 0 ? trimmed : null;

  return { ok: true, customerEmail };
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
