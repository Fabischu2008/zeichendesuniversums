import Link from "next/link";
import { SITE_NAME } from "@/lib/brand";

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

        <div className="mt-8 border-t border-black/5 pt-6 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">
            © {year} {SITE_NAME}. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

