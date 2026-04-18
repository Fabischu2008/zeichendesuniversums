import { createCompatibilityAccessToken } from "@/lib/compatibility-access-token";
import { createProfileAccessToken } from "@/lib/profile-access-token";
import type { ProfileTokenBirthPayload } from "@/lib/profile-access-token";
import {
  buildProfileAccessWithUnlockUrl,
  buildUnlockUrlForPath,
} from "@/lib/profile-unlock-url";

/**
 * Drei Links wie in POST /api/tools/compatibility/access-links (Paaranalyse + Profil A/B).
 */
export function buildCompatibilityAccessLinks(
  siteOrigin: string,
  birthA: ProfileTokenBirthPayload,
  birthB: ProfileTokenBirthPayload,
): {
  pairLink: string;
  profileLinkA: string;
  profileLinkB: string;
} | null {
  const tokenA = createProfileAccessToken(365, birthA);
  const tokenB = createProfileAccessToken(365, birthB);
  const pairToken = createCompatibilityAccessToken(birthA, birthB);
  if (!tokenA || !tokenB || !pairToken) return null;

  const site = siteOrigin.replace(/\/+$/, "");
  return {
    pairLink: buildUnlockUrlForPath(
      site,
      "/tools/compatibility/access",
      pairToken,
      "paar-links",
    ),
    profileLinkA: buildProfileAccessWithUnlockUrl(site, tokenA),
    profileLinkB: buildProfileAccessWithUnlockUrl(site, tokenB),
  };
}
