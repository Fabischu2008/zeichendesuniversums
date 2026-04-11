import { isPaidAstroVollprofilSession } from "@/lib/stripe-checkout-session";

/**
 * Ob nach einem Kauf ein Profil-Zugangslink ausgestellt werden darf.
 * - Ohne Stripe-Key (MVP-Checkout-Stub): ja, wenn Produkt passt.
 * - Mit Stripe-Key: nur bei gültiger Checkout-Session (metadata + bezahlt).
 */
export async function shouldIssueProfileAccessToken(
  isProfileProduct: boolean,
  sessionId: string | undefined,
): Promise<boolean> {
  if (!isProfileProduct) return false;
  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  if (!hasStripe) {
    return true;
  }
  if (sessionId) {
    return isPaidAstroVollprofilSession(sessionId);
  }
  return false;
}
