import { Code2, LayoutGrid, MapPin, ShieldCheck, Smartphone, Network } from "lucide-react";
import { FanCards, type FanItem } from "./FanCards";
import { SectionHead } from "./Section";

const SOLUTIONS: FanItem[] = [
  {
    title: "Monitoreo GPS",
    text: "Ubicación, rutas, geocercas y alertas para mantener el control de tus unidades en todo momento.",
    icon: <MapPin />,
    tone: "signal",
    details: ["Ubicación en tiempo real", "Rutas e historial", "Geocercas", "Alertas al instante"],
  },
  {
    title: "Apps móviles",
    text: "Controla tu flota desde cualquier dispositivo con herramientas móviles conectadas.",
    icon: <Smartphone />,
    tone: "lime",
    details: [
      "Control desde el celular",
      "Notificaciones en tu dispositivo",
      "Conectadas a tu flota",
      "Fáciles de usar",
    ],
  },
  {
    title: "Soluciones ERP",
    text: "Integra y gestiona tus procesos, recursos y operación desde un solo lugar.",
    icon: <LayoutGrid />,
    tone: "mint",
    details: [
      "Procesos en un solo lugar",
      "Recursos y operación",
      "Reportes para decidir",
      "Información centralizada",
    ],
  },
  {
    title: "Sistemas ASP.NET",
    text: "Desarrollo de aplicaciones empresariales robustas, escalables y conectadas.",
    icon: <Code2 />,
    tone: "amber",
    details: [
      "Aplicaciones empresariales",
      "Robustas y escalables",
      "Conectadas a tus sistemas",
      "Mantenimiento continuo",
    ],
  },
  {
    title: "Ciberseguridad y continuidad",
    text: "Buenas prácticas, respaldo y acompañamiento para proteger la operación.",
    icon: <ShieldCheck />,
    tone: "neutral",
    details: [
      "Buenas prácticas",
      "Respaldo de información",
      "Accesos controlados",
      "Acompañamiento continuo",
    ],
  },
  {
    title: "Consultoría y desarrollo",
    text: "Nos adaptamos a tu infraestructura para integrar herramientas, conectar procesos y mantener tus sistemas funcionando.",
    icon: <Network />,
    tone: "lime",
    details: [
      "Integración de datos",
      "Desarrollo a medida",
      "Automatización",
      "Infraestructura y redes",
    ],
  },
];

export function Solutions() {
  return (
    <section id="soluciones" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Soluciones"
          title={
            <>
              Seis formas de ponernos <span className="accent-word">a trabajar</span> contigo.
            </>
          }
          intro="Pasa el cursor o toca una tarjeta para ver qué incluye y pedir información."
        />
        <FanCards items={SOLUTIONS} topic="el servicio" className="mt-14" />
      </div>
    </section>
  );
}
