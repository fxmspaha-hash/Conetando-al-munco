import { Check, Code2, Headset, PenLine, Search, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { FanCards, type FanItem } from "./FanCards";
import { SectionHead } from "./Section";

const WHY: FanItem[] = [
  {
    title: "Seguridad garantizada",
    text: "Datos cifrados y accesos controlados en todo momento.",
    icon: <ShieldCheck />,
    tone: "lime",
    details: ["Datos cifrados", "Accesos controlados", "Respaldo de información", "Buenas prácticas"],
  },
  {
    title: "Tiempo real siempre",
    text: "Actualizaciones al segundo, sin interrupciones.",
    icon: <Zap />,
    tone: "mint",
    details: ["Actualización al segundo", "Alertas inmediatas", "Plataforma en la nube", "99.9% de disponibilidad"],
  },
  {
    title: "Escalabilidad real",
    text: "Crece con tu negocio sin rediseñar desde cero.",
    icon: <TrendingUp />,
    tone: "amber",
    details: ["Agrega unidades cuando quieras", "Nuevos módulos", "Sin empezar de cero", "Integración con lo que ya usas"],
  },
  {
    title: "Soporte 24/7",
    text: "Estamos contigo antes, durante y después del lanzamiento.",
    icon: <Headset />,
    tone: "signal",
    details: ["Atención 24/7", "Por teléfono y WhatsApp", "Acompañamiento continuo", "Respuesta rápida"],
  },
];

const STEPS: FanItem[] = [
  {
    title: "Diagnóstico",
    text: "Escuchamos tus objetivos, analizamos tus procesos y definimos el alcance.",
    icon: <Search />,
    tone: "lime",
    details: ["Reunión inicial", "Análisis de procesos", "Objetivos claros", "Alcance definido"],
  },
  {
    title: "Diseño",
    text: "Planeamos la experiencia, la arquitectura y la tecnología adecuada.",
    icon: <PenLine />,
    tone: "mint",
    details: ["Experiencia de uso", "Arquitectura", "Tecnología adecuada", "Plan de trabajo"],
  },
  {
    title: "Desarrollo",
    text: "Construimos, integramos y validamos cada parte de la solución.",
    icon: <Code2 />,
    tone: "amber",
    details: ["Construcción", "Integración", "Pruebas", "Validación contigo"],
  },
  {
    title: "Despliegue",
    text: "Ponemos el sistema en marcha y te acompañamos en su evolución.",
    icon: <Check />,
    tone: "neutral",
    details: ["Puesta en marcha", "Seguimiento", "Mejoras continuas", "Soporte permanente"],
  },
];

export function Process() {
  return (
    <>
      <section className="py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead className="lg:sticky lg:top-28 lg:self-start"
            eyebrow="Por qué elegirnos"
            title={
              <>
                Blindamos lo que más te <span className="accent-word">importa.</span>
              </>
            }
            intro="Tecnología, experiencia y soporte para que tu operación nunca se detenga."
          />
          <FanCards items={WHY} />
        </div>
      </section>

      <section id="proceso" className="py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead className="lg:sticky lg:top-28 lg:self-start"
            eyebrow="Nuestro proceso"
            title={
              <>
                Del primer café al <span className="accent-word">servidor en producción.</span>
              </>
            }
            intro="Un proceso transparente para convertir tus necesidades en soluciones reales."
          />
          <FanCards items={STEPS} topic="la etapa de" />
        </div>
      </section>
    </>
  );
}
