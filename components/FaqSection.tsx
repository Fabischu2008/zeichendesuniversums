import { JsonLd } from "@/components/JsonLd";

export type FaqItem = { question: string; answer: string };

/**
 * Rendert FAQs sichtbar und erzeugt das FAQPage-Schema aus denselben Daten.
 * Google verlangt, dass die Antworten auf der Seite stehen – deshalb nie nur
 * das JSON-LD einbauen.
 */
export function FaqSection({
  id,
  items,
  title = "Häufige Fragen",
}: {
  id: string;
  items: readonly FaqItem[];
  title?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="space-y-3">
      <JsonLd id={`jsonld-${id}-faq`} data={jsonLd} />
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5"
        >
          <summary className="cursor-pointer list-none font-medium">
            {item.question}
          </summary>
          <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
            {item.answer}
          </p>
        </details>
      ))}
    </section>
  );
}
