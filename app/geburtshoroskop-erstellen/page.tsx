import type { Metadata } from "next";
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

const path = "/geburtshoroskop-erstellen";
const checkoutHref = checkoutHrefForProduct(PRODUCT_ID_ASTRO_VOLLPROFIL);
const priceLabel = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(PRICE_ASTRO_VOLLPROFIL);

export const metadata: Metadata = {
  title: "Aszendent & Big 3 kostenlos berechnen – persönliches Geburtshoroskop",
  description:
    `Sonne, Mond und Aszendent in 2 Minuten kostenlos berechnen. Optional: persönliches Geburtshoroskop für ${priceLabel} € – sofort verfügbar.`,
  alternates: { canonical: path },
  openGraph: {
    title: `Aszendent & Big 3 kostenlos berechnen · ${SITE_NAME}`,
    description:
      `Sonne, Mond und Aszendent kostenlos berechnen. Optional persönliches Vollprofil für ${priceLabel} €.`,
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
      name: `Was bekomme ich beim persönlichen Geburtshoroskop für ${priceLabel} €?`,
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
        text: `Nein. Es ist eine einmalige Zahlung von ${priceLabel} €. Keine Verlängerung, keine versteckten Kosten.`,
      },
    },
    {
      "@type": "Question",
      name: "Kann ich den Kauf stornieren, wenn ich unzufrieden bin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für Verbraucher gelten die gesetzlichen Rechte. Details und Voraussetzungen findest du in der Widerrufsbelehrung.",
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
    <div className="mx-auto max-w-4xl space-y-8">
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
      </section>

      <GeburtshoroskopLandingFunnel />
    </div>
  );
}
