import { PageHero } from "@/components/layout/PageHero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { QualitySection } from "@/components/sections/QualitySection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Why Choose Us",
  description: "Transparent pricing, quality materials, professional project management and clear communication — why families build their homes with us.",
  path: "/why-us",
});

export default async function WhyPage() {
  const [reasons, quality, testimonials, images] = await Promise.all([content.getReasons(), content.getQuality(), content.getTestimonials(), content.getPageImages()]);
  return (
    <>
      <PageHero compact eyebrow="Why choose us" title={["Built on", "trust."]} lead="What you can expect from us — before, during and after construction." image={images.whyUs} />
      <WhyChooseUs reasons={reasons} />
      <QualitySection {...quality} />
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      <CTASection image={images.cta} />
    </>
  );
}
