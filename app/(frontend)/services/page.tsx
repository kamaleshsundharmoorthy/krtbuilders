import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import * as content from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services — House, Villa & Turnkey Construction",
  description: "Custom home construction, villa construction, architectural design, turnkey construction, renovation and interior design in Tamil Nadu.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, company, images] = await Promise.all([content.getServices(), content.getCompany(), content.getPageImages()]);
  return (
    <>
      <PageHero eyebrow="Services" title={["What", "we build."]} lead="Design, construction and interiors — delivered by one accountable team, from the first sketch to the day you move in." image={images.services} />
      <section className="bg-background">
        {services.map((s, i) => (
          <article key={s.id} id={s.slug} className="scroll-mt-20 border-b border-border">
            <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:col-start-7 lg:row-start-1" : ""}`}>
                <ImageReveal className="img-frame relative aspect-[4/3]">
                  <div className="relative h-full w-full"><Photo image={s.image} sizes="(min-width: 1024px) 50vw, 100vw" /></div>
                </ImageReveal>
              </div>
              <div className={`flex flex-col justify-center lg:col-span-5 ${i % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"}`}>
                <Reveal><p className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</p></Reveal>
                <Reveal delay={0.05}><h2 className="display-md mt-4">{s.title}</h2></Reveal>
                <Reveal delay={0.1}><p className="mt-6 text-lg leading-relaxed text-muted">{s.description}</p></Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.includes.map((x) => (
                      <li key={x} className="flex gap-3 border-t border-border pt-3 text-sm"><Check className="mt-1 h-3 w-3 shrink-0 text-primary" />{x}</li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2} className="mt-10"><ButtonLink href={`/contact?projectType=${encodeURIComponent(s.title)}#enquiry`} variant="dark">Enquire now</ButtonLink></Reveal>
              </div>
            </div>
          </article>
        ))}
      </section>
      <CTASection image={images.cta} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: s.title, description: s.description, provider: { "@type": "HomeAndConstructionBusiness", name: company.name }, areaServed: "Tamil Nadu" },
          })),
        }}
      />
    </>
  );
}
