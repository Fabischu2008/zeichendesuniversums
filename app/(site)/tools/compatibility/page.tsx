"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AstroProfileResult } from "@/lib/astro/profile";
import { ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astro/signs";
import type {
  DeepCompatibilityReport,
  SynastryReport,
} from "@/lib/astro/synastry";
import { useGeoPlaces, type GeoPlace } from "@/hooks/useGeoPlaces";
import { readUnlockTokenFromBrowser } from "@/lib/profile-unlock-url";

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

type FunnelStage = "preview" | "exact" | "result";

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

function CompactProfileCard({
  label,
  profile,
  big3,
}: {
  label: string;
  profile: AstroProfileResult;
  big3: { sun: string; moon: string; ascendant: string };
}) {
  const topHouses = [...profile.houseFocus]
    .sort((a, b) => b.count - a.count)
    .slice(0, 2);
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
        {label}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">
        {profile.archetype.title}
      </h3>
      <p className="mt-1 text-sm text-black/70 dark:text-white/70">
        {profile.archetype.subtitle}
      </p>
      <ul className="mt-4 grid gap-1 text-sm sm:grid-cols-3">
        <li>
          <span className="text-black/55 dark:text-white/55">Sonne: </span>
          <span className="font-medium">{big3.sun}</span>
        </li>
        <li>
          <span className="text-black/55 dark:text-white/55">Mond: </span>
          <span className="font-medium">{big3.moon}</span>
        </li>
        <li>
          <span className="text-black/55 dark:text-white/55">Asz: </span>
          <span className="font-medium">{big3.ascendant}</span>
        </li>
      </ul>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {topHouses.map((h) => (
          <div
            key={`${label}-${h.house}`}
            className="rounded-2xl border border-black/8 bg-black/[0.03] px-3 py-2 text-xs dark:border-white/10 dark:bg-white/10"
          >
            <p className="font-semibold">Haus {h.house}</p>
            <p className="mt-0.5 text-black/65 dark:text-white/65">{h.theme}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-black/75 dark:text-white/75">
        {profile.narrative.relationshipStyle}
      </p>
    </section>
  );
}

function CompatibilityOctagon({
  dimensions,
}: {
  dimensions?: DeepCompatibilityReport["dimensions"];
}) {
  const fallbackDimensions: NonNullable<DeepCompatibilityReport["dimensions"]> = [
    { key: "communication", label: "Kommunikation", score: 50 },
    { key: "intimacy", label: "Anziehung", score: 50 },
    { key: "emotional", label: "Emotionale Sicherheit", score: 50 },
    { key: "trust", label: "Vertrauen", score: 50 },
    { key: "conflict", label: "Konfliktkompetenz", score: 50 },
    { key: "growth", label: "Entwicklungspotenzial", score: 50 },
    { key: "purpose", label: "Vision/Meaning", score: 50 },
    { key: "longterm", label: "Langfristigkeit", score: 50 },
  ];
  const axes =
    Array.isArray(dimensions) && dimensions.length > 2
      ? dimensions
      : fallbackDimensions;

  const size = 460;
  const center = size / 2;
  const radius = 150;
  const rings = [0.25, 0.5, 0.75, 1];
  const angleFor = (i: number) =>
    -Math.PI / 2 + (i * (Math.PI * 2)) / axes.length;
  const pointFor = (idx: number, r: number) => {
    const a = angleFor(idx);
    return {
      x: center + Math.cos(a) * r,
      y: center + Math.sin(a) * r,
    };
  };
  const polygon = axes
    .map((d, idx) => {
      const p = pointFor(idx, radius * (d.score / 100));
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-5">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="h-[380px] w-[380px] max-w-full"
        aria-label="Kompatibilitäts-Oktagon"
      >
        {rings.map((r) => (
          <polygon
            key={r}
            points={axes
              .map((_, idx) => {
                const p = pointFor(idx, radius * r);
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="currentColor"
            className="text-black/10 dark:text-white/20"
            strokeWidth="1"
          />
        ))}
        {axes.map((d, idx) => {
          const p = pointFor(idx, radius);
          return (
            <line
              key={d.key}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-black/10 dark:text-white/20"
              strokeWidth="1"
            />
          );
        })}
        <polygon
          points={polygon}
          fill="rgba(124,58,237,0.28)"
          stroke="rgba(109,40,217,0.95)"
          strokeWidth="2"
        />
        {axes.map((d, idx) => {
          const p = pointFor(idx, radius * (d.score / 100));
          const lbl = pointFor(idx, radius + 52);
          const anchor =
            Math.abs(lbl.x - center) < 12 ? "middle" : lbl.x > center ? "start" : "end";
          const dx = anchor === "start" ? 8 : anchor === "end" ? -8 : 0;
          return (
            <g key={`dot-${d.key}`}>
              <circle cx={p.x} cy={p.y} r="3.5" fill="rgba(91,33,182,1)" />
              <text
                x={lbl.x + dx}
                y={lbl.y}
                textAnchor={anchor}
                className="fill-black/70 text-[12px] dark:fill-white/75"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="grid w-full gap-2 sm:grid-cols-2">
        {axes.map((d) => (
          <div
            key={d.key}
            className="flex items-center justify-between rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-xs dark:border-white/15 dark:bg-black/20"
          >
            <span>{d.label}</span>
            <span className="font-semibold tabular-nums">{d.score}/100</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function dimensionAnalysisText(
  key: string,
  score: number,
): { headline: string; text: string } {
  const level =
    score >= 75 ? "hoch" : score >= 55 ? "mittel" : score >= 40 ? "sensibel" : "kritisch";
  switch (key) {
    case "communication":
      return {
        headline: `Kommunikation · ${level}`,
        text:
          score >= 70
            ? "Ihr könnt Themen meist direkt klären. Achtet darauf, schwierige Punkte trotzdem nicht zu überspringen."
            : "Hier entscheidet eure Qualität der Absprachen über den Verlauf. Regelmäßige Check-ins helfen enorm.",
      };
    case "intimacy":
      return {
        headline: `Anziehung · ${level}`,
        text:
          score >= 70
            ? "Die chemische Spannung ist klar da. Wichtig ist, sie mit emotionaler Sicherheit zu verbinden."
            : "Anziehung braucht bei euch bewusstes Nähren über Zeit, Sprache und gemeinsame Rituale.",
      };
    case "emotional":
      return {
        headline: `Emotionale Sicherheit · ${level}`,
        text:
          score >= 70
            ? "Gefühle haben Raum, ohne dass sofort Rückzug oder Abwehr entsteht."
            : "Trigger können schneller anspringen. Validierung und klare Grenzen stabilisieren.",
      };
    case "trust":
      return {
        headline: `Vertrauen · ${level}`,
        text:
          score >= 70
            ? "Verbindlichkeit kann gut wachsen, wenn ihr transparent bleibt."
            : "Vertrauen ist eher ein Aufbau-Thema: Konsistenz im Alltag ist hier der Hebel.",
      };
    case "conflict":
      return {
        headline: `Konfliktkompetenz · ${level}`,
        text:
          score >= 70
            ? "Spannung kann produktiv verarbeitet werden. Ihr habt Potenzial für faire Reparaturgespräche."
            : "Konflikte können eskalieren, wenn Tempo hoch ist. Pausen + klare Regeln entlasten.",
      };
    case "growth":
      return {
        headline: `Entwicklungspotenzial · ${level}`,
        text:
          score >= 70
            ? "Diese Verbindung hat spürbar Wachstumskraft, wenn ihr bewusst reflektiert."
            : "Lernen ist da, aber eher über Reibung. Setzt euch gemeinsame Lernziele als Paar.",
      };
    case "purpose":
      return {
        headline: `Vision/Meaning · ${level}`,
        text:
          score >= 70
            ? "Ihr könnt Sinn, Zukunft und Werte gut synchronisieren."
            : "Langfristige Ausrichtung braucht aktive Abstimmung statt stiller Annahmen.",
      };
    case "longterm":
      return {
        headline: `Langfristigkeit · ${level}`,
        text:
          score >= 70
            ? "Gute Basis für Dauerhaftigkeit – vor allem mit verlässlichen Gewohnheiten."
            : "Die Langstrecke ist möglich, braucht aber klare Strukturen und bewusste Prioritäten.",
      };
    default:
      return {
        headline: "Dimension",
        text: "Diese Achse beschreibt einen relevanten Bereich eurer Paardynamik.",
      };
  }
}

export default function CompatibilityToolPage() {
  const [stage, setStage] = useState<FunnelStage>("preview");
  const [previewA, setPreviewA] = useState<ZodiacSign>("Widder");
  const [previewB, setPreviewB] = useState<ZodiacSign>("Waage");
  const [miniPreviewReady, setMiniPreviewReady] = useState(false);
  const [a, setA] = useState<PersonForm>(emptyPerson);
  const [b, setB] = useState<PersonForm>(emptyPerson);

  const geoA = useGeoPlaces(a.query);
  const geoB = useGeoPlaces(b.query);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pairLink, setPairLink] = useState<string | null>(null);
  const [report, setReport] = useState<null | {
    synastry: SynastryReport;
    deepComparison: DeepCompatibilityReport;
    a: {
      profile: AstroProfileResult;
      big3: { sun: string; moon: string; ascendant: string };
    };
    b: {
      profile: AstroProfileResult;
      big3: { sun: string; moon: string; ascendant: string };
    };
  }>(null);
  const router = useRouter();
  const redeemRef = useRef(false);

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
    setPairLink(null);
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
        deepComparison?: DeepCompatibilityReport;
        a?: {
          profile?: AstroProfileResult;
          big3: { sun: string; moon: string; ascendant: string };
        };
        b?: {
          profile?: AstroProfileResult;
          big3: { sun: string; moon: string; ascendant: string };
        };
        message?: string;
      };
      if (
        !res.ok ||
        !data.synastry ||
        !data.deepComparison ||
        !data.a?.profile ||
        !data.b?.profile
      ) {
        throw new Error(
          data.message || `Analyse fehlgeschlagen (HTTP ${res.status}).`,
        );
      }
      setReport({
        synastry: data.synastry,
        deepComparison: data.deepComparison,
        a: { profile: data.a.profile, big3: data.a.big3 },
        b: { profile: data.b.profile, big3: data.b.big3 },
      });

      const linkRes = await fetch("/api/tools/compatibility/access-links", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          a: {
            birthdate: a.birthdate,
            birthtime: a.birthtime,
            place: a.place,
          },
          b: {
            birthdate: b.birthdate,
            birthtime: b.birthtime,
            place: b.place,
          },
        }),
      });
      const linkRaw = await linkRes.text();
      const linkParsed = safeJsonParse(linkRaw);
      const linkData = (linkParsed && typeof linkParsed === "object"
        ? linkParsed
        : {}) as {
        pairLink?: string | null;
      };
      const nextPairLink = linkData.pairLink || null;
      if (!nextPairLink) {
        throw new Error(
          "Zugangsseite konnte nicht erstellt werden. Bitte erneut versuchen.",
        );
      }
      setPairLink(nextPairLink);
      if (typeof window !== "undefined") {
        window.location.href = nextPairLink;
        return;
      }
      setStage("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function redeem() {
      const token = readUnlockTokenFromBrowser();
      if (!token || redeemRef.current) return;
      redeemRef.current = true;
      setStage("exact");
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/tools/compatibility/redeem", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          message?: string;
          synastry?: SynastryReport;
          deepComparison?: DeepCompatibilityReport;
          a?: {
            profile?: AstroProfileResult;
            big3?: { sun: string; moon: string; ascendant: string };
          };
          b?: {
            profile?: AstroProfileResult;
            big3?: { sun: string; moon: string; ascendant: string };
          };
        };
        if (
          !res.ok ||
          !data.synastry ||
          !data.deepComparison ||
          !data.a?.profile ||
          !data.a?.big3 ||
          !data.b?.profile ||
          !data.b?.big3
        ) {
          throw new Error(
            data.message || "Paaranalyse-Link ist ungültig oder abgelaufen.",
          );
        }
        setReport({
          synastry: data.synastry,
          deepComparison: data.deepComparison,
          a: { profile: data.a.profile, big3: data.a.big3 },
          b: { profile: data.b.profile, big3: data.b.big3 },
        });
        setPairLink(typeof window !== "undefined" ? window.location.href : null);
        setStage("result");
        router.replace("/tools/compatibility#paaranalyse");
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Paaranalyse-Link konnte nicht geladen werden.",
        );
      } finally {
        setLoading(false);
      }
    }
    void redeem();
  }, [router]);

  const previewCopy = useMemo(() => {
    const fire = ["Widder", "Löwe", "Schütze"];
    const earth = ["Stier", "Jungfrau", "Steinbock"];
    const air = ["Zwillinge", "Waage", "Wassermann"];
    const water = ["Krebs", "Skorpion", "Fische"];
    const pair = [previewA, previewB];
    const inGroup = (g: string[]) => pair.every((s) => g.includes(s));
    if (inGroup(fire) || inGroup(earth) || inGroup(air) || inGroup(water)) {
      return "Starker natürlicher Gleichklang. Ihr versteht euren Grundrhythmus meist intuitiv – achtet nur darauf, nicht dieselben blinden Flecken zu teilen.";
    }
    if (
      (fire.includes(previewA) && air.includes(previewB)) ||
      (air.includes(previewA) && fire.includes(previewB))
    ) {
      return "Hohe Dynamik und Inspiration: viel Bewegung, Ideen und Anziehung. Klärt früh, wer Struktur in Entscheidungen bringt.";
    }
    return "Spannende Ergänzung mit Reibungsfläche: genau hier liegt Potenzial. Für belastbare Aussagen braucht ihr die exakte Synastry mit Uhrzeit und Ort.";
  }, [previewA, previewB]);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Kompatibilität (Synastry)
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Zwei Geburtsprofile – echte Planetenlagen und professionelle
          Aspekt-Analyse (Sonne bis Saturn). Kein Zufalls-Score mehr.
        </p>
      </header>

      {stage === "preview" ? (
        <section className="rounded-3xl border border-black/5 bg-white/70 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Schritt 1 · Vorgeschmack
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Schneller Check ohne Geburtszeit
          </h2>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Für den Einstieg reicht je ein Sternzeichen. Danach kannst du die exakte
            Paaranalyse mit vollständigen Daten freischalten.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Person A – Sternzeichen</span>
              <select
                value={previewA}
                onChange={(e) => {
                  setPreviewA(e.target.value as ZodiacSign);
                  setMiniPreviewReady(false);
                }}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
              >
                {ZODIAC_SIGNS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Person B – Sternzeichen</span>
              <select
                value={previewB}
                onChange={(e) => {
                  setPreviewB(e.target.value as ZodiacSign);
                  setMiniPreviewReady(false);
                }}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
              >
                {ZODIAC_SIGNS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setMiniPreviewReady(true)}
              className="inline-flex h-12 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 px-6 text-sm font-semibold text-violet-900 hover:bg-violet-500/15 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-100"
            >
              Kleine Paaranalyse erstellen
            </button>
          </div>

          {miniPreviewReady ? (
            <>
              <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/[0.08] p-4 text-sm leading-relaxed text-black/85 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-white/85">
                <p className="font-medium">
                  {previewA} × {previewB} · Mini-Analyse
                </p>
                <p className="mt-1.5">{previewCopy}</p>
              </div>

              <section className="relative mt-6 overflow-hidden rounded-3xl border border-dashed border-black/20 bg-white p-5 sm:p-6 dark:border-white/20 dark:bg-white/5">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.03)_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.04)_100%)]" />
                <div className="pointer-events-none absolute right-3 top-3">
                  <span className="rounded-full border border-black/15 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black/60 shadow-sm dark:border-white/20 dark:bg-black/70 dark:text-white/70">
                    Demo · keine exakten Synastry-Texte
                  </span>
                </div>
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                    Schritt 2 · Ergebnis & Demo
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    So sieht die vollständige Paaranalyse aus
                  </h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                    In der Vollversion werden beide Horoskope komplett berechnet und
                    dann im Vergleich ausgewertet (Aspekte, Dimensionen, Profiltexte).
                  </p>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-black/10 bg-white/90 p-4 dark:border-white/10 dark:bg-black/20">
                      <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
                        Profilvergleich (A/B)
                      </p>
                      <p className="mt-2 text-sm font-medium text-black/45 dark:text-white/50">
                        Archetyp und Beziehungsstil · demo
                      </p>
                      <p className="mt-1 text-xs text-black/55 dark:text-white/55">
                        In der exakten Analyse seht ihr Big 3, Hausfokus, Narrative und
                        die Unterschiede zwischen Person A und B.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-black/10 bg-white/90 p-4 dark:border-white/10 dark:bg-black/20">
                      <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
                        Oktagon-Matrix
                      </p>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {[
                          "Kommunikation",
                          "Anziehung",
                          "Emotion",
                          "Vertrauen",
                          "Konflikt",
                          "Wachstum",
                          "Vision",
                          "Langfristigkeit",
                        ].map((x) => (
                          <div
                            key={x}
                            className="rounded-lg border border-black/10 bg-black/[0.03] px-2 py-1 text-[10px] text-black/40 dark:border-white/10 dark:bg-white/10 dark:text-white/45"
                          >
                            {x}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-black/10 bg-white/90 p-4 dark:border-white/10 dark:bg-black/20">
                    <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
                      Synastry-Aspekte · Auszug
                    </p>
                    <div className="mt-2 space-y-2">
                      {[
                        "Venus (A) – Mars (B) · Konjunktion · gemischt",
                        "Mond (A) – Mond (B) · Trigon · harmonisch",
                        "Saturn (A) – Sonne (B) · Quadrat · herausfordernd",
                      ].map((line) => (
                        <p
                          key={line}
                          className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 text-xs text-black/45 dark:border-white/10 dark:bg-white/10 dark:text-white/50"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-6">
                    <div className="rounded-2xl border border-black/8 bg-white/90 p-4 dark:border-white/10 dark:bg-black/20">
                      <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
                        Im kostenlosen Vorgeschmack
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-black/75 dark:text-white/75">
                        <li className="flex gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                          Mini-Eindruck auf Basis Sternzeichen
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                          Demo-Ansicht der Paaranalyse
                        </li>
                        <li className="flex gap-2">
                          <span className="text-black/35 dark:text-white/35">—</span>
                          Keine exakten A/B-Profile und keine echten Aspekttexte
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-violet-500/30 bg-violet-500/[0.08] p-4 dark:border-violet-400/25 dark:bg-violet-500/10">
                      <p className="text-xs font-semibold uppercase tracking-wider text-violet-900 dark:text-violet-100">
                        Exakte Paaranalyse
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-black/85 dark:text-white/85">
                        <li className="flex gap-2">
                          <span className="text-violet-700 dark:text-violet-300">✓</span>
                          Vollprofil für Person A und B (inkl. Planeten/Häuser)
                        </li>
                        <li className="flex gap-2">
                          <span className="text-violet-700 dark:text-violet-300">✓</span>
                          Komplettes Oktagon + Analyse je Dimension
                        </li>
                        <li className="flex gap-2">
                          <span className="text-violet-700 dark:text-violet-300">✓</span>
                          Persönliche Zugangslinks (Paaranalyse + beide Profile)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setStage("exact")}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black"
                    >
                      Exakte Paaranalyse freischalten
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : null}
        </section>
      ) : null}

      {stage === "exact" ? (
        <>
          <section className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-950 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100">
            <p className="font-medium">Schritt 2 · Exakte Analyse</p>
            <p className="mt-1">
              Für präzise Synastry (Mond, Aszendent, Häuser und Aspekt-Orbs) werden
              für beide Personen Geburtsdatum, Zeit und Ort benötigt.
            </p>
          </section>
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
              {loading ? "Berechne Synastry…" : "Exakte Paar-Analyse starten"}
            </button>
            <button
              type="button"
              onClick={() => setStage("preview")}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Zurück zum Vorgeschmack
            </button>
          </div>
        </>
      ) : null}

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {report ? (
        <div className="space-y-8">
          <section className="rounded-3xl border border-black/5 bg-white/70 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Schritt 3 · Erst die zwei Profile
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Eure Vollprofile im Überblick
            </h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Genau wie im ersten Tool: erst beide Profile sichtbar, dann daraus die
              Vergleichsanalyse.
            </p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <CompactProfileCard
                label="Profil Person A"
                profile={report.a.profile}
                big3={report.a.big3}
              />
              <CompactProfileCard
                label="Profil Person B"
                profile={report.b.profile}
                big3={report.b.big3}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-emerald-500/10 p-6 sm:p-8 dark:border-violet-400/20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Schritt 4 · Komplexe Vergleichsanalyse
            </p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {report.deepComparison.headline}
                </h2>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  Matrix aus Profilkern (Archetyp, Elemente, Hausfokus) + Synastry
                  Aspektnetz.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <CompatibilityOctagon
                dimensions={report.deepComparison.dimensions}
              />
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {report.deepComparison.focusAxis.map((x) => (
                <li
                  key={x}
                  className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-xs dark:border-white/15 dark:bg-black/20"
                >
                  {x}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-black/5 bg-white/80 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-semibold tracking-tight">
              Analyse je Dimension
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {report.deepComparison.dimensions.map((d) => {
                const a = dimensionAnalysisText(d.key, d.score);
                return (
                  <article
                    key={`dim-${d.key}`}
                    className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <p className="text-sm font-semibold">
                      {a.headline}
                      <span className="ml-2 text-xs font-normal text-black/55 dark:text-white/55">
                        ({d.score}/100)
                      </span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-black/75 dark:text-white/75">
                      {a.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {report.deepComparison.sections.map((sec) => (
            <section
              key={sec.title}
              className="rounded-3xl border border-black/5 bg-white/80 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-lg font-semibold tracking-tight">{sec.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
                {sec.body}
              </p>
            </section>
          ))}

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
      ) : stage === "result" ? (
        <p className="text-sm text-black/60 dark:text-white/60">
          Fülle beide Profile vollständig aus und starte die Berechnung.
        </p>
      ) : null}
    </div>
  );
}
