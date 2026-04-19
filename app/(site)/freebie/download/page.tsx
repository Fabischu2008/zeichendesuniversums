import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide herunterladen",
  description: "Lade deinen kostenlosen Guide als PDF herunter.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const PDF_HREF = "/downloads/Freebie.pdf";

export default function FreebieDownloadPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Hier ist dein Guide
        </h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Danke! Du kannst den Guide jetzt direkt als PDF speichern.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={PDF_HREF}
            download
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            PDF herunterladen
          </a>
          <Link
            href="/tools"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 px-6 text-sm font-semibold text-violet-900 hover:bg-violet-500/15 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-100 dark:hover:bg-violet-500/20"
          >
            Zu den Tools
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Zur Startseite
          </Link>
        </div>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          Falls der Download nicht startet, tippe mit gedrückter Taste auf den
          Button oder öffne den Link im Browser.
        </p>
      </div>
    </div>
  );
}
