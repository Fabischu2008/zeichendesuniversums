"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BirthChartReportDemo } from "@/components/BirthChartReportDemo";
import { BirthChartVollreportUpsell } from "@/components/BirthChartVollreportUpsell";
import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";
import type { ZodiacSign } from "@/lib/astro/signs";
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

  const resultRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (big3 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [big3]);

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
      <section id="daten-eingeben" className="rounded-3xl border border-black/5 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Schritt 01
        </p>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Gib deine Geburtsdaten ein
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Datum, Uhrzeit &amp; Ort eingeben — dann siehst du sofort deine Big 3
          und kannst den Vollreport freischalten.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtsdatum</span>
            <input
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              type="date"
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm box-border dark:border-white/15 dark:bg-black/20"
            />
          </label>

          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtszeit</span>
            <input
              value={birthtime}
              onChange={(e) => setBirthtime(e.target.value)}
              type="time"
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm box-border dark:border-white/15 dark:bg-black/20"
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
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm box-border outline-none focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:focus:border-white/30"
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
          disabled={!canCalculate || calcLoading}
          onClick={() => void calculate()}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {calcLoading ? "Berechne…" : "Big 3 jetzt berechnen"}
        </button>
      </section>

      <section
        ref={resultRef}
        className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-white/5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Schritt 02
        </p>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Ergebnis &amp; Vorschau
        </h2>
        {calcError ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{calcError}</p>
        ) : null}

        {big3 ? (
          <div className="mt-4 space-y-5">
            <p className="text-sm text-black/70 dark:text-white/70">
              Deine Big 3 sind berechnet. Jetzt siehst du die Vorschau und kannst
              den Vollreport freischalten.
            </p>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] p-4 text-sm text-emerald-950 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-100">
              <p className="font-medium">Deine Big 3:</p>
              <p className="mt-1">
                Sonne <strong>{big3.sun}</strong> · Mond <strong>{big3.moon}</strong> ·
                Aszendent <strong>{big3.ascendant}</strong>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-white/70 px-3 py-1 dark:bg-black/20">
                  <ZodiacSignIcon sign={big3.sun} sizeClassName="h-6 w-6" />
                  <span className="text-xs font-medium">Sonne</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-white/70 px-3 py-1 dark:bg-black/20">
                  <ZodiacSignIcon sign={big3.moon} sizeClassName="h-6 w-6" />
                  <span className="text-xs font-medium">Mond</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-white/70 px-3 py-1 dark:bg-black/20">
                  <ZodiacSignIcon sign={big3.ascendant} sizeClassName="h-6 w-6" />
                  <span className="text-xs font-medium">Aszendent</span>
                </div>
              </div>
            </div>

            <BirthChartVollreportUpsell
              birthdate={birthdate}
              birthtime={birthtime}
              place={place}
              big3={big3}
            />

            <details className="rounded-2xl border border-black/8 bg-black/[0.02] p-4 dark:border-white/12 dark:bg-white/[0.03]">
              <summary className="cursor-pointer text-sm font-medium">
                Vorschau deines Vollreports ansehen (optional)
              </summary>
              <div className="mt-3 rounded-xl border border-black/8 bg-white/70 p-3 dark:border-white/10 dark:bg-black/20">
                <BirthChartReportDemo
                  sun={big3.sun as ZodiacSign}
                  moon={big3.moon as ZodiacSign}
                  ascendant={big3.ascendant as ZodiacSign}
                />
              </div>
            </details>
          </div>
        ) : (
          <p className="mt-3 text-sm text-black/65 dark:text-white/65">
            Nach der Big-3-Berechnung erscheint hier deine Vorschau mit direkter
            Vollreport-Freischaltung.
          </p>
        )}
      </section>
    </>
  );
}
