import type { Metadata } from "next";
import { ProfileAccessLinkCard } from "@/components/ProfileAccessLinkCard";
import { StripeProfileEmailOnce } from "@/components/StripeProfileEmailOnce";
import { StripSuccessEmailQuery } from "@/components/StripSuccessEmailQuery";
import { getProducts, PRODUCT_ID_ASTRO_VOLLPROFIL } from "@/lib/cms";
import {
  isValidProfileEmail,
  sendProfileAccessEmail,
} from "@/lib/email-profile-access";
import { createProfileAccessToken } from "@/lib/profile-access-token";
import { resolveProfileAccessForSuccess } from "@/lib/profile-access-policy";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kauf erfolgreich",
  description: "Dein persönlicher Profil-Zugangslink.",
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

  const isProfileProduct = productId === PRODUCT_ID_ASTRO_VOLLPROFIL;
  const product = getProducts().find((p) => p.id === productId);

  const { mayIssue, stripeCustomerEmail } = await resolveProfileAccessForSuccess(
    isProfileProduct,
    sessionId,
  );

  const token = mayIssue ? createProfileAccessToken() : null;
  const profileAccessUrl =
    token !== null
      ? `${getSiteUrl()}/tools/birth-chart/profile?unlock=${encodeURIComponent(token)}`
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

  if (isProfileProduct && profileAccessUrl) {
    const showStripeClientMail =
      Boolean(sessionId) &&
      Boolean(stripeCustomerEmail) &&
      !queryEmailRecipient;

    return (
      <div className="mx-auto max-w-2xl">
        {showStripeClientMail ? (
          <StripeProfileEmailOnce
            sessionId={sessionId!}
            profileUrl={profileAccessUrl}
            customerEmail={stripeCustomerEmail!}
          />
        ) : null}
        {rawQueryEmail ? <StripSuccessEmailQuery /> : null}
        <ProfileAccessLinkCard
          profileUrl={profileAccessUrl}
          defaultEmail={stripeCustomerEmail}
          queryEmailNotice={queryEmailNotice}
        />
      </div>
    );
  }

  if (isProfileProduct && !profileAccessUrl) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white/60 p-6 text-sm text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
        <p className="font-medium text-black dark:text-white">
          Persönlicher Link nicht verfügbar
        </p>
        <p className="mt-2">
          Der Zugangslink konnte nicht erstellt werden (z. B. fehlende
          Konfiguration). Bitte den Support kontaktieren oder es später erneut
          versuchen.
        </p>
      </div>
    );
  }

  return (
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
  );
}
