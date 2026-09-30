import { PageHero } from "@/components/layout/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { Photo } from "@/components/ui/Photo";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Testimonials",
  description: "Homeowners share their experience of designing and building their homes with us.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const [testimonials, images] = await Promise.all([content.getTestimonials(), content.getPageImages()]);
  return (
    <>
      <PageHero compact eyebrow="Testimonials" title={["Homes.", "Stories.", "Trust."]} image={images.testimonials} />
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      <section className="section bg-background">
        <div className="container-x">
          <Stagger className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.id} as="article" className="flex flex-col border-t-2 border-ink pt-6">
                <div className="img-frame relative aspect-[4/3]"><Photo image={t.image} sizes="33vw" /></div>
                <blockquote className="mt-6 flex-1 leading-relaxed text-ink/85">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-6 font-display font-bold">{t.name}</p>
                <p className="text-sm text-muted">{t.project} · {t.location}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CTASection image={images.cta} />
    </>
  );
}
