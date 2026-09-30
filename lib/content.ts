/**
 * CONTENT ACCESS LAYER
 *
 * Pages read content ONLY through these functions.
 *
 *  • With DATABASE_URI set → content comes from the Payload CMS (admin at /admin).
 *  • Without it            → the static demo content in /data is used, so the
 *                            site still runs for design work or a quick preview.
 *
 * Empty fields in the CMS "Home" and "Company" settings fall back to the demo
 * defaults, so a half-filled admin never produces a broken page.
 */
import { cache } from "react";
import { company, mainNav, footerNav, hero, aboutIntro, positioning, pricingDisclaimer } from "@/data/company";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { packages, customizerSteps } from "@/data/packages";
import { materialCategories } from "@/data/materials";
import { processSteps } from "@/data/process";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faq";
import { reasons, quality } from "@/data/why";
import { images, pageImages, type PageImages } from "@/data/images";
import * as cms from "./cms";

const staticSections = { services: true, featured: true, projects: true, packages: true, process: true, why: true, quality: true, testimonials: true, faq: true };
export type HomeSections = typeof staticSections;

/* --- one request = one query per source ---------------------------------- */

const homeGlobal = cache(async () => (await cms.getCms()).findGlobal({ slug: "home", depth: 1 }));
const companyGlobal = cache(async () => (await cms.getCms()).findGlobal({ slug: "company", depth: 1 }));
const findAll = cache(async <T,>(collection: string): Promise<T[]> => {
  const payload = await cms.getCms();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await payload.find({ collection: collection as any, depth: 1, limit: 500, sort: "order", pagination: false });
  return res.docs as T[];
});

/* --- getters -------------------------------------------------------------- */

export const getCompany = cache(async () => (cms.cmsEnabled ? cms.toCompany(await companyGlobal(), company) : company));

export const getNavigation = async () => ({ main: mainNav, footer: footerNav });

export const getHero = cache(async () => {
  if (!cms.cmsEnabled) return { ...hero, image: images.hero.main };
  const h = (await homeGlobal()).hero;
  return {
    eyebrow: h?.eyebrow || hero.eyebrow,
    title: h?.titleLine1 ? [h.titleLine1, h.titleLine2 ?? ""] : hero.title,
    subtitle: h?.subtitle?.length ? cms.list(h.subtitle) : hero.subtitle,
    description: h?.description || hero.description,
    primaryCta: { label: h?.primaryLabel || hero.primaryCta.label, href: h?.primaryHref || hero.primaryCta.href },
    secondaryCta: { label: h?.secondaryLabel || hero.secondaryCta.label, href: h?.secondaryHref || hero.secondaryCta.href },
    image: cms.img(h?.image, images.hero.main),
  };
});

export const getAboutIntro = cache(async () => {
  const fallback = { ...aboutIntro, image: images.about.main, secondaryImage: images.about.secondary };
  if (!cms.cmsEnabled) return fallback;
  const a = (await homeGlobal()).about;
  return {
    eyebrow: a?.eyebrow || fallback.eyebrow,
    title: a?.title || fallback.title,
    lead: a?.lead || fallback.lead,
    body: a?.body || fallback.body,
    factors: a?.factors?.length ? cms.list(a.factors) : fallback.factors,
    image: cms.img(a?.image, fallback.image),
    secondaryImage: cms.img(a?.secondaryImage, fallback.secondaryImage),
  };
});

export const getPositioning = cache(async () => {
  if (!cms.cmsEnabled) return positioning;
  const p = (await homeGlobal()).positioning;
  return { statement: p?.statement || positioning.statement, flow: p?.flow?.length ? cms.list(p.flow) : positioning.flow };
});

export const getPricingDisclaimer = cache(async () =>
  cms.cmsEnabled ? (await homeGlobal()).positioning?.pricingDisclaimer || pricingDisclaimer : pricingDisclaimer,
);

export const getQuality = cache(async () => {
  if (!cms.cmsEnabled) return quality;
  const q = (await homeGlobal()).quality;
  return {
    eyebrow: q?.eyebrow || quality.eyebrow,
    title: q?.title || quality.title,
    lead: q?.lead || quality.lead,
    image: cms.img(q?.image, quality.image),
    secondaryImage: cms.img(q?.secondaryImage, quality.secondaryImage),
    points: cms.toQualityPoints(q?.points, quality.points),
  };
});

export const getPageImages = cache(async (): Promise<PageImages> => {
  if (!cms.cmsEnabled) return pageImages;
  const g = (await homeGlobal()).pageImages ?? {};
  const out = { ...pageImages };
  (Object.keys(pageImages) as (keyof PageImages)[]).forEach((k) => {
    out[k] = cms.img((g as Record<string, cms.UploadValue>)[k], pageImages[k]);
  });
  return out;
});

export const getHomeSections = cache(async (): Promise<HomeSections> => {
  if (!cms.cmsEnabled) return staticSections;
  const s = (await homeGlobal()).sections ?? {};
  return Object.fromEntries(Object.entries(staticSections).map(([k]) => [k, (s as Record<string, boolean | null>)[k] ?? true])) as HomeSections;
});

export const getServices = cache(async () => (cms.cmsEnabled ? (await findAll<cms.P.Service>("services")).map(cms.toService) : services));

export const getProjects = cache(async () => (cms.cmsEnabled ? (await findAll<cms.P.Project>("projects")).map(cms.toProject) : projects));
export const getProject = async (slug: string) => (await getProjects()).find((p) => p.slug === slug) ?? null;
export const getFeaturedProject = async () => {
  const all = await getProjects();
  return all.find((p) => p.featured) ?? all[0] ?? null;
};

export const getPackages = cache(async () => (cms.cmsEnabled ? (await findAll<cms.P.Package>("packages")).map(cms.toPackage) : packages));
export const getPackage = async (slug: string) => (await getPackages()).find((p) => p.slug === slug) ?? null;

export const getCustomizerSteps = cache(async () => {
  if (!cms.cmsEnabled) return customizerSteps;
  const g = await (await cms.getCms()).findGlobal({ slug: "customizer" });
  return cms.toCustomizerSteps(g, await getPackages());
});

export const getMaterialCategories = cache(async () =>
  cms.cmsEnabled ? (await findAll<cms.P.MaterialCategory>("material-categories")).map(cms.toMaterialCategory) : materialCategories,
);

export const getProcessSteps = cache(async () => (cms.cmsEnabled ? (await findAll<cms.P.ProcessStep>("process-steps")).map(cms.toProcessStep) : processSteps));
export const getTestimonials = cache(async () => (cms.cmsEnabled ? (await findAll<cms.P.Testimonial>("testimonials")).map(cms.toTestimonial) : testimonials));
export const getReasons = cache(async () => (cms.cmsEnabled ? (await findAll<cms.P.Reason>("reasons")).map(cms.toReason) : reasons));

const staticPackageFaqIds = ["packages", "customise", "estimate", "upgrade"];
export const getFaqs = cache(async () =>
  cms.cmsEnabled ? (await findAll<cms.P.Faq>("faqs")).map(cms.toFaq) : faqs.map((f) => ({ ...f, showOnPackages: staticPackageFaqIds.includes(f.id) })),
);
