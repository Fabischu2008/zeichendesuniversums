import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { ProfileTokenBirthPayload } from "@/lib/profile-access-token";
import { getSiteUrl } from "@/lib/site";

const SCOPE = "compatibility-pair-access" as const;

function derivedSecretFromStripe(): string {
  const stripe = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripe) return "";
  return createHash("sha256")
    .update(stripe, "utf8")
    .update("|zd:compat-access-derived-v1|", "utf8")
    .digest("hex");
}

function derivedSecretFromSite(): string {
  const base = getSiteUrl();
  return createHash("sha256")
    .update(base, "utf8")
    .update("|zd:compat-access-site-v1|", "utf8")
    .digest("hex");
}

function getSecret(): string {
  const explicit = process.env.PROFILE_ACCESS_SECRET?.trim();
  if (explicit) return explicit;
  if (process.env.NODE_ENV === "development") {
    return "dev-only-profile-access-secret";
  }
  const fromStripe = derivedSecretFromStripe();
  if (fromStripe) return fromStripe;
  return derivedSecretFromSite();
}

function isBirthPayload(x: unknown): x is ProfileTokenBirthPayload {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.d === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(o.d) &&
    typeof o.t === "string" &&
    /^\d{2}:\d{2}$/.test(o.t) &&
    typeof o.lat === "number" &&
    Number.isFinite(o.lat) &&
    typeof o.lon === "number" &&
    Number.isFinite(o.lon) &&
    typeof o.cc === "string" &&
    o.cc.length > 0 &&
    typeof o.lb === "string" &&
    o.lb.length > 0
  );
}

export function createCompatibilityAccessToken(
  a: ProfileTokenBirthPayload,
  b: ProfileTokenBirthPayload,
  expiresInDays = 365,
): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + expiresInDays * 86400;
  const payload = JSON.stringify({ v: 1 as const, scope: SCOPE, exp, a, b });
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  return `${payloadB64}.${sig}`;
}

export function decodeCompatibilityAccessToken(token: string): {
  ok: boolean;
  a?: ProfileTokenBirthPayload;
  b?: ProfileTokenBirthPayload;
} {
  const secret = getSecret();
  if (!secret) return { ok: false };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false };
  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return { ok: false };
  let payload = "";
  try {
    payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return { ok: false };
  }
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false };
  } catch {
    return { ok: false };
  }
  try {
    const parsed = JSON.parse(payload) as {
      v?: number;
      scope?: string;
      exp?: number;
      a?: unknown;
      b?: unknown;
    };
    if (parsed.v !== 1 || parsed.scope !== SCOPE) return { ok: false };
    if (typeof parsed.exp !== "number" || parsed.exp * 1000 < Date.now()) {
      return { ok: false };
    }
    if (!isBirthPayload(parsed.a) || !isBirthPayload(parsed.b)) {
      return { ok: false };
    }
    return { ok: true, a: parsed.a, b: parsed.b };
  } catch {
    return { ok: false };
  }
}
