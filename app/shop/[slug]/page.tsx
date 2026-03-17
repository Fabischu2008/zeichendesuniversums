import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/BuyButton";
import { JsonLd } from "@/components/JsonLd";
import { getProductBySlug } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produkt" };
  const url = absoluteUrl(`/shop/${product.slug}`);
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
    },
  };
}

function formatEUR(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const url = absoluteUrl(`/shop/${product.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url,
    image: absoluteUrl(product.image),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url,
    },
  };

  return (
    <div className="grid gap-8 lg:gap-10 md:grid-cols-2 md:items-start">
      <JsonLd id={`jsonld-product-${product.slug}`} data={jsonLd} />

      <div className="space-y-4">
        <p className="text-sm font-medium text-black/60 dark:text-white/60">
          {product.category.toUpperCase()}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.name}
        </h1>
        <p className="text-black/70 dark:text-white/70">{product.description}</p>

        <div className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-medium">Was du bekommst</p>
          <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
            {product.content}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-black/80 dark:text-white/80">
            <li>• Sofortiger Zugriff nach Kauf</li>
            <li>• Klar strukturierte Inhalte</li>
            <li>• Umsetzbare Schritte</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-medium">Für wen es ist</p>
          <ul className="mt-3 space-y-2 text-sm text-black/70 dark:text-white/70">
            <li>• Wenn du dich selbst besser verstehen willst</li>
            <li>• Wenn du Muster in Beziehungen erkennst</li>
            <li>• Wenn du Klarheit statt Rätselraten willst</li>
          </ul>
        </div>
      </div>

      <aside className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-black/60 dark:text-white/60">Preis</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {formatEUR(product.price)}
            </p>
          </div>
          <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            Sofort‑Download
          </div>
        </div>

        <div className="mt-6">
          <BuyButton productId={product.id} />
        </div>

        <div className="mt-6 rounded-2xl border border-black/5 bg-black/[0.03] p-4 text-sm text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          <p className="font-medium text-black dark:text-white">
            Trust & Bewertungen
          </p>
          <p className="mt-1">
            „Kurz, klar, treffsicher.“ – echte Rezensionen kommen im nächsten
            Schritt dazu.
          </p>
        </div>

        <p className="mt-6 text-xs text-black/50 dark:text-white/50">
          Zahlung sicher über Stripe. Kein Abo.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex text-sm font-medium text-black underline-offset-4 hover:underline dark:text-white"
        >
          ← Zurück zum Shop
        </Link>
      </aside>
    </div>
  );
}

