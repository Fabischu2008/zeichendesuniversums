"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import type { AstroProfileResult, Element } from "@/lib/astro/profile";
import type { ZodiacSign } from "@/lib/astro/signs";
import type {
  DeepCompatibilityReport,
  SynastryReport,
} from "@/lib/astro/synastry";
import { useGeoPlaces, type GeoPlace } from "@/hooks/useGeoPlaces";
import { ToolFooterCta } from "@/components/ToolFooterCta";
import { VollreportCoachingCta } from "@/components/VollreportCoachingCta";
import { backLink, btnPrimary, eyebrow } from "@/lib/ui";

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

const SIGN_ICON_BY_SIGN: Record<string, string> = {
  Widder: "/Symbole/widder.svg",
  Stier: "/Symbole/stier.svg",
  Zwillinge: "/Symbole/zwilling.svg",
  Krebs: "/Symbole/krebs.svg",
  Löwe: "/Symbole/löwe.svg",
  Jungfrau: "/Symbole/jungfrau.svg",
  Waage: "/Symbole/waage.svg",
  Skorpion: "/Symbole/skorpio.svg",
  Schütze: "/Symbole/schuetze.svg",
  Steinbock: "/Symbole/steinbock.svg",
  Wassermann: "/Symbole/wassermann.svg",
  Fische: "/Symbole/fische.svg",
};

const ELEMENT_COLORS: Record<Element, string> = {
  Luft: "#facc15",
  Wasser: "#3b82f6",
  Erde: "#22c55e",
  Feuer: "#ef4444",
};

function signIconPath(sign: string): string | null {
  return SIGN_ICON_BY_SIGN[sign] ?? null;
}

const SIGN_RELATION_HINTS: Record<
  ZodiacSign,
  { strength: string; challenge: string }
> = {
  Widder: {
    strength: "bringt Initiative, Mut und direkte Bewegung in die Verbindung",
    challenge: "kann bei Druck schneller in Ungeduld oder Reaktivität kippen",
  },
  Stier: {
    strength: "bringt Stabilität, Verlässlichkeit und sinnliche Bindung",
    challenge: "kann bei Unsicherheit festhalten oder sich schwer umstellen",
  },
  Zwillinge: {
    strength: "bringt Leichtigkeit, Humor und flexible Kommunikation",
    challenge: "kann bei Überlastung springen statt vertiefen",
  },
  Krebs: {
    strength: "bringt emotionale Fürsorge und tiefe Bindungsbereitschaft",
    challenge: "kann Rückzug wählen, wenn Verletzlichkeit nicht sicher gehalten wird",
  },
  Löwe: {
    strength: "bringt Herz, Strahlkraft und großzügige Wärme",
    challenge: "kann bei fehlender Resonanz schnell in Stolz oder Drama gehen",
  },
  Jungfrau: {
    strength: "bringt Klarheit, Alltagstauglichkeit und hilfreiche Struktur",
    challenge: "kann in Kritik oder Perfektionsdruck rutschen",
  },
  Waage: {
    strength: "bringt Ausgleich, Diplomatie und Beziehungsorientierung",
    challenge: "kann Konflikte zu lange glätten statt klar zu benennen",
  },
  Skorpion: {
    strength: "bringt Tiefe, Loyalität und Transformationskraft",
    challenge: "kann bei Misstrauen kontrollierend oder extrem reagieren",
  },
  Schütze: {
    strength: "bringt Weite, Sinnorientierung und Optimismus",
    challenge: "kann Verbindlichkeit meiden, wenn Freiheit zu eng erlebt wird",
  },
  Steinbock: {
    strength: "bringt Verlässlichkeit, Reife und langfristigen Aufbau",
    challenge: "kann Gefühle zugunsten von Funktion zu stark kontrollieren",
  },
  Wassermann: {
    strength: "bringt Perspektivwechsel, Eigenständigkeit und Innovation",
    challenge: "kann emotional distanziert wirken, wenn Nähe eingefordert wird",
  },
  Fische: {
    strength: "bringt Empathie, Mitgefühl und intuitive Verbundenheit",
    challenge: "kann Grenzen verwischen oder Konflikte vermeiden",
  },
};

function elementMixFromProfile(profile: AstroProfileResult): Array<{ element: Element; value: number }> {
  const map = new Map<Element, number>();
  for (const item of profile.elementBalance) {
    map.set(item.element as Element, item.count);
  }
  return (["Feuer", "Erde", "Luft", "Wasser"] as Element[]).map((element) => ({
    element,
    value: map.get(element) ?? 0,
  }));
}

function SignChip({ label, sign }: { label: string; sign: string }) {
  const icon = signIconPath(sign);
  return (
    <div className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 dark:border-white/15 dark:bg-black/20">
      <p className="text-[9px] uppercase leading-tight tracking-[0.12em] text-black/50 dark:text-white/55">
        {label}
      </p>
      <div className="mt-1 flex min-w-0 items-center gap-2">
        {icon ? (
          <Image src={icon} alt={sign} width={18} height={18} className="h-[18px] w-[18px]" />
        ) : null}
        <span className="min-w-0 break-words text-sm font-semibold">{sign}</span>
      </div>
    </div>
  );
}

function ElementCircle({
  title,
  profile,
}: {
  title: string;
  profile: AstroProfileResult;
}) {
  const mix = elementMixFromProfile(profile);
  const total = Math.max(1, mix.reduce((sum, x) => sum + x.value, 0));
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  // Startwinkel jedes Segments als kumulative Länge der vorherigen Segmente.
  const segments = mix.reduce<
    { element: Element; length: number; start: number }[]
  >((acc, m) => {
    const previous = acc[acc.length - 1];
    const start = previous ? previous.start + previous.length : 0;
    acc.push({
      element: m.element,
      length: (m.value / total) * circumference,
      start,
    });
    return acc;
  }, []);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/15 dark:bg-black/20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60 dark:text-white/60">
        {title}
      </p>
      <div className="mt-3 flex items-center gap-4">
        <svg width="112" height="112" viewBox="0 0 112 112" className="shrink-0">
          <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="14" />
          {segments.map((segment) => (
            <circle
              key={`${title}-${segment.element}`}
              cx="56"
              cy="56"
              r={radius}
              fill="none"
              stroke={ELEMENT_COLORS[segment.element]}
              strokeWidth="14"
              strokeDasharray={`${segment.length} ${circumference - segment.length}`}
              strokeDashoffset={-segment.start}
              transform="rotate(-90 56 56)"
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="grid gap-1 text-xs">
          {mix.map((m) => (
            <div key={`${title}-${m.element}-legend`} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: ELEMENT_COLORS[m.element] }}
              />
              <span className="text-black/80 dark:text-white/80">{m.element}</span>
              <span className="tabular-nums text-black/50 dark:text-white/55">
                {Math.round((m.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

function dominantElementOf(profile: AstroProfileResult): Element {
  const top = [...profile.elementBalance].sort((a, b) => b.count - a.count)[0];
  return (top?.element as Element) ?? "Feuer";
}

function planetSign(profile: AstroProfileResult, key: "venus" | "mars"): string {
  return profile.planets.find((p) => p.key === key)?.sign ?? "Unbekannt";
}

function sharedCount(valuesA: string[], valuesB: string[]): number {
  let same = 0;
  for (let i = 0; i < Math.min(valuesA.length, valuesB.length); i += 1) {
    if (valuesA[i] === valuesB[i]) same += 1;
  }
  return same;
}

function CompatibilityOctagon({
  dimensions,
}: {
  dimensions?: DeepCompatibilityReport["dimensions"];
}) {
  const polesByKey: Record<
    string,
    {
      left: string;
      right: string;
    }
  > = {
    communication: { left: "Direktheit", right: "Feingefühl" },
    intimacy: { left: "Leidenschaft", right: "Sicherheit" },
    emotional: { left: "Nähe", right: "Autonomie" },
    trust: { left: "Verlässlichkeit", right: "Freiheit" },
    conflict: { left: "Konfrontation", right: "Deeskalation" },
    growth: { left: "Stabilität", right: "Wachstum" },
    purpose: { left: "Sinn", right: "Umsetzung" },
    longterm: { left: "Beständigkeit", right: "Erneuerung" },
  };

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
        className="h-auto w-full max-w-[380px]"
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
      <div className="grid w-full gap-3">
        {axes.map((d) => {
          const poles = polesByKey[d.key] ?? { left: "Pol A", right: "Pol B" };
          const rightValue = Math.max(0, Math.min(100, d.score));
          const leftValue = 100 - rightValue;
          return (
            <div
              key={d.key}
              className="rounded-xl border border-black/10 bg-white/70 px-4 py-3 dark:border-white/15 dark:bg-black/20"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/70 dark:text-white/70">
                {d.label}
              </p>
              <div className="mt-2 grid grid-cols-[minmax(0,1fr)_1fr_minmax(0,1fr)] items-center gap-2 text-[11px]">
                <div className="min-w-0 text-left">
                  <p className="font-medium text-black/80 dark:text-white/80">{poles.left}</p>
                  <p className="tabular-nums text-black/55 dark:text-white/55">{leftValue}%</p>
                </div>
                <div className="relative h-2 rounded-full bg-black/10 dark:bg-white/15">
                  <div
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-violet-700 bg-violet-500 shadow-sm dark:border-violet-300 dark:bg-violet-400"
                    style={{ left: `calc(${rightValue}% - 8px)` }}
                  />
                </div>
                <div className="min-w-0 text-right">
                  <p className="font-medium text-black/80 dark:text-white/80">{poles.right}</p>
                  <p className="tabular-nums text-black/55 dark:text-white/55">{rightValue}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function dimensionAnalysisText(
  key: string,
  score: number,
): { headline: string; text: string } {
  const poles = {
    communication: { left: "Direktheit", right: "Feingefühl" },
    intimacy: { left: "Leidenschaft", right: "Sicherheit" },
    emotional: { left: "Nähe", right: "Autonomie" },
    trust: { left: "Verlässlichkeit", right: "Freiheit" },
    conflict: { left: "Konfrontation", right: "Deeskalation" },
    growth: { left: "Stabilität", right: "Wachstum" },
    purpose: { left: "Sinn", right: "Umsetzung" },
    longterm: { left: "Beständigkeit", right: "Erneuerung" },
  } as const;
  const fallbackPoles = { left: "Pol A", right: "Pol B" };
  const p = poles[key as keyof typeof poles] ?? fallbackPoles;
  const rightValue = Math.max(0, Math.min(100, score));
  const leftValue = 100 - rightValue;
  const balanceText =
    Math.abs(rightValue - leftValue) <= 12
      ? `ausgewogene Balance zwischen ${p.left} und ${p.right}`
      : rightValue > leftValue
        ? `klarer Schwerpunkt auf ${p.right}`
        : `klarer Schwerpunkt auf ${p.left}`;
  const base = `${leftValue}% ${p.left} · ${rightValue}% ${p.right} – ${balanceText}.`;

  switch (key) {
    case "communication":
      return {
        headline: "Kommunikation",
        text: `${base} Führt Gespräche in zwei Schritten: erst Position klar benennen, dann aktiv rückspiegeln, was angekommen ist.`,
      };
    case "intimacy":
      return {
        headline: "Anziehung",
        text: `${base} Bei euch wirkt Intimität am stärksten, wenn Spannung und Verbindlichkeit gemeinsam gepflegt werden.`,
      };
    case "emotional":
      return {
        headline: "Emotionale Sicherheit",
        text: `${base} Legt fest, wie ihr in Trigger-Momenten reagiert: kurze Pause, dann Rückkehr mit klarer Sprache statt Rückzug.`,
      };
    case "trust":
      return {
        headline: "Vertrauen",
        text: `${base} Vertrauen wächst dort, wo Erwartungen explizit sind und Freiheit nicht als Distanz missverstanden wird.`,
      };
    case "conflict":
      return {
        headline: "Konfliktkompetenz",
        text: `${base} Hilfreich sind klare Konfliktregeln: kein Unterbrechen, ein Thema pro Runde und bewusste Reparatur nach Reibung.`,
      };
    case "growth":
      return {
        headline: "Entwicklungspotenzial",
        text: `${base} Setzt euch monatlich ein gemeinsames Lernziel, damit Entwicklung nicht nur zufällig über Reibung passiert.`,
      };
    case "purpose":
      return {
        headline: "Vision/Meaning",
        text: `${base} Eine kurze Werte-Klärung pro Quartal hilft, Sinn und konkrete Umsetzung synchron zu halten.`,
      };
    case "longterm":
      return {
        headline: "Langfristigkeit",
        text: `${base} Am tragfähigsten ist ein Mix aus stabilen Ritualen und geplanter Erneuerung statt starrem Entweder-oder.`,
      };
    default:
      return {
        headline: "Dimension",
        text: "Diese Achse beschreibt einen relevanten Bereich eurer Paardynamik.",
      };
  }
}

export default function CompatibilityToolPage() {
  const [stage, setStage] = useState<FunnelStage>("exact");
  const [a, setA] = useState<PersonForm>(emptyPerson);
  const [b, setB] = useState<PersonForm>(emptyPerson);

  const geoA = useGeoPlaces(a.query);
  const geoB = useGeoPlaces(b.query);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  async function calculateCompatibility() {
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/tools/synastry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          a: {
            date: a.birthdate,
            time: a.birthtime,
            location: {
              name: a.place?.city || a.place?.label,
              lat: a.place?.lat,
              lon: a.place?.lon,
              countryCode: a.place?.countryCode,
            },
          },
          b: {
            date: b.birthdate,
            time: b.birthtime,
            location: {
              name: b.place?.city || b.place?.label,
              lat: b.place?.lat,
              lon: b.place?.lon,
              countryCode: b.place?.countryCode,
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
          big3?: { sun: string; moon: string; ascendant: string };
        };
        b?: {
          profile?: AstroProfileResult;
          big3?: { sun: string; moon: string; ascendant: string };
        };
        message?: string;
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
          data.message ||
            `Paaranalyse konnte nicht berechnet werden (HTTP ${res.status}).`,
        );
      }
      setReport({
        synastry: data.synastry,
        deepComparison: data.deepComparison,
        a: { profile: data.a.profile, big3: data.a.big3 },
        b: { profile: data.b.profile, big3: data.b.big3 },
      });
      setStage("result");
      router.replace("/tools/compatibility#paaranalyse");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Paaranalyse konnte nicht berechnet werden.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-none space-y-8 px-2 sm:px-4 lg:mx-auto lg:max-w-[1200px] lg:px-8">
      <Link href="/tools" className={backLink}>
        ← Zur Themenwahl
      </Link>
      <header className="space-y-4">
        <p className={eyebrow}>Tool · Paaranalyse</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Eure vollständige Synastrie
        </h1>
        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
          Für Partnerschaft, Dating oder enge Freundschaft: gib beide
          Geburtsprofile ein und berechne eure komplette Paaranalyse – kostenlos,
          ohne Vorschau- oder Bezahl-Schritt.
        </p>
      </header>


      {stage === "exact" ? (
        <>
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
              onClick={() => void calculateCompatibility()}
              className={`${btnPrimary} w-full sm:w-auto`}
            >
              {loading ? "Berechne Paaranalyse…" : "Kostenlose Paaranalyse berechnen"}
            </button>
          </div>
        </>
      ) : null}

      {error ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      {report ? (
        <div
          id="ergebnis"
          aria-live="polite"
          className="-mx-1 space-y-6 sm:mx-0 sm:space-y-8"
        >
          <section className="rounded-2xl border border-black/5 bg-white/70 p-4 sm:rounded-3xl sm:p-8 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Große Analyse · Profile
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Eure Vollprofile im Überblick
            </h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Genau wie im ersten Tool: erst beide Profile sichtbar, dann daraus die
              Vergleichsanalyse.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-black/60 dark:text-white/60">
              Warum diese Übersicht: Big 3 für Grundmuster, Venus/Mars für
              Bindung und Sexualdynamik, Elemente für den emotionalen
              Grundrhythmus und Hausfokus für konkrete Beziehungsthemen im
              Alltag.
            </p>
            {(() => {
              const big3A = [report.a.big3.sun, report.a.big3.moon, report.a.big3.ascendant];
              const big3B = [report.b.big3.sun, report.b.big3.moon, report.b.big3.ascendant];
              const big3Same = sharedCount(big3A, big3B);
              const domA = dominantElementOf(report.a.profile);
              const domB = dominantElementOf(report.b.profile);
              const venusA = planetSign(report.a.profile, "venus");
              const venusB = planetSign(report.b.profile, "venus");
              const marsA = planetSign(report.a.profile, "mars");
              const marsB = planetSign(report.b.profile, "mars");
              const housesA = [...report.a.profile.houseFocus].sort((a, b) => b.count - a.count).slice(0, 2);
              const housesB = [...report.b.profile.houseFocus].sort((a, b) => b.count - a.count).slice(0, 2);
              const vmAspects = report.synastry.aspects.filter(
                (a) =>
                  (a.planetA === "venus" && a.planetB === "mars") ||
                  (a.planetA === "mars" && a.planetB === "venus"),
              );
              return (
                <div className="mt-5 space-y-4">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                      Profilvergleich A ↔ B
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-black/55 dark:text-white/55">
                      Sonne · Mond · Aszendent
                    </p>
                    <div className="mt-2 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/20">
                        <p className="text-sm font-semibold">Person A</p>
                        <p className="mt-1 text-xs text-black/60 dark:text-white/60">{report.a.profile.archetype.title}</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          <SignChip label="Sonne" sign={report.a.big3.sun} />
                          <SignChip label="Mond" sign={report.a.big3.moon} />
                          <SignChip label="Aszendent" sign={report.a.big3.ascendant} />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/20">
                        <p className="text-sm font-semibold">Person B</p>
                        <p className="mt-1 text-xs text-black/60 dark:text-white/60">{report.b.profile.archetype.title}</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          <SignChip label="Sonne" sign={report.b.big3.sun} />
                          <SignChip label="Mond" sign={report.b.big3.moon} />
                          <SignChip label="Aszendent" sign={report.b.big3.ascendant} />
                        </div>
                      </div>
                    </div>
                    <article className="mt-3 rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 to-white p-4 dark:border-amber-300/20 dark:from-amber-500/15 dark:to-white/5">
                      <p className="text-sm font-semibold">☉☽ ↗ Analyse zu Sonne, Mond, Aszendent</p>
                      <p className="mt-2 text-sm text-black/75 dark:text-white/75">
                        {big3Same === 3
                          ? "Sehr ähnliche Grundwahrnehmung; achtet auf gemeinsame blinde Flecken."
                          : big3Same >= 1
                            ? "Teilweise gemeinsame Basis, teilweise Ergänzung durch Unterschiede."
                            : "Starke Ergänzungskraft durch unterschiedliche Grundmuster."}
                      </p>
                      <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                        <span className="font-semibold">Bedeutung:</span> Sonne zeigt Richtung und Ich-Kern, Mond zeigt emotionale Bedürfnisse, Aszendent zeigt Auftreten und erste Reaktion im Kontakt.
                      </p>
                      <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                        <span className="font-semibold">Praxis:</span> Klärt bei Konflikten zuerst Ebene 1 (Sonne: Ziel), dann Ebene 2 (Mond: Gefühl), dann Ebene 3 (Aszendent: Ton/Verhalten).
                      </p>
                    </article>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-black/55 dark:text-white/55">
                      Venus · Mars
                    </p>
                    <div className="mt-2 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/20">
                        <p className="text-sm font-semibold">Person A</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <SignChip label="Venus · weiblich · langfristig" sign={venusA} />
                          <SignChip label="Mars · männlich · sexuell" sign={marsA} />
                        </div>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {housesA.map((h) => (
                            <div key={`a-house-${h.house}`} className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 text-xs dark:border-white/10 dark:bg-white/10">
                              <p className="font-semibold">Haus {h.house}</p>
                              <p className="mt-0.5 text-black/65 dark:text-white/65">{h.theme}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/20">
                        <p className="text-sm font-semibold">Person B</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <SignChip label="Venus · weiblich · langfristig" sign={venusB} />
                          <SignChip label="Mars · männlich · sexuell" sign={marsB} />
                        </div>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {housesB.map((h) => (
                            <div key={`b-house-${h.house}`} className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 text-xs dark:border-white/10 dark:bg-white/10">
                              <p className="font-semibold">Haus {h.house}</p>
                              <p className="mt-0.5 text-black/65 dark:text-white/65">{h.theme}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <article className="mt-3 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-white p-4 dark:border-violet-300/20 dark:from-violet-500/15 dark:to-white/5">
                      <p className="text-sm font-semibold">♀ ♂ Analyse zu Venus & Mars</p>
                      <p className="mt-2 text-sm text-black/75 dark:text-white/75">
                        Venus beschreibt Bindungsstil, Werte und Außenwirkung in Beziehung. Mars beschreibt Initiative, Führung, Begehren und Sexualimpuls.
                      </p>
                      <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                        {vmAspects.length > 0
                          ? `Direkte Venus-Mars-Achse aktiv (${vmAspects.map((a) => a.aspectLabelDe).join(", ")}).`
                          : "Keine direkte Venus-Mars-Hauptachse im klassischen Orb; die Dynamik läuft stärker indirekt über andere Aspekte."}
                      </p>
                      <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                        <span className="font-semibold">Praxis:</span> Trennt bewusst „Was gibt Sicherheit und Nähe?“ (Venus) von „Wie wird Wunsch/Führung/Sexualität ausgedrückt?“ (Mars), damit beides gleichwertig Raum bekommt.
                      </p>
                    </article>
                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      <ElementCircle title="Elemente · Person A" profile={report.a.profile} />
                      <ElementCircle title="Elemente · Person B" profile={report.b.profile} />
                    </div>
                    <article className="mt-4 rounded-2xl border border-sky-500/25 bg-gradient-to-br from-sky-500/10 to-white p-4 dark:border-sky-300/20 dark:from-sky-500/15 dark:to-white/5">
                      <p className="text-sm font-semibold">◌ Analyse zu den Elementen</p>
                      <p className="mt-2 text-sm text-black/75 dark:text-white/75">
                        Dominant: A {domA} · B {domB}
                      </p>
                      <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                        {domA === domB
                          ? "Gleiches Element fördert natürlichen Flow und ähnliches Beziehungstempo."
                          : "Unterschiedliche Elemente bringen Ergänzung und verlangen klare Abstimmung bei Nähe, Rückzug und Entscheidungen."}
                      </p>
                      <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                        <span className="font-semibold">Praxis:</span> Nutzt euer dominantes Element als Stärke und plant gezielt Ausgleich über das Gegen-Element (z. B. bei viel Feuer bewusst Struktur durch Erde).
                      </p>
                    </article>
                  </div>
                </div>
              );
            })()}
          </section>

          <section className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-emerald-500/10 p-3 sm:rounded-3xl sm:p-6 lg:p-8 dark:border-violet-400/20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Große Analyse · Vergleich
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

          <section className="rounded-2xl border border-black/5 bg-white/80 p-3 sm:rounded-3xl sm:p-6 lg:p-8 dark:border-white/10 dark:bg-white/5">
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
                    <p className="text-sm font-semibold">{a.headline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-black/75 dark:text-white/75">
                      {a.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-sky-500/10 p-3 sm:rounded-3xl sm:p-6 lg:p-8 dark:from-violet-500/15 dark:to-sky-500/10">
            {(() => {
              const harmonic = report.synastry.aspects.filter((a) => a.tone === "harmonisch").length;
              const challenging = report.synastry.aspects.filter(
                (a) => a.tone === "herausfordernd",
              ).length;
              const mixed = report.synastry.aspects.filter((a) => a.tone === "gemischt").length;
              const sunA = report.a.big3.sun as ZodiacSign;
              const sunB = report.b.big3.sun as ZodiacSign;
              const hintA = SIGN_RELATION_HINTS[sunA];
              const hintB = SIGN_RELATION_HINTS[sunB];
              const leftRaw = harmonic + mixed * 0.5;
              const rightRaw = challenging + mixed * 0.5;
              const total = Math.max(1, leftRaw + rightRaw);
              const flowPercent = Math.round((leftRaw / total) * 100);
              const growthPercent = 100 - flowPercent;
              return (
                <>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Harmonie-Dynamik
                      </h2>
                      <p className="mt-1 text-sm text-black/65 dark:text-white/65">
                        Zwei Pole statt Bewertung: Wie viel wirkt gerade eher fließend, wie
                        viel als Entwicklungs-Reibung.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/15 dark:bg-black/20">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/70 dark:text-white/70">
                      Polarität
                    </p>
                    <div className="mt-3">
                      <div className="mb-2 flex items-end justify-between text-[11px]">
                        <div>
                          <p className="font-medium text-black/80 dark:text-white/80">
                            Leichtigkeit &amp; Flow
                          </p>
                          <p className="tabular-nums text-black/55 dark:text-white/55">
                            {flowPercent}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-black/80 dark:text-white/80">
                            Reibung &amp; Wachstum
                          </p>
                          <p className="tabular-nums text-black/55 dark:text-white/55">
                            {growthPercent}%
                          </p>
                        </div>
                      </div>
                      <div className="relative h-3 rounded-full bg-violet-500/45">
                        <div
                          className="absolute top-0 h-full w-px bg-white/70 dark:bg-black/55"
                          style={{ left: `${flowPercent}%` }}
                        />
                        <div
                          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-violet-700 bg-violet-500 shadow-sm dark:border-violet-300 dark:bg-violet-400"
                          style={{ left: `calc(${flowPercent}% - 10px)` }}
                        />
                      </div>
                    </div>
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
                  <div className="mt-4 space-y-3 text-sm text-black/75 dark:text-white/75">
                    <p>
                      <strong>Sonnenzeichen:</strong> {sunA} trifft auf {sunB}.{" "}
                      {sunA === sunB
                        ? "Gleiche Grundenergie bringt schnelle Lesbarkeit und viel gemeinsames Tempo."
                        : "Unterschiedliche Grundenergien bringen Ergänzung, wenn ihr Tempo und Prioritäten bewusst abstimmt."}
                    </p>
                    {sunA === sunB ? (
                      <p>
                        <strong>{sunA}:</strong> {hintA.strength}; gleichzeitig {hintA.challenge}.
                      </p>
                    ) : (
                      <>
                        <p>
                          <strong>{sunA}:</strong> {hintA.strength}; gleichzeitig {hintA.challenge}.
                        </p>
                        <p>
                          <strong>{sunB}:</strong> {hintB.strength}; gleichzeitig {hintB.challenge}.
                        </p>
                      </>
                    )}
                    <p>
                      <strong>Synastry-Basis:</strong> {report.synastry.aspects.length} markante
                      Hauptaspekte zwischen Sonne, Mond, Merkur, Venus, Mars, Jupiter und Saturn.
                      {` `}Die stärksten Dynamiken seht ihr in den Vergleichsblöcken darunter.
                    </p>
                    <p>{report.synastry.chemistryLine}</p>
                  </div>
                </>
              );
            })()}
          </section>

          <VollreportCoachingCta context="relationship" />
        </div>
      ) : null}

      <ToolFooterCta />
    </div>
  );
}
