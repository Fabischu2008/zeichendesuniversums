"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 90;

/**
 * Wartet, bis Stripe die Session als bezahlt markiert (async Zahlarten: Bancontact, SEPA, …).
 */
export function AsyncCheckoutPaymentPoller({
  sessionId,
  productId,
}: {
  sessionId: string;
  productId: string;
}) {
  const router = useRouter();
  const attempts = useRef(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    /** Browser: number; Node-Typen können Timeout erwarten */
    let timeoutId: number | undefined;
    const tick = async () => {
      if (cancelled) return;
      attempts.current += 1;
      if (attempts.current > MAX_ATTEMPTS) {
        setTimedOut(true);
        return;
      }
      try {
        const u = new URL("/api/stripe/checkout-session-ready", window.location.origin);
        u.searchParams.set("session_id", sessionId);
        u.searchParams.set("productId", productId);
        const res = await fetch(u.toString(), { cache: "no-store" });
        const data = (await res.json().catch(() => ({}))) as { ready?: boolean };
        if (data.ready) {
          if (!cancelled) {
            router.refresh();
          }
          return;
        }
      } catch {
        /* weiter pollen */
      }
      if (!cancelled) {
        timeoutId = window.setTimeout(() => void tick(), INTERVAL_MS);
      }
    };
    void tick();
    return () => {
      cancelled = true;
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [router, sessionId, productId]);

  if (timedOut) {
    return (
      <p className="mt-4 text-sm text-amber-800 dark:text-amber-200">
        Die Zahlung konnte hier nicht automatisch bestätigt werden (z. B. sehr langsame
        Bankfreigabe). Bitte diese Seite später neu laden oder den Support mit deiner
        Bestellung / E-Mail an Stripe kontaktieren.
      </p>
    );
  }

  return (
    <div className="mt-4 flex items-center gap-3 text-sm text-black/75 dark:text-white/75">
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"
        aria-hidden
      />
      <span>
        Zahlung wird bestätigt (Bancontact, Überweisung &amp; ähnliche Methoden können
        ein paar Sekunden brauchen)…
      </span>
    </div>
  );
}
