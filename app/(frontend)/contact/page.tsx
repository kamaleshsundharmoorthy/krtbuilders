import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectEnquiry } from "@/components/sections/ProjectEnquiry";
import { Reveal } from "@/components/ui/Motion";
import { ArrowUpRight } from "@/components/ui/Icons";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a Project — Contact Us",
  description: "Tell us about your plot, family and budget. Request a consultation for house, villa or turnkey construction in Tamil Nadu.",
  path: "/contact",
});

export default async function ContactPage() {
  const [company, packages, images] = await Promise.all([content.getCompany(), content.getPackages(), content.getPageImages()]);
  const c = company.contact;
  const channels = [
    { label: "Call", value: c.phone, href: c.phoneHref },
    { label: "WhatsApp", value: c.whatsapp, href: c.whatsappHref },
    { label: "Email", value: c.email, href: `mailto:${c.email}` },
  ];

  return (
    <>
      <PageHero compact eyebrow="Start a project" title={["Let's build", "your home."]} lead="Tell us a little about your plot, your family and what you have in mind. We'll call you to arrange a consultation." image={images.contact} />

      <section className="section bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal><p className="eyebrow text-muted">Talk to us</p></Reveal>
              <ul className="mt-8 border-t border-ink">
                {channels.map((ch) => (
                  <li key={ch.label} className="border-b border-border">
                    <a href={ch.href} {...(ch.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center justify-between gap-4 py-5">
                      <span>
                        <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted">{ch.label}</span>
                        <span className="mt-1 block font-display text-lg font-bold transition-colors group-hover:text-primary">{ch.value}</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
                <li className="border-b border-border py-5">
                  <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted">Office</span>
                  <address className="mt-1 not-italic leading-relaxed">{c.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
                  <p className="mt-2 text-sm text-muted">{c.hours}</p>
                </li>
              </ul>
              <div className="img-frame relative mt-8 aspect-[4/3] grayscale">
                <iframe title="Office location on Google Maps" src={c.mapsEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-primary">Open in Google Maps ↗</a>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="min-h-[600px] border border-border bg-background" />}>
              <ProjectEnquiry packages={packages} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
