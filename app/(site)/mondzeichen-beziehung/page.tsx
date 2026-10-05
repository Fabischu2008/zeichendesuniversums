import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ReferenceTable, type ReferenceRow } from "@/components/ReferenceTable";
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

const faqs: FaqItem[] = [
  {
    question: "Was verrät das Mondzeichen über Beziehungen?",
    answer:
      "Das Mondzeichen zeigt, wie du Nähe erlebst, was dir Sicherheit gibt und wie du emotional auf Stress reagierst.",
  },
  {
    question: "Kann man mit Mondzeichen die Kompatibilität prüfen?",
    answer:
      "Es ist ein wichtiger Teil, aber nicht alles. Für echte Kompatibilität sollte das gesamte Horoskop beider Personen verglichen werden.",
  },
  {
    question: "Brauche ich meine genaue Geburtszeit?",
    answer:
      "Für das Mondzeichen hilft sie sehr. Der Mond wechselt etwa alle zweieinhalb Tage das Zeichen – an Wechseltagen entscheidet die Uhrzeit, in welchem Zeichen er steht.",
  },
];

const moonRows: ReferenceRow[] = [
  {
    label: "Feuer-Mond — Widder, Löwe, Schütze",
    cells: [
      "Bewegung, Anerkennung und das Gefühl, gewollt zu sein. Zuneigung muss sichtbar sein, nicht nur vorhanden.",
      "Ignoriert oder übergangen werden. Reagiert mit Lautwerden oder Rückzug in Aktivität.",
      "Direkt ansprechen statt andeuten. Kurze, klare Reaktion beruhigt mehr als ein langes Gespräch.",
    ],
  },
  {
    label: "Erde-Mond — Stier, Jungfrau, Steinbock",
    cells: [
      "Verlässlichkeit, Routine und körperliche Nähe. Sicherheit entsteht durch Wiederholung, nicht durch Worte.",
      "Plötzliche Planänderungen und gebrochene Zusagen. Reagiert mit Kontrolle oder Erstarren.",
      "Konkrete Zusagen geben und einhalten. Ein eingehaltener Termin wirkt stärker als jedes Versprechen.",
    ],
  },
  {
    label: "Luft-Mond — Zwillinge, Waage, Wassermann",
    cells: [
      "Austausch und geistige Nähe, gleichzeitig Freiraum. Verarbeitet Gefühle beim Reden, nicht vorher.",
      "Schweigen im Konflikt und emotionale Enge. Reagiert mit Rationalisieren oder Themenwechsel.",
      "Reden lassen, ohne jede Aussage als Entscheidung zu nehmen. Vieles davon ist Denken, nicht Festlegen.",
    ],
  },
  {
    label: "Wasser-Mond — Krebs, Skorpion, Fische",
    cells: [
      "Emotionale Sicherheit und Tiefe. Braucht das Gefühl, auch unangenehme Zustände zeigen zu dürfen.",
      "Kühle, Sachlichkeit im falschen Moment, Verlassen-Signale. Reagiert mit Rückzug oder Festhalten.",
      "Zuerst die Stimmung anerkennen, dann die Sache klären. Zu früh lösungsorientiert wirkt abweisend.",
    ],
  },
];

export default function MondzeichenBeziehungPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
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

      <ReferenceTable
        title="Die vier Mond-Elemente in Beziehungen"
        intro="Das Element des Mondzeichens sagt mehr über Beziehungsverhalten als das Zeichen selbst. Es beschreibt, in welcher Währung jemand Sicherheit bezahlt bekommen will – und genau daran reden Paare meist vorbei."
        headers={[
          "Mond im Element",
          "Braucht für Sicherheit",
          "Typischer Trigger",
          "Was hilft",
        ]}
        rows={moonRows}
        note="Elemente: Feuer = Widder, Löwe, Schütze · Erde = Stier, Jungfrau, Steinbock · Luft = Zwillinge, Waage, Wassermann · Wasser = Krebs, Skorpion, Fische."
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Warum zwei Menschen denselben Streit unterschiedlich erleben
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Der häufigste Fall in Beziehungen ist ein Luft-Mond mit einem Wasser-Mond.
          Die eine Person will im Konflikt reden, um sich zu beruhigen. Die andere
          braucht erst Beruhigung, um reden zu können. Beide verhalten sich völlig
          nachvollziehbar und beide erleben das Verhalten der anderen als Angriff:
          Das eine wirkt bedrängend, das andere wirkt wie Mauern.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Genau deshalb bringt es wenig, in solchen Momenten über den Inhalt zu
          streiten. Der Inhalt ist meist austauschbar – das Muster nicht. Wenn beide
          ihr Mondzeichen kennen, lässt sich die Reihenfolge vorher verabreden:
          erst kurz Nähe herstellen, dann klären. Das klingt banal und entschärft
          erfahrungsgemäß mehr als jede Diskussion über Schuld.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Was das Mondzeichen nicht leistet
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Der Mond erklärt emotionale Bedürfnisse, aber nicht Anziehung und nicht
          Alltagstauglichkeit. Für Anziehung sind Venus und Mars zuständig, für
          Verbindlichkeit eher Saturn-Kontakte, für Reibung im Gespräch die
          Merkur-Positionen. Zwei passende Mondzeichen sind also keine Garantie –
          sie machen nur den Teil leichter, an dem die meisten Paare scheitern.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Und: Ein Mondzeichen ist eine Beschreibung, keine Entschuldigung. „Ich
          habe einen Skorpion-Mond“ erklärt eine Reaktion, rechtfertigt sie aber
          nicht. Der Nutzen liegt darin, das Muster früher zu erkennen – nicht
          darin, es zu behalten.
        </p>
      </section>

      <FaqSection id="mondzeichen" items={faqs} />
    </div>
  );
}
