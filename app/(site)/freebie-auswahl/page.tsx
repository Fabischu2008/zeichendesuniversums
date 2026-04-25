import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kostenlos starten",
  description:
    "Waehle dein passendes Freebie: Sternzeichen-Guide oder Beziehungs-PDF.",
};

const freebies = [
  {
    title: "Sternzeichen-Freebie",
    body: "Dein kompakter Guide zu Persoenlichkeit, Staerken und Mustern im Alltag.",
    href: "/sternzeichen",
    cta: "Sternzeichen-Landingpage oeffnen",
    imageDesktop: "/images/freebie_hintergrund.PNG",
    imageMobile: "/images/freebie_handy.png",
  },
  {
    title: "Beziehungs-Freebie",
    body: "Impulse zu Naehe, Kommunikation und Dynamik fuer Dating und Partnerschaft.",
    href: "/freebie_beziehung",
    cta: "Beziehungs-Freebie oeffnen",
    imageDesktop: "/images/beziehung_hintergrund.PNG",
    imageMobile: "/images/beziehung_handy.png",
  },
] as const;

export default function FreebieAuswahlPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
          Kostenlos starten
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Waehle den Freebie-Start, der zu dir passt
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Beide Guides sind kostenlos und sofort verfuegbar. Waehle deinen Fokus
          und starte direkt.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {freebies.map((freebie) => (
          <Link
            key={freebie.href}
            href={freebie.href}
            className="group relative isolate overflow-hidden rounded-3xl border border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 dark:border-white/15"
          >
            <div className="relative min-h-[340px]">
              <Image
                src={freebie.imageMobile}
                alt={`${freebie.title} Hintergrund mobil`}
                fill
                sizes="100vw"
                className="object-cover object-center sm:hidden"
              />
              <Image
                src={freebie.imageDesktop}
                alt={`${freebie.title} Hintergrund`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="hidden object-cover object-center sm:block"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10 transition group-hover:from-black/80"
              />
              <div className="relative z-10 flex min-h-[340px] flex-col justify-end p-5 sm:p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {freebie.title}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/90">
                  {freebie.body}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-white underline underline-offset-4">
                  {freebie.cta} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.1] via-white to-sky-500/10 p-6 text-center dark:border-violet-400/25 dark:from-violet-500/15 dark:via-white/[0.04] dark:to-sky-500/10 sm:p-8">
        <p className="text-sm text-black/70 dark:text-white/70">
          Du willst direkt die volle Experience?
        </p>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          Ueber die Tools bekommst du sofort tieferen Kontext zu Profil, Beziehung
          und Bewusstsein.
        </p>
        <div className="mt-5 flex justify-center">
          <Link
            href="/tools"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white hover:bg-violet-600 dark:bg-violet-600 dark:text-violet-100 dark:hover:bg-violet-500"
          >
            Direkt Tools benutzen
          </Link>
        </div>
      </div>
    </div>
  );
}
