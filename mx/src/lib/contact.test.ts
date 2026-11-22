import { describe, expect, it } from "vitest";
import { buildQuoteMessage, whatsappUrl } from "./contact";

describe("contacto por WhatsApp", () => {
  it("abre el WhatsApp de CnsExpo (+52 1 56 5796 9569)", () => {
    expect(whatsappUrl()).toBe("https://wa.me/5215657969569");
  });

  it("incluye el mensaje del formulario ya escrito en el enlace", () => {
    const msg = buildQuoteMessage({ name: "Ana", service: "Monitoreo GPS", units: "12" });
    expect(msg).toBe("Hola CnsExpo, soy Ana.\nMe interesa: Monitoreo GPS\nNúmero de unidades: 12");
    expect(whatsappUrl(msg)).toBe(`https://wa.me/5215657969569?text=${encodeURIComponent(msg)}`);
  });

  it("omite los campos opcionales vacíos", () => {
    const msg = buildQuoteMessage({ name: "Luis", company: "  ", service: "Apps móviles" });
    expect(msg).not.toContain("Empresa");
  });
});
