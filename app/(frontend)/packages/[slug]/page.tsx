import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PackageCustomizer } from "@/components/packages/PackageCustomizer";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await content.getPackages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await content.getPackage((await params).slug);
  if (!pkg) return {};
  return pageMetadata({ title: `${pkg.name} Construction Package`, description: pkg.description, path: `/packages/${pkg.slug}`, image: pkg.image.src });
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const [pkg, packages, categories, steps, disclaimer, images] = await Promise.all([
    content.getPackage(slug), content.getPackages(), content.getMaterialCategories(), content.getCustomizerSteps(), content.getPricingDisclaimer(), content.getPageImages(),
  ]);
  if (!pkg) notFound();

  return (
    <>
      <PageHero eyebrow={`Package ${pkg.index} / ${String(packages.length).padStart(2, "0")}`} title={[pkg.name, <span key="p" className="serif-accent normal-case text-primary-light">package.</span>]} lead={pkg.description} image={pkg.image}>
        <Reveal immediate delay={0.45} className="mt-10 flex flex-wrap items-end gap-10">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/50">Starting from</p>
            <p className="mt-1 font-display text-2xl font-bold">{pkg.startingRate}</p>
          </div>
          <ButtonLink href="#customise">Customise this package</ButtonLink>
        </Reveal>
      </PageHero>

      <section className="section bg-background">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal><p className="eyebrow text-muted">Ideal for</p></Reveal>
              <Reveal delay={0.05}><p className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight">{pkg.idealFor}</p></Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-3">
                  {pkg.highlights.map((h) => <li key={h} className="flex gap-3 border-t border-border pt-3 text-sm"><Check className="mt-1 h-3 w-3 shrink-0 text-primary" />{h}</li>)}
                </ul>
              </Reveal>
              <nav className="mt-12" aria-label="Other packages">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted">Other packages</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {packages.filter((p) => p.id !== pkg.id).map((p) => (
                    <li key={p.id}><Link href={`/packages/${p.slug}`} className="inline-block border border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary">{p.name}</Link></li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8"><ButtonLink href="/packages#compare" variant="text">Compare all packages</ButtonLink></div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal><p className="eyebrow text-muted">Full specification — {pkg.name}</p></Reveal>
            <div className="mt-8 space-y-14">
              {categories.map((c) => (
                <Reveal key={c.id} as="section">
                  <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
                    <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">{c.name}</h2>
                    <span className="text-xs text-muted">{c.items.length} items</span>
                  </div>
                  <dl>
                    {c.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 gap-1 border-b border-border py-4 sm:grid-cols-[40%_1fr] sm:gap-6">
                        <dt className="text-sm font-semibold">{item.name}</dt>
                        <dd className={`text-sm ${item.specs[pkg.id] ? "text-ink/80" : "text-muted/60"}`}>
                          {item.specs[pkg.id] ?? "Not included — available as an upgrade"}
                          {item.details?.sizes && item.specs[pkg.id] && <span className="mt-1 block text-xs text-muted">Sizes: {item.details.sizes.join(" · ")}</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-xs leading-relaxed text-muted">Specifications are indicative placeholders. Brands, grades and ranges are confirmed in your project estimate. {disclaimer}</p>
          </div>
        </div>
      </section>

      <section id="customise" className="section scroll-mt-16 bg-surface">
        <div className="container-x">
          <Reveal><p className="eyebrow text-muted">Customise your package</p></Reveal>
          <Reveal delay={0.05}><h2 className="display-lg mt-6">Start with {pkg.name}.<br /><span className="text-primary">Make it yours.</span></h2></Reveal>
          <div className="mt-14"><PackageCustomizer steps={steps} disclaimer={disclaimer} initialPackage={pkg.id} /></div>
        </div>
      </section>

      <CTASection image={images.cta} />
    </>
  );
}
