import { PageHero } from "@/components/layout/PageHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { CTASection } from "@/components/sections/CTASection";
import * as content from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects — Homes & Villas We've Built",
  description: "Selected independent houses, contemporary homes and luxury villas designed and built across Tamil Nadu.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, images] = await Promise.all([content.getProjects(), content.getPageImages()]);
  return (
    <>
      <PageHero eyebrow="Projects" title={["Selected", "homes."]} lead="Every project here began with a different family, plot and brief. Explore how each one came together." image={images.projects} />
      <section className="section bg-background">
        <div className="container-x"><ProjectsGrid projects={projects} /></div>
      </section>
      <CTASection image={images.cta} />
    </>
  );
}
