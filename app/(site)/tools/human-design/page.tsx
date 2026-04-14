"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HumanDesignBodygraph } from "@/components/HumanDesignBodygraph";

type Place = {
  id: string;
  label: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
};

type HumanDesignResult = {
  type: string;
  strategy: string;
  authority: string;
  profile: string;
  incarnationTheme: string;
  signature: string;
  notSelfTheme: string;
  definition: string;
  centersHint: string[];
  gatesHint: string[];
  channels: string[];
  gates: number[];
  openCenters: string[];
  definedCenters: string[];
  incarnationCross: string;
  digestion: string;
  environment: string;
  motivation: string;
  perspective: string;
  cognition: string;
  designSense: string;
};

function safeJsonParse(raw: string): unknown {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { _nonJson: true, raw };
  }
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="border border-black/60 bg-white px-4 py-3 text-center text-3xl font-semibold">
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[46px,1fr,1fr] items-center gap-3 bg-black/[0.04] px-4 py-3">
      <div className="text-2xl">{icon}</div>
      <p className="text-lg font-medium leading-tight">{label}</p>
      <p className="text-right text-lg leading-tight">{value}</p>
    </div>
  );
}

export default function HumanDesignToolPage() {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [place, setPlace] = useState<Place | null>(null);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HumanDesignResult | null>(null);
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
          throw new Error(data.message || `Autocomplete nicht verfügbar (HTTP ${res.status}).`);
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
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const canCalculate = useMemo(
    () =>
      Boolean(
        /^\d{4}-\d{2}-\d{2}$/.test(birthdate) &&
          /^\d{2}:\d{2}$/.test(birthtime) &&
          place,
      ),
    [birthdate, birthtime, place],
  );

  async function calculate() {
    if (!place) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/tools/human-design", {
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
        result?: HumanDesignResult;
        message?: string;
      };
      if (!res.ok || !data.result) {
        throw new Error(data.message || `Berechnung fehlgeschlagen (HTTP ${res.status}).`);
      }
      setResult(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  const selectedLabel = place
    ? `${place.city || place.label}, ${place.countryCode || place.country}`
    : "Ort wählen";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        href="/tools"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zur Themenwahl
      </Link>

      <header className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold italic tracking-tight sm:text-5xl">
          Human Design
        </h1>
        <p className="text-black/65 dark:text-white/70">
          Für deine Daten gebaut, danach mit anderen Daten testbar.
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold tracking-tight">Geburtsdaten</h2>
        <button
          type="button"
          onClick={() => {
            setBirthdate("1998-08-20");
            setBirthtime("14:51");
            setQuery("Kaiserslautern, DE");
            setPlace({
              id: "preset-kl",
              label: "Kaiserslautern, Rheinland-Pfalz, Deutschland",
              city: "Kaiserslautern",
              country: "Deutschland",
              countryCode: "DE",
              lat: 49.4447,
              lon: 7.7694,
            });
            setPlaces([]);
          }}
          className="mt-4 rounded-full border border-black/20 px-4 py-2 text-sm font-semibold hover:bg-black/5"
        >
          Testdaten laden (Fabian · 20.08.1998 · 14:51 · Kaiserslautern)
        </button>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
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

        <div className="mt-5">
          <label className="space-y-2">
            <span className="text-sm font-medium">Geburtsort (DACH)</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPlace(null);
              }}
              placeholder="z. B. Berlin"
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:focus:border-white/30"
            />
          </label>

          {placesError ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{placesError}</p>
          ) : null}
          {placesLoading ? (
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">Suche Orte…</p>
          ) : null}

          {place ? (
            <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-900 dark:text-emerald-200">
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
          disabled={!canCalculate || loading}
          onClick={() => void calculate()}
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-black bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-black/80 disabled:text-white/90"
        >
          {loading ? "Berechne…" : "Human Design berechnen"}
        </button>
      </section>

      <section ref={resultRef} className="scroll-mt-24 space-y-6">
        {error ? <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p> : null}

        {result ? (
          <div className="space-y-6">
            <div className="space-y-1 text-center">
              <p className="text-3xl font-medium">Human Design Ergebnis</p>
              <p className="text-black/70 dark:text-white/70">
                {birthdate}, {birthtime}
              </p>
              <p className="text-black/70 dark:text-white/70">{selectedLabel}</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5">
              <SectionTitle>Dein Chart</SectionTitle>
              <div className="flex justify-center p-4">
                <HumanDesignBodygraph definedCenters={result.definedCenters} />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5">
              <SectionTitle>Deine Kernidentität</SectionTitle>
              <InfoRow icon="🧬" label="Typ" value={result.type} />
              <InfoRow icon="🎯" label="Profil" value={result.profile} />
              <InfoRow icon="🛡️" label="Autorität" value={result.authority} />
              <InfoRow icon="🧭" label="Strategie" value={result.strategy.replace(".", "")} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5">
              <SectionTitle>Dein Energie Bauplan</SectionTitle>
              <InfoRow icon="💠" label="Definition" value={result.definition} />
              <InfoRow icon="🌈" label="Offene Zentren" value={result.openCenters.join(", ")} />
              <InfoRow icon="🟣" label="Definierte Zentren" value={result.definedCenters.join(", ")} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5">
              <SectionTitle>Dein Lebenszweck</SectionTitle>
              <InfoRow icon="✳️" label="Inkarnations-Kreuz" value={result.incarnationCross} />
              <InfoRow icon="✨" label="Signatur" value={result.signature} />
              <InfoRow icon="🪞" label="Nicht-Selbst Thema" value={result.notSelfTheme} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5">
              <SectionTitle>Deine Energetischen Bahnen</SectionTitle>
              <InfoRow icon="🔗" label="Kanäle" value={result.channels.join(", ")} />
              <InfoRow icon="🧿" label="Tore" value={result.gates.join(", ")} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5">
              <SectionTitle>Dein Inneres Ökosystem</SectionTitle>
              <InfoRow icon="🍽️" label="Verdauung" value={result.digestion} />
              <InfoRow icon="🌍" label="Umgebung" value={result.environment} />
              <InfoRow icon="🚀" label="Motivation" value={result.motivation} />
              <InfoRow icon="👁️" label="Perspektive" value={result.perspective} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/5">
              <SectionTitle>Deine sensorischen Schlüssel</SectionTitle>
              <InfoRow icon="🌤️" label="Sinn" value={result.cognition} />
              <InfoRow icon="🌀" label="Design Sinn" value={result.designSense} />
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm dark:border-white/10 dark:bg-white/[0.03]">
              <p className="font-semibold">Technische Hinweise</p>
              <ul className="mt-2 space-y-1 text-black/70 dark:text-white/75">
                {result.centersHint.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
                {result.gatesHint.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-black/55 dark:text-white/60">
                Inkarnations-Thema: {result.incarnationTheme}
              </p>
              <p className="text-xs text-black/55 dark:text-white/60">
                Zum Testen einfach neue Geburtsdaten oben eintragen und erneut berechnen.
              </p>
            </div>
          </div>
        ) : (
          <p className="rounded-2xl border border-black/10 bg-white/80 p-5 text-sm text-black/65 dark:border-white/10 dark:bg-white/5 dark:text-white/65">
            Berechne dein Ergebnis, um den kompletten Human-Design-Report mit Chart und
            Detailbereichen zu sehen.
          </p>
        )}
      </section>
    </div>
  );
}
