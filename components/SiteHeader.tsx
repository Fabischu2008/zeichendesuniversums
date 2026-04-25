import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/SiteHeaderMobileNav";

const nav = [
  { href: "/", label: "Startseite" },
  { href: "/freebie-auswahl", label: "Kostenlose Guides" },
  { href: "/tools", label: "Tools" },
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

        <nav className="hidden items-center gap-5 text-sm md:flex">
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
          <Link
            href="/freebie-auswahl"
            className="hidden rounded-full border border-violet-700/35 bg-violet-700/15 px-4 py-2 text-sm font-semibold text-violet-950 hover:bg-violet-700/25 md:inline-flex dark:border-violet-500/35 dark:bg-violet-600/25 dark:text-violet-100 dark:hover:bg-violet-500/30"
          >
            Kostenlos starten
          </Link>
          <MobileNav nav={nav} />
        </div>
      </div>
    </header>
  );
}

