import Link from "next/link";
import type { Post } from "@/lib/cms";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-semibold tracking-tight">{post.title}</h3>
      <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
        {post.metaDescription}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-black underline-offset-4 hover:underline dark:text-white"
        >
          Lesen →
        </Link>
        <div className="hidden gap-2 md:flex">
          {post.keywords.slice(0, 2).map((k) => (
            <span
              key={k}
              className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/70 dark:bg-white/10 dark:text-white/70"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

