"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Big3PlacementCard } from "@/components/Big3PlacementCard";
import { BirthChartReportDemo } from "@/components/BirthChartReportDemo";
import { BirthChartVollreportUpsell } from "@/components/BirthChartVollreportUpsell";
import type { ZodiacSign } from "@/lib/astro/signs";
import { mergeAstroSession } from "@/lib/astro/profile-client-storage";

function safeJsonParse(raw: string): unknown {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { _nonJson: true, raw };
  }
}

function blurb(sign: string) {
  const map: Record<string, string> = {
    Widder: "Direkt, mutig, startet Dinge – braucht Herausforderung.",
    Stier: "Stabil, loyal, sinnlich – liebt Sicherheit und Qualität.",
    Zwillinge: "Neugierig, schnell, kommunikativ – braucht Abwechslung.",
    Krebs: "Intuitiv, emotional, beschützend – braucht Vertrauen.",
    Löwe: "Herzlich, stolz, kreativ – braucht Anerkennung.",
    Jungfrau: "Analytisch, hilfreich, präzise – braucht Klarheit.",
    Waage: "Ausgleichend, ästhetisch, verbindend – braucht Harmonie.",
    Skorpion: "Intensiv, loyal, tief – braucht Ehrlichkeit.",
    Schütze: "Frei, optimistisch, ehrlich – braucht Raum.",
    Steinbock: "Zielstrebig, verantwortungsvoll – braucht Struktur.",
    Wassermann: "Unkonventionell, klug, unabhängig – braucht Freiheit.",
    Fische: "Empathisch, kreativ, fein – braucht Rückzug.",
  };
  return map[sign] || "Kurzbeschreibung folgt.";
}

type Place = {
  id: string;
  label: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
};

export default function BirthChartToolPage() {
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
    <div className="w-full max-w-none space-y-8 px-2 sm:px-4 lg:mx-auto lg:max-w-3xl lg:px-0">
      <Link
        href="/tools"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zur Themenwahl
      </Link>

      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Mehr über dich · Geburtshoroskop
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Dein Geburtshoroskop – Big 3 &amp; Vorschau
        </h1>
        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
          Kostenlos:{" "}
          <strong className="font-medium text-black dark:text-white">Big 3</strong>{" "}
          berechnen. Darunter siehst du eine{" "}
          <strong className="font-medium text-black dark:text-white">
            Demo-Ansicht
          </strong>{" "}
          deines Berichts. Die echte, vollständige Auswertung inkl. persönlichem
          Zugangslink erhältst du nach einmaliger Zahlung.
        </p>
      </header>

      <section className="rounded-2xl border border-black/5 bg-white/60 p-4 sm:rounded-3xl sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold tracking-tight">
          Schritt 2 · Geburtsdaten
        </h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Für exakte Berechnung brauchen wir Datum, Uhrzeit und Ort (DACH).
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtsdatum</span>
            <input
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              type="date"
              className="h-12 w-full min-w-0 max-w-full appearance-none rounded-2xl border border-black/10 bg-white px-4 text-sm box-border dark:border-white/15 dark:bg-black/20"
            />
          </label>

          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtszeit</span>
            <input
              value={birthtime}
              onChange={(e) => setBirthtime(e.target.value)}
              type="time"
              className="h-12 w-full min-w-0 max-w-full appearance-none rounded-2xl border border-black/10 bg-white px-4 text-sm box-border dark:border-white/15 dark:bg-black/20"
            />
          </label>
        </div>

        <div className="mt-6">
          <label className="min-w-0 space-y-2">
            <span className="text-sm font-medium">Geburtsort (DACH)</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPlace(null);
              }}
              placeholder="z. B. Kaiserslautern"
              className="h-12 w-full min-w-0 max-w-full rounded-2xl border border-black/10 bg-white px-4 text-sm box-border outline-none focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:focus:border-white/30"
            />
          </label>

          {placesError ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {placesError}
            </p>
          ) : null}

          {placesLoading ? (
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Suche Orte…
            </p>
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

        <div className="mt-8">
          <button
            type="button"
            disabled={!canCalculate || calcLoading}
            onClick={() => void calculate()}
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 px-6 text-sm font-semibold text-violet-900 hover:bg-violet-500/15 disabled:cursor-not-allowed disabled:border-violet-500/20 disabled:bg-violet-500/5 disabled:text-violet-900/60 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-100 dark:hover:bg-violet-500/20 dark:disabled:border-violet-400/20 dark:disabled:bg-violet-500/10 dark:disabled:text-violet-100/60"
          >
            {calcLoading ? "Berechne…" : "Big 3 jetzt berechnen"}
          </button>
          <p className="mt-3 text-center text-xs text-black/45 dark:text-white/45">
            Nur dieser Schritt ist kostenlos – kein vollständiges Profil im Browser.
          </p>
        </div>
      </section>

      <section
        ref={resultRef}
        className="scroll-mt-24 space-y-6 rounded-2xl border border-black/5 bg-white p-4 sm:space-y-8 sm:rounded-3xl sm:p-8 dark:border-white/10 dark:bg-white/5"
      >
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Schritt 3 · Ergebnis &amp; Demo
        </h2>
        {calcError ? (
          <p className="text-sm text-red-600 dark:text-red-400">{calcError}</p>
        ) : null}

        {big3 ? (
          <div className="space-y-2">
            <p className="text-sm text-black/70 dark:text-white/70">
              Deine <strong className="font-medium">Big 3</strong> – Sonne, Mond
              und Aszendent – exakt zu deinem Geburtszeitpunkt und Ort.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <Big3PlacementCard
                label="Sonne"
                sign={big3.sun}
                description={blurb(big3.sun)}
              />
              <Big3PlacementCard
                label="Mond"
                sign={big3.moon}
                description={blurb(big3.moon)}
              />
              <Big3PlacementCard
                label="Aszendent"
                sign={big3.ascendant}
                description={blurb(big3.ascendant)}
              />
            </div>

            {big3.meta?.tz ? (
              <p className="text-xs text-black/50 dark:text-white/50">
                Zeitzone: {big3.meta.tz}
              </p>
            ) : null}

            <BirthChartReportDemo
              sun={big3.sun as ZodiacSign}
              moon={big3.moon as ZodiacSign}
              ascendant={big3.ascendant as ZodiacSign}
            />

            <BirthChartVollreportUpsell
              birthdate={birthdate}
              birthtime={birthtime}
              place={place}
              big3={big3}
            />
          </div>
        ) : (
          <p className="text-sm text-black/65 dark:text-white/65">
            Sobald du die Big 3 berechnet hast, erscheinen hier deine Zeichen, eine
            Demo-Ansicht des Berichts und der Weg zur vollen Auswertung.
          </p>
        )}
      </section>

      <section className="w-full max-w-none rounded-2xl border border-black/5 bg-black/[0.02] px-4 py-6 text-center dark:border-white/10 dark:bg-white/[0.03] sm:rounded-3xl sm:px-8 sm:py-8">
        <p className="text-sm font-medium text-black/80 dark:text-white/80">
          Nächster Schritt
        </p>
        <p className="mt-2 text-sm text-black/60 dark:text-white/60">
          Wenn du dieses Tool gerade überspringst, geh einfach hier weiter.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <Link
            href="/freebie"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Kostenloser Guide
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Zum Shop
          </Link>
          <Link
            href="/tools"
            className="inline-flex h-11 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Nächstes Tool
          </Link>
        </div>
      </section>
    </div>
  );
}
