import { createHmac, timingSafeEqual } from "node:crypto";

const SCOPE = "astro-vollprofil" as const;

function getSecret(): string {
  const s = process.env.PROFILE_ACCESS_SECRET?.trim();
  if (s) return s;
  if (process.env.NODE_ENV === "development") {
    return "dev-only-profile-access-secret";
  }
  return "";
}

/**
 * Erstellt ein signiertes Token für den Vollprofil-Zugriff (ohne Login).
 * Payload: Ablaufzeit + fester Scope.
 */
export function createProfileAccessToken(expiresInDays = 365): string | null {
  const secret = getSecret();
  if (!secret) {
    return null;
  }
  const exp = Math.floor(Date.now() / 1000) + expiresInDays * 86400;
  const payload = JSON.stringify({ v: 1 as const, scope: SCOPE, exp });
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifyProfileAccessToken(token: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return false;
  let payload: string;
  try {
    payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return false;
  }
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const parsed = JSON.parse(payload) as { v?: number; scope?: string; exp?: number };
    if (parsed.v !== 1 || parsed.scope !== SCOPE) return false;
    if (typeof parsed.exp !== "number") return false;
    if (parsed.exp * 1000 < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
