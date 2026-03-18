"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
    } catch (e) {
      setCalcError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setCalcLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Birth Chart Tool (Big 3)
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Exakt berechnet: Sonne, Mond und Aszendent (DACH).
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-6 md:grid-cols-2">
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

        <div className="mt-6">
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

        <div className="mt-6">
          <button
            type="button"
            disabled={!canCalculate || calcLoading}
            onClick={() => void calculate()}
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {calcLoading ? "Berechne…" : "Big 3 berechnen"}
          </button>
          <p className="mt-2 text-xs text-black/50 dark:text-white/50">
            Für exakte Ergebnisse brauchen wir Datum, Uhrzeit und Ort.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight">Ergebnis</h2>
        {calcError ? (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">
            {calcError}
          </p>
        ) : null}

        {big3 ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-black/70 dark:text-white/70">
              Deine Big 3:
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-black/5 p-4 text-sm dark:bg-white/10">
                <p className="text-xs text-black/60 dark:text-white/60">Sonne</p>
                <p className="mt-1 text-lg font-semibold">{big3.sun}</p>
                <p className="mt-2 text-xs text-black/70 dark:text-white/70">
                  {blurb(big3.sun)}
                </p>
              </div>
              <div className="rounded-2xl bg-black/5 p-4 text-sm dark:bg-white/10">
                <p className="text-xs text-black/60 dark:text-white/60">Mond</p>
                <p className="mt-1 text-lg font-semibold">{big3.moon}</p>
                <p className="mt-2 text-xs text-black/70 dark:text-white/70">
                  {blurb(big3.moon)}
                </p>
              </div>
              <div className="rounded-2xl bg-black/5 p-4 text-sm dark:bg-white/10">
                <p className="text-xs text-black/60 dark:text-white/60">
                  Aszendent
                </p>
                <p className="mt-1 text-lg font-semibold">{big3.ascendant}</p>
                <p className="mt-2 text-xs text-black/70 dark:text-white/70">
                  {blurb(big3.ascendant)}
                </p>
              </div>
            </div>

            {big3.meta?.tz ? (
              <p className="text-xs text-black/50 dark:text-white/50">
                Zeitzone: {big3.meta.tz}
              </p>
            ) : null}

            <div className="mt-6 rounded-3xl border border-black/10 bg-white p-6 text-sm dark:border-white/15 dark:bg-transparent">
              <p className="font-medium">🔒 Vollreport ist gesperrt</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Du siehst die Big 3 – die echte Klarheit kommt im Vollreport:
                <span className="font-medium">
                  {" "}
                  Trigger, Beziehungsmuster und konkrete Next Steps
                </span>{" "}
                passend zu dir.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-black/5 p-4 dark:bg-white/10">
                  <p className="text-xs font-medium text-black/60 dark:text-white/60">
                    Was dich blockiert
                  </p>
                  <div className="mt-2 h-3 w-4/5 rounded bg-black/10 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-3/5 rounded bg-black/10 dark:bg-white/10" />
                </div>
                <div className="rounded-2xl bg-black/5 p-4 dark:bg-white/10">
                  <p className="text-xs font-medium text-black/60 dark:text-white/60">
                    Was du brauchst
                  </p>
                  <div className="mt-2 h-3 w-5/6 rounded bg-black/10 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-black/10 dark:bg-white/10" />
                </div>
                <div className="rounded-2xl bg-black/5 p-4 dark:bg-white/10">
                  <p className="text-xs font-medium text-black/60 dark:text-white/60">
                    Dein Plan (7 Tage)
                  </p>
                  <div className="mt-2 h-3 w-3/4 rounded bg-black/10 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop/manifestation-blueprint"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Vollreport freischalten
              </Link>
              <Link
                href="/freebie"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              >
                Kostenloser Guide
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-black/70 dark:text-white/70">
            Gib Datum, Uhrzeit und Ort ein und starte die Berechnung.
          </p>
        )}
      </section>
    </div>
  );
}

