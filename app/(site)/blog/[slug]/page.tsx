import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";
import {
  getPostBySlug,
  type PostAccent,
  type PostFooterCta,
} from "@/lib/cms";
import {
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
} from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const DEFAULT_POST_FOOTER_CTA: PostFooterCta = {
  title: "Hol dir den kostenlosen Guide",
  description:
    "Wenn dir der Artikel geholfen hat: Der Guide ist der schnellste Start für Klarheit.",
  cta: { label: "Kostenloser Guide", href: "/freebie" },
};

const HERO_GRADIENT: Record<PostAccent, string> = {
  violet:
    "from-violet-600/25 via-sky-500/15 to-transparent dark:from-violet-500/30 dark:via-sky-500/20",
  rose: "from-rose-500/25 via-fuchsia-500/10 to-transparent dark:from-rose-500/25 dark:via-fuchsia-500/15",
  amber:
    "from-amber-500/30 via-orange-400/10 to-transparent dark:from-amber-500/25 dark:via-orange-400/15",
};

const ACCENT_BAR: Record<PostAccent, string> = {
  violet: "from-violet-500 to-sky-500",
  rose: "from-rose-500 to-fuchsia-500",
  amber: "from-amber-500 to-orange-400",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artikel" };
  const url = absoluteUrl(`/blog/${post.slug}`);
  const ogImageUrl = post.coverImage
    ? absoluteUrl(post.coverImage)
    : absoluteUrl(SOCIAL_PREVIEW_IMAGE);
  const ogImageType = ogImageUrl.toLowerCase().includes(".png")
    ? "image/png"
    : "image/jpeg";
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      images: [
        {
          url: ogImageUrl,
          ...SOCIAL_PREVIEW_IMAGE_SIZE,
          alt: post.coverAlt ?? post.title,
          type: ogImageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const accent: PostAccent = post.accent ?? "violet";
  const url = absoluteUrl(`/blog/${post.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url,
    inLanguage: "de-DE",
    keywords: post.keywords.join(", "),
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    isPartOf: {
      "@type": "Blog",
      name: "Zeichen des Universums",
      url: absoluteUrl("/blog"),
    },
  };

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <JsonLd id={`jsonld-post-${post.slug}`} data={jsonLd} />

      <header className="relative isolate overflow-hidden rounded-[1.75rem] border border-black/10 shadow-sm dark:border-white/10">
        {post.coverImage ? (
          <div className="relative min-h-[260px] w-full sm:min-h-[300px]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 896px) 100vw, 896px"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${HERO_GRADIENT[accent]} opacity-90 mix-blend-multiply dark:mix-blend-screen dark:opacity-80`}
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                Artikel
              </p>
              <h1 className="mt-2 max-w-[95%] text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-tight">
                {post.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/92 sm:text-lg">
                {post.metaDescription}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.keywords.slice(0, 5).map((k) => (
                  <li
                    key={k}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4 px-6 py-8 sm:px-10">
            <div
              className={`h-2 w-20 rounded-full bg-gradient-to-r ${ACCENT_BAR[accent]}`}
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
              Artikel
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg leading-relaxed text-black/75 dark:text-white/75">
              {post.metaDescription}
            </p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {post.keywords.slice(0, 5).map((k) => (
                <li
                  key={k}
                  className="rounded-full bg-black/[0.06] px-3 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/75"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <div className="rounded-[1.75rem] border border-black/10 bg-white/70 px-5 py-8 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:px-9 sm:py-10">
        <RichText
          content={post.content}
          variant="article"
          accent={accent}
        />
      </div>

      <CTA {...(post.footerCta ?? DEFAULT_POST_FOOTER_CTA)} />

      <Link
        href="/blog"
        className="inline-flex text-sm font-medium text-black underline-offset-4 hover:underline dark:text-white"
      >
        ← Zurück zum Blog
      </Link>
    </article>
  );
}
