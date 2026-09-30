/**
 * Content types.
 *
 * Every piece of content on the site is described by one of these types.
 * Today the data lives in /data as TypeScript. Later, the same shapes can be
 * returned by an API / CMS — components never need to change, only the
 * getters in /lib/content.ts.
 */

/** Marks content that is demo/placeholder and must be replaced before launch. */
export type Placeholder = { placeholder?: boolean };

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Company extends Placeholder {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  logo: { onLight: string; onDark: string; alt: string };
  contact: {
    phone: string;
    phoneHref: string;
    whatsapp: string;
    whatsappHref: string;
    email: string;
    address: string[];
    mapsUrl: string;
    mapsEmbed: string;
    hours: string;
  };
  social: { label: string; href: string }[];
  serviceAreas: string[];
  stats: Stat[];
  siteUrl: string;
}

export interface Stat extends Placeholder {
  value: number | null; // null → shown as text (e.g. "Multiple")
  display?: string;
  suffix?: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Service extends Placeholder {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  image: ImageAsset;
}

export type TierId = "essential" | "signature" | "premium" | "luxury";

export interface ConstructionPackage extends Placeholder {
  id: TierId;
  slug: string;
  name: string;
  index: string;
  tagline: string;
  description: string;
  idealFor: string;
  highlights: string[];
  startingRate: string;
  image: ImageAsset;
}

/** A single specification value for one package tier. */
export type TierSpec = string | null; // null → "Not included"

export interface MaterialItem extends Placeholder {
  id: string;
  name: string;
  specs: Record<TierId, TierSpec>;
  details?: {
    sizes?: string[];
    finishes?: string[];
    brand?: string;
    estimatedRange?: string;
    notes?: string;
  };
}

export interface MaterialCategory extends Placeholder {
  id: string;
  name: string;
  summary: string;
  items: MaterialItem[];
}

export interface CustomizerOption {
  id: string;
  label: string;
  note?: string;
}

export interface CustomizerStep {
  id: string;
  title: string;
  question: string;
  multiple?: boolean;
  options: CustomizerOption[];
}

export interface Project extends Placeholder {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: string;
  area: string;
  bedrooms: number;
  floors: string;
  year: number;
  duration: string;
  package: TierId;
  summary: string;
  concept: string;
  requirements: string[];
  stages: { title: string; text: string; image: ImageAsset }[];
  materials: { label: string; value: string }[];
  cover: ImageAsset;
  gallery: ImageAsset[];
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
  image: ImageAsset;
}

export interface Reason {
  id: string;
  title: string;
  text: string;
  icon: IconName;
}

export interface QualityPoint {
  title: string;
  text: string;
}

export interface Testimonial extends Placeholder {
  id: string;
  name: string;
  project: string;
  location: string;
  quote: string;
  image: ImageAsset;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type IconName =
  | "rupee"
  | "layers"
  | "team"
  | "clipboard"
  | "compass"
  | "check"
  | "clock"
  | "route"
  | "headset"
  | "chat";
