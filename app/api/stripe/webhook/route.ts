import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // MVP Stub: Stripe signature verification + fulfillment später.
  const raw = await req.text();
  return NextResponse.json({ received: true, bytes: raw.length });
}

