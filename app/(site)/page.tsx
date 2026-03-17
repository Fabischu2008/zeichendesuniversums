import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Testimonial } from "@/components/Testimonial";
import { getFeaturedProducts } from "@/lib/cms";

export default function Home() {
  const featured = getFeaturedProducts();
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      <Hero
        headline="Finde dein wahres Sternzeichen‑Potenzial"
        subline="Kurze, klare Insights zu Persönlichkeit, Beziehungen und dem, was dich wirklich antreibt – ohne esoterisches Blabla."
        primaryCta={{ label: "Kostenloser Guide", href: "/freebie" }}
        secondaryCta={{ label: "Shop ansehen", href: "/shop" }}
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Social Proof
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              100k+ Views
            </p>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Inhalte, die nicht nur gut klingen – sondern wirklich helfen.
            </p>
          </div>
          <Testimonial
            quote="Ich hab mich zum ersten Mal wirklich verstanden gefühlt. Kurz, klar, auf den Punkt."
            name="Lea"
            detail="Guide Käuferin"
          />
          <Testimonial
            quote="Das Compatibility‑Teaser Ergebnis war unheimlich treffsicher – hab direkt die Vollanalyse gekauft."
            name="Mara"
            detail="Tool Nutzerin"
          />
        </div>
      </section>

      <section className="grid gap-8 lg:gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Du fühlst dich oft nicht verstanden?
          </h2>
          <p className="text-black/70 dark:text-white/70">
            Vielleicht versuchst du dich nur mit den falschen Worten zu
            erklären. Dein Sternzeichen zeigt dir, warum du tickst wie du
            tickst – und wie du deine Stärken im Alltag nutzt.
          </p>
          <CTA
            title="Starte mit dem kostenlosen Guide"
            description="In 3 Minuten weißt du, welche Muster dich steuern – und wie du sie drehst."
            cta={{ label: "Guide holen", href: "/freebie" }}
          />
        </div>
        <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 p-6 sm:p-8 dark:border-white/10">
          <div className="space-y-3">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Was du bekommst
            </p>
            <ul className="space-y-2 text-sm text-black/80 dark:text-white/80">
              <li>• Persönlichkeit in Klartext</li>
              <li>• Stärken & Trigger erkennen</li>
              <li>• Beziehungsmuster verstehen</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Bestseller
            </h2>
            <p className="mt-2 text-black/70 dark:text-white/70">
              Schnell starten oder direkt tief gehen.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-black/80 underline-offset-4 hover:underline dark:text-white/80"
          >
            Alle Produkte →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <CTA
        title="Kostenloser Sternzeichen‑Guide"
        description="Hol dir den Guide, starte die Mail‑Serie und entdecke deine nächsten Schritte."
        cta={{ label: "Jetzt kostenlos holen", href: "/freebie" }}
      />
    </div>
  );
}

