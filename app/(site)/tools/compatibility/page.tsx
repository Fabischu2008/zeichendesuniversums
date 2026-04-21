"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ELEMENT_BY_SIGN, type AstroProfileResult, type Element } from "@/lib/astro/profile";
import {
  ZODIAC_SIGNS,
  type ZodiacSign,
} from "@/lib/astro/signs";
import type {
  DeepCompatibilityReport,
  SynastryReport,
} from "@/lib/astro/synastry";
import { useGeoPlaces, type GeoPlace } from "@/hooks/useGeoPlaces";
import {
  PRICE_COMPAT_PAARANALYSE,
  PRODUCT_ID_COMPAT_PAARANALYSE,
} from "@/lib/cms";
import { readUnlockTokenFromBrowser } from "@/lib/profile-unlock-url";
import type { CheckoutAstroPayload } from "@/lib/stripe/create-checkout-session";
import { VollreportCoachingCta } from "@/components/VollreportCoachingCta";

function formatPaarPriceEur(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

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
  let offset = 0;
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/15 dark:bg-black/20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60 dark:text-white/60">
        {title}
      </p>
      <div className="mt-3 flex items-center gap-4">
        <svg width="112" height="112" viewBox="0 0 112 112" className="shrink-0">
          <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="14" />
          {mix.map((m) => {
            const len = (m.value / total) * circumference;
            const dashArray = `${len} ${circumference - len}`;
            const dashOffset = -offset;
            offset += len;
            return (
              <circle
                key={`${title}-${m.element}`}
                cx="56"
                cy="56"
                r={radius}
                fill="none"
                stroke={ELEMENT_COLORS[m.element]}
                strokeWidth="14"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 56 56)"
                strokeLinecap="butt"
              />
            );
          })}
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

function personFormToCheckoutPayload(
  form: PersonForm,
): CheckoutAstroPayload | null {
  if (
    !form.place ||
    !/^\d{4}-\d{2}-\d{2}$/.test(form.birthdate) ||
    !/^\d{2}:\d{2}$/.test(form.birthtime)
  ) {
    return null;
  }
  return {
    birthdate: form.birthdate,
    birthtime: form.birthtime,
    place: {
      id: form.place.id,
      label: form.place.label,
      city: form.place.city,
      country: form.place.country,
      countryCode: form.place.countryCode,
      lat: form.place.lat,
      lon: form.place.lon,
    },
  };
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
  const venusSign = profile.planets.find((p) => p.key === "venus")?.sign ?? "Unbekannt";
  const marsSign = profile.planets.find((p) => p.key === "mars")?.sign ?? "Unbekannt";
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
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <SignChip label="Sonne" sign={big3.sun} />
        <SignChip label="Mond" sign={big3.moon} />
        <SignChip label="Aszendent" sign={big3.ascendant} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <SignChip label="Venus · weiblich · langfristig" sign={venusSign} />
        <SignChip label="Mars · männlich · sexuell" sign={marsSign} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <p className="sm:col-span-2 text-[11px] leading-relaxed text-black/55 dark:text-white/55">
          Hausfokus zeigt, in welchen Lebensbereichen eure Beziehung am meisten
          Energie, Reibung und Entwicklung aktiviert.
        </p>
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
  const [stage, setStage] = useState<FunnelStage>("preview");
  const [previewA, setPreviewA] = useState<ZodiacSign>("Widder");
  const [previewB, setPreviewB] = useState<ZodiacSign>("Waage");
  const [miniPreviewReady, setMiniPreviewReady] = useState(false);
  const [a, setA] = useState<PersonForm>(emptyPerson);
  const [b, setB] = useState<PersonForm>(emptyPerson);

  const geoA = useGeoPlaces(a.query);
  const geoB = useGeoPlaces(b.query);

  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
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

  async function goToCompatCheckout() {
    if (!canSubmit) return;
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const pa = personFormToCheckoutPayload(a);
      const pb = personFormToCheckoutPayload(b);
      if (!pa || !pb) {
        throw new Error(
          "Bitte für beide Personen Datum, Uhrzeit und Ort vollständig ausfüllen.",
        );
      }
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productId: PRODUCT_ID_COMPAT_PAARANALYSE,
          compat: { a: pa, b: pb },
        }),
      });
      const raw = await res.text();
      const parsed = safeJsonParse(raw);
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
        url?: string;
        message?: string;
      };
      if (!res.ok || !data.url) {
        throw new Error(
          data.message ||
            `Checkout konnte nicht gestartet werden (HTTP ${res.status}).`,
        );
      }
      window.location.href = data.url;
    } catch (e) {
      setCheckoutError(
        e instanceof Error ? e.message : "Checkout konnte nicht gestartet werden.",
      );
    } finally {
      setCheckoutLoading(false);
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
    <div className="w-full max-w-none space-y-8 px-2 sm:px-4 lg:mx-auto lg:max-w-[1200px] lg:px-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Paaranalyse &amp; Kompatibilität (Synastry)
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Für Partnerschaft, Dating oder enge Freundschaft: astrologische
          Kompatibilität als echte Synastry – also wie sich zwei Horoskope
          begegnen, nicht nur zwei Sternzeichen. Zwei Geburtsprofile mit
          echten Planetenlagen und Aspekt-Analyse (Sonne bis Saturn). Kein
          Zufalls-Score mehr.
        </p>
      </header>

      {stage === "preview" ? (
        <section className="rounded-3xl border border-black/5 bg-white/70 p-4 sm:p-6 lg:p-8 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Schritt 2 · Kleine Analyse
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
                    Schritt 3 · Große Analyse
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    So sieht die vollständige Paaranalyse aus
                  </h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                    Kein Rätselraten mehr: In der Vollversion werden beide Horoskope
                    vollständig berechnet und dann glasklar verglichen
                    (Aspekte, Dimensionen, Profiltexte).
                  </p>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-black/10 bg-white/90 p-4 dark:border-white/10 dark:bg-black/20">
                      <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
                        Profilvergleich (A/B)
                      </p>
                      <p className="mt-2 text-sm font-medium text-black/45 dark:text-white/50">
                        Wer bringt was in die Beziehung? · Demo
                      </p>
                      <p className="mt-1 text-xs text-black/55 dark:text-white/55">
                        In der exakten Analyse siehst du Big 3, Hausfokus, Narrative
                        und die echten Unterschiede zwischen Person A und B.
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
                      <p className="mt-2 text-xs text-black/55 dark:text-white/55">
                        Auf einen Blick: wo ihr stark harmoniert und wo ihr bewusst
                        nachschärfen solltet.
                      </p>
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
                    <p className="mt-2 text-xs text-black/55 dark:text-white/55">
                      Das ist der Kern: konkrete astrologische Verbindungspunkte statt
                      oberflächlicher Standardtexte.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-6">
                    <div className="rounded-2xl border border-black/8 bg-white/90 p-4 dark:border-white/10 dark:bg-black/20">
                      <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
                        Im kostenlosen Vorgeschmack
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-black/75 dark:text-white/75">
                        <li className="flex gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                          Schneller Mini-Eindruck auf Basis Sternzeichen
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                          Demo-Vorschau der großen Paaranalyse
                        </li>
                        <li className="flex gap-2">
                          <span className="text-black/35 dark:text-white/35">—</span>
                          Keine exakten A/B-Profile, keine personalisierten Aspekttexte
                        </li>
                      </ul>
                    </div>
                    <div
                      className="rounded-2xl border border-violet-500/30 bg-violet-500/[0.08] p-4 dark:border-violet-400/25 dark:bg-violet-500/10"
                      data-product={PRODUCT_ID_COMPAT_PAARANALYSE}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-violet-900 dark:text-violet-100">
                        Exakte Paaranalyse
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-black/85 dark:text-white/85">
                        <li className="flex gap-2">
                          <span className="text-violet-700 dark:text-violet-300">✓</span>
                          Vollprofil für Person A und B (inkl. Planeten + Häuser)
                        </li>
                        <li className="flex gap-2">
                          <span className="text-violet-700 dark:text-violet-300">✓</span>
                          Komplettes Oktagon + Klartext-Analyse je Dimension
                        </li>
                        <li className="flex gap-2">
                          <span className="text-violet-700 dark:text-violet-300">✓</span>
                          Persönliche Zugangslinks (Paaranalyse + beide Einzelprofile)
                        </li>
                      </ul>
                      <p className="mt-4 text-2xl font-semibold tracking-tight text-violet-950 dark:text-violet-50">
                        {formatPaarPriceEur(PRICE_COMPAT_PAARANALYSE)}{" "}
                        <span className="text-sm font-normal text-black/50 dark:text-white/50">
                          einmalig
                        </span>
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-black/55 dark:text-white/55">
                        Nach der Zahlung erhältst du drei persönliche Links – Paaranalyse
                        und beide Einzelprofile.
                      </p>
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
              disabled={!canSubmit || checkoutLoading}
              onClick={() => void goToCompatCheckout()}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {checkoutLoading
                ? "Weiter zu Stripe…"
                : `Bezahlen & Links erhalten · ${formatPaarPriceEur(PRICE_COMPAT_PAARANALYSE)}`}
            </button>
            <button
              type="button"
              onClick={() => setStage("preview")}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Zurück zum Vorgeschmack
            </button>
          </div>
          {checkoutError ? (
            <p className="text-sm text-red-600 dark:text-red-400">{checkoutError}</p>
          ) : null}
        </>
      ) : null}

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {report ? (
        <div className="-mx-1 space-y-6 sm:mx-0 sm:space-y-8">
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
          <section className="rounded-3xl border border-black/10 bg-white/80 p-3 sm:p-4 dark:border-white/10 dark:bg-black/20">
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
                  </section>
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
                    <div className="mt-2 grid grid-cols-[minmax(0,1fr)_1fr_minmax(0,1fr)] items-center gap-2 text-[11px]">
                      <div className="min-w-0 text-left">
                        <p className="font-medium text-black/80 dark:text-white/80">
                          Leichtigkeit &amp; Flow
                        </p>
                        <p className="tabular-nums text-black/55 dark:text-white/55">
                          {flowPercent}%
                        </p>
                      </div>
                      <div className="relative h-2 rounded-full bg-black/10 dark:bg-white/15">
                        <div
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-violet-700 bg-violet-500 shadow-sm dark:border-violet-300 dark:bg-violet-400"
                          style={{ left: `calc(${growthPercent}% - 8px)` }}
                        />
                      </div>
                      <div className="min-w-0 text-right">
                        <p className="font-medium text-black/80 dark:text-white/80">
                          Reibung &amp; Wachstum
                        </p>
                        <p className="tabular-nums text-black/55 dark:text-white/55">
                          {growthPercent}%
                        </p>
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
                  <p className="mt-4 text-sm text-black/70 dark:text-white/70">
                    {report.synastry.chemistryLine}
                  </p>
                </>
              );
            })()}
          </section>

          <VollreportCoachingCta />
        </div>
      ) : null}

      {stage === "preview" ? (
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
      ) : null}
    </div>
  );
}
