import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide gesendet",
  description: "Danke! Check deine Inbox für den kostenlosen Guide.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function SuccessFreebiePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-3xl font-semibold tracking-tight">
          Danke! Der Guide ist unterwegs.
        </h1>
        <p className="mt-3 text-black/70 dark:text-white/70">
          Schau in deine Inbox (ggf. Spam/Promotion). In der Mail findest du den
          Download und den ersten Quick‑Win.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Bestseller ansehen
          </Link>
          <Link
            href="/tools"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Tools ausprobieren
          </Link>
        </div>
      </div>
    </div>
  );
}

