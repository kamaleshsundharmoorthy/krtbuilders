import type { ImageAsset, QualityPoint } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal, RevealLines, Stagger, StaggerItem } from "@/components/ui/Motion";

export function QualitySection({
  eyebrow,
  title,
  lead,
  image,
  secondaryImage,
  points,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: ImageAsset;
  secondaryImage: ImageAsset;
  points: QualityPoint[];
}) {
  return (
    <section className="section bg-secondary text-white" aria-labelledby="quality-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal><p className="eyebrow mb-6 text-white/70">{eyebrow}</p></Reveal>
            <h2 id="quality-title" className="display-lg">
              <RevealLines lines={title.split(" ").length > 2 ? [title.split(" ").slice(0, 2).join(" "), title.split(" ").slice(2).join(" ")] : [title]} />
            </h2>
            <Reveal delay={0.1}><p className="mt-8 max-w-md text-lg leading-relaxed text-white/65">{lead}</p></Reveal>
            <div className="mt-12 grid grid-cols-5 gap-3">
              <ImageReveal className="img-frame relative col-span-3 aspect-[3/4]">
                <div className="relative h-full w-full"><Photo image={image} sizes="25vw" /></div>
              </ImageReveal>
              <ImageReveal delay={0.2} className="img-frame relative col-span-2 mt-16 aspect-[3/4]">
                <div className="relative h-full w-full"><Photo image={secondaryImage} sizes="15vw" /></div>
              </ImageReveal>
            </div>
            <p className="mt-3 text-[0.7rem] text-white/35">Replace with photographs of the company&apos;s own sites.</p>
          </div>
        </div>
        <Stagger as="ol" className="lg:col-span-6 lg:col-start-7" gap={0.06}>
          {points.map((p, i) => (
            <StaggerItem as="li" key={p.title} className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 py-8 last:border-b">
              <span className="font-display text-sm font-bold text-primary-light">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">{p.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-white/60">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
