import type { ReactNode } from "react";
import { AccessBrandHeader } from "@/components/AccessBrandHeader";

export default function GeburtshoroskopErstellenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <AccessBrandHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {children}
      </main>
    </>
  );
}

