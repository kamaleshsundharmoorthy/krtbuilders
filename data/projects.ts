import type { Project } from "@/types/content";
import { images } from "./images";

/**
 * PROJECTS — PLACEHOLDER
 *
 * These are demo projects. Replace names, locations, figures, text and images
 * with the company's real completed homes. The first project with
 * `featured: true` is used for the home page "featured story" section.
 */
export const projects: Project[] = [
  {
    id: "courtyard",
    slug: "the-courtyard-house",
    name: "The Courtyard House",
    location: "Madurai, Tamil Nadu",
    type: "Modern Residence",
    area: "2,800 sq.ft",
    bedrooms: 4,
    floors: "G + 1",
    year: 2024,
    duration: "14 months",
    package: "premium",
    featured: true,
    summary: "A family home organised around a central open-to-sky courtyard that brings light and cross-ventilation into every room.",
    concept:
      "The house turns inward. Rooms wrap around a planted courtyard, so every space gets daylight and a breeze without facing the busy street. Deep overhangs and a brick screen shade the west facade, and the upper floor cantilevers to create a covered verandah below.",
    requirements: [
      "Space for three generations, including a ground-floor bedroom for grandparents",
      "Privacy from a busy road without losing daylight",
      "Natural ventilation to reduce dependence on air-conditioning",
      "A large kitchen and dining area for family gatherings",
    ],
    stages: [
      { title: "Foundation", text: "Isolated footings designed after soil investigation; plinth waterproofed before backfilling.", image: images.construction.foundation },
      { title: "Structure", text: "RCC frame with a cantilevered first-floor slab over the verandah.", image: images.construction.structure },
      { title: "Finishing", text: "Large-format flooring, courtyard stone and exposed-brick screen detailing.", image: images.construction.finishing },
    ],
    materials: [
      { label: "Flooring", value: "Large-format vitrified tiles [placeholder]" },
      { label: "Courtyard", value: "Natural stone paving [placeholder]" },
      { label: "Windows", value: "UPVC with toughened glass [placeholder]" },
      { label: "Kitchen", value: "Modular kitchen, quartz top [placeholder]" },
    ],
    cover: images.projects.courtyard,
    gallery: [images.projects.courtyard, images.interiors.living, images.interiors.kitchen, images.interiors.stair, images.interiors.bedroom, images.interiors.bathroom],
    placeholder: true,
  },
  {
    id: "horizon",
    slug: "the-horizon-villa",
    name: "The Horizon Villa",
    location: "Coimbatore, Tamil Nadu",
    type: "Luxury Villa",
    area: "3,500 sq.ft",
    bedrooms: 4,
    floors: "G + 1",
    year: 2023,
    duration: "18 months",
    package: "luxury",
    summary: "A villa that opens entirely to the hills, with a pool terrace and long horizontal lines that echo the landscape.",
    concept:
      "Long, low volumes stretch across the site to frame views of the Western Ghats. The living spaces slide open to a pool terrace, while bedrooms above sit behind timber louvres for privacy and shade.",
    requirements: ["Uninterrupted views from the living spaces", "A pool and outdoor entertaining area", "Home automation and security", "Low-maintenance exterior finishes"],
    stages: [
      { title: "Foundation", text: "Raft foundation on a sloping site with retaining walls.", image: images.construction.foundation },
      { title: "Structure", text: "Long-span beams to keep the living area column-free.", image: images.construction.structure },
      { title: "Finishing", text: "Stone cladding, timber louvres and a fully integrated lighting plan.", image: images.construction.finishing },
    ],
    materials: [
      { label: "Flooring", value: "Natural stone [placeholder]" },
      { label: "Glazing", value: "Aluminium sliding systems [placeholder]" },
      { label: "Exterior", value: "Stone cladding + timber louvres [placeholder]" },
      { label: "Smart home", value: "Lighting, security & automation [placeholder]" },
    ],
    cover: images.projects.horizon,
    gallery: [images.projects.horizon, images.interiors.dining, images.interiors.living, images.interiors.bathroom, images.interiors.bedroom, images.interiors.kitchen],
    placeholder: true,
  },
  {
    id: "urban",
    slug: "the-urban-residence",
    name: "The Urban Residence",
    location: "Chennai, Tamil Nadu",
    type: "Contemporary Home",
    area: "2,200 sq.ft",
    bedrooms: 3,
    floors: "G + 2",
    year: 2024,
    duration: "12 months",
    package: "signature",
    summary: "A compact city home that stacks living, sleeping and a roof terrace on a narrow plot.",
    concept:
      "On a narrow urban plot, the house grows upward. A central stair with a skylight pulls light down through all three levels, and the top floor opens onto a shaded roof terrace.",
    requirements: ["Maximise space on a narrow plot", "Parking for two cars", "A usable roof terrace", "Plenty of storage"],
    stages: [
      { title: "Foundation", text: "Combined footings to suit the narrow plot and neighbouring structures.", image: images.construction.foundation },
      { title: "Structure", text: "Three-storey RCC frame with a skylit stair core.", image: images.construction.structure },
      { title: "Finishing", text: "Built-in storage, terrace waterproofing and landscaping.", image: images.construction.finishing },
    ],
    materials: [
      { label: "Flooring", value: "Premium vitrified tiles [placeholder]" },
      { label: "Stair", value: "Granite treads, SS + glass railing [placeholder]" },
      { label: "Terrace", value: "Waterproofing + outdoor tiles [placeholder]" },
      { label: "Doors", value: "Veneer flush doors [placeholder]" },
    ],
    cover: images.projects.urban,
    gallery: [images.projects.urban, images.interiors.stair, images.interiors.kitchen, images.interiors.living, images.interiors.bedroom, images.interiors.dining],
    placeholder: true,
  },
  {
    id: "terrace",
    slug: "the-terrace-house",
    name: "The Terrace House",
    location: "Tiruchirappalli, Tamil Nadu",
    type: "Independent House",
    area: "1,850 sq.ft",
    bedrooms: 3,
    floors: "G + 1",
    year: 2025,
    duration: "11 months",
    package: "essential",
    summary: "A straightforward, well-built family home with generous terraces and a garden-facing living room.",
    concept:
      "A simple plan done well. Living spaces face the garden, bedrooms sit upstairs with private terraces, and careful detailing makes standard materials feel considered.",
    requirements: ["A reliable home within a fixed budget", "Garden-facing living room", "Future provision for an additional floor"],
    stages: [
      { title: "Foundation", text: "Footings designed to carry a future additional floor.", image: images.construction.foundation },
      { title: "Structure", text: "RCC frame with brick masonry.", image: images.construction.structure },
      { title: "Finishing", text: "Vitrified flooring and weatherproof exterior paint.", image: images.construction.finishing },
    ],
    materials: [
      { label: "Flooring", value: "Vitrified tiles [placeholder]" },
      { label: "Windows", value: "UPVC sliding [placeholder]" },
      { label: "Kitchen", value: "Granite platform [placeholder]" },
      { label: "Exterior", value: "Weatherproof emulsion [placeholder]" },
    ],
    cover: images.projects.terrace,
    gallery: [images.projects.terrace, images.interiors.living, images.interiors.kitchen, images.interiors.bedroom],
    placeholder: true,
  },
];
