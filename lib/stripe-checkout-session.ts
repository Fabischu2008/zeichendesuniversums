import { PRODUCT_ID_ASTRO_VOLLPROFIL } from "@/lib/cms";

/**
 * Prüft eine Stripe Checkout Session: bezahlt und unser Vollprofil-Produkt.
 * Erwartet, dass beim Erzeugen der Session `metadata.cms_product_id` gesetzt wird.
 */
export async function isPaidAstroVollprofilSession(
  sessionId: string,
): Promise<boolean> {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || !sessionId) return false;

  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return false;

  const session = (await res.json()) as {
    payment_status?: string;
    metadata?: Record<string, string | undefined>;
  };

  if (session.payment_status !== "paid") return false;

  const meta = session.metadata ?? {};
  return (
    meta.cms_product_id === PRODUCT_ID_ASTRO_VOLLPROFIL ||
    meta.productId === PRODUCT_ID_ASTRO_VOLLPROFIL
  );
}
