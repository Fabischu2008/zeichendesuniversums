"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HumanDesignBodygraph } from "@/components/HumanDesignBodygraph";
import { ToolFooterCta } from "@/components/ToolFooterCta";
import type {
  HumanDesignGuidance,
  HumanDesignResult,
} from "@/lib/tools/human-design";
import { backLink, btnPrimary, eyebrow, sectionCard } from "@/lib/ui";

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

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 dark:border-white/15 dark:bg-black/20">
      <p className="text-[11px] uppercase tracking-[0.14em] text-black/50 dark:text-white/50">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function SectionCard({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-3xl border border-black/10 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6"
    >
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {subtitle ? (
        <p className="mt-1 text-sm text-black/65 dark:text-white/65">{subtitle}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function GuidanceList({ guidance }: { guidance: HumanDesignGuidance }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
          Heute
        </p>
        <ul className="mt-3 space-y-2 text-sm text-black/80">
          {guidance.today.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-900">
          Diese Woche
        </p>
        <ul className="mt-3 space-y-2 text-sm text-black/80">
          {guidance.week.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-900">
          Vermeiden
        </p>
        <ul className="mt-3 space-y-2 text-sm text-black/80">
          {guidance.avoid.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
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

  const navItems = [
    { id: "hd-core", label: "Grundlagen" },
    { id: "hd-mechanics", label: "Mechanik" },
    { id: "hd-advanced", label: "Details" },
    { id: "hd-guidance", label: "Impulse" },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link href="/tools" className={backLink}>
        ← Zur Themenwahl
      </Link>

      <header className="space-y-4">
        <p className={eyebrow}>Tool · Human Design</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Dein Human Design Profil
        </h1>
        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
          Typ, Autorität, Profil und Zentren – berechnet aus Datum, Uhrzeit und
          Geburtsort. Ergänzt dein Geburtshoroskop um eine zweite Perspektive.
        </p>
      </header>

      <section className={sectionCard}>
        <h2 className="text-lg font-semibold tracking-tight">
          Schritt 2 · Geburtsdaten
        </h2>

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
          className={`${btnPrimary} mt-8 w-full`}
        >
          {loading ? "Berechne…" : "Human Design berechnen"}
        </button>
      </section>

      <section
        ref={resultRef}
        aria-live="polite"
        className="scroll-mt-24 space-y-6"
      >
        {error ? (
          <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : null}

        {result ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Dein Ergebnis
              </h2>
              <p className="text-black/70 dark:text-white/70">
                {birthdate}, {birthtime}
              </p>
              <p className="text-black/70 dark:text-white/70">{selectedLabel}</p>
            </div>

            <div className="sticky top-2 z-20 rounded-2xl border border-black/10 bg-white/95 p-3 backdrop-blur dark:border-white/15 dark:bg-black/70">
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <SectionCard
              id="hd-core"
              title="Grundlagen"
              subtitle="Die vier Eckpfeiler deines Designs"
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatChip label="Typ" value={result.profileData.core.type} />
                <StatChip label="Profil" value={result.profileData.core.profile} />
                <StatChip label="Autorität" value={result.profileData.core.authority} />
                <StatChip label="Strategie" value={result.profileData.core.strategy} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-emerald-900">Signatur</p>
                  <p className="mt-1 text-sm font-semibold">{result.profileData.core.signature}</p>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-amber-900">Nicht-Selbst</p>
                  <p className="mt-1 text-sm font-semibold">{result.profileData.core.notSelfTheme}</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="hd-mechanics"
              title="Bodygraph & Mechanik"
              subtitle="Zentren, Kanäle und Tore in deinem Chart"
            >
              <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
                <div className="rounded-2xl border border-black/10 bg-white/70 p-3 dark:border-white/15 dark:bg-black/30">
                  <HumanDesignBodygraph
                    definedCenters={result.profileData.mechanics.definedCenters}
                    channels={result.profileData.mechanics.channels}
                    gates={result.profileData.mechanics.gates}
                  />
                </div>
                <div className="space-y-3">
                  <StatChip label="Definition" value={result.profileData.mechanics.definition} />
                  <StatChip
                    label="Definierte Zentren"
                    value={result.profileData.mechanics.definedCenters.join(", ") || "-"}
                  />
                  <StatChip
                    label="Offene Zentren"
                    value={result.profileData.mechanics.openCenters.join(", ") || "-"}
                  />
                  <StatChip
                    label="Kanäle"
                    value={result.profileData.mechanics.channels.join(", ") || "-"}
                  />
                  <StatChip
                    label="Tore"
                    value={result.profileData.mechanics.gates.join(", ") || "-"}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="hd-advanced"
              title="Details"
              subtitle="Feinere Ebenen deines Designs"
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <StatChip
                  label="Inkarnations-Kreuz"
                  value={result.profileData.advanced.incarnationCross}
                />
                <StatChip
                  label="Inkarnations-Thema"
                  value={result.profileData.advanced.incarnationTheme}
                />
                <StatChip label="Verdauung" value={result.profileData.advanced.digestion} />
                <StatChip label="Umgebung" value={result.profileData.advanced.environment} />
                <StatChip label="Motivation" value={result.profileData.advanced.motivation} />
                <StatChip label="Perspektive" value={result.profileData.advanced.perspective} />
                <StatChip label="Wahrnehmung" value={result.profileData.advanced.cognition} />
                <StatChip label="Sinn" value={result.profileData.advanced.designSense} />
              </div>
            </SectionCard>

            <SectionCard
              id="hd-guidance"
              title="Impulse für Alltag & Woche"
              subtitle="Konkrete Ansatzpunkte aus deinem Design"
            >
              <GuidanceList guidance={result.profileData.guidance} />
            </SectionCard>
          </div>
        ) : (
          <p className="rounded-2xl border border-black/10 bg-white/80 p-5 text-sm text-black/65 dark:border-white/10 dark:bg-white/5 dark:text-white/65">
            Trag deine Geburtsdaten ein und berechne dein Design, um den
            vollständigen Report zu sehen.
          </p>
        )}
      </section>

      <ToolFooterCta />
    </div>
  );
}
