import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/brand";

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
] as const;

const discover = [
  { href: "/geburtshoroskop-erstellen", label: "Geburtshoroskop erstellen" },
  { href: "/beziehung", label: "Beziehung & Paaranalyse" },
  { href: "/tools/birth-chart", label: "Geburtshoroskop-Tool" },
  { href: "/tools/compatibility", label: "Kompatibilitäts-Tool" },
  { href: "/blog", label: "Astrologie-Blog" },
  { href: "/sternzeichen", label: "Sternzeichen" },
  { href: "/tools", label: "Alle Tools" },
] as const;

const socials = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/zeichen.des.universums",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@Zeichen.des.Universums",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@zeichen.des.universums",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577542791928",
  },
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
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
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

          <div className="grid shrink-0 gap-10 sm:grid-cols-2 lg:flex lg:gap-16">
            <div>
              <p className={headingClass}>Angebot</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {discover.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:text-right lg:text-right">
              <p className={headingClass}>Rechtliches</p>
              <ul className="mt-4 flex flex-col gap-2.5 sm:items-end">
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
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/5 pt-8 dark:border-white/10 md:flex-row md:items-end md:justify-between">
          <p className="text-xs text-black/50 dark:text-white/50">
            © {year} {SITE_NAME}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-2 self-start md:self-auto">
            {socials.map((social) => (
              <Link
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/75 transition hover:bg-black/5 hover:text-black dark:border-white/15 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {social.key === "instagram" ? (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      className="fill-none stroke-current"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      className="fill-none stroke-current"
                      strokeWidth="1.8"
                    />
                    <circle cx="17.2" cy="6.8" r="0.9" className="fill-current" />
                  </svg>
                ) : null}
                {social.key === "youtube" ? (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <rect
                      x="3.2"
                      y="6"
                      width="17.6"
                      height="12"
                      rx="3"
                      className="fill-none stroke-current"
                      strokeWidth="1.8"
                    />
                    <path d="M11 10.2 15 12l-4 1.8v-3.6Z" className="fill-current" />
                  </svg>
                ) : null}
                {social.key === "tiktok" ? (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <path
                      className="fill-current"
                      d="M15 5.2c.5 1.4 1.6 2.4 3 2.8v2.2c-1.1-.1-2.1-.4-3-0.9v4.7c0 3-2.1 4.8-4.5 4.8-2.1 0-4.5-1.5-4.5-4.4 0-2.7 2-4.3 4.2-4.3.4 0 .8 0 .8.1v2.3c-.1 0-.4-.1-.7-.1-1.1 0-2.1.7-2.1 2 0 1.3 1.1 2 2.1 2 1.2 0 2.1-.8 2.1-2.2V4h2.6V5.2Z"
                    />
                  </svg>
                ) : null}
                {social.key === "facebook" ? (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <path
                      className="fill-current"
                      d="M13.4 20v-7h2.3l.4-2.8h-2.7V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.7v2.1H8.5V13h2.2v7h2.7Z"
                    />
                  </svg>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
