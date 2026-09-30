import type { ImageAsset, Stat } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal, RevealLines, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";

export function AboutIntro({
  eyebrow,
  title,
  lead,
  body,
  factors,
  image,
  secondaryImage,
  stats,
  showLink = true,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  factors: string[];
  image: ImageAsset;
  secondaryImage: ImageAsset;
  stats: Stat[];
  showLink?: boolean;
}) {
  return (
    <section className="section bg-background" aria-labelledby="about-title">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 lg:pr-10">
            <Reveal><p className="eyebrow mb-6 text-muted">{eyebrow}</p></Reveal>
            <h2 id="about-title" className="display-lg">
              <RevealLines lines={title.split(" ").reduce<string[]>((acc, w, i) => { if (i % 2 === 0) acc.push(w); else acc[acc.length - 1] += ` ${w}`; return acc; }, [])} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-10 text-xl leading-relaxed text-ink md:text-2xl">{lead}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 leading-relaxed text-muted">{body}</p>
            </Reveal>
            <Stagger as="ul" className="mt-10 flex flex-wrap gap-2" gap={0.05}>
              {factors.map((f) => (
                <StaggerItem as="li" key={f}>
                  <span className="inline-block border border-border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-ink/80">{f}</span>
                </StaggerItem>
              ))}
            </Stagger>
            {showLink && (
              <Reveal delay={0.2} className="mt-12">
                <ButtonLink href="/about" variant="text">More about us</ButtonLink>
              </Reveal>
            )}
          </div>

          <div className="relative lg:col-span-6">
            <ImageReveal className="img-frame relative aspect-[4/5] w-full md:w-[85%] md:ml-auto">
              <div className="relative h-full w-full"><Photo image={image} sizes="(min-width: 1024px) 45vw, 100vw" /></div>
            </ImageReveal>
            <ImageReveal delay={0.25} direction="left" className="img-frame absolute -bottom-10 left-0 hidden aspect-square w-[42%] border-[10px] border-background md:block">
              <div className="relative h-full w-full"><Photo image={secondaryImage} sizes="20vw" /></div>
            </ImageReveal>
          </div>
        </div>

        <Stagger className="mt-28 grid grid-cols-2 border-t border-ink lg:grid-cols-4" gap={0.1}>
          {stats.map((s, i) => (
            <StaggerItem key={s.label} className={`py-10 pr-6 ${i % 2 === 1 ? "pl-6 border-l border-border" : ""} ${i >= 2 ? "border-t border-border lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}>
              <p className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight sm:text-5xl md:text-7xl">
                {s.value !== null ? <Counter value={s.value} suffix={s.suffix} /> : <span>{s.display}</span>}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
        {stats.some((s) => s.placeholder) && (
          <p className="mt-2 text-[0.7rem] text-muted/70">Figures shown are placeholders and will be updated with verified company data.</p>
        )}
      </div>
    </section>
  );
}
