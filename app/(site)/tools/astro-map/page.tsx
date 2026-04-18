"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import countries110m from "world-atlas/countries-110m.json";
import type {
  AstroMapAngle,
  AstroMapLine,
  AstroMapQuality,
  AstroPlanetAnalysis,
  AstroMapPoint,
} from "@/lib/astro/astro-map";

type Place = {
  id: string;
  label: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
};

type LineInfluence = {
  lineId: string;
  planetName: string;
  glyph: string;
  angle: AstroMapAngle;
  theme: string;
  distanceKm: number;
  band: "stark" | "aktiv" | "subtil";
  color: string;
};

type MapResponse = {
  ok: boolean;
  lines: AstroMapLine[];
  analyses?: AstroPlanetAnalysis[];
  quality?: AstroMapQuality;
  meta?: { tz?: string; utc?: string; place?: string };
  message?: string;
};

function safeJsonParse(raw: string): unknown {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { _nonJson: true, raw };
  }
}

function projectPoint(point: AstroMapPoint, width: number, height: number) {
  const projection = geoNaturalEarth1()
    .translate([width / 2, height / 2])
    .scale(width / 6.2);
  const projected = projection([point.lon, point.lat]);
  return projected
    ? { x: projected[0], y: projected[1] }
    : { x: Number.NaN, y: Number.NaN };
}

function lineToSvgPath(points: AstroMapPoint[], width: number, height: number) {
  if (!points.length) return "";
  const [first, ...rest] = points;
  const p0 = projectPoint(first, width, height);
  let path = `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)}`;
  let prevLon = first.lon;

  for (const point of rest) {
    if (Math.abs(point.lon - prevLon) > 180) {
      const jump = projectPoint(point, width, height);
      path += ` M ${jump.x.toFixed(2)} ${jump.y.toFixed(2)}`;
    } else {
      const p = projectPoint(point, width, height);
      path += ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    }
    prevLon = point.lon;
  }
  return path;
}

function normalizeLonDiffDegrees(a: number, b: number) {
  let d = a - b;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

function pointToSegmentDistanceKm(p: AstroMapPoint, a: AstroMapPoint, b: AstroMapPoint) {
  const meanLatRad = (((p.lat + a.lat + b.lat) / 3) * Math.PI) / 180;
  const kx = 111.32 * Math.cos(meanLatRad);
  const ky = 110.57;

  const ax = 0;
  const ay = 0;
  const bx = normalizeLonDiffDegrees(b.lon, a.lon) * kx;
  const by = (b.lat - a.lat) * ky;
  const px = normalizeLonDiffDegrees(p.lon, a.lon) * kx;
  const py = (p.lat - a.lat) * ky;

  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const ab2 = abx * abx + aby * aby;
  if (ab2 <= 1e-9) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / ab2));
  const qx = ax + t * abx;
  const qy = ay + t * aby;
  return Math.hypot(px - qx, py - qy);
}

function lineDistanceKm(place: AstroMapPoint, line: AstroMapLine) {
  if (line.points.length < 2) return Number.POSITIVE_INFINITY;
  let best = Number.POSITIVE_INFINITY;
  for (let i = 1; i < line.points.length; i += 1) {
    const a = line.points[i - 1];
    const b = line.points[i];
    if (!a || !b) continue;
    if (Math.abs(normalizeLonDiffDegrees(b.lon, a.lon)) > 40) continue;
    const d = pointToSegmentDistanceKm(place, a, b);
    if (d < best) best = d;
  }
  return best;
}

function influenceBand(distanceKm: number): "stark" | "aktiv" | "subtil" {
  if (distanceKm <= 120) return "stark";
  if (distanceKm <= 300) return "aktiv";
  return "subtil";
}

function AstroMapSvg({
  lines,
  focusedLineId,
}: {
  lines: AstroMapLine[];
  focusedLineId: string | null;
}) {
  const width = 1100;
  const height = 540;
  const displayLines = lines.slice(0, 40);
  const projection = useMemo(
    () => geoNaturalEarth1().translate([width / 2, height / 2]).scale(width / 6.2),
    [width, height],
  );
  const pathBuilder = useMemo(() => geoPath(projection), [projection]);

  const landFeature = useMemo(() => {
    const topo = countries110m as unknown as Record<string, unknown>;
    return feature(
      topo as never,
      (topo.objects as { land: unknown }).land as never,
    ) as unknown as GeoJSON.Feature;
  }, []);
  const countriesFeature = useMemo(() => {
    const topo = countries110m as unknown as Record<string, unknown>;
    return feature(
      topo as never,
      (topo.objects as { countries: unknown }).countries as never,
    ) as unknown as GeoJSON.FeatureCollection;
  }, []);

  const landPath = pathBuilder(landFeature as never) ?? "";
  const countryPaths = countriesFeature.features
    .map((f) => pathBuilder(f as never))
    .filter((d): d is string => Boolean(d));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full rounded-2xl border border-black/10 bg-gradient-to-b from-sky-200 via-sky-100 to-blue-100 dark:border-white/15 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
      role="img"
      aria-label="Astro-Landkarte mit planetaren Linien"
    >
      <defs>
        <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
        <linearGradient id="landGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={width} height={height} fill="url(#oceanGradient)" />

      {Array.from({ length: 11 }).map((_, i) => {
        const lat = 80 - i * 16;
        const pLeft = projection([-180, lat]);
        const pRight = projection([180, lat]);
        if (!pLeft || !pRight) return null;
        return (
          <line
            key={`lat-${i}`}
            x1={pLeft[0]}
            y1={pLeft[1]}
            x2={pRight[0]}
            y2={pRight[1]}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        );
      })}
      {Array.from({ length: 13 }).map((_, i) => {
        const lon = -180 + i * 30;
        const pTop = projection([lon, 82]);
        const pBottom = projection([lon, -82]);
        if (!pTop || !pBottom) return null;
        return (
          <line
            key={`lon-${i}`}
            x1={pTop[0]}
            y1={pTop[1]}
            x2={pBottom[0]}
            y2={pBottom[1]}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        );
      })}

      <path
        d={landPath}
        fill="url(#landGradient)"
        stroke="#94a3b8"
        strokeOpacity="0.95"
        strokeWidth="0.9"
      />

      {countryPaths.map((d, idx) => (
        <path
          key={`country-${idx}`}
          d={d}
          fill="none"
          stroke="#64748b"
          strokeOpacity="0.28"
          strokeWidth="0.45"
        />
      ))}

      {displayLines.map((line) => (
        <path
          key={line.id}
          d={lineToSvgPath(line.points, width, height)}
          fill="none"
          stroke={line.color}
          strokeWidth={line.angle === "MC" || line.angle === "IC" ? 2.6 : 1.9}
          strokeOpacity={
            focusedLineId && focusedLineId !== line.id
              ? 0.18
              : line.angle === "MC" || line.angle === "IC"
                ? 0.95
                : 0.84
          }
        />
      ))}
    </svg>
  );
}

export default function AstroMapToolPage() {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");

  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [place, setPlace] = useState<Place | null>(null);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [analysisQuery, setAnalysisQuery] = useState("");
  const [analysisPlaces, setAnalysisPlaces] = useState<Place[]>([]);
  const [analysisPlace, setAnalysisPlace] = useState<Place | null>(null);
  const [analysisPlacesLoading, setAnalysisPlacesLoading] = useState(false);
  const [analysisPlacesError, setAnalysisPlacesError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MapResponse | null>(null);
  const [focusedLineId, setFocusedLineId] = useState<string | null>(null);
  const [activeAngles, setActiveAngles] = useState<Record<AstroMapAngle, boolean>>({
    MC: true,
    IC: true,
    AC: true,
    DC: true,
  });
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
    const q = analysisQuery.trim();
    setAnalysisPlacesError(null);
    if (q.length < 2) {
      setAnalysisPlaces([]);
      return;
    }

    const ac = new AbortController();
    const t = setTimeout(async () => {
      setAnalysisPlacesLoading(true);
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
        setAnalysisPlaces(Array.isArray(data.results) ? data.results : []);
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return;
        setAnalysisPlacesError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        setAnalysisPlacesLoading(false);
      }
    }, 250);
    return () => {
      ac.abort();
      clearTimeout(t);
    };
  }, [analysisQuery]);

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

  const highlights = useMemo(() => {
    const lines = result?.lines ?? [];
    const mcIc = lines.filter((line) => line.angle === "MC" || line.angle === "IC");
    const byPlanet = new Map<string, AstroMapLine>();
    for (const line of mcIc) {
      if (!byPlanet.has(line.planetKey)) byPlanet.set(line.planetKey, line);
    }
    return Array.from(byPlanet.values()).slice(0, 4);
  }, [result]);

  const angleCounts = useMemo(() => {
    const counts: Record<AstroMapAngle, number> = { MC: 0, IC: 0, AC: 0, DC: 0 };
    for (const line of result?.lines ?? []) counts[line.angle] += 1;
    return counts;
  }, [result]);

  const visibleLines = useMemo(
    () =>
      (result?.lines ?? []).filter((line) => {
        return activeAngles[line.angle];
      }),
    [result, activeAngles],
  );

  const legendLines = useMemo(() => {
    const byPlanet = new Map<string, AstroMapLine>();
    for (const line of visibleLines) {
      if (!byPlanet.has(line.planetKey)) byPlanet.set(line.planetKey, line);
    }
    return Array.from(byPlanet.values()).slice(0, 8);
  }, [visibleLines]);

  const localInfluences = useMemo<LineInfluence[]>(() => {
    if (!analysisPlace || !result?.lines?.length) return [];
    return result.lines
      .map((line) => {
        const d = lineDistanceKm({ lat: analysisPlace.lat, lon: analysisPlace.lon }, line);
        return {
          lineId: line.id,
          planetName: line.planetName,
          glyph: line.glyph,
          angle: line.angle,
          theme: line.theme,
          distanceKm: d,
          band: influenceBand(d),
          color: line.color,
        };
      })
      .filter((x) => Number.isFinite(x.distanceKm))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 8);
  }, [analysisPlace, result]);

  function toggleAngle(angle: AstroMapAngle) {
    setActiveAngles((prev) => ({ ...prev, [angle]: !prev[angle] }));
  }

  async function calculateMap() {
    if (!place) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tools/astro-map", {
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
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as MapResponse;
      if (!res.ok) {
        throw new Error(data.message || `Berechnung fehlgeschlagen (HTTP ${res.status}).`);
      }
      setResult(data);
      setFocusedLineId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <Link
        href="/tools"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zur Themenwahl
      </Link>

      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
          Tool 4 · Astro-Landkarte
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Deine planetaren Linien auf der Weltkarte
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-black/70 dark:text-white/70">
          Auf dieser Karte siehst du, wo deine Themen weltweit besonders aktiviert
          werden. MC/IC zeigen Orte für Karriere und Wurzeln, AC/DC zeigen
          persönliche Wirkung und Beziehungsdynamik.
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold tracking-tight">
          Schritt 2 · Geburtsdaten eingeben
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
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
          disabled={!canCalculate || loading}
          onClick={() => void calculateMap()}
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 px-6 text-sm font-semibold text-violet-900 hover:bg-violet-500/15 disabled:cursor-not-allowed disabled:border-violet-500/20 disabled:bg-violet-500/5 disabled:text-violet-900/60 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-100 dark:hover:bg-violet-500/20 dark:disabled:border-violet-400/20 dark:disabled:bg-violet-500/10 dark:disabled:text-violet-100/60"
        >
          {loading ? "Berechne Landkarte…" : "Astro-Landkarte erstellen"}
        </button>
      </section>

      <section
        ref={resultRef}
        className="scroll-mt-24 space-y-6 rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
      >
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Schritt 3 · Deine Kartenlinien
        </h2>

        {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

        {result?.lines?.length ? (
          <>
            <div className="flex flex-wrap gap-2">
              {(["MC", "IC", "AC", "DC"] as AstroMapAngle[]).map((angle) => (
                <button
                  key={angle}
                  type="button"
                  onClick={() => toggleAngle(angle)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                    activeAngles[angle]
                      ? "border-black/20 bg-black/10 text-black dark:border-white/30 dark:bg-white/20 dark:text-white"
                      : "border-black/10 bg-transparent text-black/55 dark:border-white/15 dark:text-white/55"
                  }`}
                >
                  {angle} ({angleCounts[angle]})
                </button>
              ))}
            </div>

            <AstroMapSvg lines={visibleLines} focusedLineId={focusedLineId} />
            <p className="text-xs text-black/55 dark:text-white/55">
              Projektion: Natural Earth · Zeitzone: {result.meta?.tz ?? "—"} · UTC:{" "}
              {result.meta?.utc ?? "—"}
            </p>
            {result.quality ? (
              <p className="text-xs text-black/55 dark:text-white/55">
                Validierung: MC/IC max. Fehler {result.quality.mcIcHourAngleMaxErrorHours.toFixed(4)} h ·
                AC/DC max. Höhenfehler {result.quality.acDcAltitudeMaxErrorDegrees.toExponential(2)}°
                ({result.quality.sampledPoints} Samples)
              </p>
            ) : null}

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {legendLines.map((line) => (
                <button
                  key={line.id}
                  type="button"
                  onMouseEnter={() => setFocusedLineId(line.id)}
                  onMouseLeave={() => setFocusedLineId(null)}
                  onFocus={() => setFocusedLineId(line.id)}
                  onBlur={() => setFocusedLineId(null)}
                  className="flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-left text-xs dark:border-white/15 dark:bg-white/5"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: line.color }}
                    aria-hidden
                  />
                  <span className="font-medium">
                    {line.glyph} {line.planetName}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((line) => (
                <article
                  key={line.id}
                  className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <p className="text-sm font-semibold">
                    {line.glyph} {line.planetName} · {line.angle}
                  </p>
                  <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {line.theme}
                  </p>
                </article>
              ))}
            </div>

            <section className="space-y-3 rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-base font-semibold tracking-tight">
                Orts-Check: Welche Linien wirken hier?
              </h3>
              <p className="text-sm text-black/65 dark:text-white/65">
                Wähle einen Ort und wir ranken die stärksten Linien nach Distanz. Das
                hilft bei Umzug, Retreat, Business-Standort oder Reiseplanung.
              </p>
              <input
                value={analysisQuery}
                onChange={(e) => {
                  setAnalysisQuery(e.target.value);
                  setAnalysisPlace(null);
                }}
                placeholder="Ort für Linien-Check (z. B. München)"
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:focus:border-white/30"
              />
              {analysisPlacesError ? (
                <p className="text-sm text-red-600 dark:text-red-400">{analysisPlacesError}</p>
              ) : null}
              {analysisPlacesLoading ? (
                <p className="text-sm text-black/60 dark:text-white/60">Suche Orte…</p>
              ) : null}
              {!analysisPlace && analysisPlaces.length > 0 ? (
                <div className="grid gap-2">
                  {analysisPlaces.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setAnalysisPlace(p);
                        setAnalysisQuery(p.label);
                        setAnalysisPlaces([]);
                      }}
                      className="rounded-xl border border-black/10 bg-white px-3 py-2 text-left text-sm hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              ) : null}

              {analysisPlace && localInfluences.length > 0 ? (
                <div className="grid gap-2">
                  <p className="text-sm font-medium">
                    Nächste Linien für <span className="font-semibold">{analysisPlace.label}</span>
                  </p>
                  {localInfluences.map((item) => (
                    <button
                      key={item.lineId}
                      type="button"
                      onMouseEnter={() => setFocusedLineId(item.lineId)}
                      onMouseLeave={() => setFocusedLineId(null)}
                      onFocus={() => setFocusedLineId(item.lineId)}
                      onBlur={() => setFocusedLineId(null)}
                      className="flex items-center justify-between rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-left text-sm dark:border-white/15 dark:bg-white/5"
                    >
                      <span>
                        <span className="font-semibold">
                          {item.glyph} {item.planetName} {item.angle}
                        </span>{" "}
                        <span className="text-black/60 dark:text-white/60">· {item.theme}</span>
                      </span>
                      <span className="text-xs font-semibold">
                        {Math.round(item.distanceKm)} km · {item.band}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </section>

            {result.analyses?.length ? (
              <section className="space-y-4 pt-3">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                  Detaillierte Analyse je Planet
                </h3>
                <div className="grid gap-4">
                  {result.analyses.map((planet) => (
                    <article
                      key={planet.planetKey}
                      className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: planet.color }}
                          aria-hidden
                        />
                        <p className="text-base font-semibold">
                          {planet.glyph} {planet.planetName}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-black/75 dark:text-white/75">
                        {planet.summary}
                      </p>
                      <p className="mt-1 text-xs text-black/55 dark:text-white/55">
                        {planet.activationHint}
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {planet.angles.map((angle) => (
                          <div
                            key={`${planet.planetKey}-${angle.angle}`}
                            className="rounded-xl border border-black/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5"
                          >
                            <p className="text-xs font-semibold uppercase tracking-wide text-black/75 dark:text-white/75">
                              {angle.title}
                            </p>
                            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                              {angle.meaning}
                            </p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-black/65 dark:text-white/65">
                              Chancen
                            </p>
                            <ul className="mt-1 space-y-1 text-xs text-black/65 dark:text-white/65">
                              {angle.opportunities.map((x) => (
                                <li key={x}>• {x}</li>
                              ))}
                            </ul>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-black/65 dark:text-white/65">
                              Lernfelder
                            </p>
                            <ul className="mt-1 space-y-1 text-xs text-black/65 dark:text-white/65">
                              {angle.challenges.map((x) => (
                                <li key={x}>• {x}</li>
                              ))}
                            </ul>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-black/65 dark:text-white/65">
                              Praxis
                            </p>
                            <ul className="mt-1 space-y-1 text-xs text-black/65 dark:text-white/65">
                              {angle.practices.map((x) => (
                                <li key={x}>• {x}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-black/65 dark:text-white/65">
            Nach der Berechnung siehst du hier deine planetaren Linien und die
            wichtigsten Themenachsen.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-xl rounded-3xl border border-black/5 bg-black/[0.02] px-6 py-8 text-center dark:border-white/10 dark:bg-white/[0.03] sm:px-8">
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
