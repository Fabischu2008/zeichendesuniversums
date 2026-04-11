import { NextResponse } from "next/server";
import { getProducts } from "@/lib/cms";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { productId?: unknown }
    | null;
  const productId = typeof body?.productId === "string" ? body.productId : "";

  const product = getProducts().find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json(
      { message: "Unbekanntes Produkt." },
      { status: 400 },
    );
  }

  /**
   * MVP: Weiterleitung zum Checkout-Stub. Mit Stripe z. B.:
   * `sessions.create` mit
   * `success_url: ${getSiteUrl()}/success?session_id={CHECKOUT_SESSION_ID}&productId=…`,
   * `metadata: { cms_product_id: product.id }` – dann wird auf /success der
   * Wiederherstellungslink für das Vollprofil ausgestellt.
   */
  const url = `/checkout?productId=${encodeURIComponent(product.id)}`;
  return NextResponse.json({ url });
}

