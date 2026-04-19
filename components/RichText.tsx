import type { PostAccent } from "@/lib/cms";

const ACCENT_H2: Record<PostAccent, string> = {
  violet:
    "border-violet-500/80 text-violet-950 dark:border-violet-400/70 dark:text-violet-50",
  rose: "border-rose-400/90 text-rose-950 dark:border-rose-400/60 dark:text-rose-50",
  amber:
    "border-amber-500/85 text-amber-950 dark:border-amber-400/65 dark:text-amber-50",
};

const ACCENT_H3: Record<PostAccent, string> = {
  violet: "text-violet-900/95 dark:text-violet-100/95",
  rose: "text-rose-900/95 dark:text-rose-100/95",
  amber: "text-amber-900/95 dark:text-amber-100/95",
};

const ACCENT_LIST_WRAP: Record<PostAccent, string> = {
  violet:
    "border-violet-500/15 bg-violet-500/[0.06] dark:border-violet-400/20 dark:bg-violet-500/10",
  rose: "border-rose-400/20 bg-rose-500/[0.06] dark:border-rose-400/15 dark:bg-rose-500/10",
  amber:
    "border-amber-500/15 bg-amber-500/[0.06] dark:border-amber-400/20 dark:bg-amber-500/10",
};

type RichTextProps = {
  content: string;
  /** Größere Typo, Akzente, mehr Weißraum */
  variant?: "default" | "article";
  accent?: PostAccent;
};

export function RichText({
  content,
  variant = "default",
  accent = "violet",
}: RichTextProps) {
  const blocks = content.split(/\n{2,}/g);
  const isArticle = variant === "article";
  let paragraphIndex = 0;

  return (
    <div className={isArticle ? "space-y-6" : "space-y-4"}>
      {blocks.map((b, idx) => {
        if (b.startsWith("### ")) {
          const text = b.replace(/^###\s+/, "");
          return (
            <h3
              key={idx}
              className={
                isArticle
                  ? `text-lg font-semibold tracking-tight sm:text-xl ${ACCENT_H3[accent]}`
                  : "text-xl font-semibold tracking-tight"
              }
            >
              {text}
            </h3>
          );
        }
        if (b.startsWith("## ")) {
          const text = b.replace(/^##\s+/, "");
          return (
            <h2
              key={idx}
              className={
                isArticle
                  ? `mt-10 border-l-4 pl-5 text-2xl font-semibold tracking-tight first:mt-0 sm:text-[1.65rem] sm:leading-snug ${ACCENT_H2[accent]}`
                  : "text-2xl font-semibold tracking-tight"
              }
            >
              {text}
            </h2>
          );
        }
        if (b.startsWith("- ")) {
          const items = b
            .split("\n")
            .map((l) => l.replace(/^- /, "").trim())
            .filter(Boolean);
          const list = (
            <ul
              className={
                isArticle
                  ? "list-none space-y-3 pl-0 text-[15px] leading-7 text-black/85 dark:text-white/85"
                  : "list-disc space-y-2 pl-5 text-sm leading-6 text-black/80 dark:text-white/80"
              }
            >
              {items.map((it, li) => (
                <li
                  key={`${idx}-${li}`}
                  className={
                    isArticle
                      ? "relative pl-7 before:absolute before:left-0 before:top-[0.35em] before:h-2 before:w-2 before:rounded-full before:bg-current before:opacity-70"
                      : ""
                  }
                >
                  {it}
                </li>
              ))}
            </ul>
          );

          if (isArticle) {
            return (
              <div
                key={idx}
                className={`rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 ${ACCENT_LIST_WRAP[accent]}`}
              >
                {list}
              </div>
            );
          }
          return list;
        }

        const isFirstParagraph = paragraphIndex === 0;
        paragraphIndex += 1;

        return (
          <p
            key={idx}
            className={
              isArticle
                ? isFirstParagraph
                  ? "text-[17px] leading-8 text-black/80 dark:text-white/85"
                  : "text-[15px] leading-7 text-black/75 dark:text-white/80"
                : "text-sm leading-7 text-black/70 dark:text-white/70"
            }
          >
            {b}
          </p>
        );
      })}
    </div>
  );
}
