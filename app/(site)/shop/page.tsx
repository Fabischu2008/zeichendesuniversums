import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Persönliches Reading zu Geburtshoroskop und Energieflüssen – 30 Minuten, einmalig.",
};

export default function ShopPage() {
  const products = getProducts();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Shop
        </h1>
        <p className="mt-2 max-w-2xl text-black/70 dark:text-white/70">
          Aktuell ein Angebot: das persönliche Reading zu Geburtshoroskop und
          Energieflüssen.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
