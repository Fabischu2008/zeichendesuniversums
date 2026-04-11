import Link from "next/link";
import type { AstroProfileResult } from "@/lib/astro/profile";
import {
  checkoutHrefForProduct,
  PRICE_ASTRO_VOLLPROFIL,
  PRODUCT_ID_ASTRO_VOLLPROFIL,
} from "@/lib/cms";

export function AstroProfileTeaser({
  profile,
  variant = "embedded",
}: {
  profile: AstroProfileResult;
  variant?: "embedded" | "page";
}) {
  const price = PRICE_ASTRO_VOLLPROFIL;
  const pad = variant === "page" ? "p-6 sm:p-8" : "p-4 sm:p-5";
  const checkoutHref = checkoutHrefForProduct(PRODUCT_ID_ASTRO_VOLLPROFIL);
  const intro = profile.elementAnalysis.intro.slice(0, 280);
  const truncated =
    profile.elementAnalysis.intro.length > 280
      ? `${intro.trim()}…`
      : profile.elementAnalysis.intro;

  return (
    <div className="space-y-6">
      <section
        className={`rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 ${pad} dark:border-white/10`}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
          Astro-Archetyp · Vorschau
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {profile.archetype.title}
        </h2>
        <p className="mt-2 text-sm text-black/75 dark:text-white/75">
          {profile.archetype.subtitle}
        </p>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          {profile.meta.model}
        </p>
      </section>

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-lg font-semibold tracking-tight">Elemente – Auszug</h3>
        <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
          {truncated}
        </p>
        <p className="mt-4 text-sm font-medium text-black/60 dark:text-white/60">
          Vollständige Element-Analyse, Häuser, Planeten, Knoten &amp; Narrative
          sind im Vollprofil enthalten.
        </p>
      </section>

      <section
        className={`rounded-3xl border border-violet-500/30 bg-violet-500/[0.08] ${pad} dark:border-violet-400/25 dark:bg-violet-500/10`}
      >
        <p className="text-sm font-medium text-violet-950 dark:text-violet-50">
          Vollreport freischalten ({price} € einmalig)
        </p>
        <p className="mt-2 text-sm text-black/75 dark:text-white/75">
          Nach dem Kauf speichern wir dein Profil in diesem Browser und du kannst
          die komplette Auswertung unter „Dein Profil“ jederzeit wieder öffnen.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={checkoutHref}
            className="inline-flex h-12 min-w-[200px] flex-1 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Jetzt zahlen &amp; freischalten
          </Link>
        </div>
      </section>
    </div>
  );
}
