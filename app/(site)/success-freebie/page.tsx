import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Freebie erfolgreich",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function SuccessFreebiePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
      <h1 className="text-3xl font-semibold tracking-tight">
        Check deine Inbox ✉️
      </h1>
      <p className="text-sm text-black/70 dark:text-white/70">
        Der kostenlose Guide ist auf dem Weg zu dir. Schau in den nächsten
        Minuten in dein Postfach (und ggf. im Spam/„Werbung“ Tab).
      </p>
      <p className="text-sm text-black/70 dark:text-white/70">
        In den nächsten Tagen bekommst du ein paar kurze, klare Mails mit
        weiteren Insights – du kannst dich jederzeit mit einem Klick abmelden.
      </p>
      <div className="pt-2">
        <Link
          href="/shop"
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Zum Shop
        </Link>
      </div>
    </div>
  );
}

