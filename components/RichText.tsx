export function RichText({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/g);

  return (
    <div className="space-y-4">
      {blocks.map((b, idx) => {
        if (b.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-xl font-semibold tracking-tight">
              {b.replace(/^###\s+/, "")}
            </h3>
          );
        }
        if (b.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-2xl font-semibold tracking-tight">
              {b.replace(/^##\s+/, "")}
            </h2>
          );
        }
        if (b.startsWith("- ")) {
          const items = b
            .split("\n")
            .map((l) => l.replace(/^- /, "").trim())
            .filter(Boolean);
          return (
            <ul
              key={idx}
              className="list-disc space-y-2 pl-5 text-sm leading-6 text-black/80 dark:text-white/80"
            >
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={idx}
            className="text-sm leading-7 text-black/70 dark:text-white/70"
          >
            {b}
          </p>
        );
      })}
    </div>
  );
}

