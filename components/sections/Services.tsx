import Link from "next/link";
import type { Service } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { Arrow } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/services#${service.slug}`} className="group block h-full" aria-label={`${service.title} — learn more`}>
      <article className="flex h-full flex-col">
        <div className="img-frame relative aspect-[4/3]">
          <Photo image={service.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-secondary/10 transition-colors duration-700 group-hover:bg-secondary/30" />
          <span className="absolute left-5 top-5 bg-background px-2.5 py-1 font-display text-xs font-bold tracking-[0.1em]">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="relative flex flex-1 flex-col border-b border-border pb-8 pt-7">
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-[1.65rem]">{service.title}</h3>
          <p className="mt-3 flex-1 leading-relaxed text-muted">{service.short}</p>
          <span className="mt-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors group-hover:text-primary">
            Learn more
            <Arrow className="h-3 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
          </span>
          <span className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
        </div>
      </article>
    </Link>
  );
}

export function Services({ services }: { services: Service[] }) {
  return (
    <section className="section bg-surface" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title={["What we build"]}
          lead="From a single independent house to a fully finished villa — design, construction and interiors under one roof."
          action={<ButtonLink href="/services" variant="outline">All services</ButtonLink>}
        />
        <Stagger className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-20 lg:pb-16">
          {services.map((s, i) => (
            <StaggerItem key={s.id}>
              <div className={`h-full ${i % 3 === 1 ? "lg:translate-y-16" : ""}`}>
                <ServiceCard service={s} index={i} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
