/**
 * Schnelltest (100×): Logik „async Zahlung noch ausstehend“ vs. bezahlt.
 *   npx tsx scripts/sanity-async-payment-pending.ts
 */
import assert from "node:assert/strict";

function sessionPaymentStillPending(session: {
  status: string;
  payment_status: string;
}): boolean {
  if (
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required"
  ) {
    return false;
  }
  const ps = session.payment_status as string;
  if (ps === "processing" || ps === "requires_action") {
    return true;
  }
  return session.status === "complete" && session.payment_status === "unpaid";
}

for (let i = 0; i < 100; i++) {
  assert.equal(sessionPaymentStillPending({ status: "complete", payment_status: "paid" }), false);
  assert.equal(
    sessionPaymentStillPending({ status: "complete", payment_status: "unpaid" }),
    true,
  );
  assert.equal(
    sessionPaymentStillPending({ status: "complete", payment_status: "no_payment_required" }),
    false,
  );
  assert.equal(sessionPaymentStillPending({ status: "open", payment_status: "unpaid" }), false);
}

console.log("OK: 100 * 4 = 400 assertions passed");
