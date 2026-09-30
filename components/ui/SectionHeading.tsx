import type { ReactNode } from "react";
import { Reveal, RevealLines } from "./Motion";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  size = "lg",
  action,
  className = "",
  id,
}: {
  eyebrow?: string;
  title: ReactNode[] | string;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  size?: "lg" | "narrow" | "md";
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  const lines = typeof title === "string" ? [title] : title;
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-8 ${action ? "lg:flex-row lg:items-end lg:justify-between" : ""} ${className}`}>
      <div className={`max-w-4xl ${center ? "mx-auto text-center" : ""}`}>
        {eyebrow && (
          <Reveal>
            <p className={`eyebrow mb-6 ${tone === "dark" ? "text-white/70" : "text-muted"} ${center ? "justify-center" : ""}`}>{eyebrow}</p>
          </Reveal>
        )}
        <h2 id={id} className={`${size === "lg" ? "display-lg" : size === "narrow" ? "display-lg-narrow" : "display-md"} ${tone === "dark" ? "text-white" : "text-ink"}`}>
          <RevealLines lines={lines} />
        </h2>
        {lead && (
          <Reveal delay={0.15}>
            <p className={`mt-8 max-w-2xl text-lg leading-relaxed ${tone === "dark" ? "text-white/65" : "text-muted"} ${center ? "mx-auto" : ""}`}>{lead}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.2} className="shrink-0">{action}</Reveal>}
    </div>
  );
}
