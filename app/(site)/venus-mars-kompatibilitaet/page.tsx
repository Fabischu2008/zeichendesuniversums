import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ReferenceTable, type ReferenceRow } from "@/components/ReferenceTable";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/venus-mars-kompatibilitaet";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs: FaqItem[] = [
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
];

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

const planetRows: ReferenceRow[] = [
  {
    label: "Venus",
    cells: [
      "Wie du liebst und was du als angenehm empfindest: Zuneigung, Werte, Geschmack, Umgang mit Geben und Nehmen.",
      "Daran, wen du attraktiv findest – und daran, wie du reagierst, wenn dir jemand nahekommt.",
    ],
  },
  {
    label: "Mars",
    cells: [
      "Wie du handelst und begehrst: Initiative, Tempo, Durchsetzung und dein Verhalten im Konflikt.",
      "Daran, wie du den ersten Schritt machst – und daran, wie du streitest, wenn es unbequem wird.",
    ],
  },
];

const elementRows: ReferenceRow[] = [
  {
    label: "Feuer",
    cells: [
      "Will Begeisterung und Bewunderung. Verliebt sich schnell, braucht sichtbare Reaktion.",
      "Geht direkt vor, ohne lange Vorbereitung. Konflikt wird offen ausgetragen und ist danach erledigt.",
    ],
  },
  {
    label: "Erde",
    cells: [
      "Will Verlässlichkeit und Sinnlichkeit. Vertrauen wächst über Zeit und Taten, nicht über Worte.",
      "Geht beharrlich und planvoll vor. Vermeidet Konflikt lange, wird dann aber unnachgiebig.",
    ],
  },
  {
    label: "Luft",
    cells: [
      "Will Gespräch und geistige Spannung. Anziehung entsteht über Humor und Austausch.",
      "Geht über Worte vor, argumentiert statt zu drängen. Weicht Emotionalität im Streit aus.",
    ],
  },
  {
    label: "Wasser",
    cells: [
      "Will Tiefe und emotionale Sicherheit. Nähe entsteht langsam, dann aber sehr bindend.",
      "Geht indirekt vor, oft über Stimmung statt Ansage. Zieht sich im Konflikt eher zurück.",
    ],
  },
];

export default function VenusMarsKompatibilitaetPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image src="/images/landing/lp-venus-mars-kompatibilitaet-v2.jpg" alt="Venus und Mars Deutung" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Venus und Mars in der Beziehung: Kompatibilität erklärt
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Viele Beziehungen scheitern nicht an Gefühlen, sondern an unklarer
              Dynamik zwischen Nähe und Begehren. Venus und Mars zeigen dir genau,
              warum Anziehung kippt - und wie ihr sie bewusst stabilisiert.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Warum diese Achse so entscheidend ist</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Du erkennst, was euch emotional verbindet und was euch auseinanderzieht.</li>
          <li>• Du verstehst eure Konflikt- und Sexualdynamik klarer und schneller.</li>
          <li>• Du bekommst konkrete Hebel für mehr Nähe, Klarheit und Stabilität.</li>
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

      <ReferenceTable
        title="Venus und Mars machen zwei verschiedene Jobs"
        intro="Venus und Mars werden oft in einen Topf geworfen, beschreiben aber gegensätzliche Seiten von Anziehung: Venus ist der empfangende Teil, Mars der handelnde. Deshalb sagt erst die Kombination etwas aus."
        headers={["Planet", "Beschreibt", "Zeigt sich daran"]}
        rows={planetRows}
      />

      <ReferenceTable
        title="Was das Element von Venus und Mars verrät"
        intro="Für den Alltag reicht meist das Element. Es beschreibt das Tempo und die Art, in der jemand Nähe aufbaut – und genau dort entstehen die typischen Missverständnisse."
        headers={["Element", "Venus in diesem Element", "Mars in diesem Element"]}
        rows={elementRows}
        note="Feuer = Widder, Löwe, Schütze · Erde = Stier, Jungfrau, Steinbock · Luft = Zwillinge, Waage, Wassermann · Wasser = Krebs, Skorpion, Fische."
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Der klassische Venus-Mars-Konflikt
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Spannend wird es, wenn Venus und Mars innerhalb einer Person nicht
          zusammenpassen. Eine Venus im Wasser will Tiefe, Verlässlichkeit und
          langsames Vertrauen – ein Mars im Feuer handelt schnell, direkt und
          ungeduldig. Das Ergebnis: Man zieht Menschen an, mit denen man kurzfristig
          intensiv und langfristig unzufrieden ist, und versteht lange nicht, warum.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Zwischen zwei Personen gilt dasselbe in umgekehrter Richtung. Venus der
          einen auf Mars der anderen erzeugt sehr zuverlässig körperliche Anziehung –
          unabhängig davon, ob der Rest zusammenpasst. Das erklärt die Beziehungen,
          die sich von außen unerklärlich anfühlen und von innen wie ein Magnet.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Praktisch nutzbar ist das als Einordnung, nicht als Urteil: Anziehung über
          Venus und Mars sagt nichts über Alltagstauglichkeit. Dafür braucht es die
          Mond-Positionen und die Saturn-Kontakte beider Horoskope.
        </p>
      </section>

      <FaqSection id="venus-mars" items={faqs} />
    </div>
  );
}
