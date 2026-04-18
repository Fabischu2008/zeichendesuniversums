"use client";

import { useEffect, useRef } from "react";

/**
 * Sendet die drei Zugangslinks einmal pro Browser an die Stripe-Kunden-E-Mail.
 */
export function StripeCompatibilityEmailOnce({
  sessionId,
  pairLink,
  profileUrlA,
  profileUrlB,
  customerEmail,
}: {
  sessionId: string;
  pairLink: string;
  profileUrlA: string;
  profileUrlB: string;
  customerEmail: string;
}) {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (
      !sessionId ||
      !pairLink.startsWith("http") ||
      !profileUrlA.startsWith("http") ||
      !profileUrlB.startsWith("http") ||
      !customerEmail.trim()
    ) {
      return;
    }
    const key = `zd:compatMailSent:${sessionId}`;
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) {
        return;
      }
    } catch {
      /* private mode */
    }

    done.current = true;
    void (async () => {
      try {
        const res = await fetch("/api/email/compatibility-access", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: customerEmail.trim(),
            compatibilityUrl: pairLink,
            profileUrlA,
            profileUrlB,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
        if (res.ok && data.ok) {
          try {
            sessionStorage.setItem(key, "1");
          } catch {
            /* ignore */
          }
        }
      } catch {
        /* Nutzer kann Formular nutzen */
      }
    })();
  }, [sessionId, pairLink, profileUrlA, profileUrlB, customerEmail]);

  return null;
}
