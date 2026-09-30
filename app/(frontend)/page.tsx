import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Services } from "@/components/sections/Services";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { ProjectsSection } from "@/components/sections/Projects";
import { PackagesOverview } from "@/components/sections/PackagesOverview";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { QualitySection } from "@/components/sections/QualitySection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import * as content from "@/lib/content";

export default async function HomePage() {
  const [hero, about, company, services, featured, projects, packages, positioning, disclaimer, steps, reasons, quality, testimonials, faqs, images, show] =
    await Promise.all([
      content.getHero(),
      content.getAboutIntro(),
      content.getCompany(),
      content.getServices(),
      content.getFeaturedProject(),
      content.getProjects(),
      content.getPackages(),
      content.getPositioning(),
      content.getPricingDisclaimer(),
      content.getProcessSteps(),
      content.getReasons(),
      content.getQuality(),
      content.getTestimonials(),
      content.getFaqs(),
      content.getPageImages(),
      content.getHomeSections(),
    ]);

  return (
    <>
      <Hero {...hero} />
      <AboutIntro {...about} stats={company.stats} />
      {show.services && services.length > 0 && <Services services={services} />}
      {show.featured && featured && <FeaturedProject project={featured} />}
      {show.projects && projects.length > 0 && (
        <ProjectsSection projects={projects.filter((p) => p.id !== featured?.id).concat(featured ? [featured] : []).slice(0, 3)} />
      )}
      {show.packages && packages.length > 0 && <PackagesOverview packages={packages} positioning={positioning} disclaimer={disclaimer} />}
      {show.process && steps.length > 0 && <ProcessTimeline steps={steps} />}
      {show.why && reasons.length > 0 && <WhyChooseUs reasons={reasons} />}
      {show.quality && <QualitySection {...quality} />}
      {show.testimonials && testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      {show.faq && faqs.length > 0 && <FAQ faqs={faqs} limit={6} showAllLink />}
      <CTASection image={images.cta} />
    </>
  );
}
