import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Battery,
  Database,
  LayoutGrid,
  MapPin,
  Network,
  Pause,
  Play,
  Plus,
  RotateCcw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import appHome from "@/assets/zrouter-app-home.png";
import appChat from "@/assets/zrouter-app-chat.png";
import adminDashboard from "@/assets/zrouter-admin-dashboard.png";
import { cn } from "@/lib/utils";
import { IconBadge, SectionHead, TONES, type Tone } from "./Section";

const CAPABILITIES: {
  title: string;
  text: string;
  icon: typeof LayoutGrid;
  tone: Tone;
}[] = [
  {
    title: "App Android en Java",
    text: "Operación, ruta, telemetría y chat para el equipo en campo.",
    icon: Smartphone,
    tone: "signal",
  },
  {
    title: "Panel administrativo Django",
    text: "Vista central de operadores, unidades y actividad de la operación.",
    icon: LayoutGrid,
    tone: "lime",
  },
  {
    title: "WebSockets y JSON",
    text: "Intercambio de estados y mensajes entre la app y el panel.",
    icon: Network,
    tone: "mint",
  },
  {
    title: "Administración transparente",
    text: "Las opciones de continuidad requieren autorización del usuario y dependen de Android y del dispositivo.",
    icon: ShieldCheck,
    tone: "amber",
  },
];

const GALLERY = [
  {
    src: appHome,
    alt: "Pantalla principal de la app ZRouter con el mapa y una operación GPS",
    title: "App ZRouter",
    description: "Ruta y estado de la unidad",
  },
  {
    src: appChat,
    alt: "Chat operativo de ZRouter entre el operador, supervisor y sistema",
    title: "Chat operativo",
    description: "Coordinación en tiempo real",
  },
  {
    src: adminDashboard,
    alt: "Panel web de ZRouter con mapa, actividad y estado del sistema",
    title: "Panel de control Django",
    description: "Monitoreo y administración desde la web",
  },
] as const;

const PHASES: {
  title: string;
  summary: string;
  icon: typeof ShieldCheck;
  tone: Tone;
  details: string[];
}[] = [
  {
    title: "Permisos y activación",
    summary: "Lo declarado por la app y lo que cada usuario debe autorizar en Android.",
    icon: ShieldCheck,
    tone: "signal",
    details: [
      "Conectividad: INTERNET y estado de red permiten comunicarse y consultar la conexión; INTERNET normalmente no muestra un diálogo.",
      "Servicio y batería: notificaciones, servicio foreground (dataSync / mediaProjection), WAKE_LOCK y solicitud de exención de batería están sujetos a límites del sistema; la exención requiere aprobación del usuario.",
      "Arranque y ubicación: RECEIVE_BOOT_COMPLETED permite intentar reaccionar al inicio. Ubicación precisa, aproximada y en segundo plano tiene requisitos que varían según Android.",
      "Permisos sensibles descritos: leer, enviar y recibir SMS/MMS; cámara, micrófono y ajustes de audio; contactos, cuentas y perfil; fotos, vídeo, audio y archivos. MediaProjection requiere autorización del usuario; el acceso amplio a archivos y medios puede requerir Ajustes.",
      "Acceso especial: SYSTEM_ALERT_WINDOW se habilita manualmente; Accesibilidad debe activarse en Ajustes; Device Admin clásico también requiere aceptación. PermissionManager intenta comprobar o solicitar permisos, pero declararlos no los concede ni prueba que se estén usando.",
    ],
  },
  {
    title: "Inicio y servicio activo",
    summary: "El servicio visible y los intentos de reactivación dependen del sistema.",
    icon: RotateCcw,
    tone: "lime",
    details: [
      "ParentalControlService se describe como un servicio foreground. Cuando Android permite iniciarlo, debe mostrar una notificación; ser foreground no lo hace inmune a las restricciones.",
      "BootReceiver intenta iniciarlo después de BOOT_COMPLETED y de una actualización o reemplazo de la app.",
      "En Android 14 o posterior, la descripción reporta trabajos de respaldo con JobScheduler y varios reintentos retrasados. Android decide cuándo corren; algunos pueden depender de la red.",
      "El servicio también intenta reiniciarse si el sistema lo destruye. Forzar la detención, revocar permisos, desinstalar o restringir el inicio automático puede impedir la reactivación. Nada de esto garantiza operación continua o inmediata.",
    ],
  },
  {
    title: "Operación GPS y comunicación",
    summary: "La app móvil se presenta junto al panel y sus funciones de ubicación y mensajería.",
    icon: MapPin,
    tone: "mint",
    details: [
      "La experiencia presentada incluye una app Android en Java para operación móvil, ruta, telemetría y chat, junto con un panel administrativo Django.",
      "La comunicación se describe mediante WebSockets y JSON. El acceso a ubicación depende de los permisos concedidos, la versión de Android y las restricciones para trabajar en segundo plano.",
      "La presencia de permisos para SMS/MMS, cámara, audio, contactos o archivos no demuestra que esas funciones formen parte de cada flujo. Su uso efectivo debe comprobarse en el código y explicarse al usuario.",
    ],
  },
  {
    title: "Batería y disponibilidad",
    summary: "Ahorro de energía, Doze y ajustes del fabricante pueden retrasar tareas.",
    icon: Battery,
    tone: "amber",
    details: [
      "MainActivity puede solicitar una exención de optimización de batería. La declaración no la concede: el usuario decide desde Android y la exención no garantiza que la app permanezca siempre activa.",
      "Doze, el modo de ahorro y controles del fabricante pueden retrasar conexiones y trabajos; algunos dispositivos tienen opciones separadas de inicio automático y actividad en segundo plano.",
      "WAKE_LOCK, ubicación, sensores y red aumentan el consumo. Si la batería se agota y el teléfono se apaga, la app no puede ejecutarse.",
    ],
  },
  {
    title: "Device Admin y Accesibilidad",
    summary: "El administrador clásico no equivale a Android Enterprise ni a control ilimitado.",
    icon: Activity,
    tone: "signal",
    details: [
      "El flujo descrito solicita al usuario activar Device Admin; su receptor recibe eventos de activación y desactivación. Una advertencia al desactivarlo no demuestra que la app pueda impedirlo.",
      "device_admin_config.xml declara políticas de contraseña, bloqueo, cámara y borrado. Según la revisión compartida, no se encontraron llamadas que ejecuten esas acciones: declarar políticas no significa aplicarlas.",
      "No se reporta inscripción como Android Enterprise Device Owner o Profile Owner, necesaria para capacidades MDM empresariales más amplias.",
      "El intento de habilitar Accesibilidad desde MainActivity podría fallar porque requiere privilegios superiores; además, la referencia reportada usa com.example.parentalcontrol y no coincide con com.app.zgarbage. No se puede concluir que Device Admin habilite ese servicio.",
    ],
  },
  {
    title: "Datos y consentimiento",
    summary: "La continuidad del proceso no confirma cómo se guardan o protegen los datos.",
    icon: Database,
    tone: "mint",
    details: [
      "Que el servicio intente volver a iniciar no revela dónde se guardan configuraciones, registros o datos personales ni cuánto tiempo se conservan; para confirmarlo hay que revisar el código de almacenamiento.",
      "La revisión reporta que el manifiesto permite tráfico sin cifrar mediante usesCleartextTraffic. Debe verificarse que ningún dato sensible se envíe por HTTP.",
      "Ubicación, mensajes, cámara, micrófono, Accesibilidad y administración requieren transparencia, finalidad limitada y consentimiento de quien utiliza y controla el teléfono.",
      "Este resumen refleja la descripción técnica compartida; no certifica que cada permiso esté concedido, que todas las funciones estén activas o que Android permita ejecutarlas.",
    ],
  },
];

export function ZRouterShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePhase, setActivePhase] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(false);
  const phaseId = useId();
  const cursorRef = useRef<HTMLSpanElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !cursorRef.current) return;
    cursorRef.current.style.left = `${event.clientX}px`;
    cursorRef.current.style.top = `${event.clientY}px`;
  };

  useEffect(() => {
    if (!isPlaying || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % GALLERY.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPlaying]);

  const currentSlide = GALLERY[activeSlide] ?? GALLERY[0];
  const goToSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + GALLERY.length) % GALLERY.length);
  };

  return (
    <section
      id="zrouter"
      className="relative overflow-hidden py-24 md:py-32"
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setCursorVisible(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setCursorVisible(false);
      }}
    >
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 -z-10 size-[30rem] rounded-full bg-signal/10 blur-[120px]"
      />
      <span
        ref={cursorRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[60] hidden size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(182,245,0,0.12)_0%,transparent_72%)] blur-md transition-opacity duration-200 md:block",
          cursorVisible ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="ZRouter · GPS y logística"
              title={
                <>
                  Tu operación móvil, <span className="accent-word">conectada al panel.</span>
                </>
              }
              intro="Una app Android en Java y un panel administrativo en Django, comunicados mediante WebSockets y JSON."
            />

            <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {CAPABILITIES.map((capability) => (
                <li key={capability.title} className="group flex gap-3">
                  <IconBadge tone={capability.tone} size="sm">
                    <capability.icon />
                  </IconBadge>
                  <div>
                    <h3 className="font-bold">{capability.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{capability.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <figure
            className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card"
            aria-roledescription="carrusel"
            aria-label="Galería de la app ZRouter y su panel administrativo"
          >
            <div className="flex h-[24rem] items-center justify-center overflow-hidden bg-[#080612] p-3 sm:h-[32rem]">
              <img
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="h-full w-full object-contain transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
            <figcaption className="border-t border-border px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div aria-live="polite" aria-atomic="true">
                  <h3 className="font-display font-bold tracking-tight">{currentSlide.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{currentSlide.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToSlide(-1)}
                    aria-label="Ver imagen anterior"
                    className="rounded-full border border-border p-2 transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ArrowLeft aria-hidden="true" size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((playing) => !playing)}
                    aria-label={
                      isPlaying ? "Pausar cambio automático" : "Reanudar cambio automático"
                    }
                    className="rounded-full border border-border p-2 transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {isPlaying ? (
                      <Pause aria-hidden="true" size={18} />
                    ) : (
                      <Play aria-hidden="true" size={18} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(1)}
                    aria-label="Ver imagen siguiente"
                    className="rounded-full border border-border p-2 transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ArrowRight aria-hidden="true" size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex gap-2" aria-label="Elegir imagen">
                  {GALLERY.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Mostrar imagen ${index + 1}: ${slide.title}`}
                      aria-current={index === activeSlide ? "true" : undefined}
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        index === activeSlide ? "w-7 bg-primary" : "w-2.5 bg-muted-foreground/40"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {activeSlide + 1} / {GALLERY.length}
                </span>
              </div>
            </figcaption>
          </figure>
        </div>

        <div className="mt-20">
          <div className="mb-8">
            <IconBadge tone="signal" size="sm">
              <ShieldCheck />
            </IconBadge>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
              ZRouter paso a paso
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Explora cada fase. Pasa el cursor para desplegar una tarjeta o tócala para abrirla; en
              todos los casos, los permisos y límites finales los controla Android y la persona
              usuaria.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {PHASES.map((phase, index) => {
              const isOpen = activePhase === index;
              const panelId = `${phaseId}-panel-${index}`;

              return (
                <li
                  key={phase.title}
                  data-on={isOpen}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActivePhase(index);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") setActivePhase(-1);
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border bg-surface transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                    TONES[phase.tone],
                    isOpen
                      ? "border-transparent shadow-tone"
                      : "border-border shadow-card hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lift",
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-tone-glow blur-2xl transition-opacity duration-700",
                      isOpen ? "opacity-50" : "opacity-0 group-hover:opacity-20",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setActivePhase(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="relative flex w-full items-center gap-4 p-4 text-left md:gap-6 md:px-7 md:py-5"
                  >
                    <span className="hidden w-10 font-display text-sm font-bold text-muted-foreground/60 md:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <IconBadge
                      tone={phase.tone}
                      size="md"
                      className="max-md:size-10 max-md:rounded-[13px]"
                    >
                      <phase.icon />
                    </IconBadge>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold tracking-tight md:text-2xl">
                        {phase.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {phase.summary}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        isOpen
                          ? "rotate-45 border-transparent bg-gradient-lime text-primary-foreground shadow-glow"
                          : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary",
                      )}
                    >
                      <Plus className="size-5" />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    aria-hidden={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul
                        className={cn(
                          "relative grid gap-3 px-4 pb-6 text-sm leading-relaxed text-muted-foreground transition-[opacity,transform] duration-500 md:px-7 md:pb-8 md:pl-[8.5rem]",
                          isOpen
                            ? "translate-y-0 opacity-100 delay-150"
                            : "-translate-y-3 opacity-0",
                        )}
                      >
                        {phase.details.map((detail) => (
                          <li key={detail} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--tone)]"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
