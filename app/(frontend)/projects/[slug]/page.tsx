import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal, RevealLines, Stagger, StaggerItem } from "@/components/ui/Motion";
import { ParallaxImage } from "@/components/ui/Parallax";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Icons";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await content.getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await content.getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — ${project.type} in ${project.location.split(",")[0]}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.cover.src,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects, packages] = await Promise.all([content.getProject(slug), content.getProjects(), content.getPackages()]);
  if (!project) notFound();
  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];
  const pkg = packages.find((p) => p.id === project.package);

  const overview: [string, string][] = [
    ["Location", project.location],
    ["Area", project.area],
    ["Type", project.type],
    ["Bedrooms", String(project.bedrooms)],
    ["Floors", project.floors],
    ["Completed", String(project.year)],
    ["Duration", project.duration],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-secondary text-white">
        <div className="img-frame absolute inset-0">
          <ParallaxImage amount={10}><Photo image={project.cover} priority sizes="100vw" /></ParallaxImage>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-secondary/40" />
        </div>
        <div className="container-x relative pb-16 pt-40 md:pb-20">
          <Reveal immediate>
            <p className="eyebrow text-white/75">
              <Link href="/projects" className="hover:text-white">Projects</Link> / {project.type}
            </p>
          </Reveal>
          <h1 className="display-xl mt-6 max-w-[12ch]"><RevealLines lines={project.name.split(" ").length > 2 ? [project.name.split(" ").slice(0, 2).join(" "), project.name.split(" ").slice(2).join(" ")] : [project.name]} immediate delay={0.1} /></h1>
          <Reveal immediate delay={0.3}><p className="mt-6 text-lg text-white/70">{project.location}</p></Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-border bg-background">
        <div className="container-x">
          <dl className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {overview.map(([k, v]) => (
              <div key={k} className="border-b border-border py-7 pr-4 lg:border-b-0">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted">{k}</dt>
                <dd className="mt-2 font-display text-lg font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Concept + requirements */}
      <section className="section bg-background">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><p className="eyebrow text-muted">Design concept</p></Reveal>
            <Reveal delay={0.05}><p className="mt-8 font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">{project.summary}</p></Reveal>
            <Reveal delay={0.1}><p className="mt-8 text-lg leading-relaxed text-muted">{project.concept}</p></Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal><p className="eyebrow text-muted">Client requirements</p></Reveal>
            <Stagger as="ol" className="mt-8 border-t border-ink">
              {project.requirements.map((r, i) => (
                <StaggerItem as="li" key={r} className="grid grid-cols-[2.5rem_1fr] border-b border-border py-5">
                  <span className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{r}</span>
                </StaggerItem>
              ))}
            </Stagger>
            {pkg && (
              <Reveal className="mt-10 flex items-center justify-between border border-border p-5">
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted">Package basis</p>
                  <p className="mt-1 font-display text-xl font-extrabold uppercase">{pkg.name}</p>
                </div>
                <ButtonLink href={`/packages/${pkg.slug}`} variant="text">View package</ButtonLink>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Construction stages */}
      <section className="section bg-surface">
        <div className="container-x">
          <Reveal><p className="eyebrow text-muted">Construction</p></Reveal>
          <Reveal delay={0.05}><h2 className="display-md mt-6">How it was built</h2></Reveal>
          <Stagger className="mt-14 grid gap-8 md:grid-cols-3">
            {project.stages.map((s, i) => (
              <StaggerItem key={s.title} as="article">
                <div className="img-frame relative aspect-[4/3]"><Photo image={s.image} sizes="(min-width: 768px) 33vw, 100vw" /></div>
                <p className="mt-6 font-display text-sm font-bold text-primary">Stage {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Materials */}
      <section className="section bg-secondary text-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><p className="eyebrow text-white/60">Materials</p></Reveal>
            <Reveal delay={0.05}><h2 className="display-md mt-6">Selected materials</h2></Reveal>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6">
            {project.materials.map((m) => (
              <Reveal key={m.label} className="grid grid-cols-[8rem_1fr] gap-6 border-t border-white/15 py-6 last:border-b">
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">{m.label}</dt>
                <dd className="font-display text-xl font-semibold">{m.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Gallery — masonry */}
      <section className="section bg-background">
        <div className="container-x">
          <Reveal><p className="eyebrow text-muted">Gallery</p></Reveal>
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {project.gallery.map((img, i) => (
              <ImageReveal key={`${img.src}-${i}`} delay={(i % 3) * 0.08} className={`img-frame relative break-inside-avoid ${["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[16/10]", "aspect-[4/5]"][i % 6]}`}>
                <div className="relative h-full w-full"><Photo image={img} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /></div>
              </ImageReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final result */}
      <section className="relative h-[90svh] overflow-hidden bg-secondary">
        <div className="img-frame absolute inset-0">
          <ParallaxImage amount={12}><Photo image={project.cover} sizes="100vw" /></ParallaxImage>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/90 to-transparent">
          <div className="container-x pb-10 pt-32 text-white">
            <p className="eyebrow text-white/70">Final result</p>
            <p className="mt-4 font-display text-2xl font-bold md:text-3xl">{project.name} · {project.year}</p>
          </div>
        </div>
      </section>

      {/* Next project */}
      {next && next.id !== project.id && (
        <Link href={`/projects/${next.slug}`} className="group block border-b border-border bg-background">
          <div className="container-x flex items-center justify-between gap-6 py-14">
            <div>
              <p className="eyebrow text-muted">Next project</p>
              <p className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight transition-colors group-hover:text-primary md:text-6xl">{next.name}</p>
            </div>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center bg-primary text-white transition-transform duration-500 group-hover:translate-x-2"><Arrow className="h-4 w-5" /></span>
          </div>
        </Link>
      )}

      <CTASection image={project.cover} title={["Build a home", "like this."]} text="Every home we build is designed for its family and site. Tell us about yours." />
    </>
  );
}
