import Image from "next/image";

/** Fokus-Header für Access-/Link-Seiten: Branding ohne Navigation. */
export function AccessBrandHeader() {
  return (
    <header className="border-b border-black/5 bg-background dark:border-white/10">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Image
          src="/images/logo-eye-inline.png"
          alt=""
          width={80}
          height={80}
          className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          aria-hidden
        />
        <span className="font-semibold tracking-tight">Zeichen des Universums</span>
      </div>
    </header>
  );
}
