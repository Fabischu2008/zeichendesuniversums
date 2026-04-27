import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/aszendent-berechnen";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Aszendent berechnen (gratis) + Bedeutung einfach erklärt",
  description:
    "Aszendent kostenlos berechnen mit Geburtszeit und Ort. Plus einfache Erklärung, typische Merkmale und klare Beispiele für deinen Alltag.",
  alternates: { canonical: path },
  openGraph: {
    title: `Aszendent berechnen (gratis) + Bedeutung · ${SITE_NAME}`,
    description:
      "In 2 Minuten zum Aszendenten: gratis berechnen, verständlich deuten und direkt im Geburtshoroskop einordnen.",
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

const faqs = [
  {
    question: "Was brauche ich, um den Aszendenten zu berechnen?",
    answer:
      "Du brauchst Geburtsdatum, möglichst genaue Geburtszeit und Geburtsort. Ohne Uhrzeit ist das Ergebnis oft ungenau.",
  },
  {
    question: "Ist der Aszendent wichtiger als das Sternzeichen?",
    answer:
      "Beides ist wichtig. Das Sternzeichen zeigt deinen Sonnenkern, der Aszendent zeigt, wie du wirkst und auf Neues reagierst.",
  },
  {
    question: "Kann ich den Aszendenten kostenlos berechnen?",
    answer:
      "Ja. Mit dem kostenlosen Geburtshoroskop-Tool kannst du deinen Aszendenten direkt berechnen.",
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

export default function AszendentBerechnenPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-aszendent-faq" data={faqJsonLd} />

      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image
            src="/images/landing/lp-aszendent-berechnen-v2.jpg"
            alt="Astrologischer Hintergrund"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              Astrologie Grundlagen
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Aszendent berechnen: Bedeutung und kostenloses Tool
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Der Aszendent zeigt, wie du auf Menschen wirkst, wie du in neue Situationen
              startest und welchen ersten Eindruck du hinterlässt. Mit exakten Geburtsdaten
              kannst du ihn in wenigen Minuten korrekt berechnen.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">So berechnest du deinen Aszendenten</h2>
        <ol className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>1. Gib Geburtsdatum, Geburtszeit und Geburtsort ein.</li>
          <li>2. Berechne deine Big 3: Sonne, Mond und Aszendent.</li>
          <li>3. Lies anschließend die Kombination im Kontext deines Gesamtprofils.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/birth-chart"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600"
          >
            Aszendent jetzt berechnen
          </Link>
          <Link
            href="/tools"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Alle Tools ansehen
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
