import type { ProfileTokenBirthPayload } from "@/lib/profile-access-token";
import {
  getPaidCompatibilityCheckoutSessionInfo,
  getPaidProfileCheckoutSessionInfo,
} from "@/lib/stripe-checkout-session";

/** Reines lokales `next dev`: kein Vercel, kein Production-Build. */
function isLocalDevWithoutVercel(): boolean {
  return (
    process.env.NODE_ENV !== "production" && !process.env.VERCEL?.trim()
  );
}

/**
 * Ein Stripe-Request: Zahlungsstatus, Produkt, ggf. E-Mail für automatischen Versand.
 *
 * Mit `STRIPE_SECRET_KEY`: Token nur nach verifizierter, bezahlter Checkout-Session.
 * Ohne Key nur noch auf lokalem Dev (MVP ohne Stripe); auf Vercel/Production nie.
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
  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY?.trim());

  if (hasStripe) {
    if (!sid) {
      return { mayIssue: false, stripeCustomerEmail: null, birthPayload: null };
    }
    const info = await getPaidProfileCheckoutSessionInfo(sid);
    return {
      mayIssue: info.ok,
      stripeCustomerEmail: info.customerEmail,
      birthPayload: info.birthPayload,
    };
  }

  if (!isLocalDevWithoutVercel()) {
    return { mayIssue: false, stripeCustomerEmail: null, birthPayload: null };
  }

  // Lokales Dev ohne Stripe: Redirect aus createCheckoutSession ohne session_id + ggf. ?ap=
  if (!sid) {
    return { mayIssue: true, stripeCustomerEmail: null, birthPayload: null };
  }

  return { mayIssue: false, stripeCustomerEmail: null, birthPayload: null };
}

/**
 * Paaranalyse: wie Profil-Produkt, aber zwei Geburtsdatensätze aus Stripe-Metadaten.
 */
export async function resolveCompatibilityAccessForSuccess(
  isCompatProduct: boolean,
  sessionId: string | undefined,
): Promise<{
  mayIssue: boolean;
  stripeCustomerEmail: string | null;
  birthA: ProfileTokenBirthPayload | null;
  birthB: ProfileTokenBirthPayload | null;
}> {
  if (!isCompatProduct) {
    return {
      mayIssue: false,
      stripeCustomerEmail: null,
      birthA: null,
      birthB: null,
    };
  }

  const sid = typeof sessionId === "string" ? sessionId.trim() : "";
  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY?.trim());

  if (hasStripe) {
    if (!sid) {
      return {
        mayIssue: false,
        stripeCustomerEmail: null,
        birthA: null,
        birthB: null,
      };
    }
    const info = await getPaidCompatibilityCheckoutSessionInfo(sid);
    return {
      mayIssue: info.ok,
      stripeCustomerEmail: info.customerEmail,
      birthA: info.birthA,
      birthB: info.birthB,
    };
  }

  if (!isLocalDevWithoutVercel()) {
    return {
      mayIssue: false,
      stripeCustomerEmail: null,
      birthA: null,
      birthB: null,
    };
  }

  if (!sid) {
    return {
      mayIssue: true,
      stripeCustomerEmail: null,
      birthA: null,
      birthB: null,
    };
  }

  return {
    mayIssue: false,
    stripeCustomerEmail: null,
    birthA: null,
    birthB: null,
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
