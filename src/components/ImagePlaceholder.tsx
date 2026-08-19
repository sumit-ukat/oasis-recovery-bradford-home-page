import { cn } from "@/lib/utils";

type Props = {
  /** Reference letter, e.g. "A" */
  letter: string;
  /** Optional caption shown under the letter for orientation during review */
  note?: string;
  className?: string;
};

/**
 * Neutral image placeholder. Sizing / aspect ratio / radius are controlled by
 * the parent via className so each container represents the eventual real image.
 */
export function ImagePlaceholder({ letter, note, className }: Props) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder ${letter}${note ? `: ${note}` : ""}`}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        "bg-placeholder text-placeholder-foreground",
        "ring-1 ring-inset ring-border",
        className,
      )}
    >
      <span className="font-display text-5xl leading-none font-medium tracking-tight select-none sm:text-6xl">
        {letter}
      </span>
      {note ? (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 text-center text-[0.625rem] tracking-[0.14em] uppercase opacity-70">
          {note}
        </span>
      ) : null}
    </div>
  );
}
