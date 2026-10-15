import { PageHero } from "@/components/layout/PageHero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { QualitySection } from "@/components/sections/QualitySection";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/ui/Motion";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Residential builders in Tamil Nadu designing and constructing personalised homes and villas around the way families live.",
  path: "/about",
});

export default async function AboutPage() {
  const [about, company, positioning, reasons, quality, images] = await Promise.all([
    content.getAboutIntro(), content.getCompany(), content.getPositioning(), content.getReasons(), content.getQuality(), content.getPageImages(),
  ]);
  return (
    <>
      <PageHero eyebrow="About us" title={["Homes,", "not templates."]} lead={company.description} image={images.about} />
      <AboutIntro {...about} stats={company.stats} showLink={false} />
      <WhyChooseUs reasons={reasons} />
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <Reveal><p className="eyebrow text-muted">How we work</p></Reveal>
          <Reveal delay={0.1}><p className="mt-8 max-w-5xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">{positioning.statement}</p></Reveal>
          <Reveal delay={0.15}>
            <ol className="mt-14 grid grid-cols-2 gap-px bg-border sm:grid-cols-4 lg:grid-cols-7">
              {positioning.flow.map((f, i) => (
                <li key={f} className="bg-surface p-5">
                  <span className="font-display text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-6 font-display text-lg font-bold leading-tight">{f}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
      <QualitySection {...quality} />
      <CTASection image={images.cta} />
    </>
  );
}
