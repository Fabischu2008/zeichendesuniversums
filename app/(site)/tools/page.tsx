import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Compatibility und Birth Chart Tools – mit Upsell in die Vollanalyse.",
};

const tools = [
  {
    title: "Compatibility Tool",
    description: "Wähle 2 Sternzeichen und bekomme ein Teaser-Ergebnis.",
    href: "/tools/compatibility",
  },
  {
    title: "Birth Chart Tool (Big 3)",
    description: "Sonne, Mond und Aszendent – exakt berechnet (DACH).",
    href: "/tools/birth-chart",
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Tools
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Schnell testen, sofort Value bekommen – und bei Bedarf freischalten.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-3xl border border-black/5 bg-white/60 p-6 transition hover:-translate-y-0.5 hover:shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
          >
            <h2 className="text-2xl font-semibold tracking-tight">{t.title}</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              {t.description}
            </p>
            <p className="mt-6 text-sm font-medium underline-offset-4 hover:underline">
              Öffnen →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

