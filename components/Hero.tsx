import Link from "next/link";

type HeroProps = {
  headline: string;
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  note?: string;
};

export function Hero({
  headline,
  subline,
  primaryCta,
  secondaryCta,
  note,
}: HeroProps) {
  return (
    <section className="rounded-3xl border border-black/5 bg-gradient-to-b from-violet-500/10 via-sky-500/10 to-transparent p-6 sm:p-10 lg:p-12 dark:border-white/10">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-black/70 dark:text-white/70">
          Astrology, aber praktisch.
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:mt-4 sm:text-4xl lg:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 text-sm leading-6 text-black/70 dark:text-white/70 sm:text-base sm:leading-7">
          {subline}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white shadow-sm hover:bg-black/90 sm:w-auto sm:min-w-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
        {note ? (
          <p className="mt-3 text-xs text-black/60 dark:text-white/60">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

