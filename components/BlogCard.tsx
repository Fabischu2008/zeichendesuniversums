import Image from "next/image";
import Link from "next/link";
import type { Post, PostAccent } from "@/lib/cms";

const CARD_ACCENT: Record<PostAccent, string> = {
  violet:
    "border-t-violet-500/70 group-hover:border-violet-400 dark:border-t-violet-400/60",
  rose: "border-t-rose-500/70 group-hover:border-rose-400 dark:border-t-rose-400/60",
  amber:
    "border-t-amber-500/75 group-hover:border-amber-400 dark:border-t-amber-400/60",
};

export function BlogCard({ post }: { post: Post }) {
  const accent = post.accent ?? "violet";

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 border-t-4 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 ${CARD_ACCENT[accent]}`}
    >
      {post.coverImage ? (
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[2.1/1] w-full shrink-0 overflow-hidden"
        >
          <Image
            src={post.coverImage}
            alt={post.coverAlt ?? post.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition group-hover:opacity-80"
            aria-hidden
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/70 dark:text-white/70">
          {post.metaDescription}
        </p>
        <div className="mt-6 flex flex-1 flex-wrap items-end justify-between gap-3">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-violet-800 hover:text-violet-950 dark:text-violet-200 dark:hover:text-white"
          >
            Artikel lesen
            <span aria-hidden className="transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <div className="hidden gap-2 sm:flex">
            {post.keywords.slice(0, 2).map((k) => (
              <span
                key={k}
                className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/65 dark:bg-white/10 dark:text-white/70"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
