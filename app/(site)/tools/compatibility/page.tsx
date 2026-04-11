"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import type { SynastryReport } from "@/lib/astro/synastry";
import { useGeoPlaces, type GeoPlace } from "@/hooks/useGeoPlaces";

function safeJsonParse(raw: string): unknown {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { _nonJson: true, raw };
  }
}

type PersonForm = {
  birthdate: string;
  birthtime: string;
  query: string;
  place: GeoPlace | null;
};

const emptyPerson = (): PersonForm => ({
  birthdate: "",
  birthtime: "",
  query: "",
  place: null,
});

function PersonFields({
  title,
  form,
  setForm,
  places,
  placesLoading,
  placesError,
}: {
  title: string;
  form: PersonForm;
  setForm: Dispatch<SetStateAction<PersonForm>>;
  places: GeoPlace[];
  placesLoading: boolean;
  placesError: string | null;
}) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white/60 p-5 sm:p-6 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-xs text-black/55 dark:text-white/55">
        Geburtsdatum, -zeit und -ort für exakte Planetenlagen (wie beim Birth
        Chart).
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Geburtsdatum</span>
          <input
            value={form.birthdate}
            onChange={(e) =>
              setForm((f) => ({ ...f, birthdate: e.target.value }))
            }
            type="date"
            className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Geburtszeit</span>
          <input
            value={form.birthtime}
            onChange={(e) =>
              setForm((f) => ({ ...f, birthtime: e.target.value }))
            }
            type="time"
            className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          />
        </label>
      </div>
      <div className="mt-5">
        <label className="space-y-2">
          <span className="text-sm font-medium">Geburtsort (DACH)</span>
          <input
            value={form.query}
            onChange={(e) =>
              setForm((f) => ({ ...f, query: e.target.value, place: null }))
            }
            placeholder="z. B. Berlin"
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
        {form.place ? (
          <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-900 dark:text-emerald-200">
            Ausgewählt:{" "}
            <span className="font-medium">{form.place.label}</span>
          </div>
        ) : null}
        {!form.place && places.length > 0 ? (
          <div className="mt-3 grid max-h-48 gap-2 overflow-y-auto">
            {places.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    place: p,
                    query: p.label,
                  }))
                }
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-left text-sm hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
              >
                {p.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function CompatibilityToolPage() {
  const [a, setA] = useState<PersonForm>(emptyPerson);
  const [b, setB] = useState<PersonForm>(emptyPerson);

  const geoA = useGeoPlaces(a.query);
  const geoB = useGeoPlaces(b.query);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<null | {
    synastry: SynastryReport;
    a: { big3: { sun: string; moon: string; ascendant: string } };
    b: { big3: { sun: string; moon: string; ascendant: string } };
  }>(null);

  const canSubmit = useMemo(() => {
    return (
      /^\d{4}-\d{2}-\d{2}$/.test(a.birthdate) &&
      /^\d{2}:\d{2}$/.test(a.birthtime) &&
      a.place &&
      /^\d{4}-\d{2}-\d{2}$/.test(b.birthdate) &&
      /^\d{2}:\d{2}$/.test(b.birthtime) &&
      b.place
    );
  }, [a, b]);

  async function runSynastry() {
    if (!a.place || !b.place) return;
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/tools/synastry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          a: {
            date: a.birthdate,
            time: a.birthtime,
            location: {
              name: a.place.city || a.place.label,
              lat: a.place.lat,
              lon: a.place.lon,
              countryCode: a.place.countryCode,
            },
          },
          b: {
            date: b.birthdate,
            time: b.birthtime,
            location: {
              name: b.place.city || b.place.label,
              lat: b.place.lat,
              lon: b.place.lon,
              countryCode: b.place.countryCode,
            },
          },
        }),
      });
      const raw = await res.text();
      const parsed = safeJsonParse(raw);
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
        synastry?: SynastryReport;
        a?: { big3: { sun: string; moon: string; ascendant: string } };
        b?: { big3: { sun: string; moon: string; ascendant: string } };
        message?: string;
      };
      if (!res.ok || !data.synastry || !data.a || !data.b) {
        throw new Error(
          data.message || `Analyse fehlgeschlagen (HTTP ${res.status}).`,
        );
      }
      setReport({ synastry: data.synastry, a: data.a, b: data.b });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Link
        href="/tools"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zur Themenwahl
      </Link>
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Kompatibilität (Synastry)
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Zwei Geburtsprofile – echte Planetenlagen und professionelle
          Aspekt-Analyse (Sonne bis Saturn). Kein Zufalls-Score mehr.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-1">
        <PersonFields
          title="Person A"
          form={a}
          setForm={setA}
          places={geoA.places}
          placesLoading={geoA.loading}
          placesError={geoA.error}
        />
        <PersonFields
          title="Person B"
          form={b}
          setForm={setB}
          places={geoB.places}
          placesLoading={geoB.loading}
          placesError={geoB.error}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled={!canSubmit || loading}
          onClick={() => void runSynastry()}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          {loading ? "Berechne Synastry…" : "Paar-Analyse berechnen"}
        </button>
        <Link
          href="/tools"
          className="text-center text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white sm:text-left"
        >
          ← Zur Themenwahl
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {report ? (
        <div className="space-y-8">
          <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Eure Big 3
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-black/45 dark:text-white/45">
                  Person A
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <span className="text-black/60 dark:text-white/60">
                      Sonne:{" "}
                    </span>
                    <span className="font-medium">{report.a.big3.sun}</span>
                  </li>
                  <li>
                    <span className="text-black/60 dark:text-white/60">
                      Mond:{" "}
                    </span>
                    <span className="font-medium">{report.a.big3.moon}</span>
                  </li>
                  <li>
                    <span className="text-black/60 dark:text-white/60">
                      Aszendent:{" "}
                    </span>
                    <span className="font-medium">
                      {report.a.big3.ascendant}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-black/45 dark:text-white/45">
                  Person B
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <span className="text-black/60 dark:text-white/60">
                      Sonne:{" "}
                    </span>
                    <span className="font-medium">{report.b.big3.sun}</span>
                  </li>
                  <li>
                    <span className="text-black/60 dark:text-white/60">
                      Mond:{" "}
                    </span>
                    <span className="font-medium">{report.b.big3.moon}</span>
                  </li>
                  <li>
                    <span className="text-black/60 dark:text-white/60">
                      Aszendent:{" "}
                    </span>
                    <span className="font-medium">
                      {report.b.big3.ascendant}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-sky-500/10 p-6 sm:p-8 dark:from-violet-500/15 dark:to-sky-500/10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Harmonie-Index
                </h2>
                <p className="mt-1 text-sm text-black/65 dark:text-white/65">
                  Heuristik aus harmonischen vs. herausfordernden Aspekten –
                  nur Orientierung.
                </p>
              </div>
              <p className="text-5xl font-semibold tabular-nums tracking-tight">
                {report.synastry.harmonyScore}
                <span className="text-2xl text-black/45 dark:text-white/45">
                  /100
                </span>
              </p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-black/80 dark:text-white/80 [&_strong]:font-semibold">
              {report.synastry.summary
                .split("**")
                .map((chunk, i) =>
                  i % 2 === 1 ? (
                    <strong key={i}>{chunk}</strong>
                  ) : (
                    <span key={i}>{chunk}</span>
                  ),
                )}
            </p>
            <p className="mt-4 text-sm text-black/70 dark:text-white/70">
              {report.synastry.chemistryLine}
            </p>
          </section>

          {report.synastry.sections.map((sec) => (
            <section
              key={sec.title}
              className="rounded-3xl border border-black/5 bg-white/80 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {sec.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
                {sec.body}
              </p>
            </section>
          ))}

          <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Zentrale Aspekte (Auswahl)
            </h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Sortiert nach Relevanz für Paardynamik. Konjunktion, Opposition,
              Trigon, Quadrat, Sextil mit klassischen Orbs.
            </p>
            <ul className="mt-6 space-y-5">
              {report.synastry.aspects.map((asp, idx) => (
                <li
                  key={`${asp.planetA}-${asp.planetB}-${asp.aspect}-${idx}`}
                  className="rounded-2xl border border-black/8 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/10"
                >
                  <div className="flex flex-wrap items-baseline gap-2 text-sm">
                    <span className="font-medium">
                      {asp.nameA} – {asp.nameB}
                    </span>
                    <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-900 dark:bg-violet-400/20 dark:text-violet-100">
                      {asp.aspectLabelDe}
                    </span>
                    <span
                      className={
                        asp.tone === "harmonisch"
                          ? "text-emerald-700 dark:text-emerald-300"
                          : asp.tone === "herausfordernd"
                            ? "text-amber-800 dark:text-amber-200"
                            : "text-sky-800 dark:text-sky-200"
                      }
                    >
                      {asp.tone}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-black/80 dark:text-white/80">
                    {report.synastry.aspectTexts[idx]}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-xs leading-relaxed text-black/50 dark:text-white/50">
            {report.synastry.disclaimer}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop/compatibility-vollanalyse"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Erweiterte Pakete im Shop
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
        <p className="text-sm text-black/60 dark:text-white/60">
          Fülle beide Profile vollständig aus und starte die Berechnung.
        </p>
      )}
    </div>
  );
}
