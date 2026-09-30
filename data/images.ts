import type { ImageAsset } from "@/types/content";

/**
 * CENTRAL IMAGE REGISTRY — PLACEHOLDER PHOTOGRAPHY
 *
 * Every image on the site is referenced from here, never directly inside a
 * component. To use the company's own photographs:
 *
 *   1. Put the file in /public/images/<group>/  (e.g. /public/images/hero/home.jpg)
 *   2. Change the matching `src` below to "/images/hero/home.jpg"
 *   3. Update the `alt` text to describe the real photograph
 *
 * Once all remote images are replaced you can delete the `remotePatterns`
 * entry in next.config.ts.
 */

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: {
    main: { src: u("photo-1613490493576-7fde63acd811", 2400), alt: "Contemporary two-storey residence with a lit facade at dusk" },
    cta: { src: u("photo-1600596542815-ffad4c1539a9", 2400), alt: "Modern home exterior with large glazing and a landscaped lawn" },
    featured: { src: u("photo-1600585154340-be6161a56a0c", 2400), alt: "Minimal residence with cantilevered upper floor and pool" },
  },
  about: {
    main: { src: u("photo-1600607687939-ce8a6c25118c", 1600), alt: "Double-height living room with timber and concrete finishes" },
    secondary: { src: u("photo-1503387762-592deb58ef4e", 1200), alt: "Architect reviewing floor plans on a drafting table" },
  },
  services: {
    custom: { src: u("photo-1564013799919-ab600027ffc6", 1400), alt: "Independent family home with a sloped roof and front garden" },
    villa: { src: u("photo-1613977257363-707ba9348227", 1400), alt: "Luxury villa with a private pool and outdoor deck" },
    architecture: { src: u("photo-1503387762-592deb58ef4e", 1400), alt: "Architectural drawings and a scale ruler" },
    turnkey: { src: u("photo-1541888946425-d81bb19240f5", 1400), alt: "Residential structure under construction with scaffolding" },
    renovation: { src: u("photo-1600566753190-17f0baa2a6c3", 1400), alt: "Renovated open-plan kitchen and dining space" },
    interior: { src: u("photo-1600210492486-724fe5c67fb0", 1400), alt: "Warm contemporary living room interior" },
  },
  packages: {
    essential: { src: u("photo-1570129477492-45c003edd2be", 1400), alt: "Well-proportioned family home with a simple facade" },
    signature: { src: u("photo-1512917774080-9991f1c4c750", 1400), alt: "Contemporary home with balconies and landscaped entry" },
    premium: { src: u("photo-1600047509807-ba8f99d2cdde", 1400), alt: "Premium residence with stone cladding and wide glazing" },
    luxury: { src: u("photo-1613977257363-707ba9348227", 1400), alt: "Luxury villa with pool terrace at twilight" },
  },
  projects: {
    courtyard: { src: u("photo-1600585154340-be6161a56a0c", 2000), alt: "The Courtyard House — exterior view" },
    horizon: { src: u("photo-1613490493576-7fde63acd811", 2000), alt: "The Horizon Villa — facade at dusk" },
    urban: { src: u("photo-1600596542815-ffad4c1539a9", 2000), alt: "The Urban Residence — street elevation" },
    terrace: { src: u("photo-1580587771525-78b9dba3b914", 2000), alt: "The Terrace House — garden facade" },
  },
  interiors: {
    living: { src: u("photo-1600210492486-724fe5c67fb0", 1600), alt: "Living room with neutral finishes" },
    kitchen: { src: u("photo-1556909114-f6e7ad7d3136", 1600), alt: "Modular kitchen with stone countertop" },
    bathroom: { src: u("photo-1584622650111-993a426fbf0a", 1600), alt: "Bathroom with large-format tiles and glass shower" },
    bedroom: { src: u("photo-1616594039964-ae9021a400a0", 1600), alt: "Calm master bedroom with timber headboard" },
    stair: { src: u("photo-1600566753086-00f18fb6b3ea", 1600), alt: "Staircase with slim metal railing" },
    dining: { src: u("photo-1600566753190-17f0baa2a6c3", 1600), alt: "Open dining area with pendant lighting" },
  },
  construction: {
    foundation: { src: u("photo-1504307651254-35680f356dfd", 1600), alt: "Foundation and reinforcement work on site" },
    structure: { src: u("photo-1541888946425-d81bb19240f5", 1600), alt: "RCC frame structure under construction" },
    site: { src: u("photo-1581094794329-c8112a89af12", 1600), alt: "Site engineer checking work quality" },
    plans: { src: u("photo-1503387762-592deb58ef4e", 1600), alt: "Drawings reviewed during planning" },
    finishing: { src: u("photo-1581858726788-75bc0f6a952d", 1600), alt: "Finishing work on interior walls" },
  },
  testimonials: {
    t1: { src: u("photo-1600585154340-be6161a56a0c", 1200), alt: "Home of a client family" },
    t2: { src: u("photo-1613490493576-7fde63acd811", 1200), alt: "Villa built for a client" },
    t3: { src: u("photo-1600596542815-ffad4c1539a9", 1200), alt: "Contemporary residence built for a client" },
  },
} satisfies Record<string, Record<string, ImageAsset>>;

export const ogImage = images.hero.main.src;

/** Hero images for inner pages and the closing call-to-action. Editable in the CMS under Home → Page images. */
export const pageImages = {
  about: images.about.main,
  services: images.services.villa,
  projects: images.projects.horizon,
  packages: images.interiors.living,
  process: images.construction.structure,
  whyUs: images.construction.site,
  testimonials: images.interiors.living,
  faq: images.construction.plans,
  contact: images.hero.featured,
  cta: images.hero.cta,
} satisfies Record<string, ImageAsset>;

export type PageImages = typeof pageImages;
