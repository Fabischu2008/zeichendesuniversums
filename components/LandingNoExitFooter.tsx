import Link from "next/link";
import { SITE_NAME } from "@/lib/brand";
import { LEGAL_PROVIDER } from "@/lib/legal";

const LEGAL_LINKS = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Widerruf", href: "/widerruf" },
] as const;

export function LandingNoExitFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/5 bg-gradient-to-b from-violet-500/[0.06] via-transparent to-transparent dark:border-white/10 dark:from-violet-500/10">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
              Bereit?
            </p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Gib deine Daten ein und berechne deine Big 3 direkt im Funnel.
            </p>
          </div>

          <Link
            href="#daten-eingeben"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600"
          >
            Big 3 jetzt berechnen
          </Link>
        </div>

        <div className="mt-8 grid gap-6 border-t border-black/5 pt-6 sm:grid-cols-2 dark:border-white/10">
          <div className="space-y-1 text-xs text-black/55 dark:text-white/55">
            <p className="font-medium text-black/70 dark:text-white/70">
              {SITE_NAME}
            </p>
            <p>{LEGAL_PROVIDER.name}</p>
            <p>
              {LEGAL_PROVIDER.street} · {LEGAL_PROVIDER.zipCity} ·{" "}
              {LEGAL_PROVIDER.country}
            </p>
            <p>
              <a
                href={`mailto:${LEGAL_PROVIDER.email}`}
                className="underline-offset-2 hover:underline"
              >
                {LEGAL_PROVIDER.email}
              </a>
            </p>
          </div>

          <nav
            aria-label="Rechtliches"
            className="flex flex-wrap items-start gap-x-4 gap-y-2 text-xs text-black/60 sm:justify-end dark:text-white/60"
          >
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline-offset-2 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-xs text-black/45 dark:text-white/45">
          © {year} {SITE_NAME}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
