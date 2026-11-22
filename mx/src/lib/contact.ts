export const CONTACT = {
  phoneDisplay: "+52 56 5796 9569",
  phoneHref: "tel:+525657969569",
  whatsappNumber: "5215657969569",
  email: "contacto@cnsexpo.com",
  location: "Nuevo Laredo, Tamaulipas",
} as const;

export type QuoteRequest = {
  name: string;
  company?: string;
  service: string;
  units?: string;
  message?: string;
};

/** Base WhatsApp link, optionally with a prefilled text. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Turns the contact form into a ready-to-send WhatsApp message. */
export function buildQuoteMessage(req: QuoteRequest): string {
  const lines = [
    `Hola CnsExpo, soy ${req.name.trim()}.`,
    req.company?.trim() ? `Empresa: ${req.company.trim()}` : null,
    `Me interesa: ${req.service}`,
    req.units?.trim() ? `Número de unidades: ${req.units.trim()}` : null,
    req.message?.trim() ? `\n${req.message.trim()}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}
