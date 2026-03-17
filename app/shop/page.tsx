import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, type ProductCategory } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Shop",
  description: "Guides, Compatibility und Manifestation – digitale Produkte.",
};

const filters: Array<{ label: string; value?: ProductCategory }> = [
  { label: "Alle" },
  { label: "Sternzeichen Guides", value: "guide" },
  { label: "Beziehungen", value: "compatibility" },
  { label: "Manifestation", value: "manifestation" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const products = getProducts();
  const sp = await searchParams;
  const category = typeof sp?.category === "string" ? sp.category : undefined;

  const filtered =
    category && ["guide", "compatibility", "manifestation"].includes(category)
      ? products.filter((p) => p.category === category)
      : products;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Shop
          </h1>
          <p className="mt-2 text-black/70 dark:text-white/70">
            Digitale Produkte, die dich schnell von „ich fühle mich lost“ zu
            „ich verstehe mich“ bringen.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = (f.value ?? "all") === (category ?? "all");
            const href = f.value ? `/shop?category=${f.value}` : "/shop";
            return (
              <Link
                key={f.label}
                href={href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "border border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10",
                ].join(" ")}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

