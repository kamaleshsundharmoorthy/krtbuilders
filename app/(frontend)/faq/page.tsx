import { PageHero } from "@/components/layout/PageHero";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import * as content from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers to common questions about house construction, packages, customisation, estimates, approvals and timelines.",
  path: "/faq",
});

export default async function FaqPage() {
  const [faqs, images] = await Promise.all([content.getFaqs(), content.getPageImages()]);
  return (
    <>
      <PageHero compact eyebrow="FAQ" title={["Good", "questions."]} lead="Everything homeowners usually ask before they start building." image={images.faq} />
      <FAQ faqs={faqs} />
      <CTASection image={images.cta} title={["Still have", "questions?"]} text="Talk to our team — we'll walk you through the process, packages and what your home could cost." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }}
      />
    </>
  );
}
