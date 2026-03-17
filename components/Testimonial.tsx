export function Testimonial({
  quote,
  name,
  detail,
}: {
  quote: string;
  name: string;
  detail: string;
}) {
  return (
    <figure className="rounded-2xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-black/20">
      <blockquote className="text-sm leading-6 text-black/80 dark:text-white/80">
        “{quote}”
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-medium">{name}</span>{" "}
        <span className="text-black/60 dark:text-white/60">· {detail}</span>
      </figcaption>
    </figure>
  );
}

