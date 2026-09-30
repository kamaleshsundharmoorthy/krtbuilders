import type { ConstructionPackage, CustomizerStep, TierId } from "@/types/content";
import { images } from "./images";

/**
 * CONSTRUCTION PACKAGES — PLACEHOLDER
 *
 * Tier names and descriptions are structural. Starting rates are deliberately
 * left as editable placeholders — replace them with the company's confirmed
 * figures. Never publish demo rates as real prices.
 */
export const packages: ConstructionPackage[] = [
  {
    id: "essential",
    slug: "essential",
    index: "01",
    name: "Essential",
    tagline: "Practical. Reliable. Well built.",
    description:
      "For customers looking for a practical and reliable home with carefully selected standard materials.",
    idealFor: "First homes and rental properties where sound construction and value matter most.",
    highlights: ["Engineered RCC structure", "Standard vitrified flooring", "Reliable branded fittings", "Clean, functional finishes"],
    startingRate: "₹ [Editable] / sq.ft",
    image: images.packages.essential,
    placeholder: true,
  },
  {
    id: "signature",
    slug: "signature",
    index: "02",
    name: "Signature",
    tagline: "Better specifications, more choice.",
    description:
      "A balanced package combining quality materials, enhanced finishes, better specifications, and additional customisation.",
    idealFor: "Families who want upgraded finishes and room to personalise without a luxury budget.",
    highlights: ["Upgraded tile & sanitaryware range", "Enhanced kitchen platform", "Improved doors & windows", "More electrical points"],
    startingRate: "₹ [Editable] / sq.ft",
    image: images.packages.signature,
    placeholder: true,
  },
  {
    id: "premium",
    slug: "premium",
    index: "03",
    name: "Premium",
    tagline: "Superior finishes, elevated design.",
    description:
      "A high-end residential package focused on premium materials, superior finishes, enhanced design, and elevated specifications.",
    idealFor: "Homeowners who want a design-led home with premium materials throughout.",
    highlights: ["Large-format premium tiles", "Premium sanitaryware & fittings", "False ceiling with cove lighting", "Designed exterior elevation"],
    startingRate: "₹ [Editable] / sq.ft",
    image: images.packages.premium,
    placeholder: true,
  },
  {
    id: "luxury",
    slug: "luxury",
    index: "04",
    name: "Luxury",
    tagline: "Fully bespoke, down to the detail.",
    description:
      "A fully customised premium package with high-end materials, architectural detailing, luxury finishes, smart-home possibilities, and extensive personalisation.",
    idealFor: "Villas and signature residences where every surface is chosen, not specified.",
    highlights: ["Natural stone & designer finishes", "Architectural detailing", "Smart-home integration", "Landscape & outdoor living"],
    startingRate: "₹ [Editable] / sq.ft",
    image: images.packages.luxury,
    placeholder: true,
  },
];

export const tierIds: TierId[] = packages.map((p) => p.id);

export const customizerSteps: CustomizerStep[] = [
  {
    id: "package",
    title: "Package",
    question: "Which package is your starting point?",
    options: packages.map((p) => ({ id: p.id, label: p.name, note: p.tagline })),
  },
  {
    id: "flooring",
    title: "Flooring",
    question: "How should your floors feel?",
    options: [
      { id: "vitrified-standard", label: "Vitrified tiles", note: "Durable, easy to maintain" },
      { id: "vitrified-large", label: "Large-format vitrified", note: "Fewer joints, cleaner look" },
      { id: "marble-look", label: "Marble-finish slabs", note: "Stone look, tile practicality" },
      { id: "natural-stone", label: "Natural stone / marble", note: "Unique, premium finish" },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen",
    question: "Choose a kitchen finish.",
    options: [
      { id: "granite-platform", label: "Granite platform", note: "Classic and hard-wearing" },
      { id: "modular-laminate", label: "Modular — laminate", note: "Practical storage" },
      { id: "modular-acrylic", label: "Modular — acrylic / PU", note: "High-gloss or matt premium" },
      { id: "designer", label: "Designer kitchen", note: "Quartz, integrated appliances" },
    ],
  },
  {
    id: "bathroom",
    title: "Bathroom",
    question: "Select a bathroom range.",
    options: [
      { id: "standard", label: "Standard range", note: "Reliable branded fittings" },
      { id: "enhanced", label: "Enhanced range", note: "Wall-hung WC, better fittings" },
      { id: "premium", label: "Premium range", note: "Rain shower, glass partition" },
      { id: "luxury", label: "Luxury range", note: "Designer sanitaryware" },
    ],
  },
  {
    id: "openings",
    title: "Doors & Windows",
    question: "Doors and windows.",
    options: [
      { id: "upvc-flush", label: "UPVC windows · flush doors", note: "Low maintenance" },
      { id: "upvc-veneer", label: "UPVC windows · veneer doors", note: "Warmer interior feel" },
      { id: "aluminium-teak", label: "Aluminium systems · teak main door", note: "Slim sightlines" },
      { id: "custom", label: "Custom glazing & joinery", note: "Designed per opening" },
    ],
  },
  {
    id: "electrical",
    title: "Electrical",
    question: "Electrical package.",
    options: [
      { id: "standard", label: "Standard points", note: "Per-room essentials" },
      { id: "enhanced", label: "Enhanced points", note: "Extra sockets, AC & data" },
      { id: "designer", label: "Designer lighting", note: "Layered lighting plan" },
    ],
  },
  {
    id: "smart",
    title: "Smart Home",
    question: "Any smart-home additions?",
    multiple: true,
    options: [
      { id: "cctv", label: "CCTV" },
      { id: "doorbell", label: "Video doorbell" },
      { id: "locks", label: "Smart locks" },
      { id: "lighting", label: "Smart lighting" },
      { id: "switches", label: "Smart switches" },
      { id: "sensors", label: "Sensors" },
      { id: "automation", label: "Home automation" },
      { id: "network", label: "Wi-Fi / networking" },
    ],
  },
];
