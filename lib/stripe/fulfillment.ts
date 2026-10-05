import Stripe from "stripe";
import {
  PRODUCT_ID_ASTRO_VOLLPROFIL,
  PRODUCT_ID_COMPAT_PAARANALYSE,
} from "@/lib/cms";
import { buildCompatibilityAccessLinks } from "@/lib/compatibility-access-links";
import {
  sendCompatibilityAccessEmail,
  sendProfileAccessEmail,
} from "@/lib/email-profile-access";
import { createProfileAccessToken } from "@/lib/profile-access-token";
import { buildProfileAccessWithUnlockUrl } from "@/lib/profile-unlock-url";
import { getSiteUrl } from "@/lib/site";
import {
  getPaidCompatibilityCheckoutSessionInfo,
  getPaidProfileCheckoutSessionInfo,
} from "@/lib/stripe-checkout-session";

/** Metadaten-Flag am PaymentIntent – unser dauerhafter „schon versendet“-Marker. */
const SENT_FLAG = "zd_access_mail_sent_at";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

export type FulfillmentResult =
  | { status: "sent" }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

/**
 * Versandsperre ohne eigene Datenbank: Webhook und Success-Seite können denselben
 * Kauf ausliefern wollen, und Stripe wiederholt Webhooks. Der Marker liegt am
 * PaymentIntent, überlebt also Deploys und Browserwechsel. Nur der erste Aufrufer
 * bekommt `true`.
 */
async function claimAccessMailSend(
  sessionId: string,
): Promise<{ claimed: boolean; reason?: string }> {
  const stripe = getStripe();
  if (!stripe) return { claimed: false, reason: "Stripe nicht konfiguriert." };

  let paymentIntentId: string | null = null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);
  } catch (e) {
    console.error("[stripe] claim: sessions.retrieve", sessionId, e);
    return { claimed: false, reason: "Session nicht abrufbar." };
  }

  // Ohne PaymentIntent (z. B. 0-Euro-Session) gibt es nichts zu markieren.
  // Dann lieber ausliefern als den Kunden leer ausgehen lassen.
  if (!paymentIntentId) return { claimed: true };

  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.metadata?.[SENT_FLAG]) {
      return { claimed: false, reason: "Zugang wurde bereits versendet." };
    }
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: { ...intent.metadata, [SENT_FLAG]: new Date().toISOString() },
    });
    return { claimed: true };
  } catch (e) {
    console.error("[stripe] claim: paymentIntents", paymentIntentId, e);
    return { claimed: false, reason: "Versandsperre nicht prüfbar." };
  }
}

/**
 * Gibt die Sperre nach einem fehlgeschlagenen Versand wieder frei, damit der
 * Stripe-Retry es erneut versuchen kann.
 */
async function releaseAccessMailClaim(sessionId: string): Promise<void> {
  const stripe = getStripe();
  if (!stripe) return;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);
    if (!paymentIntentId) return;
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: { [SENT_FLAG]: "" },
    });
  } catch (e) {
    console.error("[stripe] release claim", sessionId, e);
  }
}

async function finish(
  sessionId: string,
  sent: { ok: true } | { ok: false; message: string },
): Promise<FulfillmentResult> {
  if (sent.ok) return { status: "sent" };
  await releaseAccessMailClaim(sessionId);
  return { status: "failed", reason: sent.message };
}

/**
 * Liefert die Zugangslinks zu einer bezahlten Checkout-Session per E-Mail aus.
 *
 * Bewusst unabhängig von der Success-Seite: Wer den Tab nach der Zahlung schließt,
 * muss seinen Zugang trotzdem bekommen.
 */
export async function fulfillCheckoutSession(
  sessionId: string,
): Promise<FulfillmentResult> {
  const sid = sessionId.trim();
  if (!sid) return { status: "skipped", reason: "Keine Session-ID." };

  const profile = await getPaidProfileCheckoutSessionInfo(sid);
  const compat = profile.ok
    ? null
    : await getPaidCompatibilityCheckoutSessionInfo(sid);

  const info = profile.ok ? profile : compat;
  if (!info?.ok) {
    return {
      status: "skipped",
      reason: "Keine bezahlte Session mit digitalem Produkt.",
    };
  }

  const recipient = info.customerEmail?.trim();
  if (!recipient) {
    return { status: "skipped", reason: "Keine Kunden-E-Mail in der Session." };
  }

  const site = getSiteUrl();

  if (profile.ok) {
    if (!profile.birthPayload) {
      return { status: "failed", reason: "Geburtsdaten fehlen in den Metadaten." };
    }
    const token = createProfileAccessToken(null, profile.birthPayload);
    if (!token) {
      return { status: "failed", reason: "Zugangstoken nicht erzeugbar." };
    }

    const claim = await claimAccessMailSend(sid);
    if (!claim.claimed) {
      return { status: "skipped", reason: claim.reason ?? "Bereits versendet." };
    }

    return finish(
      sid,
      await sendProfileAccessEmail({
        to: recipient,
        profileUrl: buildProfileAccessWithUnlockUrl(site, token),
      }),
    );
  }

  const links =
    compat?.birthA && compat.birthB
      ? buildCompatibilityAccessLinks(site, compat.birthA, compat.birthB)
      : null;
  if (!links) {
    return { status: "failed", reason: "Paaranalyse-Links nicht erzeugbar." };
  }

  const claim = await claimAccessMailSend(sid);
  if (!claim.claimed) {
    return { status: "skipped", reason: claim.reason ?? "Bereits versendet." };
  }

  return finish(
    sid,
    await sendCompatibilityAccessEmail({
      to: recipient,
      compatibilityUrl: links.pairLink,
      profileUrlA: links.profileLinkA,
      profileUrlB: links.profileLinkB,
    }),
  );
}

export const DIGITAL_PRODUCT_IDS = [
  PRODUCT_ID_ASTRO_VOLLPROFIL,
  PRODUCT_ID_COMPAT_PAARANALYSE,
] as const;
