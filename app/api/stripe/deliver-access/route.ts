import { NextResponse } from "next/server";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfillment";

export const runtime = "nodejs";

/**
 * Auslieferung aus der Success-Seite heraus. Teilt die Versandsperre mit dem
 * Stripe-Webhook, damit ein Kauf nie zwei E-Mails auslöst. Empfänger und Links
 * stammen aus der bezahlten Stripe-Session, nicht aus dem Request.
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

  const result = await fulfillCheckoutSession(sessionId);
  if (result.status === "failed") {
    return NextResponse.json({ ok: false, message: result.reason });
  }

  return NextResponse.json({ ok: true, sent: result.status === "sent" });
}
