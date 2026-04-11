"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { setVollreportUnlocked } from "@/lib/astro/profile-client-storage";

/**
 * Verarbeitet ?unlock=… vom E-Mail- / Wiederherstellungslink und schaltet
 * den Vollzugriff im Browser frei.
 */
export function ProfileUnlockQueryHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const succeeded = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get("unlock");
    if (!raw || succeeded.current) return;

    void (async () => {
      try {
        const res = await fetch("/api/profile/redeem", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token: raw }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          message?: string;
        };
        if (!res.ok || !data.ok) {
          setError(data.message || "Link ungültig oder abgelaufen.");
          return;
        }
        succeeded.current = true;
        setVollreportUnlocked(true);
        router.replace("/tools/birth-chart/profile");
      } catch {
        setError("Verbindungsfehler. Bitte später erneut auf den Link klicken.");
      }
    })();
  }, [searchParams, router]);

  if (!error) return null;
  return (
    <section className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
      {error}
    </section>
  );
}
