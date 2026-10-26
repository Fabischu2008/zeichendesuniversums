import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { getSiteUrl } from "@/lib/site";

const SCOPE = "book-balance-v1";
const DEFAULT_TTL_SEC = 60 * 60 * 24 * 400;

function getSecret(): string {
  const explicit = process.env.PROFILE_ACCESS_SECRET?.trim();
  if (explicit) return explicit;
  const stripe = process.env.STRIPE_SECRET_KEY?.trim();
  if (stripe) {
    return createHash("sha256")
      .update(stripe, "utf8")
      .update("|zd:book-access-v1|", "utf8")
      .digest("hex");
  }
  if (process.env.NODE_ENV === "development") {
    return "dev-only-book-access-secret";
  }
  return createHash("sha256")
    .update(getSiteUrl(), "utf8")
    .update("|zd:book-access-site-v1|", "utf8")
    .digest("hex");
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

export function createBookAccessToken(sessionId: string): string | null {
  const sid = sessionId.trim();
  if (!sid) return null;
  const exp = Math.floor(Date.now() / 1000) + DEFAULT_TTL_SEC;
  const payload = b64url(
    Buffer.from(JSON.stringify({ s: SCOPE, sid, exp }), "utf8"),
  );
  const sig = createHmac("sha256", getSecret()).update(payload).digest();
  return `${payload}.${b64url(sig)}`;
}

export function verifyBookAccessToken(
  token: string,
): { ok: true; sessionId: string } | { ok: false } {
  const raw = token.trim();
  const dot = raw.lastIndexOf(".");
  if (dot < 1) return { ok: false };
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  let expected: Buffer;
  try {
    expected = createHmac("sha256", getSecret()).update(payload).digest();
    const given = Buffer.from(sig, "base64url");
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
      return { ok: false };
    }
  } catch {
    return { ok: false };
  }

  try {
    const o = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      s?: unknown;
      sid?: unknown;
      exp?: unknown;
    };
    if (o.s !== SCOPE || typeof o.sid !== "string" || !o.sid) return { ok: false };
    if (typeof o.exp !== "number" || o.exp < Math.floor(Date.now() / 1000)) {
      return { ok: false };
    }
    return { ok: true, sessionId: o.sid };
  } catch {
    return { ok: false };
  }
}

export function buildBookDownloadUrl(siteOrigin: string, token: string): string {
  const site = siteOrigin.replace(/\/+$/, "");
  return `${site}/api/book/download?t=${encodeURIComponent(token)}`;
}
