"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ProfileUnlockQueryHandler } from "@/components/ProfileUnlockQueryHandler";
import { AstroProfileTeaser } from "@/components/AstroProfileTeaser";
import { AstroProfileDisplay } from "@/components/AstroProfileDisplay";
import {
  hasVollreportUnlocked,
  mergeAstroSession,
  readAstroSession,
  VOLLREPORT_UNLOCK_STORAGE_EVENT,
  type StoredAstroSessionV1,
} from "@/lib/astro/profile-client-storage";
import type { AstroProfileResult } from "@/lib/astro/profile";
import { checkoutHrefForProduct, PRODUCT_ID_ASTRO_VOLLPROFIL } from "@/lib/cms";

type Place = {
  id: string;
  label: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
};

function safeJsonParse(raw: string): unknown {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { _nonJson: true, raw };
  }
}

function sessionCanCalculate(s: StoredAstroSessionV1): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s.birthdate) &&
    /^\d{2}:\d{2}$/.test(s.birthtime) &&
    Boolean(s.place)
  );
}

function sessionHasChart(s: StoredAstroSessionV1): boolean {
  const profile = s.profile as (AstroProfileResult & { chart?: unknown }) | null | undefined;
  return Boolean(profile && typeof profile === "object" && profile.chart);
}

function normalizedDegrees(deg: number): number {
  let x = deg % 360;
  if (x < 0) x += 360;
  return x;
}

function angularDistance(a: number, b: number): number {
  const d = Math.abs(normalizedDegrees(a) - normalizedDegrees(b));
  return d > 180 ? 360 - d : d;
}

/**
 * Alte Chart-Versionen nutzten MC ≈ ASC + 270° als Platzhalter.
 * Diese erkennen wir und triggern eine Neuberechnung mit echtem MC/IC.
 */
function sessionHasLegacyChartModel(s: StoredAstroSessionV1): boolean {
  const profile = s.profile as
    | (AstroProfileResult & { chart?: { angles?: { asc?: number; mc?: number } } })
    | null
    | undefined;
  const asc = profile?.chart?.angles?.asc;
  const mc = profile?.chart?.angles?.mc;
  if (typeof asc !== "number" || typeof mc !== "number") return false;
  const approxMc = normalizedDegrees(asc + 270);
  return angularDistance(mc, approxMc) < 0.01;
}

export default function BirthChartProfilePage() {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [place, setPlace] = useState<Place | null>(null);

  const [placesLoading, setPlacesLoading] = useState(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profile, setProfile] = useState<AstroProfileResult | null>(null);

  /** null = Hydration */
  const [vollreportAccess, setVollreportAccess] = useState<boolean | null>(null);
  const restoredRef = useRef(false);
  const autoFetchDone = useRef(false);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = query.trim();
    setPlacesError(null);

    if (q.length < 2) {
      setPlaces([]);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const t = setTimeout(async () => {
      setPlacesLoading(true);
      try {
        const res = await fetch(
          `/api/geo/autocomplete?q=${encodeURIComponent(q)}`,
          { signal: ac.signal },
        );
        const raw = await res.text();
        const parsed = safeJsonParse(raw);
        const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
          results?: Place[];
          message?: string;
        };
        if (!res.ok) {
          throw new Error(
            data.message || `Autocomplete nicht verfügbar (HTTP ${res.status}).`,
          );
        }
        setPlaces(Array.isArray(data.results) ? data.results : []);
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return;
        setPlacesError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        setPlacesLoading(false);
      }
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    const hasUnlockParam =
      typeof window !== "undefined" &&
      Boolean(new URLSearchParams(window.location.search).get("unlock"));
    const unlocked = hasVollreportUnlocked();
    if (hasUnlockParam) {
      setVollreportAccess(null);
    } else {
      setVollreportAccess(unlocked);
    }
    const s = readAstroSession();
    if (s) {
      setBirthdate(s.birthdate);
      setBirthtime(s.birthtime);
      setQuery(s.place.label);
      setPlace(s.place as Place);
      if (
        !hasUnlockParam &&
        unlocked &&
        s.profile &&
        sessionHasChart(s) &&
        !sessionHasLegacyChartModel(s)
      ) {
        setProfile(s.profile);
      }
    }
  }, []);

  useEffect(() => {
    function onUnlockEvent(ev: Event) {
      const d = (ev as CustomEvent<{ unlocked?: boolean }>).detail;
      const next =
        d && typeof d.unlocked === "boolean"
          ? d.unlocked
          : hasVollreportUnlocked();
      setVollreportAccess(next);
      if (next) {
        const s = readAstroSession();
        if (s?.profile) setProfile(s.profile);
      }
    }
    window.addEventListener(VOLLREPORT_UNLOCK_STORAGE_EVENT, onUnlockEvent);
    return () => {
      window.removeEventListener(VOLLREPORT_UNLOCK_STORAGE_EVENT, onUnlockEvent);
    };
  }, []);

  useEffect(() => {
    if (!profile || vollreportAccess !== true) return;
    if (typeof window === "undefined" || window.location.hash !== "#vollreport") {
      return;
    }
    const id = requestAnimationFrame(() => {
      document.getElementById("vollreport")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(id);
  }, [profile, vollreportAccess]);

  useEffect(() => {
    if (vollreportAccess !== true || profile || autoFetchDone.current) return;
    const s = readAstroSession();
    if (
      s &&
      sessionCanCalculate(s) &&
      (!s.profile || !sessionHasChart(s) || sessionHasLegacyChartModel(s))
    ) {
      autoFetchDone.current = true;
      void fetchProfileFromSession(s);
    }
  }, [vollreportAccess, profile]);

  async function fetchProfileFromSession(s: StoredAstroSessionV1) {
    setProfileLoading(true);
    setProfileError(null);
    try {
      const res = await fetch("/api/tools/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          date: s.birthdate,
          time: s.birthtime,
          location: {
            name: s.place.city || s.place.label,
            lat: s.place.lat,
            lon: s.place.lon,
            countryCode: s.place.countryCode,
          },
        }),
      });
      const raw = await res.text();
      const parsed = safeJsonParse(raw);
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
        profile?: AstroProfileResult;
        message?: string;
      };

      if (!res.ok || !data.profile) {
        throw new Error(
          data.message ||
            `Profil-Berechnung fehlgeschlagen (HTTP ${res.status}).`,
        );
      }
      setProfile(data.profile);
      mergeAstroSession({
        birthdate: s.birthdate,
        birthtime: s.birthtime,
        place: s.place,
        big3: s.big3 ?? null,
        profile: data.profile,
      });
    } catch (e) {
      setProfileError(e instanceof Error ? e.message : "Unbekannter Fehler");
      autoFetchDone.current = false;
    } finally {
      setProfileLoading(false);
    }
  }

  const canCalculate = useMemo(() => {
    return Boolean(
      /^\d{4}-\d{2}-\d{2}$/.test(birthdate) &&
        /^\d{2}:\d{2}$/.test(birthtime) &&
        place,
    );
  }, [birthdate, birthtime, place]);

  async function calculateProfile() {
    if (!place) return;
    setProfileLoading(true);
    setProfileError(null);
    setProfile(null);
    try {
      const res = await fetch("/api/tools/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          date: birthdate,
          time: birthtime,
          location: {
            name: place.city || place.label,
            lat: place.lat,
            lon: place.lon,
            countryCode: place.countryCode,
          },
        }),
      });
      const raw = await res.text();
      const parsed = safeJsonParse(raw);
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
        profile?: AstroProfileResult;
        message?: string;
      };

      if (!res.ok || !data.profile) {
        throw new Error(
          data.message ||
            `Profil-Berechnung fehlgeschlagen (HTTP ${res.status}).`,
        );
      }
      setProfile(data.profile);
      mergeAstroSession({
        birthdate,
        birthtime,
        place,
        profile: data.profile,
      });
    } catch (e) {
      setProfileError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setProfileLoading(false);
    }
  }

  const checkoutHref = checkoutHrefForProduct(PRODUCT_ID_ASTRO_VOLLPROFIL);

  /** Button nur, wenn man das Profil noch anstoßen muss (nicht schon da / nicht ladend). */
  const showRecalculateButton =
    vollreportAccess !== true ||
    (!profile && !profileLoading);

  const showReportOnly = vollreportAccess === true && profile !== null;
  const showVollLoading =
    vollreportAccess === true && !profile && profileLoading;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Suspense fallback={null}>
        <ProfileUnlockQueryHandler />
      </Suspense>

      {showReportOnly ? null : showVollLoading ? (
        <section className="rounded-3xl border border-black/5 bg-white/60 p-8 text-center dark:border-white/10 dark:bg-white/5">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dein astrologisches Profil
          </h1>
          <p className="mt-4 text-sm text-black/70 dark:text-white/70">
            Vollreport wird geladen…
          </p>
        </section>
      ) : (
      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Dein astrologisches Profil
        </h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Vollständige Auswertung: Archetyp, Elemente, Häuser, Planeten, Knoten,
          Lilith und Glückspunkt. Der{" "}
          <strong className="font-medium">Link aus Bestätigung oder E-Mail</strong>{" "}
          schaltet den Vollreport frei und scrollt direkt zur vollständigen Auswertung.
          Daten bleiben in diesem Browser gespeichert.
          {vollreportAccess === false ? (
            <>
              {" "}
              Noch keine Daten? Zuerst im{" "}
              <Link
                href="/tools/birth-chart"
                className="font-medium text-violet-700 underline-offset-2 hover:underline dark:text-violet-300"
              >
                Geburtshoroskop-Tool
              </Link>{" "}
              eingeben und kaufen.
            </>
          ) : null}
        </p>

        {vollreportAccess === false ? (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-950 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-100">
            <p className="font-medium">Noch kein Vollzugriff</p>
            <p className="mt-1 text-black/75 dark:text-white/75">
              Mit einmaliger Zahlung schaltest du die vollständige Auswertung frei.
              Gespeicherte Daten aus dem Tool bleiben in diesem Browser erhalten.
            </p>
            <Link
              href={checkoutHref}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black"
            >
              Vollreport kaufen
            </Link>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Geburtsdatum</span>
            <input
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              type="date"
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Geburtszeit</span>
            <input
              value={birthtime}
              onChange={(e) => setBirthtime(e.target.value)}
              type="time"
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
            />
          </label>
        </div>

        <div className="mt-4">
          <label className="space-y-2">
            <span className="text-sm font-medium">Geburtsort (DACH)</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPlace(null);
              }}
              placeholder="z.B. Kaiserslautern"
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:focus:border-white/30"
            />
          </label>
          {placesLoading ? (
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Suche Orte…
            </p>
          ) : null}
          {placesError ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {placesError}
            </p>
          ) : null}
          {!place && places.length > 0 ? (
            <div className="mt-3 grid gap-2">
              {places.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPlace(p);
                    setQuery(p.label);
                    setPlaces([]);
                  }}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-left text-sm hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
                >
                  {p.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {showRecalculateButton ? (
          <button
            type="button"
            onClick={() => void calculateProfile()}
            disabled={!canCalculate || profileLoading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {profileLoading ? "Erstelle Profil…" : "Profil berechnen & speichern"}
          </button>
        ) : null}
      </section>
      )}

      {profileError ? (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {profileError}
        </section>
      ) : null}

      {profile && vollreportAccess === null ? (
        <p className="text-sm text-black/50 dark:text-white/50">
          Zugriff wird geladen…
        </p>
      ) : null}

      {profile && vollreportAccess === true ? (
        <AstroProfileDisplay profile={profile} variant="page" />
      ) : null}

      {profile && vollreportAccess === false ? (
        <AstroProfileTeaser profile={profile} variant="page" />
      ) : null}
    </div>
  );
}
