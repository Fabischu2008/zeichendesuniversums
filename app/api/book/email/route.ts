import { NextResponse } from "next/server";
import {
  buildBookDownloadUrl,
  createBookAccessToken,
} from "@/lib/book-access-token";
import { sendBookAccessEmail } from "@/lib/email-book-access";
import { getSiteUrl } from "@/lib/site";
import { getPaidBookCheckoutSessionInfo } from "@/lib/stripe-checkout-session";

export const runtime = "nodejs";

/**
 * Mail nur auf Wunsch: Empfänger kommt aus der bezahlten Stripe-Session,
 * nicht aus dem Request.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { sessionId?: unknown }
    | null;
  const sessionId =
    typeof body?.sessionId === "string" ? body.sessionId.trim() : "";

  if (!sessionId) {
    return NextResponse.json(
      { ok: false, message: "Keine Session-ID." },
      { status: 400 },
    );
  }

  const paid = await getPaidBookCheckoutSessionInfo(sessionId);
  if (!paid.ok) {
    return NextResponse.json(
      { ok: false, message: "Kauf nicht bestätigt." },
      { status: 403 },
    );
  }
  if (!paid.customerEmail) {
    return NextResponse.json(
      { ok: false, message: "In dieser Zahlung steht keine E-Mail." },
      { status: 400 },
    );
  }

  const token = createBookAccessToken(sessionId);
  if (!token) {
    return NextResponse.json(
      { ok: false, message: "Download-Link nicht erzeugbar." },
      { status: 500 },
    );
  }

  const sent = await sendBookAccessEmail({
    to: paid.customerEmail,
    downloadUrl: buildBookDownloadUrl(getSiteUrl(), token),
    includeCall: paid.includeCall,
  });
  if (!sent.ok) {
    return NextResponse.json({ ok: false, message: sent.message });
  }

  return NextResponse.json({ ok: true, sent: true });
}
