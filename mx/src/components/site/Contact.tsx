import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildQuoteMessage, CONTACT, whatsappUrl } from "@/lib/contact";
import { IconBadge } from "./Section";

const SERVICES = [
  "Monitoreo GPS",
  "Apps móviles",
  "Soluciones ERP",
  "Sistemas ASP.NET",
  "Ciberseguridad y continuidad",
  "Desarrollo a medida",
  "Otro / no estoy seguro",
];

const fieldClass = "h-12 rounded-xl border-input bg-background/60 px-4 text-base md:text-sm";

export function Contact() {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    if (name.length < 2) {
      setError("Escribe tu nombre para poder atenderte.");
      return;
    }
    setError(null);
    const message = buildQuoteMessage({
      name,
      company: String(data.get("company") ?? ""),
      service: String(data.get("service") ?? SERVICES[0]),
      units: String(data.get("units") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    window.open(whatsappUrl(message), "_blank", "noopener");
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal">
          <span className="eyebrow">Hablemos de tu proyecto</span>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Cuéntanos qué necesitas y lo <span className="accent-word">ponemos en marcha.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Respondemos por WhatsApp. Llena el formulario y el mensaje se escribe solo.
          </p>

          <ul className="mt-10 grid gap-3">
            <li>
              <a href={CONTACT.phoneHref} className="group flex items-center gap-4 rounded-2xl p-2 transition-all duration-300 hover:bg-foreground/5 hover:shadow-card">
                <IconBadge tone="lime">
                  <Phone />
                </IconBadge>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">Llámanos</span>
                  <span className="font-semibold group-hover:text-primary">{CONTACT.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="group flex items-center gap-4 rounded-2xl p-2 transition-all duration-300 hover:bg-foreground/5 hover:shadow-card">
                <IconBadge tone="mint">
                  <MessageCircle />
                </IconBadge>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</span>
                  <span className="font-semibold group-hover:text-primary">{CONTACT.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4 rounded-2xl p-2 transition-all duration-300 hover:bg-foreground/5 hover:shadow-card">
                <IconBadge tone="signal">
                  <Mail />
                </IconBadge>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">Correo</span>
                  <span className="font-semibold group-hover:text-primary">{CONTACT.email}</span>
                </span>
              </a>
            </li>
            <li className="group flex items-center gap-4 p-2">
              <IconBadge tone="neutral">
                <MapPin />
              </IconBadge>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted-foreground">Ubicación</span>
                <span className="font-semibold">{CONTACT.location}</span>
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="reveal surface-card shadow-lift grid gap-5 rounded-[2rem] p-6 md:p-9" aria-label="Solicitar cotización">
          <div>
            <h3 className="text-2xl font-bold">Solicita tu cotización</h3>
            <p className="mt-1 text-sm text-muted-foreground">Tarda menos de un minuto.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Tu nombre"
                className={fieldClass}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "name-error" : undefined}
              />
              {error && (
                <p id="name-error" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" name="company" autoComplete="organization" placeholder="Opcional" className={fieldClass} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-2">
              <Label htmlFor="service">¿Qué te interesa?</Label>
              <select
                id="service"
                name="service"
                className={`${fieldClass} w-full appearance-none border bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 text-foreground outline-none focus-visible:border-primary`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239ca0a8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
                defaultValue={SERVICES[0]}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-background">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="units">N.º de unidades</Label>
              <Input id="units" name="units" inputMode="numeric" placeholder="Ej. 10" className={fieldClass} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Cuéntanos brevemente tu operación o lo que necesitas"
              className="rounded-xl border-input bg-background/60 px-4 py-3 text-base md:text-sm"
            />
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full">
            <Send /> Enviar por WhatsApp
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            ¿Prefieres correo? Escríbenos a{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-primary underline-offset-4 hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
