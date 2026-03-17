"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type NavItem = { href: string; label: string };

export default function MobileNav({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-3 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
      >
        Menü
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          id="mobile-nav"
          className="fixed inset-0 z-50"
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-3 top-3 w-[calc(100%-1.5rem)] max-w-sm rounded-3xl border border-black/10 bg-background p-4 shadow-lg dark:border-white/15">
            <div className="flex items-center justify-between">
              <p id={titleId} className="text-sm font-semibold tracking-tight">
                Navigation
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-3 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              >
                Schließen
              </button>
            </div>

            <nav className="mt-4 grid gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-medium text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/freebie"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Kostenlos starten
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}

