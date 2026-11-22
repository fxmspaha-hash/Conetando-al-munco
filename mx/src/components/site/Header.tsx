import { useEffect, useState } from "react";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Brand } from "./Brand";
import { NAV_ITEMS } from "./nav-items";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = NAV_ITEMS.map((n) => n.id);

export function Header() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Brand />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                active === item.id && "bg-foreground/[0.06] text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="pill" className="hidden sm:inline-flex">
            <a href={whatsappUrl("Hola CnsExpo, quiero una cotización.")} target="_blank" rel="noopener">
              <MessageCircle /> Cotizar por WhatsApp
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" className="size-11 lg:hidden" aria-label="Abrir menú">
                <Menu className="size-5!" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85%] flex-col gap-8 border-border bg-background">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <Brand />
              <nav aria-label="Móvil" className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="rounded-xl px-4 py-3.5 font-display text-2xl font-semibold tracking-tight transition-colors hover:bg-foreground/5 hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <Button asChild variant="hero" size="xl" className="mt-auto">
                <a href={whatsappUrl("Hola CnsExpo, quiero una cotización.")} target="_blank" rel="noopener">
                  <MessageCircle /> Cotizar por WhatsApp
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
