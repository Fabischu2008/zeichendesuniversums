import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { SITE_NAME, SOCIAL_PREVIEW_IMAGE, SOCIAL_PREVIEW_IMAGE_SIZE } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";
import { getPosts } from "@/lib/cms";

const path = "/blog";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Astrologie Blog: Sternzeichen, Beziehung, Synastrie",
  description:
    "Astrologie-Blog mit klaren Artikeln zu Sternzeichen, Big 3, Synastrie und Beziehungsdynamik - verständlich und alltagstauglich.",
  keywords: [
    "Astrologie Blog",
    "Sternzeichen Bedeutung",
    "Synastrie erklärt",
    "Beziehungsanalyse Astrologie",
    "Big 3 Astrologie",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Astrologie Blog: Sternzeichen, Beziehung, Synastrie · ${SITE_NAME}`,
    description:
      "Verständliche Astrologie-Artikel mit klaren nächsten Schritten zu Tools und Guides.",
    url: absoluteUrl(path),
    images: [
      {
        url: ogImage,
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: `Astrologie Blog · ${SITE_NAME}`,
    description:
      "Sternzeichen, Big 3 und Beziehungsdynamik ohne Fachchinesisch erklärt.",
    images: [ogImage],
  },
};

export default function BlogPage() {
  const posts = getPosts();
  return (
    <div className="space-y-10">
      <header className="relative isolate overflow-hidden rounded-3xl border border-black/10">
        <div className="relative min-h-[240px] sm:min-h-[290px]">
          <Image
            src="/images/freebie_hintergrund.jpg"
            alt="Blog zu Astrologie und Beziehung"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              Zeichen des Universums
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Blog
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
              Astrologie &amp; Beziehung verständlich erklärt – mit klaren nächsten
              Schritten zu{" "}
              <Link
                href="/geburtshoroskop-erstellen"
                className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Geburtshoroskop
              </Link>
              ,{" "}
              <Link
                href="/beziehung"
                className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Beziehung &amp; Synastrie
              </Link>{" "}
              und den Tools.
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>

      <section className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.14] via-white to-sky-500/[0.14] p-6 shadow-sm sm:p-8 dark:border-violet-400/25 dark:from-violet-500/20 dark:via-white/[0.04] dark:to-sky-500/15">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-800 dark:text-violet-200">
            Nächster Schritt
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Von Inspiration zu Klarheit
          </h2>
          <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
            Wenn dir die Artikel helfen, mach den nächsten Schritt direkt im passenden
            Format: kostenloser Guide für den Einstieg oder Tool-Analyse für mehr Tiefe.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/freebie-auswahl"
              className="group inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-500"
            >
              Kostenlos mit Guides starten
              <span aria-hidden className="ml-2 transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="/tools"
              className="group inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Direkt zu den Tools
              <span aria-hidden className="ml-2 transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

