import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createCheckoutSessionForProduct } from "@/lib/stripe/create-checkout-session";

export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<{ productId?: string }>;
}) {
  const sp = await searchParams;
  const productId =
    sp?.productId && typeof sp.productId === "string" ? sp.productId : "";

  if (!productId) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-3xl border border-black/5 bg-white/60 p-8 text-center dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-black/70 dark:text-white/70">
          Kein Produkt angegeben.
        </p>
        <Link
          href="/shop"
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black"
        >
          Zum Shop
        </Link>
      </div>
    );
  }

  const result = await createCheckoutSessionForProduct(productId);
  if ("error" in result) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-3xl border border-amber-500/25 bg-amber-500/10 p-8 text-center dark:border-amber-500/20 dark:bg-amber-950/30">
        <h1 className="text-2xl font-semibold tracking-tight">
          Checkout nicht verfügbar
        </h1>
        <p className="text-sm text-black/80 dark:text-white/80">{result.error}</p>
        <Link
          href="/shop"
          className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 bg-white px-6 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:bg-transparent dark:hover:bg-white/10"
        >
          Zum Shop
        </Link>
      </div>
    );
  }

  redirect(result.url);
}
