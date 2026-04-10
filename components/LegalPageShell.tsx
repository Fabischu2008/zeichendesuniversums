import type { ReactNode } from "react";

type LegalPageShellProps = {
  title: string;
  children: ReactNode;
};

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <article className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-black/80 dark:text-white/80 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-black [&_h2]:first:mt-0 [&_h2]:dark:text-white [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_a]:text-violet-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-violet-900 dark:[&_a]:text-violet-300 dark:[&_a]:hover:text-violet-200">
          {children}
        </div>
      </article>
    </div>
  );
}
