import type { QualityPoint, Reason } from "@/types/content";
import { images } from "./images";

export const reasons: Reason[] = [
  { id: "pricing", title: "Transparent Pricing", text: "Line-item estimates and stage-wise payments — you see where every rupee goes.", icon: "rupee" },
  { id: "materials", title: "Quality Materials", text: "Specified by brand and grade in writing, and checked on delivery.", icon: "layers" },
  { id: "team", title: "Experienced Team", text: "Architects, engineers and site supervisors who have built homes like yours.", icon: "team" },
  { id: "pm", title: "Professional Project Management", text: "A dedicated project manager, schedule and weekly updates.", icon: "clipboard" },
  { id: "design", title: "Customised Designs", text: "Every home is designed for its family and its site — never a template.", icon: "compass" },
  { id: "qc", title: "Quality Control", text: "Stage-wise checklists and inspections before work is covered up.", icon: "check" },
  { id: "time", title: "On-Time Execution", text: "Realistic schedules, planned procurement and tracked milestones.", icon: "clock" },
  { id: "e2e", title: "End-to-End Support", text: "From first sketch and approvals to interiors and handover.", icon: "route" },
  { id: "service", title: "Dedicated Customer Service", text: "One point of contact who knows your project.", icon: "headset" },
  { id: "comms", title: "Clear Communication", text: "Photos, progress reports and site visits whenever you want them.", icon: "chat" },
];

export const quality = {
  eyebrow: "Quality & Materials",
  title: "Built to last.",
  lead: "A home is only as good as the work you can't see. We check it before it's covered.",
  image: images.construction.site,
  secondaryImage: images.construction.structure,
  points: [
    { title: "Material selection", text: "Materials are specified in writing and checked against the specification when they arrive on site." },
    { title: "Quality control", text: "Stage-wise checklists for excavation, reinforcement, concrete, masonry, services and finishes." },
    { title: "Skilled workmanship", text: "Experienced trades for each stage, supervised by our site engineers." },
    { title: "Structural quality", text: "Engineer-designed structure, reinforcement checks before every pour, concrete cube tests." },
    { title: "Waterproofing", text: "Foundations, wet areas, sunken slabs and terraces treated and tested." },
    { title: "Electrical safety", text: "Protected circuits, proper earthing and load planning for modern appliances." },
    { title: "Plumbing quality", text: "Every line pressure-tested before it is concealed." },
    { title: "Finishing quality", text: "Level floors, true corners and clean joints — checked room by room." },
    { title: "Site supervision", text: "Daily supervision and regular progress reporting to you." },
  ] satisfies QualityPoint[],
};
