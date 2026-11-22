import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { Footer, WhatsAppButton } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Leadership } from "@/components/site/Leadership";
import { Platform } from "@/components/site/Platform";
import { Process } from "@/components/site/Process";
import { Solutions } from "@/components/site/Solutions";
import { Technology } from "@/components/site/Technology";
import { Testimonials } from "@/components/site/Testimonials";
import { ZRouterShowcase } from "@/components/site/ZRouterShowcase";

const TITLE = "CnsExpo | Monitoreo GPS, logística y desarrollo de software";
const DESCRIPTION =
  "Monitoreo GPS en tiempo real, apps móviles, ERP y software a medida para empresas de transporte y logística en México.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#soluciones"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Platform />
        <ZRouterShowcase />
        <Technology />
        <Process />
        <Testimonials />
        <Leadership />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
