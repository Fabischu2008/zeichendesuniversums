import type { Metadata } from "next";
import Link from "next/link";

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
    href: "https://www.tiktok.com/@zeichen.des.unive?lang=de-DE",
  },
  {
    key: "website",
    label: "Website",
    href: "/",
  },
] as const;

export default function LinksPage() {
  return (
    <div className="mx-auto w-full max-w-md pt-16 sm:pt-20">
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
                </span>
                <span>{l.label}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

