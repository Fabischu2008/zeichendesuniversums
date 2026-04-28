import type { Metadata } from "next";
import Link from "next/link";
import { AccessBrandHeader } from "@/components/AccessBrandHeader";

export const metadata: Metadata = {
  title: "Links",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true, noimageindex: true },
  },
};

const LINKS = [
  {
    key: "website",
    label: "Website",
    href: "/",
  },
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
  {
    key: "coaching",
    label: "Erstgespräch buchen",
    href: "https://calendly.com/zeichendesuniversums-info/60min-astroreading-tarot",
  },
] as const;

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-background">
      <AccessBrandHeader />
      <div className="mx-auto w-full max-w-md px-4 py-12 sm:px-6 sm:py-16">
        <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
          <div className="text-center">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Zeichen des Universums
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Alle Links
            </h1>
            <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
              Socials & Website auf einen Klick.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            {LINKS.map((l) => {
              const isExternal = /^https?:\/\//.test(l.href);
              const colorClasses =
                l.key === "instagram"
                  ? "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
                  : l.key === "youtube"
                    ? "bg-[#FF0000]"
                    : l.key === "tiktok"
                      ? "bg-black"
                    : l.key === "facebook"
                      ? "bg-[#1877F2]"
                      : l.key === "coaching"
                        ? "bg-emerald-600"
                      : "bg-black";
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60 dark:text-white ${colorClasses}`}
                >
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center">
                    {l.key === "instagram" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-white dark:text-black"
                      >
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
                    )}
                    {l.key === "youtube" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-white dark:text-black"
                      >
                        <rect
                          x="3.2"
                          y="6"
                          width="17.6"
                          height="12"
                          rx="3"
                          className="fill-none stroke-current"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M11 10.2 15 12l-4 1.8v-3.6Z"
                          className="fill-current"
                        />
                      </svg>
                    )}
                    {l.key === "tiktok" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-white dark:text-black"
                      >
                        <path
                          className="fill-current"
                          d="M15 5.2c.5 1.4 1.6 2.4 3 2.8v2.2c-1.1-.1-2.1-.4-3-0.9v4.7c0 3-2.1 4.8-4.5 4.8-2.1 0-4.5-1.5-4.5-4.4 0-2.7 2-4.3 4.2-4.3.4 0 .8 0 .8.1v2.3c-.1 0-.4-.1-.7-.1-1.1 0-2.1.7-2.1 2 0 1.3 1.1 2 2.1 2 1.2 0 2.1-.8 2.1-2.2V4h2.6V5.2Z"
                        />
                      </svg>
                    )}
                    {l.key === "website" && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] tracking-wide dark:bg-black/10">
                        WWW
                      </span>
                    )}
                    {l.key === "facebook" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-white dark:text-black"
                      >
                        <path
                          className="fill-current"
                          d="M13.4 20v-7h2.3l.4-2.8h-2.7V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.7v2.1H8.5V13h2.2v7h2.7Z"
                        />
                      </svg>
                    )}
                    {l.key === "coaching" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-white dark:text-black"
                      >
                        <path
                          className="fill-current"
                          d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 15H5V10h14v9Zm0-11H5V6h14v2Zm-7 9h-2v-2h2v2Zm4 0h-2v-2h2v2Zm-8 0H6v-2h2v2Z"
                        />
                      </svg>
                    )}
                  </span>
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

