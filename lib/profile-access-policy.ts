import { isPaidAstroVollprofilSession } from "@/lib/stripe-checkout-session";

/**
 * Ob nach einem Kauf ein Profil-Zugangslink ausgestellt werden darf.
 *
 * - **Ohne `session_id`** (nur `?productId=p_birth_profile`, MVP ohne Stripe-Checkout): **ja**.
 * - **Mit `session_id`** und gesetztem `STRIPE_SECRET_KEY`: nur wenn die Session bei Stripe bezahlt ist
 *   (später, wenn Checkout wirklich über Stripe läuft).
 * - **Mit `session_id`**, aber ohne Stripe-Key: **ja** (Entwicklung / Übergang).
 */
export async function shouldIssueProfileAccessToken(
  isProfileProduct: boolean,
  sessionId: string | undefined,
): Promise<boolean> {
  if (!isProfileProduct) return false;

  const sid = typeof sessionId === "string" ? sessionId.trim() : "";
  if (!sid) {
    return true;
  }

  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  if (!hasStripe) {
    return true;
  }

  return isPaidAstroVollprofilSession(sid);
}
