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
  PRODUCT_ID_COMPAT_PAARANALYSE,
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
  const product = getProducts().find((p) => p.id === productId);

  const { mayIssue, stripeCustomerEmail, birthPayload } =
    await resolveProfileAccessForSuccess(isProfileProduct, sessionId);

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
      Boolean(stripeCustomerEmail) &&
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
                customerEmail={stripeCustomerEmail!}
              />
            ) : null}
            {rawQueryEmail || apParam ? <StripSuccessEmailQuery /> : null}
            <ProfileAccessLinkCard
              profileUrl={profileAccessUrl}
              defaultEmail={stripeCustomerEmail}
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
