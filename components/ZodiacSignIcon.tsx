import { isZodiacSign, publicZodiacSvgPath } from "@/lib/astro/signs";

type Props = {
  sign: string;
  className?: string;
  /** Tailwind size classes for the wrapper, default h-10 w-10 */
  sizeClassName?: string;
};

export function ZodiacSignIcon({
  sign,
  className,
  sizeClassName = "h-10 w-10",
}: Props) {
  if (!isZodiacSign(sign)) return null;
  return (
    <div className={`relative shrink-0 ${sizeClassName} ${className ?? ""}`}>
      <img
        src={publicZodiacSvgPath(sign)}
        alt=""
        className="h-full w-full object-contain"
      />
    </div>
  );
}
