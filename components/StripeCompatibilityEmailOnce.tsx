"use client";

import { useEffect, useRef } from "react";

/**
 * Stößt die Auslieferung der drei Paaranalyse-Links an die Stripe-Kunden-E-Mail
 * an. Die Versandsperre liegt serverseitig und wird mit dem Webhook geteilt.
 */
export function StripeCompatibilityEmailOnce({
  sessionId,
}: {
  sessionId: string;
}) {
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !sessionId) return;
    done.current = true;

    void fetch("/api/stripe/deliver-access", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {
      /* Netzwerk – Webhook liefert aus, sonst bleibt das Formular */
    });
  }, [sessionId]);

  return null;
}
