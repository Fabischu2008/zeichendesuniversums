import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfillment";

export const runtime = "nodejs";

/**
 * Stripe Webhook – Signaturprüfung, danach Auslieferung der Zugangslinks.
 * Endpoint in Stripe Dashboard: …/api/stripe/webhook
 *
 * Das ist der verlässliche Auslieferungsweg: Die Success-Seite sieht der Kunde nur,
 * wenn er nach der Zahlung zurückkommt – bei SEPA & Co. ist die Zahlung dort
 * ohnehin noch nicht bestätigt.
 */
export async function POST(req: Request) {
  const rawBody = await req.text();
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripeKey || !whSecret) {
    return NextResponse.json(
      { error: "Webhook nicht konfiguriert (STRIPE_SECRET_KEY oder STRIPE_WEBHOOK_SECRET fehlt)." },
      { status: 503 },
    );
  }

  const stripe = new Stripe(stripeKey);
  const sig = (await headers()).get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "stripe-signature fehlt" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
  } catch (e) {
    console.error("[stripe] webhook signature", e);
    return NextResponse.json({ error: "Ungültige Signatur" }, { status: 400 });
  }

  switch (event.type) {
    // `completed` deckt Karte/Klarna ab, `async_payment_succeeded` die Methoden,
    // bei denen die Zahlung erst nach dem Redirect bestätigt wird (SEPA u. a.).
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      const result = await fulfillCheckoutSession(session.id);

      if (result.status === "failed") {
        console.error("[stripe] fulfillment failed", session.id, result.reason);
        // 500 → Stripe wiederholt das Event, die Versandsperre wurde beim
        // Fehlschlag nicht endgültig gesetzt.
        return NextResponse.json({ error: result.reason }, { status: 500 });
      }

      console.log("[stripe] fulfillment", event.type, session.id, result.status);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
