import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Headset, Quote, Star, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconBadge, SectionHead, type Tone } from "./Section";

const TESTIMONIALS: {
  quote: string;
  name: string;
  company: string;
  initials: string;
  tone: Tone;
}[] = [
  {
    quote:
      "CnsExpo nos ha brindado una solución confiable y fácil de usar. Ahora tenemos el control total de nuestra flota en tiempo real.",
    name: "Juan Pérez",
    company: "Transportes del Norte",
    initials: "JP",
    tone: "lime",
  },
  {
    quote:
      "El soporte es excelente. Cualquier duda la resuelven rápido y el sistema funciona sin interrupciones. Muy recomendado.",
    name: "María Rodríguez",
    company: "Logística Express MX",
    initials: "MR",
    tone: "mint",
  },
  {
    quote:
      "Hemos reducido costos operativos gracias a la optimización de rutas. La plataforma es intuitiva y el equipo siempre disponible.",
    name: "Carlos García",
    company: "Distribuidora Central",
    initials: "CG",
    tone: "signal",
  },
];

const STATS = [
  { value: "5/5", label: "Calificación de nuestros clientes", icon: Star, tone: "amber" as const },
  { value: "+500", label: "Clientes activos", icon: UsersRound, tone: "lime" as const },
  { value: "24/7", label: "Soporte técnico", icon: Headset, tone: "signal" as const },
];

const ROTATE_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const current = TESTIMONIALS[index] ?? TESTIMONIALS[0]!;

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, count]);

  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <section id="testimonios" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute left-[-10%] top-1/3 -z-10 h-[420px] w-[620px] rounded-full bg-signal/10 blur-[120px]"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Clientes"
            title={
              <>
                Lo que dicen quienes ya <span className="accent-word">confían en nosotros.</span>
              </>
            }
            intro="Empresas de transporte, logística y distribución que operan con CnsExpo."
          />
          <dl className="reveal grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-lift">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-2 bg-surface px-3 py-4 sm:flex-row sm:items-center sm:gap-3 md:px-5"
              >
                <IconBadge
                  tone={s.tone}
                  size="sm"
                  className="size-9 shrink-0 rounded-xl [&_svg]:size-4"
                >
                  <s.icon />
                </IconBadge>
                <div className="min-w-0">
                  <dt className="text-[0.68rem] leading-tight text-muted-foreground md:text-xs">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                    {s.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Featured quote */}
          <figure
            className={cn(
              "group reveal relative flex min-h-[340px] flex-col overflow-hidden rounded-[2rem] border border-transparent bg-surface p-7 shadow-tone md:p-10",
              `tone-${current.tone}`,
            )}
            data-on="true"
            aria-live="polite"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-tone-glow opacity-50 blur-2xl transition-all duration-700"
            />
            <Quote
              aria-hidden
              className="absolute right-8 top-8 size-20 text-[var(--tone)] opacity-15 md:size-28"
            />

            <div className="flex gap-1 text-amber" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-5 fill-current drop-shadow-[0_2px_6px_var(--amber)]"
                  aria-hidden
                />
              ))}
            </div>

            <blockquote
              key={index}
              className="relative mt-6 flex-1 animate-in fade-in slide-in-from-bottom-3 duration-700"
            >
              <p className="font-display text-2xl font-semibold leading-snug tracking-tight md:text-[2rem]">
                “{current.quote}”
              </p>
            </blockquote>

            <figcaption className="relative mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
              <span
                key={`a-${index}`}
                className="flex items-center gap-4 animate-in fade-in duration-700"
              >
                <span
                  className={cn(
                    "icon-3d size-14 rounded-full font-display text-base font-bold",
                    `tone-${current.tone}`,
                  )}
                >
                  {current.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-lg font-bold">{current.name}</span>
                  <span className="text-sm text-muted-foreground">{current.company}</span>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Testimonio anterior"
                  className="flex size-11 items-center justify-center rounded-full border border-border bg-background/50 shadow-card transition-all hover:border-primary/60 hover:text-primary"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Siguiente testimonio"
                  className="flex size-11 items-center justify-center rounded-full bg-gradient-lime text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  <ChevronRight className="size-5" />
                </button>
              </span>
            </figcaption>

            {/* progress */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-foreground/5">
              <div
                key={`p-${index}-${paused}`}
                className="h-full origin-left bg-[var(--tone)]"
                style={{
                  animation: paused ? "none" : `progress-x ${ROTATE_MS}ms linear forwards`,
                  transform: paused ? "scaleX(0)" : undefined,
                }}
              />
            </div>
          </figure>

          {/* Selector */}
          <ul className="flex flex-col gap-3" aria-label="Elegir testimonio">
            {TESTIMONIALS.map((t, i) => {
              const on = i === index;
              return (
                <li key={t.name} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={on}
                    data-on={on}
                    className={cn(
                      "group reveal flex h-full w-full items-center gap-4 rounded-3xl border p-5 text-left transition-all duration-500",
                      `tone-${t.tone}`,
                      on
                        ? "border-transparent bg-surface-2 shadow-tone"
                        : "border-border bg-surface shadow-card hover:-translate-y-0.5 hover:shadow-lift",
                    )}
                  >
                    <IconBadge
                      tone={t.tone}
                      size="md"
                      className="rounded-full font-display text-sm font-bold"
                    >
                      {t.initials}
                    </IconBadge>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block font-bold">{t.name}</span>
                      <span className="text-sm text-muted-foreground">{t.company}</span>
                      <span className="mt-2 line-clamp-1 text-sm text-muted-foreground/80">
                        “{t.quote}”
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Client marquee */}
        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 py-2 hover:[animation-play-state:paused]">
            {[0, 1, 2, 3].flatMap((k) =>
              TESTIMONIALS.map((t) => (
                <span
                  key={`${k}-${t.company}`}
                  className="flex items-center gap-3 font-display text-xl font-bold tracking-tight whitespace-nowrap text-muted-foreground/60"
                  aria-hidden={k > 0}
                >
                  <span className="size-2 rounded-full bg-primary shadow-glow" />
                  {t.company}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
