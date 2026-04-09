"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AstroProfileDisplay } from "@/components/AstroProfileDisplay";
import type { AstroProfileResult } from "@/lib/astro/profile";

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
          `/api/geo/autocomplete?q=${encodeURIComponent(q)}&countrycodes=de,at,ch`,
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
    } catch (e) {
      setProfileError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setProfileLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Dein astrologisches Profil
        </h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Vollständige Ansicht: Archetyp, Elemente, Häuser, Planeten, Knoten,
          Lilith und Glückspunkt – erweiterbar für spätere Features.
        </p>

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

        <button
          type="button"
          onClick={() => void calculateProfile()}
          disabled={!canCalculate || profileLoading}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          {profileLoading ? "Erstelle Profil…" : "Profil anzeigen"}
        </button>
      </section>

      {profileError ? (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {profileError}
        </section>
      ) : null}

      {profile ? <AstroProfileDisplay profile={profile} variant="page" /> : null}
    </div>
  );
}
