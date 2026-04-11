import { NextResponse } from "next/server";
import { createCheckoutSessionForProduct } from "@/lib/stripe/create-checkout-session";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { productId?: unknown }
    | null;
  const productId = typeof body?.productId === "string" ? body.productId : "";

  const result = await createCheckoutSessionForProduct(productId);
  if ("error" in result) {
    const status = result.error.includes("Unbekanntes Produkt") ? 400 : 503;
    return NextResponse.json({ message: result.error }, { status });
  }

  return NextResponse.json({ url: result.url });
}
