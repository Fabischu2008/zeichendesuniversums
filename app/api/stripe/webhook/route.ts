import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Stripe Webhook – Signaturprüfung, danach z. B. E-Mail / Fulfillment.
 * Endpoint in Stripe Dashboard: …/api/stripe/webhook
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
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        "[stripe] checkout.session.completed",
        session.id,
        session.metadata,
      );
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
