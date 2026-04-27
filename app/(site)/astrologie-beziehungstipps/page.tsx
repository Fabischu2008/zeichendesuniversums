import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/astrologie-beziehungstipps";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs = [
  {
    question: "Sind diese Beziehungstipps nur für Paare?",
    answer:
      "Nein. Die Impulse helfen auch in Dating-Phasen oder bei neuen Kennenlernprozessen, weil sie Kommunikations- und Musterklarheit fördern.",
  },
  {
    question: "Wie schnell kann ich erste Veränderungen merken?",
    answer:
      "Viele merken schon nach wenigen Gesprächen eine Veränderung, wenn sie Trigger bewusst benennen und konkrete Bitten formulieren.",
  },
  {
    question: "Was ist der nächste Schritt nach den Tipps?",
    answer:
      "Für mehr Tiefe kannst du den Beziehungs-Guide nutzen oder direkt eine astrologische Paaranalyse starten.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const metadata: Metadata = {
  title: "Astrologie Beziehungstipps: 7 sofort umsetzbare Impulse",
  description:
    "7 astrologische Beziehungstipps für den Alltag: Kommunikation verbessern, Trigger verstehen und Konflikte bewusster lösen.",
  alternates: { canonical: path },
  openGraph: {
    title: `Astrologie Beziehungstipps: 7 umsetzbare Impulse · ${SITE_NAME}`,
    description: "Konkrete Tipps für mehr Klarheit, Nähe und bessere Gespräche in Partnerschaften.",
    url: absoluteUrl(path),
    images: [{ url: ogImage, ...SOCIAL_PREVIEW_IMAGE_SIZE, alt: SITE_NAME, type: "image/jpeg" }],
  },
};

export default function AstrologieBeziehungstippsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-beziehungstipps-faq" data={faqJsonLd} />
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image src="/images/landing/lp-astrologie-beziehungstipps-v2.jpg" alt="Beziehungstipps Astrologie" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Astrologie Beziehungstipps: 7 alltagstaugliche Impulse
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Astrologie hilft besonders dann, wenn sie in den Alltag übersetzt wird.
              Diese sieben Tipps sind sofort anwendbar.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Die 7 Impulse</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Vor Konflikten Ziel und Gefühl getrennt benennen</li>
          <li>• Trigger-Muster schriftlich festhalten statt sofort reagieren</li>
          <li>• Wöchentlicher 15-Minuten-Beziehungs-Check-in</li>
          <li>• Nähe und Freiraum bewusst austarieren</li>
          <li>• Kritik als Bitte formulieren</li>
          <li>• Wiederkehrende Muster monatlich reflektieren</li>
          <li>• Bei festgefahrenen Themen externe Perspektive holen</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/beziehung" className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600">
            Kostenloses Beziehungs-PDF
          </Link>
          <Link href="/tools/compatibility" className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">
            Paaranalyse starten
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Häufige Fragen</h2>
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5"
          >
            <summary className="cursor-pointer list-none font-medium">{faq.question}</summary>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">{faq.answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
