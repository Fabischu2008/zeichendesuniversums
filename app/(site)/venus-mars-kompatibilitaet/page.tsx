import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/venus-mars-kompatibilitaet";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs = [
  {
    question: "Was bedeutet Venus in der Beziehung?",
    answer:
      "Venus steht für Bindungsstil, Werte, Nähe und die Art, wie du Liebe gibst und empfängst.",
  },
  {
    question: "Was zeigt Mars in Partnerschaften?",
    answer:
      "Mars zeigt Initiative, Konfliktverhalten, Wunschdynamik und sexuelle Energie in der Beziehung.",
  },
  {
    question: "Warum ist die Venus-Mars-Achse so wichtig?",
    answer:
      "Weil sie erklärt, wie Sicherheit und Begehren zusammenwirken. Genau dort entstehen oft die stärksten Spannungen und Potenziale.",
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
  title: "Venus & Mars in Beziehungen: Anziehung und Dynamik verstehen",
  description:
    "Venus und Mars richtig deuten: Was sie über Bindung, Anziehung, Konfliktstil und sexuelle Dynamik in Beziehungen verraten.",
  alternates: { canonical: path },
  openGraph: {
    title: `Venus & Mars in Beziehungen: Anziehung verstehen · ${SITE_NAME}`,
    description: "Die Schlüsselachse für Nähe, Wunsch und Spannungsdynamik in Partnerschaften.",
    url: absoluteUrl(path),
    images: [{ url: ogImage, ...SOCIAL_PREVIEW_IMAGE_SIZE, alt: SITE_NAME, type: "image/jpeg" }],
  },
};

export default function VenusMarsKompatibilitaetPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-venus-mars-faq" data={faqJsonLd} />
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image src="/images/landing/lp-venus-mars-kompatibilitaet-v2.jpg" alt="Venus und Mars Deutung" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Venus und Mars in der Beziehung: Kompatibilität erklärt
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Venus zeigt, wie du Liebe gibst und empfängst. Mars zeigt, wie du willst,
              handelst und Begehren ausdrückst. Zusammen ergibt das eure Beziehungsdynamik.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Praxisorientierte Deutung</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Venus: Sicherheit, Werte, Beziehungsstil</li>
          <li>• Mars: Initiative, Konfliktstil, Sexualdynamik</li>
          <li>• Kombination: Wo ihr euch ergänzt und wo klare Absprachen helfen</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tools/compatibility" className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600">
            Venus-Mars im Vergleich sehen
          </Link>
          <Link href="/reading/beziehung" className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">
            Beziehungs-Reading
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
