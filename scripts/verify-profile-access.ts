/**
 * Simuliert Policy + Token bei verschiedenen Umgebungen.
 *
 *   npx tsx scripts/verify-profile-access.ts
 */
import {
  createProfileAccessToken,
  verifyProfileAccessToken,
} from "../lib/profile-access-token";
import { shouldIssueProfileAccessToken } from "../lib/profile-access-policy";

async function withPatchedEnv(
  patch: Record<string, string | undefined>,
  fn: () => Promise<void>,
): Promise<void> {
  const keys = new Set([
    ...Object.keys(patch),
    "PROFILE_ACCESS_SECRET",
    "STRIPE_SECRET_KEY",
    "NODE_ENV",
    "VERCEL",
    "VERCEL_ENV",
    "VERCEL_URL",
  ]);
  const prev: Record<string, string | undefined> = {};
  for (const k of keys) {
    prev[k] = process.env[k];
  }
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  delete process.env.PROFILE_ACCESS_SECRET;
  delete process.env.STRIPE_SECRET_KEY;
  try {
    await fn();
  } finally {
    for (const k of keys) {
      if (prev[k] === undefined) delete process.env[k];
      else process.env[k] = prev[k];
    }
  }
}

async function main() {
  let failed = false;

  await withPatchedEnv(
    {
      NODE_ENV: "production",
      VERCEL_ENV: "production",
      VERCEL: "1",
      VERCEL_URL: "example.vercel.app",
      NEXT_PUBLIC_SITE_URL: undefined,
      SITE_URL: undefined,
    },
    async () => {
      const may = await shouldIssueProfileAccessToken(true, undefined);
      console.log(
        `[Vercel Production, kein Stripe] mayIssue=${may} (erwartet: false)`,
      );
      if (may) failed = true;
    },
  );

  await withPatchedEnv(
    {
      NODE_ENV: "development",
      VERCEL: undefined,
      VERCEL_ENV: undefined,
      VERCEL_URL: undefined,
    },
    async () => {
      const may = await shouldIssueProfileAccessToken(true, undefined);
      const token = may ? createProfileAccessToken() : null;
      const ok = token ? verifyProfileAccessToken(token) : false;
      console.log(
        `[lokales next dev, kein Stripe, keine session_id] mayIssue=${may} token=${token ? "yes" : "null"} verify=${ok}`,
      );
      if (!may || !token || !ok) failed = true;
    },
  );

  if (failed) process.exit(1);
}

void main();
