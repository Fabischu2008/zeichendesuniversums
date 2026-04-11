import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";

export function Big3PlacementCard({
  label,
  sign,
  description,
}: {
  label: string;
  sign: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-black/5 p-4 text-sm dark:bg-white/10">
      <p className="text-xs text-black/60 dark:text-white/60">{label}</p>
      <div className="mt-3 flex gap-4">
        <ZodiacSignIcon sign={sign} sizeClassName="h-[4.5rem] w-[4.5rem]" />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold leading-snug">{sign}</p>
          <p className="mt-2 text-xs leading-relaxed text-black/70 dark:text-white/70">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
