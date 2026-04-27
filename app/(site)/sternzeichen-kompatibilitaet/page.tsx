import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/sternzeichen-kompatibilitaet";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs = [
  {
    question: "Wie zuverlässig ist Sternzeichen-Kompatibilität?",
    answer:
      "Sie eignet sich als erster Überblick. Für verlässliche Aussagen zur Beziehungsdynamik braucht es die vollständigen Horoskope beider Personen.",
  },
  {
    question: "Was ist der Unterschied zwischen Kompatibilität und Synastrie?",
    answer:
      "Kompatibilität per Sternzeichen ist ein Schnellcheck. Synastrie vergleicht Planeten, Häuser und Aspekte beider Geburtsprofile.",
  },
  {
    question: "Wann lohnt sich die tiefe Paaranalyse?",
    answer:
      "Wenn ihr wiederkehrende Muster bei Nähe, Kommunikation oder Konflikt besser verstehen und konkret verändern wollt.",
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
  title: "Sternzeichen-Kompatibilität: Schnellcheck + klare Grenzen",
  description:
    "Sternzeichen-Kompatibilität richtig nutzen: Was der Schnellcheck zeigt, wo die Grenzen liegen und wann Synastrie den Unterschied macht.",
  alternates: { canonical: path },
  openGraph: {
    title: `Sternzeichen-Kompatibilität: Schnellcheck & Grenzen · ${SITE_NAME}`,
    description: "Vom Schnellcheck zur echten Paaranalyse: so nutzt du Kompatibilität sinnvoll.",
    url: absoluteUrl(path),
    images: [{ url: ogImage, ...SOCIAL_PREVIEW_IMAGE_SIZE, alt: SITE_NAME, type: "image/jpeg" }],
  },
};

export default function SternzeichenKompatibilitaetPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-sternzeichen-kompatibilitaet-faq" data={faqJsonLd} />
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Sternzeichen Kompatibilität: Was sie wirklich zeigt
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Ein Sternzeichen-Vergleich ist ein guter Einstieg. Für echte Beziehungsdynamik
          brauchst du aber den Blick auf beide vollständigen Horoskope.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[260px]">
          <Image src="/images/beziehung_hintergrund.PNG" alt="Kompatibilität in Beziehungen" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Schnellcheck vs. Tiefenanalyse</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Schnellcheck: gute erste Tendenz, schnell verständlich</li>
          <li>• Tiefenanalyse: Aspekte, Häuser und konkrete Beziehungsmuster</li>
          <li>• Beste Kombination: erst Überblick, dann Synastrie</li>
        </ul>
        <div className="mt-6">
          <Link href="/tools/compatibility" className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600">
            Kompatibilität analysieren
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
