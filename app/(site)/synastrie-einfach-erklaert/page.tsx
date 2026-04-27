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
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image
            src="/images/landing/lp-synastrie-einfach-erklaert-v2.jpg"
            alt="Synastrie Paaranalyse"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Synastrie einfach erklärt: So funktioniert Paaranalyse
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Synastrie ist keine Ja/Nein-Antwort, sondern eine Landkarte eurer
              Dynamik. Sie zeigt, wo es leicht fließt, wo Reibung entsteht und wie
              ihr bewusster miteinander umgehen könnt.
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
