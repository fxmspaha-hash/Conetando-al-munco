import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl reveal", align === "center" && "mx-auto text-center", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 text-4xl font-bold md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}

export const TONES = {
  lime: "tone-lime",
  mint: "tone-mint",
  amber: "tone-amber",
  signal: "tone-signal",
  neutral: "tone-neutral",
} as const;

export type Tone = keyof typeof TONES;

const SIZES = {
  sm: "size-10 rounded-[13px] [&_svg]:size-5",
  md: "size-12 rounded-[15px] [&_svg]:size-6",
  lg: "size-14 rounded-2xl [&_svg]:size-7",
} as const;

/** Brand 3D icon tile: gradient fill, gloss, drop shadow; animates when a parent `.group` is hovered or active. */
export function IconBadge({
  tone,
  size = "md",
  children,
  className,
}: {
  tone: Tone;
  size?: keyof typeof SIZES;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("icon-3d [&_svg]:stroke-[2.1]", TONES[tone], SIZES[size], className)} aria-hidden>
      {children}
    </span>
  );
}
