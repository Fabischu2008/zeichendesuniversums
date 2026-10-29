import type { Metadata } from "next";
import { SalesLanding } from "@/components/sales/SalesLanding";
import { JsonLd } from "@/components/JsonLd";
import { PRICE_BOOK_BALANCE, PRICE_BOOK_BALANCE_CALL } from "@/lib/cms";
import {
  SITE_NAME,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
} from "@/lib/brand";
import { SALES_FAQS } from "@/lib/sales-book";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Dein Sternzeichen in Balance · Zeichen des Universums",
  },
  description:
    "76 Seiten Bewusstseins-Buch für alle 12 Sternzeichen: Zeichen, Gegenpol und kosmischer Kalender 2027. Digital 22,22 € – oder mit persönlichem Call 77,77 €.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `Dein Sternzeichen in Balance · ${SITE_NAME}`,
    description:
      "Erkenne dein Zeichen. Umarme deinen Gegenpol. Das Bewusstseins-Buch für 2027.",
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl(SOCIAL_PREVIEW_IMAGE),
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SALES_FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Dein Sternzeichen in Balance",
  description:
    "Bewusstseins-Buch für alle 12 Sternzeichen mit Gegenpol, Übungen und Mondterminen 2027.",
  brand: { "@type": "Brand", name: SITE_NAME },
  offers: [
    {
      "@type": "Offer",
      name: "Digitales Buch",
      price: PRICE_BOOK_BALANCE,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/"),
    },
    {
      "@type": "Offer",
      name: "Buch + Perspektivenwechsel",
      price: PRICE_BOOK_BALANCE_CALL,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/"),
    },
  ],
};

export default function SalesHomePage() {
  return (
    <>
      <JsonLd id="jsonld-sales-faq" data={faqLd} />
      <JsonLd id="jsonld-sales-product" data={productLd} />
      <SalesLanding />
    </>
  );
}
