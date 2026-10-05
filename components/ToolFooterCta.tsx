import Link from "next/link";
import { btnPrimary, btnSecondary } from "@/lib/ui";

/**
 * Einheitlicher Abschluss unter jedem Tool: ein Weg zurück in den Funnel,
 * egal ob jemand gerechnet hat oder nicht.
 */
export function ToolFooterCta({
  title = "Nächster Schritt",
  description = "Egal ob du gerechnet hast oder nur geschaut – hier geht es weiter.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="rounded-3xl border border-black/5 bg-black/[0.02] px-5 py-7 text-center dark:border-white/10 dark:bg-white/[0.03] sm:px-8 sm:py-8">
      <p className="text-sm font-semibold text-black/80 dark:text-white/80">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-black/60 dark:text-white/60">
        {description}
      </p>
      <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
        <Link href="/freebie-auswahl" className={`${btnSecondary} h-11 px-4`}>
          Kostenloser Guide
        </Link>
        <Link href="/reading" className={`${btnSecondary} h-11 px-4`}>
          Persönliches Reading
        </Link>
        <Link href="/tools" className={`${btnPrimary} h-11 px-4`}>
          Weitere Tools
        </Link>
      </div>
    </section>
  );
}
