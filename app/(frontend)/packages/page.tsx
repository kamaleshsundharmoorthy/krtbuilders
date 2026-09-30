import { PageHero } from "@/components/layout/PageHero";
import { PackageCard } from "@/components/packages/PackageCard";
import { PackageComparison } from "@/components/packages/PackageComparison";
import { PackageCustomizer } from "@/components/packages/PackageCustomizer";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Construction Packages & Material Specifications",
  description:
    "Compare Essential, Signature, Premium and Luxury house construction packages — structure, flooring, kitchen, bathroom, doors, windows, electrical, plumbing and more.",
  path: "/packages",
});

export default async function PackagesPage() {
  const [packages, categories, steps, disclaimer, positioning, faqs, images] = await Promise.all([
    content.getPackages(),
    content.getMaterialCategories(),
    content.getCustomizerSteps(),
    content.getPricingDisclaimer(),
    content.getPositioning(),
    content.getFaqs(),
    content.getPageImages(),
  ]);
  const packageFaqs = faqs.filter((f) => f.showOnPackages);

  return (
    <>
      <PageHero eyebrow="Materials & Packages" title={["Build your", "home your way."]} lead={positioning.statement} image={images.packages} />

      {/* Packages */}
      <section className="section bg-background" aria-labelledby="tiers-title">
        <div className="container-x">
          <SectionHeading
            id="tiers-title"
            eyebrow="Construction packages"
            title={["Four starting points."]}
            lead="Every package shares the same engineering, supervision and quality checks. What changes is the level of finish, specification and personalisation."
          />
          <Stagger className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((p) => (
              <StaggerItem key={p.id}><PackageCard pkg={p} tone="light" /></StaggerItem>
            ))}
          </Stagger>
          <Reveal><p className="mt-12 max-w-2xl text-sm text-muted">{disclaimer} Starting rates are shown as editable placeholders.</p></Reveal>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="section scroll-mt-16 border-t border-border bg-background pt-0 md:pt-0" aria-labelledby="compare-title">
        <div className="container-x">
          <SectionHeading
            id="compare-title"
            eyebrow="Compare"
            title={["What's in", "each package."]}
            lead="Choose a category to compare specifications side by side. Select any row to see full details — sizes, finishes, brands and availability."
            className="pt-20 md:pt-28"
          />
          {categories.length > 0 && <div className="mt-14"><PackageComparison packages={packages} categories={categories} /></div>}
        </div>
      </section>

      {/* Customiser */}
      <section id="customise" className="section scroll-mt-16 bg-surface" aria-labelledby="customise-title">
        <div className="container-x">
          <SectionHeading
            id="customise-title"
            eyebrow="Customise your package"
            title={["Make it", "yours."]}
            lead="Packages are a starting point, not a limit. Mix and match finishes — we'll prepare a custom quote for your selection."
          />
          <div className="mt-14 md:mt-20"><PackageCustomizer steps={steps} disclaimer={disclaimer} /></div>
        </div>
      </section>

      {packageFaqs.length > 0 && <FAQ faqs={packageFaqs} />}
      <CTASection image={images.cta} />
    </>
  );
}
