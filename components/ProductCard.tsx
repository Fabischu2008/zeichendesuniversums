import Link from "next/link";
import { PRODUCT_ID_ASTRO_VOLLPROFIL, type Product } from "@/lib/cms";

function formatEUR(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function ProductCard({ product }: { product: Product }) {
  const targetHref =
    product.id === PRODUCT_ID_ASTRO_VOLLPROFIL
      ? "/tools/birth-chart"
      : product.category === "compatibility"
        ? "/tools/compatibility"
        : `/shop/${product.slug}`;

  return (
    <Link href={targetHref} className="block">
      <article className="group rounded-3xl border border-black/5 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-black/60 dark:text-white/60">
              {product.category.toUpperCase()}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-6 tracking-tight">
              {product.name}
            </h3>
          </div>
          <div className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium dark:bg-white/10">
            {formatEUR(product.price)}
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-black/70 dark:text-white/70">
          {product.description}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium text-black underline-offset-4 group-hover:underline dark:text-white">
            Zum Tool →
          </span>
          <span className="text-xs text-black/50 dark:text-white/50">
            Sofort verfügbar
          </span>
        </div>
      </article>
    </Link>
  );
}

