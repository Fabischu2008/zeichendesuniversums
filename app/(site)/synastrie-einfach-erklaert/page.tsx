import type { Metadata } from "next";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ReferenceTable, type ReferenceRow } from "@/components/ReferenceTable";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/synastrie-einfach-erklaert";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Synastrie einfach erklärt: Paaranalyse wirklich verstehen",
  description:
    "Synastrie ohne Fachchinesisch: Wie zwei Horoskope verglichen werden, welche Aspekte wirklich zählen und was das für eure Beziehung bedeutet.",
  alternates: { canonical: path },
  openGraph: {
    title: `Synastrie einfach erklärt: Paaranalyse verstehen · ${SITE_NAME}`,
    description:
      "Von Sonne bis Saturn: So liest du eine astrologische Paaranalyse klar, konkret und alltagstauglich.",
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

const faqs: FaqItem[] = [
  {
    question: "Was ist Synastrie?",
    answer:
      "Synastrie ist der Vergleich von zwei Geburtshoroskopen, um Dynamiken wie Kommunikation, Anziehung und Konfliktmuster sichtbar zu machen.",
  },
  {
    question: "Reicht ein Sternzeichen-Vergleich?",
    answer:
      "Für einen ersten Eindruck ja, für echte Tiefe nein. Entscheidend sind Planetenaspekte, Häuser und die Kombination beider Profile.",
  },
  {
    question: "Wie genau muss die Geburtszeit sein?",
    answer:
      "Je genauer, desto besser. Aszendent und Häuser verschieben sich innerhalb weniger Minuten – ohne Uhrzeit bleibt die Analyse auf Planetenebene.",
  },
];

const aspectRows: ReferenceRow[] = [
  {
    label: "Konjunktion",
    cells: [
      "0°",
      "Die beiden Themen verschmelzen. Sehr intensiv und schwer zu trennen – man erlebt es kaum als „die andere Person“, sondern als sich selbst.",
    ],
  },
  {
    label: "Opposition",
    cells: [
      "180°",
      "Anziehung und Spannung gleichzeitig. Jeder verkörpert, was dem anderen fehlt. Zieht stark an und reibt dauerhaft.",
    ],
  },
  {
    label: "Quadrat",
    cells: [
      "90°",
      "Echte Reibung ohne eingebaute Anziehung. Der unbequemste Aspekt, aber der mit dem größten Entwicklungspotenzial.",
    ],
  },
  {
    label: "Trigon",
    cells: [
      "120°",
      "Fließend und selbstverständlich. Funktioniert ohne Anstrengung – wird deshalb oft gar nicht als Stärke bemerkt.",
    ],
  },
  {
    label: "Sextil",
    cells: [
      "60°",
      "Leichte Unterstützung, die aktiv genutzt werden muss. Wirkt wie eine Tür, die offen steht, aber durchgehen muss man selbst.",
    ],
  },
];

export default function SynastrieEinfachErklaertPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image
            src="/images/landing/lp-synastrie-einfach-erklaert-v2.jpg"
            alt="Synastrie Paaranalyse"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Synastrie einfach erklärt: So funktioniert Paaranalyse
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Ohne klare Analyse bleibt Beziehung oft ein Rätsel aus Wiederholung,
              Hoffnung und Frust. Synastrie zeigt dir schwarz auf weiß, wo ihr euch
              stärkt, wo ihr euch triggert und was ihr konkret ändern müsst.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Warum das für eure Zukunft entscheidend ist</h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Ihr erkennt früh, welche Konflikte immer wieder dieselbe Ursache haben.</li>
          <li>• Ihr versteht, wie Nähe, Kommunikation und Tempo wirklich zusammenpassen.</li>
          <li>• Ihr bekommt eine klare Grundlage für bessere Entscheidungen als Paar.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/compatibility"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600"
          >
            Jetzt Synastrie starten
          </Link>
          <Link
            href="/reading/beziehung"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Zum Beziehungs-Reading
          </Link>
        </div>
      </section>
      <ReferenceTable
        title="Die fünf Aspekte, um die es in der Synastrie geht"
        intro="Synastrie legt zwei Geburtshoroskope übereinander und misst die Winkel zwischen den Planeten beider Personen. Der Winkel entscheidet über die Qualität der Verbindung – nicht darüber, ob sie gut oder schlecht ist."
        headers={["Aspekt", "Winkel", "Wie es sich anfühlt"]}
        rows={aspectRows}
        note="Aspekte gelten nicht exakt, sondern innerhalb einer Toleranz (Orb) von meist 1 bis 8 Grad. Je enger der Orb, desto deutlicher ist der Effekt spürbar."
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Welche Planeten-Paarungen wirklich zählen
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          In jeder Synastrie entstehen dutzende Aspekte. Die meisten davon sind
          Hintergrundrauschen. Diese fünf Verbindungen tragen den größten Teil der
          Aussage:
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-black/75 dark:text-white/75">
          <li>
            <span className="font-medium text-black dark:text-white">
              Sonne zu Mond:
            </span>{" "}
            der klassische Hinweis auf Grundverständnis. Die eine Person versteht
            intuitiv, was die andere im Kern antreibt.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Mond zu Mond:
            </span>{" "}
            emotionale Taktung. Entscheidet darüber, ob Nähe ohne Erklärung
            funktioniert oder dauernd ausgehandelt werden muss.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Venus zu Mars:
            </span>{" "}
            körperliche und erotische Anziehung. Oft stark, wenn sonst wenig passt –
            weshalb Menschen in Beziehungen bleiben, die ihnen nicht guttun.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Merkur zu Merkur:
            </span>{" "}
            Gesprächsebene. Ein schwieriger Merkur-Aspekt bedeutet nicht Streit,
            sondern dass ihr permanent nachfragen müsst, wie etwas gemeint war.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Saturn zu allem:
            </span>{" "}
            Ernst und Dauer. Saturn-Kontakte fühlen sich anfangs schwer an, sind
            aber in langen Beziehungen überdurchschnittlich häufig.
          </li>
        </ul>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Was Synastrie ausdrücklich nicht kann
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Eine Synastrie sagt nicht, ob eine Beziehung hält. Sie beschreibt
          Reibungsflächen und Leichtigkeiten, nicht Entscheidungen. Paare mit vielen
          harmonischen Aspekten trennen sich, weil es bequem und langweilig wurde;
          Paare mit vielen Quadraten bleiben vierzig Jahre zusammen, weil beide die
          Spannung als Entwicklung genutzt haben.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Deshalb ist der nützlichste Umgang damit nicht die Frage „passen wir?“,
          sondern „wo müssen wir bewusst Arbeit reinstecken, die andere Paare
          geschenkt bekommen?“. Darauf gibt eine Synastrie eine ziemlich präzise
          Antwort – und für diese Antwort braucht sie von beiden Personen Datum,
          Uhrzeit und Geburtsort.
        </p>
      </section>

      <FaqSection id="synastrie" items={faqs} />

    </div>
  );
}
