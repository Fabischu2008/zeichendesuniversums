import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ReferenceTable, type ReferenceRow } from "@/components/ReferenceTable";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/big-3-bedeutung";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs: FaqItem[] = [
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
];

const rows: ReferenceRow[] = [
  {
    label: "Sonne",
    cells: [
      "Kern-Identität: was dich antreibt, worauf du im Leben zusteuerst, welche Themen immer wiederkommen.",
      "In Entscheidungen. Wenn du gegen deine Sonne lebst, fühlt sich dein Alltag funktional an, aber leer.",
      "Nur das Geburtsdatum.",
    ],
  },
  {
    label: "Mond",
    cells: [
      "Emotionale Bedürfnisse: was dir Sicherheit gibt, wie du Nähe erlebst, wie du unter Stress reagierst.",
      "In Konflikten und Erschöpfung – der Mond zeigt sich dort, wo du nicht mehr nachdenkst, sondern reagierst.",
      "Datum, meist auch die Uhrzeit: Der Mond wechselt etwa alle zweieinhalb Tage das Zeichen.",
    ],
  },
  {
    label: "Aszendent",
    cells: [
      "Auftreten und erster Eindruck: wie du auf andere wirkst, bevor sie dich kennen.",
      "In neuen Situationen – Bewerbungen, erste Dates, fremde Gruppen.",
      "Datum, Uhrzeit und Geburtsort. Ohne genaue Uhrzeit nicht bestimmbar.",
    ],
  },
];

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

      <ReferenceTable
        title="Was die drei Positionen jeweils abdecken"
        intro="Die Big 3 beschreiben nicht dasselbe aus drei Winkeln, sondern drei verschiedene Ebenen. Deshalb widersprechen sie sich auch oft – und genau dieser Widerspruch ist die eigentliche Information."
        headers={["Position", "Worum es geht", "Wo du es im Alltag merkst", "Benötigte Daten"]}
        rows={rows}
        note="Die Zuordnung der Zeichen erfolgt tropisch, wie in der westlichen Astrologie üblich."
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Der häufigste Aha-Moment: Sonne gegen Aszendent
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Wenn Sonne und Aszendent in sehr unterschiedlichen Zeichen stehen, erlebst
          du eine Lücke zwischen Selbstbild und Fremdbild. Ein Beispiel: Sonne im
          Krebs mit Aszendent im Steinbock wirkt nach außen beherrscht, strukturiert
          und belastbar – innen steht aber ein starkes Bedürfnis nach Fürsorge und
          Geborgenheit. Solche Menschen hören oft „ich dachte, du brauchst niemanden“.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Dieselbe Lücke erklärt auch, warum pauschale Sternzeichen-Beschreibungen
          so oft daneben liegen. Sie beschreiben ausschließlich die Sonne, also ein
          Zwölftel deines Horoskops. Wer sich darin nicht wiedererkennt, hat meist
          einen Aszendenten oder Mond, der die Sonne stark überlagert.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Wie du deine Big 3 in dieser Reihenfolge liest
        </h2>
        <ol className="mt-4 space-y-3 text-sm leading-6 text-black/75 dark:text-white/75">
          <li>
            <span className="font-medium text-black dark:text-white">
              1. Aszendent zuerst.
            </span>{" "}
            Er legt fest, wie dein gesamtes Horoskop in Häuser aufgeteilt wird. Ohne
            ihn hängen alle Planeten in der Luft.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              2. Dann die Sonne.
            </span>{" "}
            Sie gibt die Richtung – das Thema, an dem du über Jahre arbeitest.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              3. Zuletzt der Mond.
            </span>{" "}
            Er erklärt, warum du diese Richtung manchmal sabotierst: nämlich dann,
            wenn ein emotionales Bedürfnis unversorgt bleibt.
          </li>
        </ol>
        <p className="mt-4 text-sm leading-6 text-black/75 dark:text-white/75">
          Interessant wird es erst im Zusammenspiel. Eine Sonne, die Freiheit will,
          und ein Mond, der Verlässlichkeit braucht, erzeugen echte innere Reibung –
          und die ist nützlicher zu kennen als jede Einzelbeschreibung.
        </p>
      </section>

      <FaqSection id="big3" items={faqs} />
    </div>
  );
}
