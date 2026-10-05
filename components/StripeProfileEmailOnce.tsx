"use client";

import { useEffect, useRef } from "react";

/**
 * Stößt die Auslieferung an die Stripe-Kunden-E-Mail an. Ob wirklich versendet
 * wird, entscheidet serverseitig die Versandsperre, die auch der Webhook nutzt –
 * der Kunde bekommt also genau eine Mail, egal welcher Weg zuerst greift.
 */
export function StripeProfileEmailOnce({ sessionId }: { sessionId: string }) {
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
