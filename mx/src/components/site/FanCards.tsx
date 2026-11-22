import { useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { IconBadge, TONES, type Tone } from "./Section";

export type FanItem = {
  title: string;
  text: string;
  icon: ReactNode;
  tone: Tone;
  details: string[];
};

/**
 * Stack of horizontal cards in a column. The open card unfolds downward (content in two
 * columns: description + CTA, and what it includes); the others fold into a slim row.
 * Mouse hover previews a card; clicking remains available for touch and keyboard users.
 */
export function FanCards({
  items,
  topic,
  className,
}: {
  items: FanItem[];
  /** Prefix in the WhatsApp message, e.g. "el servicio" → "…información sobre el servicio X". */
  topic?: string;
  className?: string;
}) {
  const [active, setActive] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(false);
  const baseId = useId();
  const cursorRef = useRef<HTMLSpanElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !cursorRef.current) return;
    cursorRef.current.style.left = `${event.clientX}px`;
    cursorRef.current.style.top = `${event.clientY}px`;
  };

  return (
    <div
      className="relative"
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setCursorVisible(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setCursorVisible(false);
          setActive(-1);
        }
      }}
    >
      <span
        ref={cursorRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[60] hidden size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 bg-primary/15 shadow-glow transition-opacity duration-200 md:block",
          cursorVisible ? "opacity-100" : "opacity-0",
        )}
      />
      <ul className={cn("flex flex-col gap-3", className)}>
        {items.map((item, i) => {
          const on = i === active;
          const panelId = `${baseId}-panel-${i}`;
          const num = String(i + 1).padStart(2, "0");
          return (
            <li
              key={item.title}
              data-on={on}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(i);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") setActive(-1);
              }}
              className={cn(
                "group reveal @container relative overflow-hidden rounded-3xl border bg-surface transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                TONES[item.tone],
                on
                  ? "border-transparent shadow-tone"
                  : "border-border shadow-card hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lift",
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-tone-glow blur-2xl transition-opacity duration-700",
                  on ? "opacity-60" : "opacity-0 group-hover:opacity-25",
                )}
              />
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-grid transition-opacity duration-700 [mask-image:linear-gradient(to_left,black,transparent_60%)]",
                  on ? "opacity-40" : "opacity-0",
                )}
              />

              {/* Row header */}
              <button
                type="button"
                onClick={() => setActive(on ? -1 : i)}
                aria-expanded={on}
                aria-controls={panelId}
                className="relative flex w-full items-center gap-4 p-4 text-left md:gap-6 md:px-7 md:py-5"
              >
                <span
                  className={cn(
                    "hidden w-10 font-display text-sm font-bold transition-colors md:block",
                    on ? "text-[var(--tone)]" : "text-muted-foreground/60",
                  )}
                >
                  {num}
                </span>
                <IconBadge
                  tone={item.tone}
                  size="md"
                  className="max-md:size-10 max-md:rounded-[13px]"
                >
                  {item.icon}
                </IconBadge>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-bold tracking-tight md:text-2xl">
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "hidden truncate text-sm text-muted-foreground transition-opacity duration-300 md:block",
                      on && "md:opacity-0",
                    )}
                  >
                    {item.text}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                    on
                      ? "rotate-45 border-transparent bg-gradient-lime text-primary-foreground shadow-glow"
                      : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary",
                  )}
                >
                  <Plus className="size-5" />
                </span>
              </button>

              {/* Unfolding panel */}
              <div
                id={panelId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                  on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "relative grid gap-6 px-4 pb-6 transition-[opacity,transform] duration-500 md:px-7 md:pb-8 @3xl:grid-cols-[1.1fr_1fr] @3xl:gap-10 @3xl:pl-[8.5rem]",
                      on ? "translate-y-0 opacity-100 delay-150" : "-translate-y-3 opacity-0",
                    )}
                  >
                    <div className="flex flex-col">
                      <p className="text-muted-foreground md:text-lg">{item.text}</p>
                      <Button asChild variant="hero" size="pill" className="mt-6 self-start">
                        <a
                          href={whatsappUrl(
                            `Hola CnsExpo, quiero información sobre ${topic ? `${topic} ` : ""}${item.title}.`,
                          )}
                          target="_blank"
                          rel="noopener"
                          tabIndex={on ? 0 : -1}
                        >
                          Pedir información <ArrowUpRight />
                        </a>
                      </Button>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/50 p-5 shadow-card">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Incluye
                      </p>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {item.details.map((d) => (
                          <li key={d} className="flex items-center gap-3 text-sm">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--tone)_22%,transparent)] text-[var(--tone)]">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
