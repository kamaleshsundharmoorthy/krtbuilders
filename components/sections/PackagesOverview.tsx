import type { ConstructionPackage } from "@/types/content";
import { PackageCard } from "@/components/packages/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";

export function PackagesOverview({
  packages,
  positioning,
  disclaimer,
}: {
  packages: ConstructionPackage[];
  positioning: { statement: string; flow: string[] };
  disclaimer: string;
}) {
  return (
    <section className="section relative overflow-hidden bg-secondary text-white" aria-labelledby="packages-title">
      <div className="container-x">
        <SectionHeading
          id="packages-title"
          tone="dark"
          eyebrow="Materials & Packages"
          title={["Build your home", <span key="w">your <span className="serif-accent text-primary-light">way.</span></span>]}
          lead={positioning.statement}
        />

        <Reveal delay={0.1}>
          <ol className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-white/10 py-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/60" aria-label="How we deliver">
            {positioning.flow.map((f, i) => (
              <li key={f} className="flex items-center gap-3">
                <span className={i === 0 || i === positioning.flow.length - 1 ? "text-white" : ""}>{f}</span>
                {i < positioning.flow.length - 1 && <span className="text-primary" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </Reveal>

        <Stagger className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((p) => (
            <StaggerItem key={p.id}><PackageCard pkg={p} /></StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-white/50">{disclaimer}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/packages#compare" variant="light">Compare packages</ButtonLink>
            <ButtonLink href="/packages#customise" variant="outline-light">Customise</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
