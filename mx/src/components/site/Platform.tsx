import {
  Bell,
  Check,
  CircleCheck,
  Clock,
  GitBranch,
  LayoutGrid,
  MapPin,
  Radar,
  TrendingUp,
  Truck,
} from "lucide-react";
import map from "@/assets/map.png";
import { IconBadge, SectionHead, type Tone } from "./Section";

const FEATURES: { title: string; text: string; icon: typeof Bell; tone: Tone }[] = [
  {
    title: "Rastreo en tiempo real",
    text: "Ubicación exacta de cada unidad, al segundo.",
    icon: MapPin,
    tone: "lime",
  },
  {
    title: "Alertas inteligentes",
    text: "Notificaciones al instante por geocercas y eventos.",
    icon: Bell,
    tone: "mint",
  },
  {
    title: "Historial de recorridos",
    text: "Consulta rutas, paradas y eventos pasados.",
    icon: Clock,
    tone: "amber",
  },
  {
    title: "Optimización de rutas",
    text: "Reduce costos de combustible y mejora tiempos.",
    icon: TrendingUp,
    tone: "signal",
  },
];

const PINS = [
  { top: "62%", left: "57%", tone: "bg-primary" },
  { top: "22%", left: "37%", tone: "bg-mint" },
  { top: "44%", left: "33%", tone: "bg-signal" },
];

const BARS = [28, 48, 38, 66, 83, 100];

export function Platform() {
  return (
    <section id="plataforma" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHead
              eyebrow="Plataforma de monitoreo"
              title={
                <>
                  Tu flota completa, <span className="accent-word">en una pantalla.</span>
                </>
              }
              intro="Visualiza, rastrea y optimiza tus operaciones con una plataforma diseñada para empresas de transporte y logística."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f.title} className="group reveal flex gap-4">
                  <IconBadge tone={f.tone}>
                    <f.icon />
                  </IconBadge>
                  <div>
                    <h3 className="font-sans text-base font-bold tracking-normal">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <figure className="reveal relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={map}
                alt="Mapa de México con rutas GPS y unidades rastreadas"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {PINS.map((p, i) => (
                <span
                  key={i}
                  className="absolute flex size-3"
                  style={{ top: p.top, left: p.left }}
                  aria-hidden
                >
                  <span
                    className={`absolute inline-flex size-full rounded-full ${p.tone} animate-ping-soft`}
                  />
                  <span
                    className={`relative inline-flex size-3 rounded-full ${p.tone} ring-2 ring-background`}
                  />
                </span>
              ))}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[57%] top-[62%] size-36 -translate-x-1/2 -translate-y-1/2 sm:size-44"
              >
                <span className="absolute inset-0 rounded-full border border-primary/35" />
                <span className="absolute inset-[16%] rounded-full border border-primary/30" />
                <span className="absolute inset-[33%] rounded-full border border-primary/25" />
                <span
                  className="absolute left-1/2 top-1/2 h-1/2 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-primary/90 to-transparent animate-spin"
                  style={{ animationDuration: "6s" }}
                />
                <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/25 shadow-glow" />
              </div>
            </div>

            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-primary/35 bg-background/80 px-3 py-2 text-xs font-semibold shadow-card backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary animate-ping-soft" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <Radar className="size-4 text-primary" />
              Radar GPS · En vivo
            </div>

            <div className="group animate-float absolute -left-3 top-6 flex items-center gap-3 rounded-2xl border border-border glass px-4 py-3 shadow-lift sm:-left-6">
              <IconBadge tone="lime" size="sm">
                <Truck />
              </IconBadge>
              <div className="leading-tight">
                <p className="text-sm font-bold">Unidad #102</p>
                <p className="text-xs text-muted-foreground">En ruta · 72 km/h</p>
              </div>
            </div>

            <div className="absolute -bottom-8 right-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-lift sm:right-8">
              {(
                [
                  ["15", "Unidades", <Truck key="t" />, "lime"],
                  ["842 km", "Recorridos", <GitBranch key="g" />, "mint"],
                  ["98%", "Disponib.", <CircleCheck key="c" />, "signal"],
                ] as const
              ).map(([v, l, icon, tone]) => (
                <div
                  key={l}
                  className="group flex flex-col items-center glass px-4 py-3 text-center"
                >
                  <IconBadge
                    tone={tone}
                    size="sm"
                    className="mb-1.5 size-8 rounded-[10px] [&_svg]:size-4"
                  >
                    {icon}
                  </IconBadge>
                  <p className="font-display text-lg font-extrabold">{v}</p>
                  <p className="text-[0.7rem] text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </figure>
        </div>

        <div className="mt-24 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="reveal surface-card relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:min-h-[280px] md:col-span-2 xl:col-span-2">
            <div className="relative z-10 max-w-full sm:max-w-[34%]">
              <IconBadge tone="mint" size="sm">
                <LayoutGrid />
              </IconBadge>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                Rendimiento de flota
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Inventario, ventas y compras conectados en un solo panel.
              </p>
            </div>

            <div
              className="animate-float relative mt-6 flex w-full flex-col gap-3 rounded-[22px] bg-[#F4F5F0] p-[18px] text-[#0A0A0A] shadow-lift sm:absolute sm:right-0 sm:top-0 sm:mt-0 sm:w-[62%]"
              style={{ animationDelay: "-2s" }}
            >
              <div>
                <div className="text-sm font-bold">Panel ERP · CnsExpo</div>
                <div className="text-xs text-[#4B4F6B]">Inventario · Ventas · Compras</div>
              </div>
              <svg
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
                className="h-[110px] w-full"
                role="img"
                aria-label="Gráfica de actividad del panel ERP"
              >
                <defs>
                  <linearGradient id="erp-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A5C43" stopOpacity=".65" />
                    <stop offset="100%" stopColor="#1A5C43" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 80 L25 60 L50 70 L75 35 L100 50 L125 25 L150 45 L175 20 L200 35 L200 100 L0 100 Z"
                  fill="url(#erp-area-grad)"
                />
                <path
                  d="M0 80 L25 60 L50 70 L75 35 L100 50 L125 25 L150 45 L175 20 L200 35"
                  fill="none"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx="125" cy="25" r="3.5" fill="#0A0A0A" />
                <circle
                  cx="175"
                  cy="20"
                  r="3.5"
                  fill="#B6F500"
                  stroke="#0A0A0A"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </article>
          <article className="reveal surface-card rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
            <h3 className="text-lg font-bold">Unidades activas</h3>
            <p className="text-sm text-muted-foreground">Actividad de tu operación.</p>
            <div className="mt-6 flex h-28 items-end gap-2.5" aria-hidden>
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t-lg ${i === BARS.length - 1 ? "bg-gradient-lime" : "bg-signal/40"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </article>
          <article className="reveal surface-card flex items-center justify-between gap-4 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
            <div>
              <h3 className="text-lg font-bold">Tiempo operativo</h3>
              <p className="text-sm text-muted-foreground">Disponibilidad de plataforma.</p>
              <p className="mt-6 flex items-center gap-2 text-sm text-mint">
                <Check className="size-4" /> Todos los sistemas operando
              </p>
            </div>
            <div
              className="relative size-28 shrink-0 rounded-full"
              style={{ background: "conic-gradient(var(--primary) 0 99.9%, var(--muted) 0)" }}
              aria-label="99.9% de disponibilidad"
              role="img"
            >
              <div className="absolute inset-2.5 flex items-center justify-center rounded-full bg-surface">
                <span className="font-display text-xl font-extrabold">99.9%</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
