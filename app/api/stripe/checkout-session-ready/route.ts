import { NextResponse } from "next/server";
import {
  PRODUCT_ID_ASTRO_VOLLPROFIL,
  PRODUCT_ID_COMPAT_PAARANALYSE,
} from "@/lib/cms";
import {
  getPaidCompatibilityCheckoutSessionInfo,
  getPaidProfileCheckoutSessionInfo,
} from "@/lib/stripe-checkout-session";

export const runtime = "nodejs";

/**
 * Für Client-Polling: Session ist auszahlungsreif (Links dürfen erstellt werden).
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id")?.trim() ?? "";
  const productId = searchParams.get("productId")?.trim() ?? "";

  if (!sessionId || !productId) {
    return NextResponse.json({ ready: false }, { status: 400 });
  }

  if (productId === PRODUCT_ID_ASTRO_VOLLPROFIL) {
    const info = await getPaidProfileCheckoutSessionInfo(sessionId);
    return NextResponse.json({ ready: info.ok });
  }

  if (productId === PRODUCT_ID_COMPAT_PAARANALYSE) {
    const info = await getPaidCompatibilityCheckoutSessionInfo(sessionId);
    return NextResponse.json({ ready: info.ok });
  }

  return NextResponse.json({ ready: false }, { status: 400 });
}
