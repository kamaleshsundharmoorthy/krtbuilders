import Link from "next/link";
import type { Project } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";

export function ProjectCard({ project, size = "md", priority = false }: { project: Project; size?: "lg" | "md"; priority?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block" aria-label={`${project.name}, ${project.location} — view project`}>
      <article>
        <div className={`img-frame relative ${size === "lg" ? "aspect-[4/3] md:aspect-[5/6]" : "aspect-[4/5]"}`}>
          <Photo
            image={project.cover}
            priority={priority}
            sizes={size === "lg" ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
            className="transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07] group-hover:translate-y-[-1%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/10 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute left-5 top-5 bg-primary px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white">{project.type}</span>
          <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center bg-background text-ink transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight className="h-3.5 w-3.5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
          </span>
          {/* Metadata reveal */}
          <dl className="absolute inset-x-5 bottom-5 grid translate-y-4 grid-cols-4 gap-3 text-white opacity-0 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden">
            {[
              ["Area", project.area],
              ["Beds", String(project.bedrooms)],
              ["Floors", project.floors],
              ["Year", String(project.year)],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-white/30 pt-2">
                <dt className="text-[0.58rem] uppercase tracking-[0.2em] text-white/60">{k}</dt>
                <dd className="mt-1 text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">{project.name}</h3>
            <p className="mt-1.5 text-sm text-muted">{project.location}</p>
          </div>
          <p className="shrink-0 pt-1.5 font-display text-sm font-semibold">{project.area}</p>
        </div>
      </article>
    </Link>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [first, second, third] = projects;
  return (
    <section className="section bg-background" aria-labelledby="projects-title">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title={["Selected homes"]}
          lead="A few of the homes we've designed and built — each shaped by a different family, site and brief."
          action={<ButtonLink href="/projects" variant="outline">All projects</ButtonLink>}
        />
        <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-12">
          {first && <Reveal className="md:col-span-7"><ProjectCard project={first} size="lg" /></Reveal>}
          {second && <Reveal delay={0.1} className="md:col-span-5 md:mt-40"><ProjectCard project={second} /></Reveal>}
          <Reveal className="flex flex-col justify-center md:col-span-5 md:row-start-2">
            <p className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Every home starts with a family, a plot and a <span className="serif-accent text-primary">conversation.</span>
            </p>
            <div className="mt-8"><ButtonLink href="/contact">Start yours</ButtonLink></div>
          </Reveal>
          {third && <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:row-start-2 md:-mt-10"><ProjectCard project={third} size="lg" /></Reveal>}
        </div>
      </div>
    </section>
  );
}
