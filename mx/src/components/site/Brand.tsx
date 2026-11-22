import logo from "@/assets/Logo.jpg";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <a href="#inicio" className={cn("flex items-center gap-3", className)} aria-label="CnsExpo, ir al inicio">
      <img
        src={logo}
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-xl ring-1 ring-primary/30"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight">CnsExpo</span>
        <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          GPS & Logística
        </span>
      </span>
    </a>
  );
}
