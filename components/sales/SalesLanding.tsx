"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ZodiacSign } from "@/lib/astro/signs";
import { LEGAL_PROVIDER } from "@/lib/legal";
import {
  BOOK_CHECKOUT_HREF,
  BOOK_PRICE,
  CALL_CHECKOUT_HREF,
  CALL_PRICE,
  SALES_FAQS,
  SALES_SIGNS,
  SIGN_OPPOSITE,
} from "@/lib/sales-book";

function eur(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

const goldBtn =
  "inline-flex h-12 items-center justify-center rounded-full bg-[#f3e6c4] px-6 text-sm font-semibold text-[#0b0618] transition hover:bg-[#ffe9b0]";
const ghostBtn =
  "inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-[#f6efe2] transition hover:bg-white/10";

export function SalesLanding() {
  const [sign, setSign] = useState<ZodiacSign | null>(null);
  const opposite = sign ? SIGN_OPPOSITE[sign] : null;

  const bookCta = useMemo(
    () => (sign ? `Buch für ${sign} sichern` : "Das Buch für 22,22 € sichern"),
    [sign],
  );

  return (
    <div className="min-h-dvh bg-[#0b0618] text-[#f6efe2]">
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-cosmic-eye.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_42%] sm:object-[75%_45%]"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#0b0618]/50 via-[#0b0618]/25 to-[#0b0618] sm:bg-gradient-to-r sm:from-[#0b0618]/70 sm:via-[#0b0618]/25 sm:to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0618] to-transparent sm:h-36"
          />
        </div>

        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0618]/20 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/logo-eye-inline.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                aria-hidden
              />
              <span className="text-sm font-semibold tracking-tight">
                Zeichen des Universums
              </span>
            </Link>
            <a href="#zeichen" className={ghostBtn + " h-10 px-4 text-xs sm:text-sm"}>
              Dein Zeichen wählen
            </a>
          </div>
        </header>

        <section className="relative z-10">
          <div className="mx-auto flex min-h-[min(520px,72vh)] max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <div className="min-w-0 w-full max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Kein Zufall, dass du gerade hier bist
            </p>
            <h1 className="mt-4 break-words text-4xl font-semibold tracking-tight sm:text-5xl">
              Du hast um ein Zeichen gebeten.
              <span className="mt-2 block text-[#e8d5a3]">Hier ist es.</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-[#f6efe2]/90 sm:text-lg">
              Manchmal begegnet uns genau das, was wir gerade brauchen.{" "}
              <strong className="font-medium text-[#f6efe2]">
                Dein Sternzeichen in Balance
              </strong>{" "}
              ist das Bewusstseins-Buch, das dich in ein wacheres Jahr 2027
              begleitet.
            </p>
            <p className="mt-4 text-base leading-7 text-[#f6efe2]/85">
              Erkenne dein Zeichen. Umarme deinen Gegenpol. Entdecke das
              Bewusstsein, das beides sieht.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#angebot" className={goldBtn}>
                Ja, das ist mein Zeichen
              </a>
              <a href="#blick" className={ghostBtn}>
                Einen Blick hineinwerfen
              </a>
            </div>
            <ul className="mt-6 space-y-1.5 text-sm text-[#f6efe2]/80">
              <li>✦ 63 Seiten, sofort lesbar</li>
              <li>✦ Für alle 12 Sternzeichen</li>
              <li>✦ Mondtermine 2027 inklusive</li>
            </ul>
            <p className="mt-4 text-sm text-[#e8d5a3]">
              Auch mit persönlichem Call: Buch + Perspektivenwechsel ·{" "}
              {eur(CALL_PRICE)}
            </p>
            </div>
          </div>
        </section>
      </div>

      <main>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Kennst du das?
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Manchmal fühlt sich das Leben an wie eine Nachricht.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["11:11", "Du schaust auf die Uhr – und da ist sie wieder, diese Zahl."],
                [
                  "„Gerade …“",
                  "Du denkst an jemanden, und genau in diesem Moment meldet sich diese Person.",
                ],
                [
                  "Ein Satz",
                  "Ein Satz in einem Buch, der wirkt, als wäre er nur für dich geschrieben.",
                ],
                [
                  "Ein Ziehen",
                  "Dieses stille Gefühl: Etwas in mir will sich verändern. Ich weiß nur noch nicht, was.",
                ],
              ].map(([title, body]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-white/10 bg-[#16102a] p-5"
                >
                  <h3 className="text-lg font-semibold text-[#e8d5a3]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#c8bfd8]">{body}</p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-7 text-[#c8bfd8]">
              Wir nennen das ein Zeichen des Universums. Das schönste Zeichen
              kommt nicht von außen. Du trägst längst eines in dir: dein
              Sternzeichen. Es wartet nicht darauf, gedeutet zu werden – sondern
              darauf, ins Gleichgewicht zu kommen.
            </p>
            <div className="mt-8 text-center">
              <a href="#zeichen" className={goldBtn}>
                Zeig mir mein Zeichen
              </a>
            </div>
          </div>
        </section>

        <section id="blick" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Das Zeichen hinter allen Zeichen
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Wer bemerkt eigentlich das Zeichen?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c8bfd8]">
              Nicht dein Körper, nicht deine Gedanken, nicht deine Gefühle –
              das stille Bewusstsein dahinter. Genau dort setzt dieses Workbook
              an.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                [
                  "1",
                  "Dein Zeichen",
                  "Deine vertraute Qualität: deine Stärke und die Stelle, an der sie einseitig wird.",
                ],
                [
                  "2",
                  "Dein Gegenpol",
                  "Das Zeichen gegenüber im Tierkreis. Es irritiert dich oft und schenkt dir genau das, was dir fehlt.",
                ],
                [
                  "3",
                  "Die dritte Perspektive",
                  "Das Bewusstsein, das beide Pole sieht und keiner davon ist. Von hier aus wählst du frei.",
                ],
              ].map(([n, title, body]) => (
                <article
                  key={n}
                  className="rounded-3xl border border-white/10 bg-[#16102a] p-6"
                >
                  <p className="text-sm text-[#e8d5a3]">{n}</p>
                  <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#c8bfd8]">{body}</p>
                </article>
              ))}
            </div>
            <blockquote className="mx-auto mt-12 max-w-2xl text-center text-lg italic leading-8 text-[#e8d5a3]">
              „Ich bin nicht mein Körper, nicht meine Gedanken, nicht meine
              Gefühle. Ich bin das Licht, in dem sie erscheinen.“
            </blockquote>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Was dich erwartet
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Vier Teile. Ein bewussteres Jahr.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Teil I",
                  "Das Fundament: Bewusstsein",
                  "Die dritte Perspektive, die Frage „Wer bin ich?“ und stoische Gelassenheit für den Alltag.",
                ],
                [
                  "Teil II",
                  "Der Tierkreis als Spiegel",
                  "Alle 12 Zeichen auf je zwei Seiten: Stärke, Schatten, Gegenpol, Übung, Mantra, Körperanker, Mondtermine 2027.",
                ],
                [
                  "Teil III",
                  "Sieben Tage Praxis",
                  "Eine Woche, 10 bis 15 Minuten am Tag. Vom Muster bis zum ersten neuen Schritt.",
                ],
                [
                  "Teil IV",
                  "Dein kosmisches Jahr 2027",
                  "Neu- und Vollmonde mit Uhrzeit, Finsternisse, Merkur rückläufig, Sonnen-Tore, Rituale, zwölf Monatsseiten.",
                ],
              ].map(([kicker, title, body]) => (
                <article key={kicker}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8d5a3]">
                    {kicker}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#c8bfd8]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Was du so kaum findest
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Kein Horoskop. Ein Begleiter.
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Astrologie trifft Bewusstsein – Tierkreis, Stoa und der stille Beobachter in einem roten Faden.",
                "Deine Mondtermine 2027: für jedes Zeichen Neumond und Vollmond mit Datum und Uhrzeit.",
                "Die Vollmond-Achsen als monatliches Balance-Training.",
                "Die totale Sonnenfinsternis am 2. August 2027 im Löwen, mit einer Reflexion für diesen Tag.",
                "12 Mantras und 12 Körperanker für den Alltag.",
                "Druckvorlagen: Journal, Neu- und Vollmondblatt, Wochen-Tracker.",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#16102a] px-5 py-4 text-sm leading-6 text-[#c8bfd8]"
                >
                  <span className="text-[#e8d5a3]">✦ </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-[#c8bfd8]">
              Dieses Workbook sagt dir nicht voraus, was passieren wird. Es
              hilft dir, wacher wahrzunehmen, was gerade passiert – und
              bewusster zu antworten.
            </p>
            <div className="mt-8">
              <Link href={BOOK_CHECKOUT_HREF} className={goldBtn}>
                {bookCta}
              </Link>
            </div>
          </div>
        </section>

        <section id="zeichen" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Für welches Zeichen?
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Für alle zwölf. Und ihre Gegenpole.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c8bfd8]">
              Du brauchst nur dein Geburtsdatum. Ein Buch reicht für die ganze
              Familie – jedes Zeichen ist enthalten.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {SALES_SIGNS.map((item) => {
                const active = sign === item.sign;
                const isOpp = opposite === item.sign;
                return (
                  <button
                    key={item.sign}
                    type="button"
                    onClick={() => setSign(item.sign)}
                    className={[
                      "rounded-2xl border px-4 py-4 text-left transition",
                      active
                        ? "border-[#e8d5a3] bg-[#e8d5a3]/15"
                        : isOpp
                          ? "border-[#e8d5a3]/40 bg-white/5"
                          : "border-white/10 bg-[#16102a] hover:border-white/25",
                    ].join(" ")}
                  >
                    <p className="text-lg">
                      {item.symbol}{" "}
                      <span className="font-semibold">{item.sign}</span>
                    </p>
                    <p className="mt-1 text-xs text-[#c8bfd8]">{item.window}</p>
                    <p className="mt-1 text-xs text-[#e8d5a3]">↔ {item.opposite}</p>
                  </button>
                );
              })}
            </div>
            {sign ? (
              <p className="mt-6 text-sm text-[#e8d5a3]">
                {sign} und Gegenpol {opposite}. Beides steht im Buch – und der
                Blick, der beide sieht.
              </p>
            ) : null}
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#16102a] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Ja, wenn du …
              </h2>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-[#c8bfd8]">
                <li>✓ spürst, dass sich in dir etwas verändern will</li>
                <li>✓ dein Sternzeichen kennst – inklusive der Schatten</li>
                <li>✓ nicht nur gedeutet werden, sondern bewusster leben willst</li>
                <li>✓ für 2027 einen Rhythmus willst, der dich trägt</li>
                <li>✓ neugierig bist, wer du jenseits von Gedanken und Gefühlen bist</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#16102a] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Eher nicht, wenn du …
              </h2>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-[#c8bfd8]">
                <li>– konkrete Vorhersagen für dein Jahr erwartest</li>
                <li>– eine schnelle Lösung suchst, ohne selbst hinzuschauen</li>
                <li>– dir keine 10 Minuten am Tag nehmen möchtest</li>
              </ul>
              <p className="mt-6 text-sm text-[#e8d5a3]">
                Wenn du links genickt hast, weißt du die Antwort schon.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Persönlicher Call · 20–30 Minuten
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Dein Perspektivenwechsel
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c8bfd8]">
              Du bringst eine Situation mit, die dich gerade beschäftigt.
              Gemeinsam schauen wir sie aus der dritten Perspektive an, bis sich
              etwas löst und du klarer siehst.
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["1", "Was ist wirklich passiert?", "Tatsachen trennen von der Geschichte, die du dir erzählst."],
                ["2", "Dein Zeichen und dein Gegenpol", "Welches Muster ist aktiv – und welche Qualität fehlt dir jetzt?"],
                ["3", "Der Blick aus dem Bewusstsein", "Aus dem stillen Beobachter wird sichtbar, was die Situation zeigen kann."],
                ["4", "Dein nächster Schritt", "Du gehst mit einer neuen Sicht und einem machbaren Schritt."],
              ].map(([n, title, body]) => (
                <li
                  key={n}
                  className="rounded-2xl border border-white/10 bg-[#16102a] p-5"
                >
                  <p className="text-sm text-[#e8d5a3]">{n}</p>
                  <p className="mt-1 font-semibold">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#c8bfd8]">{body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Link href={CALL_CHECKOUT_HREF} className={goldBtn}>
                Perspektivenwechsel sichern · {eur(CALL_PRICE)}
              </Link>
              <p className="mt-3 text-sm text-[#c8bfd8]">
                Das Buch ist im Bundle bereits enthalten.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Wer hinter Zeichen des Universums steht
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Hallo, ich bin Dominik.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#c8bfd8]">
              Ich schreibe und arbeite unter Zeichen des Universums: Astrologie
              als Spiegel, nicht als Vorhersage. Die dritte Perspektive – das
              Bewusstsein, das Zeichen und Gegenpol sieht – ist der rote Faden
              in diesem Buch.
            </p>
            <p className="mt-4 text-base leading-7 text-[#c8bfd8]">
              Ich habe es geschrieben, damit du 2027 nicht mehr nur dein
              Horoskop liest, sondern einen Rhythmus hast, der dich wacher
              durchs Jahr trägt.
            </p>
          </div>
        </section>

        <section id="angebot" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
              Wähle dein Zeichen
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              22,22 € und 77,77 € – Zufall?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c8bfd8]">
              Viele sehen in doppelten Zahlen ein Zeichen: die 22 für
              Gleichgewicht, die 77 für innere Erkenntnis. Für ein Buch über
              Balance und ein Gespräch über neue Sichtweisen gibt es keine
              passenderen Preise.
            </p>
            <p className="mt-3 text-sm text-[#e8d5a3]">
              Bester Start: 9. Dezember 2026 · Neumond im Schützen.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-[#16102a] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8d5a3]">
                  Das Buch
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Dein Sternzeichen in Balance
                </h3>
                <p className="mt-2 text-3xl font-semibold text-[#e8d5a3]">
                  {eur(BOOK_PRICE)}
                </p>
                <p className="mt-1 text-xs text-[#c8bfd8]">einmalig · digital</p>
                <ul className="mt-6 space-y-2 text-sm leading-6 text-[#c8bfd8]">
                  <li>✦ 63 Seiten, Lila-Gold-Design</li>
                  <li>✦ Alle 12 Zeichen mit Gegenpol</li>
                  <li>✦ Bewusstseinsübungen und 7-Tage-Weg</li>
                  <li>✦ Kosmischer Kalender 2027</li>
                  <li>✦ 4 Vorlagen zum Ausdrucken</li>
                </ul>
                <Link href={BOOK_CHECKOUT_HREF} className={`${goldBtn} mt-8 w-full`}>
                  {bookCta}
                </Link>
                <p className="mt-3 text-xs text-[#c8bfd8]">
                  Sofort lesen, auf jedem Gerät oder ausgedruckt.
                </p>
              </article>

              <article className="rounded-3xl border border-[#e8d5a3]/50 bg-[#1b1433] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8d5a3]">
                  Das vollständige Zeichen
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Buch + Perspektivenwechsel
                </h3>
                <p className="mt-2 text-3xl font-semibold text-[#e8d5a3]">
                  {eur(CALL_PRICE)}
                </p>
                <p className="mt-1 text-xs text-[#c8bfd8]">
                  Das Buch ist enthalten. Der Call sind 55,55 € extra.
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-6 text-[#c8bfd8]">
                  <li>✦ Das komplette Buch</li>
                  <li>✦ Persönlicher Call, 20–30 Minuten</li>
                  <li>✦ Deine Situation aus der dritten Perspektive</li>
                  <li>✦ Zeichen und Gegenpol, auf dich angewendet</li>
                  <li>✦ Du gehst mit einem klaren nächsten Schritt</li>
                </ul>
                <Link href={CALL_CHECKOUT_HREF} className={`${goldBtn} mt-8 w-full`}>
                  Bundle wählen · {eur(CALL_PRICE)}
                </Link>
                <p className="mt-3 text-xs text-[#c8bfd8]">
                  Nach dem Kauf wählst du deinen Termin.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Häufige Fragen
            </h2>
            <div className="mt-8 space-y-3">
              {SALES_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-[#16102a] p-4"
                >
                  <summary className="cursor-pointer list-none font-medium">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-[#c8bfd8]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">
            Wenn du bis hierhin gelesen hast
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            … dann war das vielleicht dein Zeichen.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={CALL_CHECKOUT_HREF} className={goldBtn}>
              Buch + Call · {eur(CALL_PRICE)}
            </Link>
            <Link href={BOOK_CHECKOUT_HREF} className={ghostBtn}>
              Nur das Buch · {eur(BOOK_PRICE)}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[#c8bfd8] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zeichen des Universums</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/impressum" className="hover:text-[#f6efe2]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[#f6efe2]">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-[#f6efe2]">
              AGB
            </Link>
            <Link href="/widerruf" className="hover:text-[#f6efe2]">
              Widerruf
            </Link>
            <Link href="/start" className="hover:text-[#f6efe2]">
              Zur Website
            </Link>
          </nav>
        </div>
        <p className="mx-auto mt-4 max-w-6xl text-xs text-[#8c84a3]">
          {LEGAL_PROVIDER.name} · {LEGAL_PROVIDER.zipCity}
        </p>
      </footer>

      <div className="sticky bottom-0 z-30 border-t border-white/10 bg-[#0b0618]/95 p-3 backdrop-blur sm:hidden">
        <Link href={BOOK_CHECKOUT_HREF} className={`${goldBtn} w-full`}>
          {bookCta}
        </Link>
      </div>
    </div>
  );
}
