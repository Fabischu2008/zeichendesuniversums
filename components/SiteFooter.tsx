import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/brand";

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
] as const;

const linkClass =
  "text-sm text-black/65 transition-colors hover:text-black dark:text-white/65 dark:hover:text-white";

const headingClass =
  "text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-black/5 bg-gradient-to-b from-violet-500/[0.06] via-transparent to-transparent dark:border-white/10 dark:from-violet-500/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-2xl outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-violet-500/60"
            >
              <Image
                src="/images/logo-eye-inline.png"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
                aria-hidden
              />
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold tracking-tight text-black dark:text-white">
                  {SITE_NAME}
                </span>
                <span className="text-sm text-black/55 dark:text-white/55">
                  {SITE_TAGLINE}
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-black/60 dark:text-white/60">
              Praktische Astrologie: Guides, Tools und Readings – klar formuliert,
              ohne Esoterik-Blabla.
            </p>
          </div>

          <div className="shrink-0 md:text-right">
            <p className={headingClass}>Rechtliches</p>
            <ul className="mt-4 flex flex-col gap-2.5 md:items-end">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-black/5 pt-8 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">
            © {year} {SITE_NAME}. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
