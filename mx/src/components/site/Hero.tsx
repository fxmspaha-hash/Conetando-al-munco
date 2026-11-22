import {
  Activity,
  ArrowRight,
  Cloud,
  Headset,
  MessageCircle,
  ShieldCheck,
  Truck,
  UsersRound,
  Zap,
} from "lucide-react";
import truck from "@/assets/truck.webp";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/contact";
import { IconBadge } from "./Section";

const METRICS = [
  { value: "+500", label: "Clientes activos", icon: UsersRound, tone: "lime" as const },
  { value: "+125", label: "Unidades monitoreadas", icon: Truck, tone: "mint" as const },
  { value: "99.9%", label: "Disponibilidad", icon: Activity, tone: "signal" as const },
  { value: "24/7", label: "Soporte técnico", icon: Headset, tone: "amber" as const },
];

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-background pt-18">
      <img
        src={truck}
        alt="Tractocamión azul recorriendo una carretera iluminada"
        className="absolute inset-0 -z-20 h-full w-full object-contain object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-fade-bottom" />

      <div className="mx-auto flex min-h-[min(88vh,820px)] max-w-7xl flex-col justify-center px-5 py-20 md:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-primary animate-ping-soft" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Monitoreo GPS en tiempo real
          </span>

          <h1 className="text-glow mt-6 text-[2.6rem] font-extrabold sm:text-6xl lg:text-7xl">
            El software que <span className="accent-word">sostiene</span> tu operación.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Monitoreo GPS, logística y sistemas a medida para tener el control de tu flota, desde cualquier lugar.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href={whatsappUrl("Hola CnsExpo, quiero una cotización.")} target="_blank" rel="noopener">
                <MessageCircle /> Cotizar por WhatsApp
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#soluciones">
                Ver soluciones <ArrowRight />
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            {[
              { label: "Seguro", icon: <ShieldCheck />, tone: "lime" as const },
              { label: "En tiempo real", icon: <Zap />, tone: "mint" as const },
              { label: "En la nube", icon: <Cloud />, tone: "signal" as const },
            ].map((t) => (
              <li
                key={t.label}
                className="group flex items-center gap-2.5 rounded-full border border-border glass py-1.5 pl-1.5 pr-4 shadow-card"
              >
                <IconBadge tone={t.tone} size="sm" className="size-8 rounded-full [&_svg]:size-4">
                  {t.icon}
                </IconBadge>
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border glass shadow-lift md:grid-cols-4">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`group flex items-center gap-3 px-4 py-5 transition-colors hover:bg-white/[0.04] sm:gap-4 sm:px-5 md:px-4 lg:px-6 ${i % 2 === 1 ? "border-l border-border" : ""} ${i >= 2 ? "border-t border-border md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <IconBadge tone={m.tone} size="sm" className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5">
                <m.icon />
              </IconBadge>
              <div className="min-w-0">
                <dt className="text-[0.65rem] font-semibold uppercase leading-tight tracking-wider text-muted-foreground sm:text-xs">
                  {m.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-2xl lg:text-3xl">
                  {m.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
