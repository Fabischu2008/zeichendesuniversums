import type { ProfileTokenBirthPayload } from "@/lib/profile-access-token";
import { getPaidProfileCheckoutSessionInfo } from "@/lib/stripe-checkout-session";

/**
 * Ein Stripe-Request: Zahlungsstatus, Produkt, ggf. E-Mail für automatischen Versand.
 */
export async function resolveProfileAccessForSuccess(
  isProfileProduct: boolean,
  sessionId: string | undefined,
): Promise<{
  mayIssue: boolean;
  stripeCustomerEmail: string | null;
  birthPayload: ProfileTokenBirthPayload | null;
}> {
  if (!isProfileProduct) {
    return { mayIssue: false, stripeCustomerEmail: null, birthPayload: null };
  }

  const sid = typeof sessionId === "string" ? sessionId.trim() : "";
  if (!sid) {
    return { mayIssue: true, stripeCustomerEmail: null, birthPayload: null };
  }

  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  if (!hasStripe) {
    return { mayIssue: true, stripeCustomerEmail: null, birthPayload: null };
  }

  const info = await getPaidProfileCheckoutSessionInfo(sid);
  return {
    mayIssue: info.ok,
    stripeCustomerEmail: info.customerEmail,
    birthPayload: info.birthPayload,
  };
}

/**
 * Ob nach einem Kauf ein Profil-Zugangslink ausgestellt werden darf.
 */
export async function shouldIssueProfileAccessToken(
  isProfileProduct: boolean,
  sessionId: string | undefined,
): Promise<boolean> {
  const { mayIssue } = await resolveProfileAccessForSuccess(
    isProfileProduct,
    sessionId,
  );
  return mayIssue;
}
