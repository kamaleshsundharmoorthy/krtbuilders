import type { Project } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { ParallaxImage } from "@/components/ui/Parallax";
import { Reveal, RevealLines } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";

export function FeaturedProject({ project }: { project: Project }) {
  const facts: [string, string][] = [
    ["Location", project.location.split(",")[0]],
    ["Area", project.area],
    ["Bedrooms", String(project.bedrooms)],
    ["Floors", project.floors],
    ["Duration", project.duration],
  ];
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-secondary text-white" aria-labelledby="featured-title">
      <div className="img-frame absolute inset-0">
        <ParallaxImage amount={14}>
          <Photo image={project.cover} sizes="100vw" />
        </ParallaxImage>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-secondary/10" />
      </div>
      <div className="container-x relative pb-16 pt-40 md:pb-24">
        <Reveal><p className="eyebrow mb-6 text-white/75">Featured project · {project.name}</p></Reveal>
        <h2 id="featured-title" className="display-lg max-w-[16ch]">
          <RevealLines lines={["A home designed", <span key="a">around <span className="serif-accent text-primary-light">you.</span></span>]} />
        </h2>
        <Reveal delay={0.15}><p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">{project.summary}</p></Reveal>
        <Reveal delay={0.2}>
          <dl className="mt-12 grid grid-cols-2 border-t border-white/20 sm:grid-cols-3 lg:grid-cols-5">
            {facts.map(([k, v]) => (
              <div key={k} className="border-b border-white/10 py-5 pr-4 lg:border-b-0">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/50">{k}</dt>
                <dd className="mt-2 font-display text-xl font-bold md:text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <ButtonLink href={`/projects/${project.slug}`} variant="light">View project</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
