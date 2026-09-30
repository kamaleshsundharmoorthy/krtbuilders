import type { Company, NavItem } from "@/types/content";

/**
 * COMPANY INFORMATION — PLACEHOLDER
 *
 * Name, contact details, statistics and addresses below are demo values.
 * Replace every field before launch. Do not publish the statistics until the
 * real figures are confirmed.
 */
export const company: Company = {
  placeholder: true,
  name: "Redstone Homes",
  shortName: "Redstone",
  legalName: "Redstone Homes & Constructions Pvt. Ltd. [placeholder]",
  tagline: "From dream → design → reality",
  description:
    "Residential construction company designing and building independent houses, custom homes and luxury villas across Tamil Nadu.",
  logo: {
    onLight: "/images/brand/logo-dark.svg",
    onDark: "/images/brand/logo-light.svg",
    alt: "Redstone Homes logo",
  },
  contact: {
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    whatsapp: "+91 98765 43210",
    whatsappHref: "https://wa.me/919876543210",
    email: "hello@redstonehomes.example",
    address: ["12, Placeholder Road", "Anna Nagar", "Madurai, Tamil Nadu 625020"],
    mapsUrl: "https://maps.google.com/?q=Madurai,Tamil+Nadu",
    mapsEmbed: "https://www.google.com/maps?q=Madurai,Tamil%20Nadu&output=embed",
    hours: "Mon – Sat · 9:30 am – 6:30 pm",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
  serviceAreas: ["Madurai", "Coimbatore", "Chennai", "Tiruchirappalli", "Salem"],
  stats: [
    { value: 10, suffix: "+", label: "Years experience", placeholder: true },
    { value: 150, suffix: "+", label: "Homes built", placeholder: true },
    { value: 100, suffix: "%", label: "Client focus", placeholder: true },
    { value: null, display: "Multiple", label: "Locations", placeholder: true },
  ],
  siteUrl: "https://www.redstonehomes.example",
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Packages", href: "/packages" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Packages", href: "/packages" },
    { label: "Process", href: "/process" },
    { label: "Why Us", href: "/why-us" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "House Construction", href: "/services#custom-home-construction" },
    { label: "Villa Construction", href: "/services#villa-construction" },
    { label: "Turnkey Construction", href: "/services#turnkey-construction" },
    { label: "Architectural Design", href: "/services#architectural-design" },
    { label: "Renovation", href: "/services#home-renovation" },
    { label: "Interior Design", href: "/services#interior-design" },
  ],
} satisfies Record<string, NavItem[]>;

export const hero = {
  eyebrow: "Residential Construction · Tamil Nadu",
  title: ["We build", "your home."],
  subtitle: ["Dream", "Design", "Reality"],
  description: "Thoughtfully designed and professionally built homes, created around the way you live.",
  primaryCta: { label: "Start a Project", href: "/contact" },
  secondaryCta: { label: "View Our Homes", href: "/projects" },
};

export const aboutIntro = {
  eyebrow: "About",
  title: "Built around your life.",
  lead:
    "Every home we build starts with a conversation, not a catalogue. We design and construct independent homes and villas that are shaped by the people who will live in them.",
  body:
    "Before a single drawing is made we study how your family lives, the character of your site, the architecture you are drawn to, the budget you are working with and the materials you prefer. Planning, structure, services and finishes then follow from those decisions — so the finished house fits your life rather than a template.",
  factors: [
    "Lifestyle",
    "Family requirements",
    "Site conditions",
    "Architecture",
    "Budget",
    "Material preferences",
    "Functional requirements",
  ],
};

export const positioning = {
  statement:
    "We build personalised homes. Our packages are a transparent starting point for understanding quality, specifications and inclusions — not a limit on what your home can be.",
  flow: ["Design", "Planning", "Materials", "Construction", "Quality Control", "Finishing", "Handover"],
};

export const pricingDisclaimer =
  "Final pricing depends on site conditions, built-up area, design, specifications, material selections, and project requirements.";
