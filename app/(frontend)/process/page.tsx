import { PageHero } from "@/components/layout/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { QualitySection } from "@/components/sections/QualitySection";
import { CTASection } from "@/components/sections/CTASection";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Construction Process",
  description: "From consultation and site visit to foundation, structure, finishing and handover — the 13 stages of building your home with us.",
  path: "/process",
});

export default async function ProcessPage() {
  const [steps, quality, images] = await Promise.all([content.getProcessSteps(), content.getQuality(), content.getPageImages()]);
  return (
    <>
      <PageHero eyebrow="Construction process" title={["From plot", "to home."]} lead="Thirteen clear stages, each with its own checks and sign-offs — so you always know what is happening and what comes next." image={images.process} />
      {steps.length > 0 && <ProcessTimeline steps={steps} heading={false} />}
      <QualitySection {...quality} />
      <CTASection image={images.cta} />
    </>
  );
}
