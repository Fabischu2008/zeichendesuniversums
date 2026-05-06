"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { mergeAstroSession } from "@/lib/astro/profile-client-storage";

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

export function GeburtshoroskopLandingFunnel() {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [place, setPlace] = useState<Place | null>(null);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);
  const [big3, setBig3] = useState<null | {
    sun: string;
    moon: string;
    ascendant: string;
    meta?: { tz?: string; utc?: string };
  }>(null);

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
        const res = await fetch(`/api/geo/autocomplete?q=${encodeURIComponent(q)}`, {
          signal: ac.signal,
        });
        const raw = await res.text();
        const parsed = safeJsonParse(raw);
        const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
          results?: Place[];
          message?: string;
        };
        if (!res.ok) {
          throw new Error(
            data.message || `Autocomplete nicht verfuegbar (HTTP ${res.status}).`,
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

  async function calculate() {
    if (!place) return;
    setCalcLoading(true);
    setCalcError(null);
    setBig3(null);
    try {
      const res = await fetch("/api/tools/big3", {
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
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as
        | {
            sun: string;
            moon: string;
            ascendant: string;
            meta?: { tz?: string; utc?: string };
          }
        | { message?: string; raw?: string; _nonJson?: boolean };

      if (!res.ok) {
        throw new Error(
          ("message" in data && data.message) ||
            (("_nonJson" in data && data._nonJson)
              ? `Berechnung fehlgeschlagen (HTTP ${res.status}). Server lieferte kein JSON.`
              : `Berechnung fehlgeschlagen (HTTP ${res.status}).`),
        );
      }
      if (!("sun" in data) || !("moon" in data) || !("ascendant" in data)) {
        throw new Error("Unerwartete Antwort vom Server.");
      }
      setBig3(data);
      mergeAstroSession({
        birthdate,
        birthtime,
        place,
        big3: data,
      });
    } catch (e) {
      setCalcError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setCalcLoading(false);
    }
  }

  return (
    <>
      <section
        id="daten-eingeben"
        className="overflow-hidden scroll-mt-24 rounded-3xl border border-black/5 bg-white/70 p-6 ring-1 ring-violet-500/0 transition focus-within:ring-violet-500/40 dark:border-white/10 dark:bg-white/5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Schritt 01
        </p>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Gib deine Geburtsdaten ein
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Datum, Uhrzeit &amp; Ort eingeben - danach geht es direkt in dein
          vollständiges Profil.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtsdatum</span>
            <input
              id="landing-birthdate-input"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              type="date"
              className="box-border h-12 w-full min-w-0 max-w-full rounded-2xl border border-black/10 bg-white px-4 text-sm [appearance:textfield] dark:border-white/15 dark:bg-black/20"
            />
          </label>

          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtszeit</span>
            <input
              value={birthtime}
              onChange={(e) => setBirthtime(e.target.value)}
              type="time"
              className="box-border h-12 w-full min-w-0 max-w-full rounded-2xl border border-black/10 bg-white px-4 text-sm [appearance:textfield] dark:border-white/15 dark:bg-black/20"
            />
          </label>
        </div>

        <div className="mt-4">
          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtsort</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPlace(null);
              }}
              placeholder="z. B. Tokyo, Nairobi oder Kaiserslautern"
              className="box-border h-12 w-full min-w-0 max-w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:focus:border-white/30"
            />
          </label>

          {placesError ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{placesError}</p>
          ) : null}
          {placesLoading ? (
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">Suche Orte…</p>
          ) : null}
          {place ? (
            <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-900 dark:text-emerald-200">
              Ausgewählt: <span className="font-medium">{place.label}</span>
            </div>
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
                  className="break-words rounded-2xl border border-black/10 bg-white px-4 py-3 text-left text-sm hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
                >
                  {p.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          disabled={!canCalculate || calcLoading}
          onClick={() => void calculate()}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {calcLoading ? "Berechne..." : "Profil jetzt öffnen"}
        </button>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        {calcError ? (
          <p className="text-sm text-red-600 dark:text-red-400">{calcError}</p>
        ) : null}

        {big3 ? (
          <div className="space-y-4">
            <p className="text-sm text-black/75 dark:text-white/75">
              Deine Daten sind gespeichert. Oeffne jetzt direkt dein vollstaendiges
              astrologisches Profil mit allen Planeten, Haeusern und Aspekten.
            </p>
            <Link
              href="/tools/birth-chart/profile#vollreport"
              className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Vollstaendiges Profil kostenlos oeffnen
            </Link>
          </div>
        ) : (
          <p className="text-sm text-black/65 dark:text-white/65">
            Berechne zuerst mit deinen Geburtsdaten dein kostenloses Profil.
          </p>
        )}
      </section>
    </>
  );
}
