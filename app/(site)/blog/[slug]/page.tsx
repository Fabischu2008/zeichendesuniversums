import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";
import { getPostBySlug } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artikel" };
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.seoTitle,
      description: post.metaDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
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

  const url = absoluteUrl(`/blog/${post.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url,
    inLanguage: "de-DE",
    keywords: post.keywords.join(", "),
    isPartOf: {
      "@type": "Blog",
      name: "Zeichen des Universums",
      url: absoluteUrl("/blog"),
    },
  };

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <JsonLd id={`jsonld-post-${post.slug}`} data={jsonLd} />
      <header className="space-y-3">
        <p className="text-sm text-black/60 dark:text-white/60">Artikel</p>
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="text-black/70 dark:text-white/70">
          {post.metaDescription}
        </p>
      </header>

      <RichText content={post.content} />

      <CTA
        title="Hol dir den kostenlosen Guide"
        description="Wenn dir der Artikel geholfen hat: Der Guide ist der schnellste Start für Klarheit."
        cta={{ label: "Kostenloser Guide", href: "/freebie" }}
      />

      <Link
        href="/blog"
        className="inline-flex text-sm font-medium text-black underline-offset-4 hover:underline dark:text-white"
      >
        ← Zurück zum Blog
      </Link>
    </article>
  );
}

