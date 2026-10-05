import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
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

const faqs: FaqItem[] = [
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
];

export default function AszendentBerechnenPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">

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
              Wenn du immer wieder in denselben Situationen festhängst, fehlt oft
              nicht Wille, sondern Klarheit über dein Auftreten. Der Aszendent zeigt,
              wie du wirkst, startest und Entscheidungen einleitest - und genau dort
              entsteht der Unterschied zwischen Stillstand und nächstem Schritt.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Warum es sich jetzt lohnt</h2>
        <ol className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>1. Du erkennst, wie du unbewusst auf Chancen und Konflikte reagierst.</li>
          <li>2. Du verstehst, warum manche Gespräche sofort kippen und andere tragen.</li>
          <li>3. Du kannst dein Verhalten bewusst steuern statt nur zu reagieren.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/birth-chart"
            className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600"
          >
            Jetzt Aszendent berechnen
          </Link>
          <Link
            href="/tools"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Alle Tools ansehen
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Warum die Geburtszeit beim Aszendenten so viel ausmacht
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          Die Erde dreht sich in 24 Stunden einmal um sich selbst. Dadurch zieht der
          komplette Tierkreis an jedem Tag einmal am östlichen Horizont vorbei –
          im Schnitt wechselt der Aszendent also etwa alle zwei Stunden das Zeichen.
          Das ist der Grund, warum dein Aszendent als einzige der Big 3 ohne
          Uhrzeit nicht bestimmbar ist: Dasselbe Geburtsdatum liefert je nach
          Uhrzeit zwölf verschiedene Ergebnisse.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/75 dark:text-white/75">
          „Etwa alle zwei Stunden“ ist dabei nur ein Mittelwert. Je weiter du vom
          Äquator entfernt geboren bist, desto ungleichmäßiger werden die
          Zeitspannen: Manche Zeichen steigen in unter einer Stunde auf, andere
          brauchen über drei. Deshalb braucht die Berechnung neben der Uhrzeit auch
          den Geburtsort – die geografische Breite verändert das Ergebnis.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Wie genau muss deine Uhrzeit sein?
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-black/75 dark:text-white/75">
          <li>
            <span className="font-medium text-black dark:text-white">
              Abweichung bis etwa 15 Minuten:
            </span>{" "}
            Das Aszendenten-Zeichen bleibt meist gleich. Die Häuserspitzen
            verschieben sich leicht, an der Gesamtaussage ändert das wenig.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Abweichung von einer Stunde:
            </span>{" "}
            Das Zeichen kann schon kippen. Planeten wandern an Häusergrenzen in ein
            anderes Haus – die Lebensbereiche verschieben sich damit sichtbar.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Uhrzeit komplett unbekannt:
            </span>{" "}
            Sonne und in der Regel auch der Mond lassen sich trotzdem bestimmen.
            Aszendent, Medium Coeli und die Häuser nicht – diese Angaben solltest
            du dann gar nicht erst als Ergebnis behandeln.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-6 text-black/75 dark:text-white/75">
          Die zuverlässigste Quelle ist deine Geburtsurkunde oder die Geburtsklinik.
          Erinnerungen von Familienmitgliedern sind erfahrungsgemäß auf eine halbe
          Stunde genau – für das Zeichen reicht das meist, für die Häuser nicht
          immer.
        </p>
      </section>

      <FaqSection id="aszendent" items={faqs} />
    </div>
  );
}
