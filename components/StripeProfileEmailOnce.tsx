"use client";

import { useEffect, useRef } from "react";

/**
 * Sendet den Profil-Link einmal pro Browser an die Stripe-Kunden-E-Mail (localStorage-Guard).
 */
export function StripeProfileEmailOnce({
  sessionId,
  profileUrl,
  customerEmail,
}: {
  sessionId: string;
  profileUrl: string;
  customerEmail: string;
}) {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (!sessionId || !profileUrl.startsWith("http") || !customerEmail.trim()) {
      return;
    }
    const key = `zd:profileMailSent:${sessionId}`;
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
        const res = await fetch("/api/email/profile-access", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: customerEmail.trim(),
            profileUrl,
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
        /* Netzwerk – Nutzer kann Formular nutzen */
      }
    })();
  }, [sessionId, profileUrl, customerEmail]);

  return null;
}
