"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ProfileTokenBirthPayload } from "@/lib/profile-access-token";
import {
  mergeAstroSession,
  setVollreportUnlocked,
  VOLLREPORT_UNLOCK_STORAGE_EVENT,
} from "@/lib/astro/profile-client-storage";
import { readUnlockTokenFromBrowser } from "@/lib/profile-unlock-url";

function placeFromTokenBirth(b: ProfileTokenBirthPayload) {
  return {
    id: b.id?.slice(0, 120) ?? "zd:token",
    label: b.lb,
    city: b.ci ?? b.lb,
    country: b.co ?? "",
    countryCode: b.cc,
    lat: b.lat,
    lon: b.lon,
  };
}

/**
 * Verarbeitet ?unlock=… bzw. Hash &zd-u=… (Mail-Client-Fallback) und schaltet
 * den Vollzugriff im Browser frei.
 */
export function ProfileUnlockQueryHandler() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const router = useRouter();
  const succeeded = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function redeem() {
      const raw = readUnlockTokenFromBrowser()?.trim();
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
          birth?: ProfileTokenBirthPayload | null;
        };
        if (!res.ok || !data.ok) {
          setError(data.message || "Link ungültig oder abgelaufen.");
          try {
            window.dispatchEvent(
              new CustomEvent(VOLLREPORT_UNLOCK_STORAGE_EVENT, {
                detail: { unlocked: false },
              }),
            );
          } catch {
            /* */
          }
          return;
        }
        succeeded.current = true;
        const birth = data.birth ?? null;
        if (birth) {
          mergeAstroSession({
            birthdate: birth.d,
            birthtime: birth.t,
            place: placeFromTokenBirth(birth),
            big3: null,
          });
        }
        setVollreportUnlocked(true);
        router.replace("/tools/birth-chart/profile#vollreport");
      } catch {
        setError("Verbindungsfehler. Bitte später erneut auf den Link klicken.");
        try {
          window.dispatchEvent(
            new CustomEvent(VOLLREPORT_UNLOCK_STORAGE_EVENT, {
              detail: { unlocked: false },
            }),
          );
        } catch {
          /* */
        }
      }
    })();
    }

    redeem();
    window.addEventListener("hashchange", redeem);
    return () => window.removeEventListener("hashchange", redeem);
  }, [queryString, router]);

  if (!error) return null;
  return (
    <section className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
      {error}
    </section>
  );
}
