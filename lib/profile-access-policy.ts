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
}> {
  if (!isProfileProduct) {
    return { mayIssue: false, stripeCustomerEmail: null };
  }

  const sid = typeof sessionId === "string" ? sessionId.trim() : "";
  if (!sid) {
    return { mayIssue: true, stripeCustomerEmail: null };
  }

  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  if (!hasStripe) {
    return { mayIssue: true, stripeCustomerEmail: null };
  }

  const info = await getPaidProfileCheckoutSessionInfo(sid);
  return {
    mayIssue: info.ok,
    stripeCustomerEmail: info.customerEmail,
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
