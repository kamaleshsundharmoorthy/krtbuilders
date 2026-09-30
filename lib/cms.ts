/**
 * Payload CMS → website content mappers.
 *
 * Converts documents from the admin panel into the shapes in
 * /types/content.ts, so the components never know where content came from.
 */
import type * as P from "@/types/payload-types";
export type * as P from "@/types/payload-types";
import type {
  Company,
  ConstructionPackage,
  CustomizerStep,
  FaqItem,
  ImageAsset,
  MaterialCategory,
  ProcessStep,
  Project,
  QualityPoint,
  Reason,
  Service,
  Testimonial,
  TierId,
} from "@/types/content";

export const cmsEnabled = Boolean(process.env.DATABASE_URI);

export async function getCms() {
  const [{ getPayload }, { default: config }] = await Promise.all([import("payload"), import("@payload-config")]);
  return getPayload({ config });
}

const EMPTY: ImageAsset = { src: "", alt: "" };

type Upload = string | P.Media | null | undefined;
export type UploadValue = Upload;
/**
 * Uploads stored on this server come back as absolute URLs
 * (e.g. http://localhost:3100/api/media/file/x.jpg). Make them relative so
 * next/image treats them as local files; Blob storage URLs are left as-is.
 */
const SERVER = (process.env.NEXT_PUBLIC_SERVER_URL || "").replace(/\/$/, "");
const localize = (url: string) => {
  if (SERVER && url.startsWith(SERVER)) return url.slice(SERVER.length) || "/";
  const m = url.match(/^https?:\/\/[^/]+(\/api\/media\/file\/.*)$/);
  return m ? m[1] : url;
};

export const img = (m: Upload, fallback: ImageAsset = EMPTY): ImageAsset =>
  m && typeof m === "object" && m.url ? { src: localize(m.url), alt: m.alt ?? "" } : fallback;

type ListItem = { value: string; id?: string | null }[] | null | undefined;
export const list = (l: ListItem) => (l ?? []).map((x) => x.value);

const split = (s?: string | null) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : undefined);

/* ------------------------------------------------------------------------- */

export const toService = (d: P.Service): Service => ({
  id: String(d.id),
  slug: d.slug,
  title: d.title,
  short: d.short,
  description: d.description,
  includes: list(d.includes),
  image: img(d.image),
  placeholder: d.placeholder ?? false,
});

export const toProject = (d: P.Project): Project => ({
  id: String(d.id),
  slug: d.slug,
  name: d.name,
  location: d.location,
  type: d.type,
  area: d.area,
  bedrooms: d.bedrooms,
  floors: d.floors,
  year: d.year,
  duration: d.duration,
  package: (d.package ?? "signature") as TierId,
  summary: d.summary,
  concept: d.concept,
  requirements: list(d.requirements),
  stages: (d.stages ?? []).map((s) => ({ title: s.title, text: s.text ?? "", image: img(s.image) })),
  materials: (d.materials ?? []).map((m) => ({ label: m.label, value: m.value })),
  cover: img(d.cover),
  gallery: (d.gallery ?? []).map((g) => img(g)).filter((g) => g.src),
  featured: d.featured ?? false,
  placeholder: d.placeholder ?? false,
});

export const toPackage = (d: P.Package, i: number): ConstructionPackage => ({
  id: d.tier as TierId,
  slug: d.slug,
  name: d.name,
  index: String(i + 1).padStart(2, "0"),
  tagline: d.tagline,
  description: d.description,
  idealFor: d.idealFor ?? "",
  highlights: list(d.highlights),
  startingRate: d.startingRate ?? "On request",
  image: img(d.image),
  placeholder: d.placeholder ?? false,
});

export const toMaterialCategory = (d: P.MaterialCategory): MaterialCategory => ({
  id: d.slug,
  name: d.name,
  summary: d.summary ?? "",
  placeholder: d.placeholder ?? false,
  items: (d.items ?? []).map((it, k) => ({
    id: it.id ?? `${d.slug}-${k}`,
    name: it.name,
    specs: {
      essential: it.specs?.essential || null,
      signature: it.specs?.signature || null,
      premium: it.specs?.premium || null,
      luxury: it.specs?.luxury || null,
    },
    details: {
      sizes: split(it.details?.sizes),
      finishes: split(it.details?.finishes),
      brand: it.details?.brand || undefined,
      estimatedRange: it.details?.estimatedRange || undefined,
      notes: it.details?.notes || undefined,
    },
  })),
});

export const toProcessStep = (d: P.ProcessStep, i: number): ProcessStep => ({
  number: String(i + 1).padStart(2, "0"),
  title: d.title,
  text: d.text,
  image: img(d.image),
});

export const toTestimonial = (d: P.Testimonial): Testimonial => ({
  id: String(d.id),
  name: d.name,
  project: d.project ?? "",
  location: d.location ?? "",
  quote: d.quote,
  image: img(d.image),
  placeholder: d.placeholder ?? false,
});

export const toFaq = (d: P.Faq): FaqItem & { showOnPackages: boolean } => ({
  id: String(d.id),
  question: d.question,
  answer: d.answer,
  showOnPackages: d.showOnPackages ?? false,
});

export const toReason = (d: P.Reason): Reason => ({ id: String(d.id), title: d.title, text: d.text, icon: d.icon as Reason["icon"] });

export const toCustomizerSteps = (g: P.Customizer, packages: ConstructionPackage[]): CustomizerStep[] => [
  { id: "package", title: "Package", question: "Which package is your starting point?", options: packages.map((p) => ({ id: p.id, label: p.name, note: p.tagline })) },
  ...(g.steps ?? []).map((s) => ({
    id: s.key,
    title: s.title,
    question: s.question,
    multiple: s.multiple ?? false,
    options: (s.options ?? []).map((o, k) => ({ id: o.id ?? `${s.key}-${k}`, label: o.label, note: o.note ?? undefined })),
  })),
];

const telHref = (n?: string | null) => (n ? `tel:${n.replace(/[^\d+]/g, "")}` : "");
const waHref = (n?: string | null) => (n ? `https://wa.me/${n.replace(/\D/g, "")}` : "");

/** Company global, falling back to the static defaults for any empty field. */
export const toCompany = (g: P.Company, d: Company): Company => ({
  ...d,
  placeholder: false,
  name: g.name || d.name,
  shortName: g.shortName || d.shortName,
  legalName: g.legalName || d.legalName,
  tagline: g.tagline || d.tagline,
  description: g.description || d.description,
  siteUrl: g.siteUrl || d.siteUrl,
  logo: {
    onLight: img(g.logoOnLight).src || d.logo.onLight,
    onDark: img(g.logoOnDark).src || d.logo.onDark,
    alt: `${g.name || d.name} logo`,
  },
  contact: {
    phone: g.contact?.phone || d.contact.phone,
    phoneHref: telHref(g.contact?.phone) || d.contact.phoneHref,
    whatsapp: g.contact?.whatsapp || d.contact.whatsapp,
    whatsappHref: waHref(g.contact?.whatsapp) || d.contact.whatsappHref,
    email: g.contact?.email || d.contact.email,
    address: g.contact?.address ? g.contact.address.split("\n").map((l) => l.trim()).filter(Boolean) : d.contact.address,
    mapsUrl: g.contact?.mapsUrl || d.contact.mapsUrl,
    mapsEmbed: g.contact?.mapsEmbed || d.contact.mapsEmbed,
    hours: g.contact?.hours || d.contact.hours,
  },
  social: g.social?.length ? g.social.map((s) => ({ label: s.label, href: s.href })) : d.social,
  serviceAreas: g.serviceAreas?.length ? list(g.serviceAreas) : d.serviceAreas,
  stats: g.stats?.length
    ? g.stats.map((s) => ({ value: s.value ?? null, suffix: s.suffix ?? undefined, display: s.display ?? undefined, label: s.label, placeholder: s.placeholder ?? false }))
    : d.stats,
});

export const toQualityPoints = (l: { title: string; text?: string | null }[] | null | undefined, d: QualityPoint[]) =>
  l?.length ? l.map((p) => ({ title: p.title, text: p.text ?? "" })) : d;
