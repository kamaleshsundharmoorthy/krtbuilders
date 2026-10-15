import type { Reason } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { LineIcon } from "@/components/ui/Icons";

export function WhyChooseUs({ reasons }: { reasons: Reason[] }) {
  return (
    <section className=" bg-background" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading id="why-title" eyebrow="Why choose us" title={["Why people", "build with us."]} />
        <Stagger className="mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5 md:mt-20" gap={0.05}>
          {reasons.map((r, i) => (
            <StaggerItem key={r.id} className="group relative border-b border-r border-border p-7 transition-colors duration-500 hover:bg-secondary md:p-8">
              <div className="flex items-start justify-between">
                <LineIcon name={r.icon} className="h-9 w-9 text-primary transition-colors duration-500 group-hover:text-primary-light" />
                <span className="font-display text-xs font-bold text-muted/60 transition-colors group-hover:text-white/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-10 font-display text-lg font-bold leading-tight tracking-tight transition-colors duration-500 group-hover:text-white">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/60">{r.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
