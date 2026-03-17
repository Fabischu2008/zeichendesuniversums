import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Kauf erfolgreich",
  description: "Danke für deinen Kauf – hier ist dein Download.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ productId?: string }>;
}) {
  const sp = await searchParams;
  const productId =
    sp?.productId && typeof sp.productId === "string" ? sp.productId : "";
  const product = getProducts().find((p) => p.id === productId);

  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-3xl font-semibold tracking-tight">
          Danke für deinen Kauf
        </h1>
        <p className="mt-3 text-black/70 dark:text-white/70">
          {product
            ? `Dein Produkt „${product.name}“ ist bereit.`
            : "Dein Produkt ist bereit."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={product?.fileUrl || "/downloads/demo.pdf"}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Download
          </a>
          <Link
            href="/reading"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Persönliches Reading (Upsell)
          </Link>
        </div>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          Hinweis: Downloads sind im MVP als Platzhalter-Links angelegt.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-gradient-to-br from-amber-500/10 via-violet-500/10 to-sky-500/10 p-6 sm:p-8 dark:border-white/10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Nächster Schritt: persönliches Reading
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Wenn du tiefer gehen willst: Geburtshoroskop, Muster & klare Next
          Steps – 30 oder 60 Minuten.
        </p>
        <div className="mt-6">
          <Link
            href="/reading"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Reading ansehen
          </Link>
        </div>
      </section>
    </div>
  );
}

