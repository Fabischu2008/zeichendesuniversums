import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/astrologie-beziehungstipps";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
const faqs: FaqItem[] = [
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
];

const tipps = [
  {
    title: "Trenne Ziel, Gefühl und Ton",
    astro: "Sonne · Mond · Aszendent",
    body: "Die meisten Streits mischen drei Ebenen: Worum es sachlich geht (Sonne), was emotional dranhängt (Mond) und wie es rübergekommen ist (Aszendent). Klärt sie nacheinander statt gleichzeitig.",
    action:
      "Sag im nächsten Konflikt zuerst einen Satz zum Ziel, dann einen zum Gefühl, dann einen zum Ton.",
  },
  {
    title: "Benenne den Trigger, nicht den Charakter",
    astro: "Mondzeichen",
    body: "Das Mondzeichen beschreibt, was jemand braucht, um sich sicher zu fühlen – Nähe, Ruhe, Verlässlichkeit oder Freiraum. Verletzt wird meistens das Bedürfnis, nicht die Person.",
    action:
      "Ersetze „Du bist immer …“ durch „Wenn X passiert, fühle ich mich Y“.",
  },
  {
    title: "Formuliere eine Bitte statt eines Vorwurfs",
    astro: "Merkur",
    body: "Ein Vorwurf beschreibt die Vergangenheit, eine Bitte die Zukunft. Nur die Bitte ist umsetzbar – und nur sie gibt dem anderen eine Chance, etwas richtig zu machen.",
    action:
      "Pro Konflikt eine konkrete Bitte: eine Handlung, ein Zeitpunkt, keine Interpretation.",
  },
  {
    title: "Plant Nähe und Freiraum aktiv ein",
    astro: "Venus · Mars",
    body: "Venus steht für Nähe und Zuwendung, Mars für Eigenantrieb und Abgrenzung. Wenn beides nur „passiert“, gewinnt in stressigen Wochen immer der Alltag.",
    action:
      "Setzt eine feste gemeinsame Zeit pro Woche – und eine feste Zeit, in der jeder für sich ist.",
  },
  {
    title: "Übersetzt eure Elemente",
    astro: "Feuer · Erde · Luft · Wasser",
    body: "Feuer will Tempo, Erde will Verlässlichkeit, Luft will Austausch, Wasser will Stimmung. Dieselbe Reaktion bedeutet je nach Element etwas völlig anderes.",
    action:
      "Fragt bei Missverständnissen einmal nach: „Was hast du gerade gebraucht?“ statt zu interpretieren.",
  },
  {
    title: "Macht eine Pause mit Rückkehrzeit",
    astro: "Mond",
    body: "Eine Pause ohne vereinbarte Rückkehr fühlt sich wie Rückzug an und verstärkt den Konflikt. Mit Rückkehrzeit wird sie zur Entlastung.",
    action:
      "„Ich brauche 20 Minuten, dann reden wir weiter“ – und dann wirklich zurückkommen.",
  },
  {
    title: "Wiederholt euch? Dann ändert das Format",
    astro: "Synastrie",
    body: "Wenn dasselbe Thema zum dritten Mal gleich verläuft, liegt es selten am Inhalt. Dann braucht es einen anderen Rahmen: anderer Ort, andere Uhrzeit, schriftlich – oder Begleitung von außen.",
    action:
      "Schreibt das wiederkehrende Thema einmal getrennt auf und tauscht die Zettel, bevor ihr redet.",
  },
] as const;

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
      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image src="/images/landing/lp-astrologie-beziehungstipps-v2.jpg" alt="Beziehungstipps Astrologie" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Astrologie Beziehungstipps: 7 alltagstaugliche Impulse
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              Beziehung verbessert sich nicht durch Wissen allein, sondern durch
              Umsetzung. Diese 7 Impulse helfen dir, aus Mustern auszusteigen und
              direkt anders zu handeln - heute, nicht irgendwann.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Was sich damit verändert
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Du unterbrichst Streitspiralen früher und bewusster.</li>
          <li>• Du kommunizierst klarer, ohne dich selbst zu verlieren.</li>
          <li>• Du schaffst mehr Sicherheit und Verbindung im Alltag.</li>
          <li>• Du bringst Struktur in Nähe, Freiraum und Konflikte.</li>
          <li>• Du kommst aus dem „Wir reden immer wieder über dasselbe“ heraus.</li>
          <li>• Du erkennst, wann ihr allein weiterkommt und wann Hilfe sinnvoll ist.</li>
          <li>• Du setzt konkrete Schritte um statt nur weiter zu grübeln.</li>
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

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Die 7 Impulse
        </h2>
        <ol className="space-y-4">
          {tipps.map((tipp, index) => (
            <li
              key={tipp.title}
              className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="text-sm font-semibold text-violet-700 dark:text-violet-300"
                >
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold tracking-tight">
                  {tipp.title}
                </h3>
              </div>
              <p className="mt-1 pl-7 text-xs font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">
                {tipp.astro}
              </p>
              <p className="mt-3 pl-7 text-sm leading-6 text-black/75 dark:text-white/75">
                {tipp.body}
              </p>
              <p className="mt-3 pl-7 text-sm leading-6 text-black/75 dark:text-white/75">
                <span className="font-semibold text-black dark:text-white">
                  Heute umsetzbar:
                </span>{" "}
                {tipp.action}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <FaqSection id="beziehungstipps" items={faqs} />
    </div>
  );
}
