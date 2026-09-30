import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { getPackages, getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = company.siteUrl;
  const pages = ["", "/about", "/services", "/projects", "/packages", "/process", "/why-us", "/testimonials", "/faq", "/contact"];
  const [projects, packages] = await Promise.all([getProjects(), getPackages()]);
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...packages.map((p) => ({ url: `${base}/packages/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
