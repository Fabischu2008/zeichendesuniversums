import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/SiteHeaderMobileNav";
import { btnPrimary } from "@/lib/ui";

const nav = [
  { href: "/tools", label: "Tools" },
  { href: "/beziehung", label: "Beziehung" },
  { href: "/blog", label: "Blog" },
  { href: "/reading", label: "Reading" },
  { href: "/shop", label: "Shop" },
];

// Im Mobile-Menü fehlt der Header-CTA, deshalb kommen Startseite und Guides dort dazu.
const mobileNav = [
  { href: "/", label: "Startseite" },
  ...nav,
  { href: "/freebie-auswahl", label: "Kostenlose Guides" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-background backdrop-blur dark:border-white/10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/images/logo-eye-inline.png"
            alt=""
            width={80}
            height={80}
            className="h-16 w-16 object-contain"
            aria-hidden
          />
          <span className="font-semibold tracking-tight">Zeichen des Universums</span>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-5 text-sm md:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapper statt `hidden` am Button: btnPrimary bringt `inline-flex`
              mit, beide Display-Utilities würden sich sonst überschreiben. */}
          <div className="hidden md:block">
            <Link href="/freebie-auswahl" className={btnPrimary}>
              Kostenloser Guide
            </Link>
          </div>
          <MobileNav nav={mobileNav} />
        </div>
      </div>
    </header>
  );
}

