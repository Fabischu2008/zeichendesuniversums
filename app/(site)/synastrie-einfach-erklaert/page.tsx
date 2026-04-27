import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/synastrie-einfach-erklaert";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Synastrie einfach erklärt: Paaranalyse wirklich verstehen",
  description:
    "Synastrie ohne Fachchinesisch: Wie zwei Horoskope verglichen werden, welche Aspekte wirklich zählen und was das für eure Beziehung bedeutet.",
  alternates: { canonical: path },
  openGraph: {
    title: `Synastrie einfach erklärt: Paaranalyse verstehen · ${SITE_NAME}`,
    description:
      "Von Sonne bis Saturn: So liest du eine astrologische Paaranalyse klar, konkret und alltagstauglich.",
    url: absoluteUrl(path),
    images: [
      {
        url: ogImage,
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist Synastrie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Synastrie ist der Vergleich von zwei Geburtshoroskopen, um Dynamiken wie Kommunikation, Anziehung und Konfliktmuster sichtbar zu machen.",
      },
    },
    {
      "@type": "Question",
      name: "Reicht ein Sternzeichen-Vergleich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für einen ersten Eindruck ja, für echte Tiefe nein. Entscheidend sind Planetenaspekte, Häuser und die Kombination beider Profile.",
      },
    },
  ],
};

export default function SynastrieEinfachErklaertPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-synastrie-faq" data={faqJsonLd} />
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Synastrie einfach erklärt: So funktioniert Paaranalyse
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Synastrie ist keine Ja/Nein-Antwort, sondern eine Landkarte eurer
          Dynamik. Sie zeigt, wo es leicht fließt, wo Reibung entsteht und wie
          ihr bewusster miteinander umgehen könnt.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[250px] sm:min-h-[300px]">
          <Image
            src="/images/beziehung_handy.png"
            alt="Synastrie Paaranalyse"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="max-w-2xl text-sm text-white/90">
              Synastrie macht sichtbar, wie zwei Horoskope sich gegenseitig aktivieren:
              bei Kommunikation, Anziehung und Konflikt.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Die drei Kernbausteine</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Planetenaspekte (z. B. Venus-Mars, Mond-Mond, Sonne-Saturn)</li>
          <li>• Big 3 beider Personen (Sonne, Mond, Aszendent)</li>
          <li>• Hausfokus und Beziehungsthemen im Alltag</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/compatibility"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600"
          >
            Synastrie jetzt starten
          </Link>
          <Link
            href="/reading/beziehung"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Zum Beziehungs-Reading
          </Link>
        </div>
      </section>
    </div>
  );
}
