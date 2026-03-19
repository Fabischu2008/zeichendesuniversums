import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  headline: string;
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  note?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function Hero({
  headline,
  subline,
  primaryCta,
  secondaryCta,
  note,
  imageSrc,
  imageAlt = "",
}: HeroProps) {
  if (imageSrc) {
    return (
      <section className="relative isolate min-h-[min(520px,72vh)] overflow-hidden rounded-3xl border border-white/15 p-6 sm:p-10 lg:p-12">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[center_30%] sm:object-right"
        />
        <div className="relative z-10 max-w-2xl">
          <p className="text-base font-medium text-white/90 sm:text-lg">
            Astrology, aber praktisch.
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:mt-5 sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl py-5 text-base leading-[1.75] text-white/90 sm:mt-7 sm:text-lg sm:leading-[1.85] sm:py-6">
            {subline}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:mt-4 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black shadow-sm hover:bg-white/90 sm:w-auto sm:min-w-60"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/15 sm:w-auto"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
          {note ? (
            <p className="mt-4 text-sm leading-relaxed text-white/75">{note}</p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-black/5 bg-gradient-to-b from-violet-500/10 via-sky-500/10 to-transparent p-6 sm:p-10 lg:p-12 dark:border-white/10">
      <div className="max-w-2xl">
        <p className="text-base font-medium text-black/70 dark:text-white/70 sm:text-lg">
          Astrology, aber praktisch.
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:mt-5 sm:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-xl py-5 text-base leading-[1.75] text-black/75 dark:text-white/80 sm:mt-7 sm:text-lg sm:leading-[1.85] sm:py-6">
          {subline}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:mt-4 sm:flex-row">
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
          <p className="mt-4 text-sm leading-relaxed text-black/60 dark:text-white/65">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
