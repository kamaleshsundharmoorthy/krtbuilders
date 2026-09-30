import type { ImageAsset } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { ParallaxImage } from "@/components/ui/Parallax";
import { Reveal, RevealLines } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";

export function CTASection({
  image,
  title = ["Ready to build", "your home?"],
  text = "Tell us about your dream home. We'll help you turn the idea into reality.",
}: {
  image: ImageAsset;
  title?: string[];
  text?: string;
}) {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-secondary text-white" aria-labelledby="cta-title">
      <div className="img-frame absolute inset-0">
        <ParallaxImage amount={12}>
          <Photo image={image} sizes="100vw" />
        </ParallaxImage>
        {/* Brand overlay: black base with a red wash from the logo palette */}
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/55 via-transparent to-transparent mix-blend-multiply" />
      </div>
      <div className="container-x relative py-32 text-center">
        <Reveal><p className="eyebrow justify-center text-white/75">Start a project</p></Reveal>
        <h2 id="cta-title" className="display-xl mx-auto mt-8 max-w-[14ch]">
          <RevealLines lines={title} />
        </h2>
        <Reveal delay={0.15}><p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-white/75">{text}</p></Reveal>
        <Reveal delay={0.25} className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact#enquiry">Start a Project</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">Contact Us</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
