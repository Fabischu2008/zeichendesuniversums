import type { Metadata } from "next";
import Link from "next/link";
import { BirthChartReportDemo } from "@/components/BirthChartReportDemo";
import { GeburtshoroskopLandingFunnel } from "@/components/GeburtshoroskopLandingFunnel";
import { JsonLd } from "@/components/JsonLd";
import { LandingHeroCtas } from "@/components/LandingHeroCtas";
import {
  checkoutHrefForProduct,
  PRICE_ASTRO_VOLLPROFIL,
  PRODUCT_ID_ASTRO_VOLLPROFIL,
} from "@/lib/cms";
import { SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";
import { LEGAL_PROVIDER } from "@/lib/legal";

const path = "/geburtshoroskop-erstellen";
const checkoutHref = checkoutHrefForProduct(PRODUCT_ID_ASTRO_VOLLPROFIL);
const priceLabel = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(PRICE_ASTRO_VOLLPROFIL);

export const metadata: Metadata = {
  title: "Aszendent & Big 3 kostenlos berechnen – persönliches Geburtshoroskop",
  description:
    "Sonne, Mond und Aszendent in 2 Minuten kostenlos berechnen. Optional: persönliches Geburtshoroskop für 11,11 € – sofort verfügbar, 14 Tage Widerrufsrecht.",
  alternates: { canonical: path },
  openGraph: {
    title: `Aszendent & Big 3 kostenlos berechnen · ${SITE_NAME}`,
    description:
      "Sonne, Mond und Aszendent kostenlos berechnen. Optional persönliches Vollprofil für 11,11 €.",
    url: absoluteUrl(path),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ist die Berechnung von Sonne, Mond und Aszendent wirklich kostenlos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Du gibst Datum, Uhrzeit und Geburtsort ein und siehst sofort deine Big 3 – ohne E-Mail, ohne Anmeldung, ohne Zahlung.",
      },
    },
    {
      "@type": "Question",
      name: "Was bekomme ich beim persönlichen Geburtshoroskop für 11,11 €?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dein vollständig berechnetes Profil mit allen Planeten, Häusern und Aspekten, ausformulierten Texten zu Stärken, Mustern und Entwicklung – plus persönlichem Zugangslink, den du jederzeit wieder öffnen kannst.",
      },
    },
    {
      "@type": "Question",
      name: "Wie schnell erhalte ich mein Vollprofil nach dem Kauf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direkt nach der Stripe-Zahlung. Dein persönlicher Zugangslink wird innerhalb weniger Sekunden bereitgestellt – kein Warten, kein Postversand.",
      },
    },
    {
      "@type": "Question",
      name: "Ist das ein Abo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Es ist eine einmalige Zahlung von 11,11 €. Keine Verlängerung, keine versteckten Kosten.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich den Kauf stornieren, wenn ich unzufrieden bin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Du hast 14 Tage gesetzliches Widerrufsrecht – ohne Angabe von Gründen. Eine kurze E-Mail genügt und wir erstatten den Betrag.",
      },
    },
    {
      "@type": "Question",
      name: "Was, wenn ich meine Geburtszeit nicht kenne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sonne und Mond werden auch ohne exakte Uhrzeit ungefähr richtig. Der Aszendent braucht die Geburtszeit – ohne sie kannst du das Vollprofil ohne Aszendent erhalten oder zuerst die Geburtszeit aus deiner Geburtsurkunde nachreichen.",
      },
    },
  ],
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Persönliches Geburtshoroskop – Vollprofil",
  description:
    "Persönliche astrologische Analyse auf Basis von Geburtsdatum, Geburtszeit und Geburtsort. Mit Big 3, allen Planeten, Häusern, Aspekten und ausformulierten Deutungstexten.",
  brand: SITE_NAME,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: PRICE_ASTRO_VOLLPROFIL.toFixed(2),
    availability: "https://schema.org/InStock",
    url: absoluteUrl(checkoutHref),
  },
};

export default function GeburtshoroskopLandingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <JsonLd id="jsonld-geburtshoroskop-faq" data={faqJsonLd} />
      <JsonLd id="jsonld-geburtshoroskop-product" data={productJsonLd} />

      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-violet-500/10 via-white to-white p-6 sm:p-8 dark:from-violet-400/15 dark:via-black dark:to-black">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-55px] h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-violet-200/15 dark:border-violet-300/10 animate-[spin_90s_linear_infinite]"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Persönliches Geburtshoroskop
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Sonne, Mond &amp;{" "}
          <em className="italic text-violet-700 dark:text-violet-300">
            Aszendent
          </em>{" "}
          kostenlos berechnen
        </h1>
        <p className="mt-4 text-base leading-relaxed text-black/75 dark:text-white/75">
          Gib Datum, Uhrzeit und Geburtsort ein und sieh deine Big 3 sofort —
          ohne E-Mail, ohne Anmeldung. Wenn du danach willst, kannst du dein
          vollständiges Geburtshoroskop für einmalig {priceLabel} € freischalten.
        </p>

        <LandingHeroCtas priceLabel={priceLabel} />

        <ul className="mt-6 grid gap-2 text-xs text-black/65 sm:grid-cols-2 dark:text-white/65">
          <li className="flex items-start gap-2">
            <span aria-hidden className="mt-[2px] text-emerald-600 dark:text-emerald-400">✓</span>
            Big 3 sofort sichtbar – ohne Zahlung
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden className="mt-[2px] text-emerald-600 dark:text-emerald-400">✓</span>
            Kein Abo, keine versteckten Kosten
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden className="mt-[2px] text-emerald-600 dark:text-emerald-400">✓</span>
            Sichere Zahlung über Stripe (SSL)
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden className="mt-[2px] text-emerald-600 dark:text-emerald-400">✓</span>
            14 Tage Widerrufsrecht
          </li>
        </ul>
      </section>

      <section className="grid gap-3 rounded-2xl border border-black/5 bg-white/80 p-4 text-xs sm:grid-cols-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-base">🔒</span>
          <div>
            <p className="font-semibold">SSL &amp; Stripe</p>
            <p className="text-black/55 dark:text-white/55">Verschlüsselte Zahlung</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-base">↺</span>
          <div>
            <p className="font-semibold">14 Tage Widerruf</p>
            <p className="text-black/55 dark:text-white/55">Geld zurück, ohne Wenn</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-base">⚡</span>
          <div>
            <p className="font-semibold">Sofort verfügbar</p>
            <p className="text-black/55 dark:text-white/55">Direkt im Browser</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-base">🇩🇪</span>
          <div>
            <p className="font-semibold">Aus Deutschland</p>
            <p className="text-black/55 dark:text-white/55">{LEGAL_PROVIDER.zipCity}</p>
          </div>
        </div>
      </section>

      <section
        id="vorschau"
        className="overflow-hidden scroll-mt-24 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] via-white to-amber-500/[0.06] p-6 dark:border-violet-400/25 dark:from-violet-500/10 dark:via-white/5 dark:to-amber-500/10 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Beispiel-Vollprofil
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          So sieht ein fertiges Geburtshoroskop aus
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70 dark:text-white/70">
          Ein anonymisiertes Beispiel mit den Big 3 Sonne <strong>Löwe</strong>{" "}
          · Mond <strong>Krebs</strong> · Aszendent <strong>Waage</strong>.
          Aufbau, Häuser, Element-Mix und Planeten siehst du genauso —
          mit deinen eigenen Konstellationen.
        </p>

        <div className="mt-6 rounded-2xl border border-black/8 bg-white/70 p-3 dark:border-white/10 dark:bg-black/20 sm:p-5">
          <BirthChartReportDemo sun="Löwe" moon="Krebs" ascendant="Waage" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#daten-eingeben"
            className="inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600"
          >
            Mein eigenes Profil starten
          </Link>
          <span className="inline-flex h-12 items-center justify-center text-xs text-black/55 dark:text-white/55">
            Big 3 kostenlos · Vollprofil optional für {priceLabel} €
          </span>
        </div>
      </section>

      <GeburtshoroskopLandingFunnel />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Was im Vollprofil steckt</h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Klar erklärt, direkt auf dich zugeschnitten — damit du Erkenntnisse nicht nur
          liest, sondern sofort verstehst.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">✦</p>
            <p className="mt-2 font-semibold">Big 3 in Tiefe</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Sonne, Mond &amp; Aszendent ausformuliert — der Kern deiner
              Persönlichkeit, basierend auf deinem exakten Geburtsmoment.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">◎</p>
            <p className="mt-2 font-semibold">Alle Planeten &amp; Häuser</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Merkur, Venus, Mars, Jupiter, Saturn — und in welchen Lebens­bereichen
              sie wirken.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">☉</p>
            <p className="mt-2 font-semibold">Lebensmuster &amp; Potenziale</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Was sich in deinem Leben wiederholt — und wie du es bewusst für
              dich nutzen kannst.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">→</p>
            <p className="mt-2 font-semibold">Persönlicher Zugangslink</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Nach dem Kauf jederzeit wieder öffnen — auf jedem Gerät, ohne
              Account.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Kommt dir das bekannt vor?
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Du verstehst dich selbst nicht immer ganz.</li>
          <li>• Du gerätst wiederholt in ähnliche Situationen oder Beziehungen.</li>
          <li>• Du suchst Klarheit über deinen Weg im Leben.</li>
          <li>• Du spürst, dass mehr in dir steckt, kannst es aber nicht greifen.</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-black/75 dark:text-white/75">
          Genau hier setzt dein Geburtshoroskop an: Es macht deine inneren
          Muster sichtbar und übersetzt sie in verständliche Erkenntnisse.
        </p>
        <Link
          href="#daten-eingeben"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Zu den Geburtsdaten
        </Link>
      </section>

      <section className="grid gap-6 rounded-3xl border border-black/5 bg-white/60 p-6 sm:grid-cols-[auto,1fr] sm:items-start dark:border-white/10 dark:bg-white/5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 via-amber-400/20 to-sky-400/20 text-2xl">
          ☉
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
            Wer steckt dahinter?
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Astrologie ohne esoterisches Geschwurbel
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
            <span className="font-medium">{SITE_NAME}</span> ist ein kleines
            Projekt aus {LEGAL_PROVIDER.zipCity}. Wir berechnen dein Profil mit
            etablierten astronomischen Ephemeriden auf den exakten Geburts­moment
            (Datum, Uhrzeit, Längen-/Breitengrad), ordnen Häuser nach gängigem
            Hauspsystem zu und übersetzen die Konstellationen in klare,
            alltagsnahe Sprache. Keine Pauschalfloskeln, keine
            Standard-Templates — die Texte beziehen sich auf <em>deine</em>{" "}
            Konstellation.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-black/65 dark:text-white/65">
            Verantwortlich: {LEGAL_PROVIDER.name} ·{" "}
            <Link href="/impressum" className="underline-offset-2 hover:underline">
              Impressum
            </Link>{" "}
            ·{" "}
            <a
              href={`mailto:${LEGAL_PROVIDER.email}`}
              className="underline-offset-2 hover:underline"
            >
              {LEGAL_PROVIDER.email}
            </a>
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6 dark:border-emerald-400/30 dark:bg-emerald-500/10">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-emerald-600 text-xl text-white">
            ✓
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              14 Tage Geld-zurück-Garantie
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-black/75 dark:text-white/75">
              Wenn dein Vollprofil dir nichts bringt, schreibst du uns innerhalb
              von 14 Tagen eine kurze E-Mail an{" "}
              <a
                href={`mailto:${LEGAL_PROVIDER.email}`}
                className="font-medium underline-offset-2 hover:underline"
              >
                {LEGAL_PROVIDER.email}
              </a>
              {" "}— wir erstatten dir die {priceLabel} € vollständig zurück. Ohne
              Diskussion, ohne Begründung.
            </p>
            <p className="mt-2 text-xs text-black/55 dark:text-white/55">
              Gilt zusätzlich zu deinem gesetzlichen Widerrufsrecht. Details in
              der{" "}
              <Link href="/widerruf" className="underline-offset-2 hover:underline">
                Widerrufsbelehrung
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Häufige Fragen
        </h2>
        <div className="mt-4 divide-y divide-black/5 dark:divide-white/10">
          {[
            {
              q: "Ist die Berechnung von Sonne, Mond und Aszendent wirklich kostenlos?",
              a: "Ja. Du gibst Datum, Uhrzeit und Geburtsort ein und siehst sofort deine Big 3 — ohne E-Mail, ohne Anmeldung, ohne Zahlung.",
            },
            {
              q: `Was bekomme ich beim persönlichen Geburtshoroskop für ${priceLabel} €?`,
              a: "Dein vollständig berechnetes Profil mit allen Planeten, Häusern und Aspekten, ausformulierten Texten zu Stärken, Mustern und Entwicklung — plus persönlichem Zugangslink, den du jederzeit wieder öffnen kannst.",
            },
            {
              q: "Wie schnell erhalte ich mein Vollprofil nach dem Kauf?",
              a: "Direkt nach der Stripe-Zahlung. Dein persönlicher Zugangslink wird innerhalb weniger Sekunden bereitgestellt — kein Warten, kein Postversand.",
            },
            {
              q: "Ist das ein Abo?",
              a: `Nein. Es ist eine einmalige Zahlung von ${priceLabel} €. Keine Verlängerung, keine versteckten Kosten.`,
            },
            {
              q: "Kann ich den Kauf stornieren, wenn ich unzufrieden bin?",
              a: "Ja. Du hast 14 Tage gesetzliches Widerrufsrecht — ohne Angabe von Gründen. Eine kurze E-Mail genügt und wir erstatten den Betrag.",
            },
            {
              q: "Was, wenn ich meine Geburtszeit nicht kenne?",
              a: "Sonne und Mond werden auch ohne exakte Uhrzeit ungefähr richtig. Der Aszendent braucht die Geburtszeit — ohne sie kannst du das Vollprofil ohne Aszendent erhalten oder zuerst die Geburtszeit aus deiner Geburtsurkunde nachreichen.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-3">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="mt-[2px] flex h-5 w-5 flex-none items-center justify-center rounded-full border border-black/15 text-xs transition group-open:rotate-45 dark:border-white/20"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.10] via-white to-amber-500/[0.08] p-6 text-center dark:border-violet-400/25 dark:from-violet-500/15 dark:via-white/5 dark:to-amber-500/10 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Bereit, deine Big 3 zu sehen?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-black/70 dark:text-white/70">
          Berechnung dauert 2 Minuten. Kostenlos, ohne E-Mail. Den Vollreport
          schaltest du nur frei, wenn die Vorschau dich überzeugt.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="#daten-eingeben"
            className="inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600"
          >
            Jetzt kostenlos starten
          </Link>
        </div>
      </section>
    </div>
  );
}
