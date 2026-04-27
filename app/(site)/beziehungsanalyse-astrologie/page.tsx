import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/beziehungsanalyse-astrologie";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Beziehungsanalyse mit Astrologie: klar, konkret, alltagstauglich",
  description:
    "Beziehungsanalyse mit Astrologie verständlich erklärt: wichtige Daten, klare Auswertung und nächste Schritte, die eure Beziehung wirklich stärken.",
  alternates: { canonical: path },
  openGraph: {
    title: `Beziehungsanalyse mit Astrologie: klar & konkret · ${SITE_NAME}`,
    description:
      "Praktischer Leitfaden für Beziehungsklarheit: Muster erkennen, Konflikte besser einordnen und bewusst handeln.",
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
      name: "Welche Daten braucht eine genaue Beziehungsanalyse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für beide Personen: Geburtsdatum, genaue Geburtszeit und Geburtsort. Damit können Planeten, Häuser und Aspektverbindungen exakt berechnet werden.",
      },
    },
    {
      "@type": "Question",
      name: "Was bringt mir die Analyse konkret im Alltag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du erkennst Muster bei Kommunikation, Nähe, Konflikt und Vertrauen. Das hilft, Gespräche klarer zu führen und bewusste Entscheidungen in der Beziehung zu treffen.",
      },
    },
  ],
};

export default function BeziehungsanalyseAstrologiePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-beziehungsanalyse-faq" data={faqJsonLd} />
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Beziehungsanalyse mit Astrologie: worauf es ankommt
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Gute Beziehungsanalyse bedeutet nicht Schubladendenken, sondern Klarheit.
          Du siehst, wo ihr euch stärkt, wo Trigger liegen und welche Hebel eure
          Verbindung stabiler machen.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[250px] sm:min-h-[300px]">
          <Image
            src="/images/freebie_handy.png"
            alt="Astrologische Beziehungsanalyse"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="max-w-2xl text-sm text-white/90">
              Eine gute Beziehungsanalyse liefert dir nicht nur Deutung, sondern
              konkrete nächste Schritte für echte Veränderung im Alltag.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Worauf es wirklich ankommt</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Vollständige Daten statt nur Sternzeichen</li>
          <li>• Aspektanalyse mit klarer Sprache</li>
          <li>• Konkrete Umsetzung im Alltag (nicht nur Theorie)</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/compatibility"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600"
          >
            Beziehungsanalyse starten
          </Link>
          <Link
            href="/beziehung"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Kostenloses Beziehungs-PDF
          </Link>
        </div>
      </section>
    </div>
  );
}
