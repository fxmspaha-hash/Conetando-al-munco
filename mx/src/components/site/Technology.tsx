import { Cloud, Code2, Network, Smartphone } from "lucide-react";
import { IconBadge, SectionHead, type Tone } from "./Section";

const TECH_GROUPS: {
  title: string;
  description: string;
  icon: typeof Smartphone;
  tone: Tone;
  technologies: string[];
}[] = [
  {
    title: "Apps móviles",
    description: "Aplicaciones para consultar y gestionar tu operación desde cualquier lugar.",
    icon: Smartphone,
    tone: "lime",
    technologies: ["Flutter", "Java", "Android"],
  },
  {
    title: "GPS, IoT y redes",
    description:
      "Conectamos unidades, routers y dispositivos para mantener tus datos en movimiento.",
    icon: Network,
    tone: "signal",
    technologies: ["GPS", "IoT", "Routers", "WebSockets"],
  },
  {
    title: "Desarrollo full-stack",
    description: "Creamos plataformas web y APIs a la medida de tus procesos.",
    icon: Code2,
    tone: "mint",
    technologies: ["Django", "Laravel", "Flask", "C# / .NET", "ASP.NET", "APIs web"],
  },
  {
    title: "Cloud, seguridad y diseño",
    description: "Diseñamos, protegemos y desplegamos soluciones listas para crecer.",
    icon: Cloud,
    tone: "amber",
    technologies: ["AWS", "Hostinger", "Ciberseguridad", "Diseño web"],
  },
];

export function Technology() {
  return (
    <section id="tecnologias" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute -right-40 top-1/4 -z-10 size-[32rem] rounded-full bg-primary/5 blur-[120px]"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Tecnologías"
          align="center"
          title={
            <>
              De la app al servidor, <span className="accent-word">construimos tu stack.</span>
            </>
          }
          intro="Desarrollo móvil y web, monitoreo GPS, integraciones e infraestructura para acompañar toda tu operación."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TECH_GROUPS.map((group) => (
            <article
              key={group.title}
              className="group reveal surface-card rounded-3xl border border-border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <IconBadge
                tone={group.tone}
                size="md"
                className="mb-5 transition-transform duration-300 group-hover:-translate-y-1"
              >
                <group.icon />
              </IconBadge>
              <h3 className="font-display text-xl font-bold tracking-tight">{group.title}</h3>
              <p className="mt-2 min-h-12 text-sm text-muted-foreground">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Tecnologías: ${group.title}`}>
                {group.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/80"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
