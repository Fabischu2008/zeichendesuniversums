import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/mondzeichen-beziehung";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Mondzeichen in Beziehungen: Bedeutung, Nähe & Trigger",
  description:
    "Dein Mondzeichen erklärt emotionale Bedürfnisse, Nähe-Distanz-Muster und Trigger in Beziehungen - klar, praktisch und ohne Fachsprache.",
  alternates: { canonical: path },
  openGraph: {
    title: `Mondzeichen in Beziehungen: Bedeutung & Trigger · ${SITE_NAME}`,
    description:
      "Verstehe dein Mondzeichen in Partnerschaft und Dating: Gefühle, Sicherheit und Konfliktmuster einfach erklärt.",
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
      name: "Was verrät das Mondzeichen über Beziehungen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Mondzeichen zeigt, wie du Nähe erlebst, was dir Sicherheit gibt und wie du emotional auf Stress reagierst.",
      },
    },
    {
      "@type": "Question",
      name: "Kann man mit Mondzeichen die Kompatibilität prüfen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es ist ein wichtiger Teil, aber nicht alles. Für echte Kompatibilität sollte das gesamte Horoskop beider Personen verglichen werden.",
      },
    },
  ],
};

export default function MondzeichenBeziehungPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-mondzeichen-faq" data={faqJsonLd} />

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Mondzeichen Bedeutung in Beziehungen
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Wenn dein Sternzeichen zeigt, wer du bist, zeigt dein Mondzeichen, was
          du emotional brauchst. Genau dort entstehen in Beziehungen oft die
          wichtigsten Aha-Momente.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[250px] sm:min-h-[300px]">
          <Image
            src="/images/beziehung_hintergrund.PNG"
            alt="Beziehung und Mondzeichen"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="max-w-2xl text-sm text-white/90">
              Dein Mondzeichen zeigt, was dich emotional nährt und warum manche
              Situationen sofort Nähe oder Rückzug auslösen.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Darauf solltest du achten</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Wie schnell öffnest du dich emotional?</li>
          <li>• Was beruhigt dich nach Konflikten?</li>
          <li>• Welche Worte geben dir Nähe und Sicherheit?</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/birth-chart"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600"
          >
            Mondzeichen berechnen
          </Link>
          <Link
            href="/beziehung"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Zum Beziehungs-Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
