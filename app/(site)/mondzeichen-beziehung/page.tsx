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

      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image
            src="/images/landing/lp-mondzeichen-beziehung-v2.jpg"
            alt="Beziehung und Mondzeichen"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Mondzeichen Bedeutung in Beziehungen
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Wenn Beziehungen sich wieder gleich anfühlen, liegt es selten am
              falschen Partner - sondern an ungelösten emotionalen Mustern.
              Dein Mondzeichen zeigt, was du für Sicherheit brauchst und wo du
              unter Stress automatisch in alte Reaktionen gehst.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Was sich dadurch konkret verändert</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Du erkennst früh, wann Nähe in Druck kippt - bevor es eskaliert.</li>
          <li>• Du kommunizierst Bedürfnisse klar statt Vorwürfe zu wiederholen.</li>
          <li>• Du triffst bessere Beziehungsentscheidungen mit emotionaler Klarheit.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/birth-chart"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600"
          >
            Mondzeichen jetzt berechnen
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
