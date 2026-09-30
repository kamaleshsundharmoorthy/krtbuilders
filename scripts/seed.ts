/**
 * Seed the CMS with the demo content from /data.
 *
 *   npm run seed            → fills only empty collections / globals
 *   npm run seed -- --reset → deletes existing website content first (not users or enquiries)
 *
 * Demo photos are downloaded from their placeholder URLs and uploaded to the
 * media library. If a download fails the entry is created without a photo.
 */
import { getPayload, type Payload } from "payload";
import config from "@payload-config";

import { company, hero, aboutIntro, positioning, pricingDisclaimer } from "../data/company";
import { services } from "../data/services";
import { projects } from "../data/projects";
import { packages, customizerSteps } from "../data/packages";
import { materialCategories } from "../data/materials";
import { processSteps } from "../data/process";
import { testimonials } from "../data/testimonials";
import { faqs } from "../data/faq";
import { reasons, quality } from "../data/why";
import { images, pageImages } from "../data/images";
import type { ImageAsset } from "../types/content";

const reset = process.argv.includes("--reset");
const ctx = { disableRevalidate: true };
const PACKAGE_FAQS = ["packages", "customise", "estimate", "upgrade"];

const payload: Payload = await getPayload({ config });
const log = (m: string) => payload.logger.info(`[seed] ${m}`);

/* --- media --------------------------------------------------------------- */

const mediaCache = new Map<string, string | null>();

async function media(asset?: ImageAsset): Promise<string | undefined> {
  if (!asset?.src) return undefined;
  if (mediaCache.has(asset.src)) return mediaCache.get(asset.src) ?? undefined;
  try {
    let buffer: Buffer;
    let mimetype = "image/jpeg";
    let name = asset.src.split("/").pop()!.split("?")[0];
    if (asset.src.startsWith("http")) {
      const res = await fetch(asset.src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      buffer = Buffer.from(await res.arrayBuffer());
      mimetype = res.headers.get("content-type")?.split(";")[0] || mimetype;
      name = `${name}.${mimetype.split("/")[1] || "jpg"}`;
    } else {
      const fs = await import("fs/promises");
      buffer = await fs.readFile(`public${asset.src}`);
      mimetype = asset.src.endsWith(".svg") ? "image/svg+xml" : asset.src.endsWith(".png") ? "image/png" : "image/jpeg";
    }
    const doc = await payload.create({ collection: "media", data: { alt: asset.alt }, file: { data: buffer, mimetype, name, size: buffer.length }, context: ctx });
    mediaCache.set(asset.src, String(doc.id));
    return String(doc.id);
  } catch (e) {
    payload.logger.warn(`[seed] image skipped (${(e as Error).message}): ${asset.src}`);
    mediaCache.set(asset.src, null);
    return undefined;
  }
}

const items = (l: string[]) => l.map((value) => ({ value }));

/* --- helpers ------------------------------------------------------------- */

type Slug = "services" | "projects" | "packages" | "material-categories" | "process-steps" | "testimonials" | "faqs" | "reasons";

async function seedCollection<T>(collection: Slug, rows: T[], build: (row: T, i: number) => Promise<Record<string, unknown>>) {
  if (reset) await payload.delete({ collection, where: { id: { exists: true } }, context: ctx });
  const { totalDocs } = await payload.count({ collection });
  if (totalDocs > 0) return log(`${collection}: already has ${totalDocs} entries — skipped`);
  for (const [i, row] of rows.entries()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.create({ collection, data: (await build(row, i)) as any, context: ctx });
  }
  log(`${collection}: ${rows.length} created`);
}

/* --- collections --------------------------------------------------------- */

await seedCollection("services", services, async (s, i) => ({
  title: s.title, slug: s.slug, short: s.short, description: s.description, includes: items(s.includes), image: await media(s.image), order: i, placeholder: !!s.placeholder,
}));

await seedCollection("packages", packages, async (p, i) => ({
  name: p.name, tier: p.id, slug: p.slug, tagline: p.tagline, description: p.description, idealFor: p.idealFor, highlights: items(p.highlights), startingRate: p.startingRate, image: await media(p.image), order: i, placeholder: true,
}));

await seedCollection("material-categories", materialCategories, async (c, i) => ({
  name: c.name,
  slug: c.id,
  summary: c.summary,
  order: i,
  placeholder: true,
  items: c.items.map((it) => ({
    name: it.name,
    specs: { essential: it.specs.essential ?? "", signature: it.specs.signature ?? "", premium: it.specs.premium ?? "", luxury: it.specs.luxury ?? "" },
    details: {
      sizes: it.details?.sizes?.join(", "),
      finishes: it.details?.finishes?.join(", "),
      brand: it.details?.brand,
      estimatedRange: it.details?.estimatedRange,
      notes: it.details?.notes,
    },
  })),
}));

await seedCollection("projects", projects, async (p, i) => ({
  name: p.name, slug: p.slug, location: p.location, type: p.type, area: p.area, bedrooms: p.bedrooms, floors: p.floors, year: p.year, duration: p.duration,
  package: p.package, summary: p.summary, concept: p.concept, requirements: items(p.requirements),
  stages: await Promise.all(p.stages.map(async (s) => ({ title: s.title, text: s.text, image: await media(s.image) }))),
  materials: p.materials,
  cover: await media(p.cover),
  gallery: (await Promise.all(p.gallery.map(media))).filter(Boolean),
  featured: !!p.featured, order: i, placeholder: true,
}));

await seedCollection("process-steps", processSteps, async (s, i) => ({ title: s.title, text: s.text, image: await media(s.image), order: i + 1 }));
await seedCollection("testimonials", testimonials, async (t, i) => ({ name: t.name, project: t.project, location: t.location, quote: t.quote, image: await media(t.image), order: i, placeholder: true }));
await seedCollection("faqs", faqs, async (f, i) => ({ question: f.question, answer: f.answer, order: i, showOnPackages: PACKAGE_FAQS.includes(f.id) }));
await seedCollection("reasons", reasons, async (r, i) => ({ title: r.title, text: r.text, icon: r.icon, order: i }));

/* --- globals ------------------------------------------------------------- */

async function seedGlobal(slug: "home" | "company" | "customizer", isEmpty: (doc: Record<string, unknown>) => boolean, build: () => Promise<Record<string, unknown>>) {
  const current = (await payload.findGlobal({ slug })) as unknown as Record<string, unknown>;
  if (!reset && !isEmpty(current)) return log(`${slug}: already filled — skipped`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await payload.updateGlobal({ slug, data: (await build()) as any, context: ctx });
  log(`${slug}: saved`);
}

await seedGlobal("company", (d) => !d.name, async () => ({
  name: company.name, shortName: company.shortName, legalName: company.legalName, tagline: company.tagline, description: company.description, siteUrl: company.siteUrl,
  logoOnLight: await media({ src: company.logo.onLight, alt: company.logo.alt }),
  logoOnDark: await media({ src: company.logo.onDark, alt: company.logo.alt }),
  contact: { ...company.contact, address: company.contact.address.join("\n") },
  social: company.social,
  serviceAreas: items(company.serviceAreas),
  stats: company.stats.map((s) => ({ value: s.value ?? undefined, suffix: s.suffix, display: s.display, label: s.label, placeholder: !!s.placeholder })),
}));

await seedGlobal("home", (d) => !(d.hero as { titleLine1?: string } | undefined)?.titleLine1, async () => {
  const pageImageIds: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(pageImages)) pageImageIds[k] = await media(v);
  return {
    hero: {
      eyebrow: hero.eyebrow, titleLine1: hero.title[0], titleLine2: hero.title[1], subtitle: items(hero.subtitle), description: hero.description, image: await media(images.hero.main),
      primaryLabel: hero.primaryCta.label, primaryHref: hero.primaryCta.href, secondaryLabel: hero.secondaryCta.label, secondaryHref: hero.secondaryCta.href,
    },
    about: { ...aboutIntro, factors: items(aboutIntro.factors), image: await media(images.about.main), secondaryImage: await media(images.about.secondary) },
    positioning: { statement: positioning.statement, flow: items(positioning.flow), pricingDisclaimer },
    quality: { eyebrow: quality.eyebrow, title: quality.title, lead: quality.lead, image: await media(quality.image), secondaryImage: await media(quality.secondaryImage), points: quality.points },
    pageImages: pageImageIds,
    sections: { services: true, featured: true, projects: true, packages: true, process: true, why: true, quality: true, testimonials: true, faq: true },
  };
});

await seedGlobal("customizer", (d) => !(d.steps as unknown[] | undefined)?.length, async () => ({
  steps: customizerSteps
    .filter((s) => s.id !== "package")
    .map((s) => ({ key: s.id, title: s.title, question: s.question, multiple: !!s.multiple, options: s.options.map((o) => ({ label: o.label, note: o.note })) })),
}));

log("done ✔  Open /admin to edit the content.");
process.exit(0);
