/**
 * Simuliert Vercel (Production + Preview) ohne Secrets: Policy, Token, Verify.
 *
 *   npx tsx scripts/verify-profile-access.ts
 */
import { createProfileAccessToken, verifyProfileAccessToken } from "../lib/profile-access-token";
import { shouldIssueProfileAccessToken } from "../lib/profile-access-policy";

async function withPatchedEnv(
  patch: Record<string, string | undefined>,
  fn: () => Promise<void>,
): Promise<void> {
  const keys = new Set([...Object.keys(patch), "PROFILE_ACCESS_SECRET", "STRIPE_SECRET_KEY"]);
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
  const scenarios: { name: string; patch: Record<string, string | undefined> }[] = [
    {
      name: "Vercel Production (keine Secrets)",
      patch: {
        NODE_ENV: "production",
        VERCEL_ENV: "production",
        NEXT_PUBLIC_SITE_URL: undefined,
        SITE_URL: undefined,
        VERCEL_URL: undefined,
      },
    },
    {
      name: "Vercel Preview",
      patch: {
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
        VERCEL_URL: "proj-git-main-abc123.vercel.app",
        NEXT_PUBLIC_SITE_URL: undefined,
        SITE_URL: undefined,
      },
    },
    {
      name: "Production ohne Vercel (z. B. next start lokal)",
      patch: {
        NODE_ENV: "production",
        VERCEL_ENV: undefined,
        VERCEL_URL: undefined,
        NEXT_PUBLIC_SITE_URL: undefined,
        SITE_URL: undefined,
      },
    },
  ];

  let failed = false;
  for (const { name, patch } of scenarios) {
    await withPatchedEnv(patch, async () => {
      const may = await shouldIssueProfileAccessToken(true, undefined);
      const token = may ? createProfileAccessToken() : null;
      const ok = token ? verifyProfileAccessToken(token) : false;
      console.log(`[${name}] mayIssue=${may} token=${token ? "yes" : "null"} verify=${ok}`);
      if (!may || !token || !ok) failed = true;
    });
  }

  if (failed) process.exit(1);
}

void main();
