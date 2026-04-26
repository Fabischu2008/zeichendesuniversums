import type { Metadata } from "next";
import { AccessBrandHeader } from "@/components/AccessBrandHeader";
import { AsyncCheckoutPaymentPoller } from "@/components/AsyncCheckoutPaymentPoller";
import { CompatibilityAccessLinksCard } from "@/components/CompatibilityAccessLinksCard";
import { ProfileAccessLinkCard } from "@/components/ProfileAccessLinkCard";
import { StripeCompatibilityEmailOnce } from "@/components/StripeCompatibilityEmailOnce";
import { StripeProfileEmailOnce } from "@/components/StripeProfileEmailOnce";
import { StripSuccessEmailQuery } from "@/components/StripSuccessEmailQuery";
import { buildCompatibilityAccessLinks } from "@/lib/compatibility-access-links";
import {
  getProducts,
  PRODUCT_ID_ASTRO_VOLLPROFIL,
  PRODUCT_ID_COACHING_EINFLUSS,
  PRODUCT_ID_COMPAT_PAARANALYSE,
  PRODUCT_ID_READING_PROFILE_30,
  PRODUCT_ID_READING_RELATIONSHIP,
  PRODUCT_ID_READING_TAROT_60,
} from "@/lib/cms";
import {
  isValidProfileEmail,
  sendCompatibilityAccessEmail,
  sendProfileAccessEmail,
} from "@/lib/email-profile-access";
import {
  createProfileAccessToken,
  decodeAstroSuccessPack,
} from "@/lib/profile-access-token";
import {
  resolveCompatibilityAccessForSuccess,
  resolveProfileAccessForSuccess,
} from "@/lib/profile-access-policy";
import { buildProfileAccessWithUnlockUrl } from "@/lib/profile-unlock-url";
import { getSiteUrl } from "@/lib/site";
import { asyncPaymentPendingForProduct } from "@/lib/stripe-checkout-session";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Kauf erfolgreich",
  description: "Dein persönlicher Zugangslink.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

function sanitizeStripeCustomerEmail(email?: string | null): string | null {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  // Stripe can provide placeholder emails in some checkout/payment-method flows.
  if (/^generated_email_[^@]*@example\.com$/.test(normalized)) return null;
  if (!isValidProfileEmail(normalized)) return null;
  return normalized;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{
    productId?: string;
    session_id?: string;
    email?: string;
    ap?: string;
    apa?: string;
    apb?: string;
  }>;
}) {
  const sp = await searchParams;
  const productId =
    sp?.productId && typeof sp.productId === "string" ? sp.productId : "";
  const sessionId =
    sp?.session_id && typeof sp.session_id === "string"
      ? sp.session_id
      : undefined;
  const rawQueryEmail =
    sp?.email && typeof sp.email === "string" ? sp.email.trim() : "";
  const apParam = sp?.ap && typeof sp.ap === "string" ? sp.ap.trim() : "";
  const apaParam =
    sp?.apa && typeof sp.apa === "string" ? sp.apa.trim() : "";
  const apbParam =
    sp?.apb && typeof sp.apb === "string" ? sp.apb.trim() : "";

  const isProfileProduct = productId === PRODUCT_ID_ASTRO_VOLLPROFIL;
  const isCompatProduct = productId === PRODUCT_ID_COMPAT_PAARANALYSE;
  const isReadingProduct =
    productId === PRODUCT_ID_READING_PROFILE_30 ||
    productId === PRODUCT_ID_READING_TAROT_60 ||
    productId === PRODUCT_ID_READING_RELATIONSHIP;
  const isCoachingProduct = productId === PRODUCT_ID_COACHING_EINFLUSS;
  const coachingCalendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_COACHING_URL?.trim() ||
    "https://calendly.com/zeichendesuniversums-info/30min";
  const readingCalendlyUrl =
    productId === PRODUCT_ID_READING_TAROT_60
      ? process.env.NEXT_PUBLIC_CALENDLY_READING_60_URL?.trim() ||
        "https://calendly.com/zeichendesuniversums-info/60min-astroreading-tarot"
      : productId === PRODUCT_ID_READING_RELATIONSHIP
        ? process.env.NEXT_PUBLIC_CALENDLY_READING_RELATIONSHIP_URL?.trim() ||
          process.env.NEXT_PUBLIC_CALENDLY_READING_URL?.trim() ||
          "https://calendly.com/zeichendesuniversums-info/30min-astroreading"
        : process.env.NEXT_PUBLIC_CALENDLY_READING_URL?.trim() ||
          "https://calendly.com/zeichendesuniversums-info/30min-astroreading";
  const product = getProducts().find((p) => p.id === productId);

  const { mayIssue, stripeCustomerEmail, birthPayload } =
    await resolveProfileAccessForSuccess(isProfileProduct, sessionId);
  const safeStripeCustomerEmail = sanitizeStripeCustomerEmail(stripeCustomerEmail);

  const birthFromNoStripe =
    isProfileProduct && apParam ? decodeAstroSuccessPack(apParam) : null;
  const birthForToken = birthPayload ?? birthFromNoStripe ?? undefined;

  const token = mayIssue
    ? createProfileAccessToken(365, birthForToken)
    : null;
  const profileAccessUrl =
    token !== null ? buildProfileAccessWithUnlockUrl(getSiteUrl(), token) : null;

  const compatResolved = await resolveCompatibilityAccessForSuccess(
    isCompatProduct,
    sessionId,
  );
  const birthAFromPack =
    isCompatProduct && apaParam ? decodeAstroSuccessPack(apaParam) : null;
  const birthBFromPack =
    isCompatProduct && apbParam ? decodeAstroSuccessPack(apbParam) : null;
  const birthA =
    compatResolved.birthA ?? birthAFromPack ?? undefined;
  const birthB =
    compatResolved.birthB ?? birthBFromPack ?? undefined;
  const compatMayIssue = compatResolved.mayIssue && birthA && birthB;
  const compatLinks =
    compatMayIssue && birthA && birthB
      ? buildCompatibilityAccessLinks(getSiteUrl(), birthA, birthB)
      : null;

  const queryEmailRecipient =
    rawQueryEmail && isValidProfileEmail(rawQueryEmail) ? rawQueryEmail : null;

  let queryEmailNotice: "sent" | "failed" | null = null;
  if (isProfileProduct && profileAccessUrl && queryEmailRecipient) {
    const r = await sendProfileAccessEmail({
      to: queryEmailRecipient,
      profileUrl: profileAccessUrl,
    });
    queryEmailNotice = r.ok ? "sent" : "failed";
  }

  if (
    isCompatProduct &&
    compatLinks &&
    queryEmailRecipient
  ) {
    const r = await sendCompatibilityAccessEmail({
      to: queryEmailRecipient,
      compatibilityUrl: compatLinks.pairLink,
      profileUrlA: compatLinks.profileLinkA,
      profileUrlB: compatLinks.profileLinkB,
    });
    queryEmailNotice = r.ok ? "sent" : "failed";
  }

  if (isProfileProduct && profileAccessUrl) {
    const showStripeClientMail =
      Boolean(sessionId) &&
      Boolean(safeStripeCustomerEmail) &&
      !queryEmailRecipient;

    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="mx-auto max-w-2xl">
            {showStripeClientMail ? (
              <StripeProfileEmailOnce
                sessionId={sessionId!}
                profileUrl={profileAccessUrl}
                customerEmail={safeStripeCustomerEmail!}
              />
            ) : null}
            {rawQueryEmail || apParam ? <StripSuccessEmailQuery /> : null}
            <ProfileAccessLinkCard
              profileUrl={profileAccessUrl}
              defaultEmail={safeStripeCustomerEmail}
              queryEmailNotice={queryEmailNotice}
            />
          </div>
        </main>
      </>
    );
  }

  if (isCompatProduct && compatLinks) {
    const showStripeCompatMail =
      Boolean(sessionId) &&
      Boolean(compatResolved.stripeCustomerEmail) &&
      !queryEmailRecipient;

    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {showStripeCompatMail ? (
              <StripeCompatibilityEmailOnce
                sessionId={sessionId!}
                pairLink={compatLinks.pairLink}
                profileUrlA={compatLinks.profileLinkA}
                profileUrlB={compatLinks.profileLinkB}
                customerEmail={compatResolved.stripeCustomerEmail!}
              />
            ) : null}
            {rawQueryEmail || apaParam || apbParam ? (
              <StripSuccessEmailQuery />
            ) : null}
            <CompatibilityAccessLinksCard
              pairLink={compatLinks.pairLink}
              profileLinkA={compatLinks.profileLinkA}
              profileLinkB={compatLinks.profileLinkB}
            />
            {queryEmailNotice === "sent" || queryEmailNotice === "failed" ? (
              <p className="text-center text-sm text-black/60 dark:text-white/60">
                {queryEmailNotice === "sent"
                  ? "Die Links wurden an die angegebene E-Mail gesendet."
                  : "E-Mail konnte nicht gesendet werden – bitte Links manuell kopieren."}
              </p>
            ) : null}
          </div>
        </main>
      </>
    );
  }

  if (isReadingProduct) {
    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="mx-auto max-w-2xl space-y-6">
            <section className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.08] p-6 sm:p-8 dark:border-emerald-400/30 dark:bg-emerald-500/10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-300/35 dark:bg-emerald-400/15 dark:text-emerald-200">
                <span aria-hidden="true">✓</span>
                Bezahlt
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Danke für deine Buchung</h1>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                {product ? `${product.name} wurde erfolgreich bezahlt.` : "Dein Reading wurde erfolgreich bezahlt."}
              </p>
              <p className="mt-3 text-sm text-black/70 dark:text-white/70">
                Bitte schicke bei Calendly kurz deinen persönlichen Astroprofil-Link mit und erwähne in 1-2 Sätzen,
                was aktuell deine größten Herausforderungen im Leben sind.
              </p>
              <a
                href={readingCalendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Termin in Calendly buchen
              </a>
            </section>
          </div>
        </main>
      </>
    );
  }

  if (isCoachingProduct) {
    const coachingMailTo = `mailto:zeichendesuniversums.info@gmail.com?subject=${encodeURIComponent("Coaching Buchung - nächster Schritt")}&body=${encodeURIComponent(
      "Hallo,\n\nich habe das Einfluss Coaching gebucht und möchte den nächsten Schritt abstimmen.\n\nName:\nThema:\n",
    )}`;
    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="mx-auto max-w-2xl space-y-6">
            <section className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.08] p-6 sm:p-8 dark:border-emerald-400/30 dark:bg-emerald-500/10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-300/35 dark:bg-emerald-400/15 dark:text-emerald-200">
                <span aria-hidden="true">✓</span>
                Bezahlt
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">Danke für deine Buchung</h1>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                {product ? `${product.name} wurde erfolgreich bezahlt.` : "Dein Coaching wurde erfolgreich bezahlt."}
              </p>
              <p className="mt-3 text-sm text-black/70 dark:text-white/70">
                Wir melden uns zeitnah mit den nächsten Schritten bei dir, damit dein Einfluss Coaching direkt starten kann.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href={coachingCalendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Termin in Calendly buchen
                </a>
                <a
                  href={coachingMailTo}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-black/12 bg-white px-5 text-sm font-semibold text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                >
                  Optional per E-Mail senden
                </a>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }

  if (isProfileProduct && !profileAccessUrl) {
    const pollAsync =
      typeof sessionId === "string" &&
      sessionId.trim() !== "" &&
      (await asyncPaymentPendingForProduct(sessionId, PRODUCT_ID_ASTRO_VOLLPROFIL));

    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white/60 p-6 text-sm text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
            <p className="font-medium text-black dark:text-white">
              {pollAsync ? "Zahlung wird bestätigt …" : "Persönlicher Link nicht verfügbar"}
            </p>
            <p className="mt-2">
              {pollAsync
                ? "Bei Bancontact, SEPA oder ähnlichen Methoden bestätigt Stripe die Zahlung oft erst wenige Sekunden nach der Rückkehr – der Link erscheint gleich automatisch."
                : "Der Zugangslink konnte nicht erstellt werden. Typische Ursachen: "}
              {!pollAsync ? (
                <>
                  <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
                    STRIPE_SECRET_KEY
                  </code>{" "}
                  fehlt auf dem Server, oder diese Seite wurde ohne gültige Stripe-Session
                  geöffnet (immer über den Abschluss im Checkout mit dem Link zurückkehren).
                  Bitte den Support kontaktieren oder es später erneut versuchen.
                </>
              ) : null}
            </p>
            {pollAsync && sessionId ? (
              <AsyncCheckoutPaymentPoller
                sessionId={sessionId!}
                productId={PRODUCT_ID_ASTRO_VOLLPROFIL}
              />
            ) : null}
          </div>
        </main>
      </>
    );
  }

  if (isCompatProduct && !compatLinks) {
    const hasSession = Boolean(sessionId?.trim());
    const pollAsync =
      typeof sessionId === "string" &&
      sessionId.trim() !== "" &&
      (await asyncPaymentPendingForProduct(sessionId, PRODUCT_ID_COMPAT_PAARANALYSE));

    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white/60 p-6 text-sm text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
            <p className="font-medium text-black dark:text-white">
              {pollAsync ? "Zahlung wird bestätigt …" : "Paaranalyse-Links nicht verfügbar"}
            </p>
            <p className="mt-2">
              {pollAsync ? (
                "Bei Bancontact, SEPA oder ähnlichen Methoden bestätigt Stripe die Zahlung oft erst kurz nach der Rückkehr – die Links erscheinen gleich automatisch."
              ) : (
                <>
                  Die Zugangslinks konnten nicht erstellt werden. Häufige Ursachen:{" "}
                  <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
                    STRIPE_SECRET_KEY
                  </code>{" "}
                  fehlt auf Vercel (Production) oder passt nicht zur Stripe-Umgebung (Test- vs.
                  Live-Key), die Success-URL enthält keine{" "}
                  <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
                    session_id
                  </code>{" "}
                  {!hasSession ? (
                    <span className="font-medium text-amber-800 dark:text-amber-200">
                      (aktuell fehlt sie in der Adresszeile)
                    </span>
                  ) : null}
                  , oder die Zahlung ist noch nicht als „bezahlt“ verbucht. Bitte Support
                  kontaktieren, wenn das weiterhin auftritt.
                </>
              )}
            </p>
            {pollAsync && sessionId ? (
              <AsyncCheckoutPaymentPoller
                sessionId={sessionId!}
                productId={PRODUCT_ID_COMPAT_PAARANALYSE}
              />
            ) : null}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AccessBrandHeader />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
          <h1 className="text-2xl font-semibold tracking-tight">Danke für deinen Kauf</h1>
          <p className="mt-3 text-sm text-black/70 dark:text-white/70">
            {product ? `Produkt: ${product.name}` : "Dein Produkt ist bereit."}
          </p>
          <a
            href={product?.fileUrl || "/downloads/demo.pdf"}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Download
          </a>
        </div>
      </main>
    </>
  );
}
