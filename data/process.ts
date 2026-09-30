import type { ProcessStep } from "@/types/content";
import { images } from "./images";

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Consultation", text: "We listen first — how you live, what you need, what you imagine and what you want to spend.", image: images.about.main },
  { number: "02", title: "Site Visit", text: "Our team studies the plot: orientation, access, soil, neighbours, setbacks and approvals.", image: images.construction.site },
  { number: "03", title: "Requirement Analysis", text: "Your brief becomes a room-by-room requirement list with sizes, adjacencies and priorities.", image: images.construction.plans },
  { number: "04", title: "Architectural Design", text: "Concept, floor plans, elevations and 3D views — refined with you until it feels right.", image: images.services.architecture },
  { number: "05", title: "Planning & Estimation", text: "Structural design, services layouts, material specifications and a transparent line-item estimate.", image: images.construction.plans },
  { number: "06", title: "Agreement", text: "Scope, specifications, stage-wise payments and timeline are written down and signed.", image: images.about.secondary },
  { number: "07", title: "Foundation", text: "Excavation, footings, plinth and waterproofing — inspected before anything is covered.", image: images.construction.foundation },
  { number: "08", title: "Structure", text: "Columns, beams, slabs and masonry, with cube tests and reinforcement checks at every pour.", image: images.construction.structure },
  { number: "09", title: "MEP · Electrical · Plumbing", text: "Concealed wiring and plumbing laid to plan and pressure-tested before plastering.", image: images.construction.site },
  { number: "10", title: "Flooring & Finishing", text: "Plastering, flooring, tiling, painting and joinery — the stage where the house becomes a home.", image: images.construction.finishing },
  { number: "11", title: "Interior Works", text: "Kitchens, wardrobes, ceilings, lighting and furniture coordination.", image: images.interiors.living },
  { number: "12", title: "Final Inspection", text: "A room-by-room snag list, services testing and cleaning before handover.", image: images.interiors.bathroom },
  { number: "13", title: "Handover", text: "Keys, drawings, warranties and a walkthrough of how everything works.", image: images.projects.courtyard },
];
