import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/sternzeichen-kompatibilitaet";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs: FaqItem[] = [
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
];

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
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image src="/images/landing/lp-sternzeichen-kompatibilitaet-v2.jpg" alt="Kompatibilität in Beziehungen" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Sternzeichen Kompatibilität: Was sie wirklich zeigt
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Wenn du Entscheidungen in der Liebe nur nach Gefühl triffst, übersiehst
              oft die wichtigsten Muster. Kompatibilität richtig gelesen zeigt dir,
              ob ihr auf Dauer tragfähig zusammenpasst - und woran ihr arbeiten müsst.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Warum ein schneller Check allein nicht reicht</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Ein Sternzeichen-Check zeigt Tendenzen, aber keine belastbare Dynamik.</li>
          <li>• Erst mit Synastrie siehst du echte Trigger, Stärken und Langzeitpotenzial.</li>
          <li>• So triffst du Entscheidungen mit Klarheit statt Hoffnung allein.</li>
        </ul>
        <div className="mt-6">
          <Link href="/tools/compatibility" className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600">
            Kompatibilität analysieren
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Warum Sternzeichen-Tabellen so oft falsch liegen
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Eine Kompatibilitätstabelle nach Sternzeichen vergleicht genau eine Größe:
          die Sonne. Die Sonne ist aber nur eine von rund zehn Positionen, die in
          einer Beziehung eine Rolle spielen. Alles, was den Alltag tatsächlich
          bestimmt – emotionale Bedürfnisse über den Mond, Anziehung über Venus und
          Mars, Gesprächsebene über Merkur, Verbindlichkeit über Saturn – kommt
          darin überhaupt nicht vor.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Praktisch heißt das: Zwei Menschen mit demselben Sternzeichen können
          völlig unterschiedlich in Beziehungen funktionieren. Und zwei Zeichen, die
          als „unpassend“ gelten, können problemlos miteinander leben, wenn ihre
          Mond- und Venus-Positionen zusammenspielen. Die Tabelle ist nicht falsch,
          sie ist nur viel zu grob für die Frage, die man ihr stellt.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Was am Element-Vergleich trotzdem dran ist
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Der brauchbare Kern hinter den Tabellen ist die Elementlehre. Feuer und
          Luft verstärken sich gegenseitig, Erde und Wasser ebenso – das beschreibt
          vor allem ein ähnliches Tempo. Feuer-Luft-Paare sind schneller, direkter
          und reden mehr; Erde-Wasser-Paare brauchen länger, binden dafür stärker.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Die klassisch als schwierig geltenden Mischungen, also Feuer mit Wasser
          oder Erde mit Luft, sind nicht schlechter. Sie bedeuten nur, dass das
          Tempo ausgehandelt werden muss, statt von allein zu passen. Wer das weiß,
          streitet über Absprachen statt über Charakter.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Sinnvoll ist die Elementaussage deshalb als erster Eindruck – so wie ein
          Sternzeichen ein erster Eindruck von einem Menschen ist. Für eine
          belastbare Aussage braucht es beide vollständigen Horoskope, und dafür von
          beiden Personen Geburtsdatum, Uhrzeit und Ort.
        </p>
      </section>

      <FaqSection id="sternzeichen-kompatibilitaet" items={faqs} />
    </div>
  );
}
