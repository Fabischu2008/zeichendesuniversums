import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { getPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artikel rund um Sternzeichen, Beziehungen und Klarheit.",
};

export default function BlogPage() {
  const posts = getPosts();
  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Blog
        </h1>
        <p className="text-black/70 dark:text-white/70">
          SEO‑Funnel: Artikel → CTA → Freebie / Produkt.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}

