import { NextResponse } from "next/server";
import { verifyBookAccessToken } from "@/lib/book-access-token";
import {
  BOOK_BALANCE_DOWNLOAD_NAME,
  readBookBalancePdf,
} from "@/lib/book-file";
import { getPaidBookCheckoutSessionInfo } from "@/lib/stripe-checkout-session";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t")?.trim() ?? "";
  const verified = token ? verifyBookAccessToken(token) : { ok: false as const };
  if (!verified.ok) {
    return NextResponse.json({ error: "Link ungültig oder abgelaufen." }, { status: 404 });
  }

  const session = await getPaidBookCheckoutSessionInfo(verified.sessionId);
  if (!session.ok) {
    return NextResponse.json({ error: "Kauf nicht bestätigt." }, { status: 403 });
  }

  const file = await readBookBalancePdf();
  if (!file.ok) {
    return NextResponse.json({ error: file.message }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file.buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${BOOK_BALANCE_DOWNLOAD_NAME}"`,
      "Content-Length": String(file.buffer.byteLength),
      "Cache-Control": "private, no-store",
    },
  });
}
