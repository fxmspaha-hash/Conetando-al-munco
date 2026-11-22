import { MessageCircle } from "lucide-react";
import { CONTACT, whatsappUrl } from "@/lib/contact";
import { Brand } from "./Brand";
import { NAV_ITEMS } from "./nav-items";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <Brand />
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {NAV_ITEMS.map((i) => (
            <a key={i.id} href={`#${i.id}`} className="hover:text-foreground">
              {i.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 pb-24 text-xs text-muted-foreground md:flex-row md:justify-between md:px-8 md:pb-6 md:pr-24">
          <span>© {new Date().getFullYear()} CnsExpo. Todos los derechos reservados.</span>
          <span>{CONTACT.location}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl("Hola CnsExpo, quiero más información.")}
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-gradient-lime text-primary-foreground shadow-glow transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
