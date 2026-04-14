import type { Metadata } from "next";
import { AccessBrandHeader } from "@/components/AccessBrandHeader";
import { CompatibilityAccessLinksCard } from "@/components/CompatibilityAccessLinksCard";
import { decodeCompatibilityAccessToken } from "@/lib/compatibility-access-token";
import { createProfileAccessToken } from "@/lib/profile-access-token";
import {
  buildProfileAccessWithUnlockUrl,
  buildUnlockUrlForPath,
} from "@/lib/profile-unlock-url";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Paaranalyse-Zugänge",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function CompatibilityAccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ unlock?: string }>;
}) {
  const sp = await searchParams;
  const unlock = sp?.unlock && typeof sp.unlock === "string" ? sp.unlock : "";
  const decoded = decodeCompatibilityAccessToken(unlock);
  if (!decoded.ok || !decoded.a || !decoded.b) {
    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto flex min-h-[calc(100dvh-84px)] w-full max-w-4xl items-center justify-center px-4 py-8">
          <div className="w-full rounded-3xl border border-black/10 bg-white/70 p-6 text-sm text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
            <p className="font-medium text-black dark:text-white">
              Zugangsseite nicht verfügbar
            </p>
            <p className="mt-2">
              Der Paaranalyse-Link ist ungültig oder abgelaufen. Bitte erstelle einen
              neuen Link aus deiner exakten Paaranalyse.
            </p>
          </div>
        </main>
      </>
    );
  }

  const tokenA = createProfileAccessToken(365, decoded.a);
  const tokenB = createProfileAccessToken(365, decoded.b);
  const site = getSiteUrl();
  if (!tokenA || !tokenB) {
    return (
      <>
        <AccessBrandHeader />
        <main className="mx-auto flex min-h-[calc(100dvh-84px)] w-full max-w-4xl items-center justify-center px-4 py-8">
          <div className="w-full rounded-3xl border border-black/10 bg-white/70 p-6 text-sm text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
            <p className="font-medium text-black dark:text-white">
              Links konnten nicht erzeugt werden
            </p>
          </div>
        </main>
      </>
    );
  }

  const pairLink = buildUnlockUrlForPath(
    site,
    "/tools/compatibility",
    unlock,
    "paaranalyse",
  );
  const linkA = buildProfileAccessWithUnlockUrl(site, tokenA);
  const linkB = buildProfileAccessWithUnlockUrl(site, tokenB);

  return (
    <>
      <AccessBrandHeader />
      <main className="mx-auto min-h-[calc(100dvh-84px)] w-full max-w-4xl px-4 py-8">
        <div className="mx-auto w-full max-w-3xl">
          <CompatibilityAccessLinksCard
            pairLink={pairLink}
            profileLinkA={linkA}
            profileLinkB={linkB}
          />
        </div>
      </main>
    </>
  );
}
