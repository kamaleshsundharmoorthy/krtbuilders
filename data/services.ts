import type { Service } from "@/types/content";
import { images } from "./images";

export const services: Service[] = [
  {
    id: "custom",
    slug: "custom-home-construction",
    title: "Custom Home Construction",
    short: "Personalised independent homes shaped by your lifestyle, site, requirements and budget.",
    description:
      "Design and construction of personalised independent homes based on the client's lifestyle, site, requirements, and budget. One team carries the house from first sketch to handover.",
    includes: ["Site study & soil assessment", "Architecture & structural design", "Construction & supervision", "Finishing & handover"],
    image: images.services.custom,
  },
  {
    id: "villa",
    slug: "villa-construction",
    title: "Villa Construction",
    short: "Premium villas with considered architecture, engineering and detailed execution.",
    description:
      "Premium villas with architectural planning, structural engineering, high-quality materials, and detailed execution — from the pool deck to the last shadow gap.",
    includes: ["Architectural planning", "Structural engineering", "Premium material selection", "Landscape & outdoor living"],
    image: images.services.villa,
  },
  {
    id: "architecture",
    slug: "architectural-design",
    title: "Architectural Design",
    short: "Concept, floor plans, elevations and space planning — coordinated end to end.",
    description:
      "Concept development, floor planning, elevation design, space planning, and architectural coordination with structural and MEP consultants.",
    includes: ["Concept development", "Floor planning", "Elevation design", "3D visualisation"],
    image: images.services.architecture,
  },
  {
    id: "turnkey",
    slug: "turnkey-construction",
    title: "Turnkey Construction",
    short: "One contract from design and materials to construction, finishing and handover.",
    description:
      "Complete construction management from design and planning through materials, construction, finishing, and handover. You deal with one accountable team throughout.",
    includes: ["Single point of contact", "Material procurement", "Stage-wise quality checks", "Key handover"],
    image: images.services.turnkey,
  },
  {
    id: "renovation",
    slug: "home-renovation",
    title: "Home Renovation",
    short: "Transforming and modernising existing homes — structurally and aesthetically.",
    description:
      "Transformation and modernisation of existing residential properties, including layout changes, extensions, waterproofing, services upgrades and new finishes.",
    includes: ["Condition assessment", "Layout re-planning", "Services upgrade", "New finishes"],
    image: images.services.renovation,
  },
  {
    id: "interior",
    slug: "interior-design",
    title: "Interior Design",
    short: "Interiors, lighting, kitchens, wardrobes and furniture coordination.",
    description:
      "Interior planning, finishes, lighting, furniture coordination, kitchens, wardrobes, and other interior requirements — designed alongside the architecture, not after it.",
    includes: ["Interior planning", "Lighting design", "Modular kitchens & wardrobes", "Furniture coordination"],
    image: images.services.interior,
  },
];
