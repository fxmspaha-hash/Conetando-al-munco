import { Headset, Share2, Star } from "lucide-react";
import { IconBadge, type Tone } from "./Section";
import julian from "@/assets/profile-julian.png";

const POINTS: { text: string; icon: typeof Star; tone: Tone }[] = [
  { text: "Desarrollo de soluciones tecnológicas", icon: Star, tone: "lime" },
  { text: "Integración de plataformas y servicios", icon: Share2, tone: "mint" },
  { text: "Acompañamiento y soporte continuo", icon: Headset, tone: "signal" },
];

export function Leadership() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal surface-card shadow-lift grid items-center gap-10 overflow-hidden rounded-[2rem] p-6 md:grid-cols-[320px_1fr] md:p-10">
          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-lime opacity-25 blur-2xl" aria-hidden />
            <img
              src={julian}
              alt="Julián Paredes Ortega, líder tecnológico de CnsExpo"
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top ring-1 ring-primary/30"
            />
          </div>
          <div>
            <span className="eyebrow">Liderazgo tecnológico</span>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Julián <span className="accent-word">Paredes Ortega</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Impulsamos proyectos tecnológicos con visión estratégica, atención cercana y compromiso con los
              resultados. Un equipo enfocado en crear herramientas que resuelvan problemas reales y acompañen el
              crecimiento de cada operación.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {POINTS.map((p) => (
                <li
                  key={p.text}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background/40 p-4 text-sm shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <IconBadge tone={p.tone} size="sm">
                    <p.icon />
                  </IconBadge>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
