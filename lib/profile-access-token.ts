import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { getSiteUrl } from "@/lib/site";

const SCOPE = "astro-vollprofil" as const;

/**
 * Kompakte Geburts-/Ort-Daten im signierten Link (v2).
 * Ermöglicht den Vollreport ohne localStorage (z. B. anderes Gerät / Privatmodus).
 */
export type ProfileTokenBirthPayload = {
  d: string;
  t: string;
  lat: number;
  lon: number;
  cc: string;
  lb: string;
  id?: string;
  ci?: string;
  co?: string;
};

/** Fallback, wenn `PROFILE_ACCESS_SECRET` fehlt: deterministisch aus Stripe-Serverkey (nur Server). */
function derivedSecretFromStripe(): string {
  const stripe = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripe) return "";
  return createHash("sha256")
    .update(stripe, "utf8")
    .update("|zd:profile-access-derived-v1|", "utf8")
    .digest("hex");
}

/**
 * Letzter Fallback ohne Stripe und ohne eigenes Secret: aus kanonischer Site-URL.
 * Damit funktioniert die Signatur auf Vercel auch ohne env (nur Server; schwächer als eigenes Secret).
 */
function derivedSecretFromSite(): string {
  const base = getSiteUrl();
  return createHash("sha256")
    .update(base, "utf8")
    .update("|zd:profile-access-site-v1|", "utf8")
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

function isValidBirthPayload(b: unknown): b is ProfileTokenBirthPayload {
  if (!b || typeof b !== "object") return false;
  const o = b as Record<string, unknown>;
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

export type DecodedProfileAccessToken =
  | { ok: true; birth: ProfileTokenBirthPayload | null }
  | { ok: false };

/**
 * Prüft Signatur und Laufzeit; liefert optional eingebettete Geburtsdaten (v2).
 */
export function decodeProfileAccessToken(token: string): DecodedProfileAccessToken {
  const secret = getSecret();
  if (!secret) return { ok: false };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false };
  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return { ok: false };
  let payload: string;
  try {
    payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return { ok: false };
  }
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return { ok: false };
    if (!timingSafeEqual(a, b)) return { ok: false };
  } catch {
    return { ok: false };
  }
  try {
    const parsed = JSON.parse(payload) as {
      v?: number;
      scope?: string;
      exp?: number;
      b?: unknown;
    };
    if (parsed.scope !== SCOPE) return { ok: false };
    if (typeof parsed.exp !== "number") return { ok: false };
    if (parsed.exp * 1000 < Date.now()) return { ok: false };

    if (parsed.v === 1) {
      return { ok: true, birth: null };
    }
    if (parsed.v === 2) {
      if (!isValidBirthPayload(parsed.b)) return { ok: false };
      return { ok: true, birth: parsed.b };
    }
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

/**
 * Erstellt ein signiertes Token für den Vollprofil-Zugriff (ohne Login).
 * Optional v2 mit Geburtsdaten (für Link auf neuem Gerät).
 */
export function createProfileAccessToken(
  expiresInDays = 365,
  birth?: ProfileTokenBirthPayload | null,
): string | null {
  const secret = getSecret();
  if (!secret) {
    return null;
  }
  const exp = Math.floor(Date.now() / 1000) + expiresInDays * 86400;
  const payloadObj = birth
    ? ({ v: 2 as const, scope: SCOPE, exp, b: birth } as const)
    : ({ v: 1 as const, scope: SCOPE, exp } as const);
  const payload = JSON.stringify(payloadObj);
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifyProfileAccessToken(token: string): boolean {
  return decodeProfileAccessToken(token).ok;
}
