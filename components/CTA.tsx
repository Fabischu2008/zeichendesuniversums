import Link from "next/link";

export function CTA({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-col justify-between gap-5 sm:gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
            {description}
          </p>
        </div>
        <Link
          href={cta.href}
          className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}

