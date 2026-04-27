import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/big-3-bedeutung";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs = [
  {
    question: "Was sind die Big 3 in der Astrologie?",
    answer:
      "Die Big 3 sind Sonne, Mond und Aszendent. Zusammen zeigen sie Kernpersönlichkeit, emotionale Bedürfnisse und Auftreten.",
  },
  {
    question: "Warum reichen Sternzeichen allein oft nicht aus?",
    answer:
      "Das Sternzeichen beschreibt nur die Sonne. Für ein vollständigeres Bild brauchst du zusätzlich Mond und Aszendent.",
  },
  {
    question: "Kann ich meine Big 3 kostenlos berechnen?",
    answer:
      "Ja. Mit dem Geburtshoroskop-Tool kannst du Sonne, Mond und Aszendent kostenlos berechnen.",
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
  title: "Big 3 Bedeutung: Sonne, Mond, Aszendent einfach erklärt",
  description:
    "Big 3 in der Astrologie klar erklärt: Was Sonne, Mond und Aszendent über Persönlichkeit, Gefühle und dein Auftreten verraten.",
  alternates: { canonical: path },
  openGraph: {
    title: `Big 3 Bedeutung: Sonne, Mond, Aszendent erklärt · ${SITE_NAME}`,
    description: "Der schnellste Einstieg ins Geburtshoroskop: Big 3 verständlich, konkret und praxisnah.",
    url: absoluteUrl(path),
    images: [{ url: ogImage, ...SOCIAL_PREVIEW_IMAGE_SIZE, alt: SITE_NAME, type: "image/jpeg" }],
  },
};

export default function Big3BedeutungPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-big3-faq" data={faqJsonLd} />
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image src="/images/landing/lp-big3-bedeutung-v2.jpg" alt="Big 3 Astrologie" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Big 3 Bedeutung: Sonne, Mond, Aszendent verstehen
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Wenn du deine Muster nicht kennst, wiederholst du sie. Die Big 3 geben dir
              in wenigen Minuten Klarheit über Identität, Gefühle und Wirkung - die Basis
              für bessere Entscheidungen im Alltag und in Beziehungen.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Warum du das jetzt kennen solltest</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Du verstehst, warum du in Drucksituationen immer ähnlich reagierst.</li>
          <li>• Du erkennst schneller, was dir wirklich Stabilität und Fokus gibt.</li>
          <li>• Du kannst Kommunikation und Auftreten gezielter steuern.</li>
        </ul>
        <div className="mt-6">
          <Link href="/tools/birth-chart" className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600">
            Big 3 jetzt kostenlos berechnen
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
