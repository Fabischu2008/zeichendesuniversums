import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-10 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="text-sm text-black/70 dark:text-white/70">
          © {new Date().getFullYear()} Zeichen des Universums
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/shop"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            Shop
          </Link>
          <Link
            href="/freebie"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            Freebie
          </Link>
          <Link
            href="/blog"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/tools"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            Tools
          </Link>
        </div>
      </div>
    </footer>
  );
}

