import type { MaterialCategory, MaterialItem, TierSpec } from "@/types/content";

/**
 * MATERIAL SPECIFICATIONS — PLACEHOLDER
 *
 * Every value in this file is illustrative. Brands, grades, sizes, ranges and
 * technical specifications MUST be replaced with the company's confirmed
 * specifications before launch. Brand and price fields are intentionally left
 * as "[Editable]".
 *
 * Structure:
 *   category → items → one spec per package tier (essential / signature / premium / luxury)
 *   `null` means "not included in this package" (usually available as an add-on).
 */

const t = (essential: TierSpec, signature: TierSpec, premium: TierSpec, luxury: TierSpec) => ({
  essential,
  signature,
  premium,
  luxury,
});

const EDIT = "[Editable]";

const item = (id: string, name: string, specs: MaterialItem["specs"], details?: MaterialItem["details"]): MaterialItem => ({
  id,
  name,
  specs,
  details: { brand: EDIT, estimatedRange: EDIT, ...details },
  placeholder: true,
});

export const materialCategories: MaterialCategory[] = [
  {
    id: "structure",
    name: "Structure",
    summary: "Foundation, RCC frame and masonry designed by a structural engineer for your site and soil.",
    items: [
      item("foundation", "Foundation", t("As per structural design & soil report", "As per structural design & soil report", "As per structural design & soil report", "As per structural design & soil report"), { notes: "Foundation type is decided after soil investigation." }),
      item("rcc", "RCC framework", t("Engineered RCC frame", "Engineered RCC frame", "Engineered RCC frame", "Engineered RCC frame")),
      item("columns", "Columns & beams", t("Size per structural design", "Size per structural design", "Size per structural design", "Size per structural design")),
      item("slabs", "Slabs", t("RCC slab, thickness per design", "RCC slab, thickness per design", "RCC slab, thickness per design", "RCC slab, thickness per design")),
      item("waterproofing-structure", "Waterproofing", t("Terrace & wet areas", "Terrace, wet areas & sunken slabs", "Full-envelope system", "Full-envelope system with extended warranty [Editable]")),
      item("spec", "Structural specifications", t("[Editable]", "[Editable]", "[Editable]", "[Editable]")),
    ],
  },
  {
    id: "cement",
    name: "Cement",
    summary: "Cement type is matched to its application — structural concrete, masonry and plastering.",
    items: [
      item("cement-brand", "Cement brand", t(EDIT, EDIT, EDIT, EDIT)),
      item("cement-grade", "Cement grade", t("As per structural design [Editable]", "As per structural design [Editable]", "As per structural design [Editable]", "As per structural design [Editable]")),
      item("cement-application", "Application", t("Structure, masonry, plastering", "Structure, masonry, plastering", "Structure, masonry, plastering", "Structure, masonry, plastering")),
      item("cement-structural", "Structural usage", t("Design-mix concrete for RCC", "Design-mix concrete for RCC", "Ready-mix concrete where feasible", "Ready-mix concrete where feasible")),
    ],
  },
  {
    id: "steel",
    name: "Steel",
    summary: "TMT reinforcement sized and detailed by the structural engineer.",
    items: [
      item("steel-brand", "Steel brand", t(EDIT, EDIT, EDIT, EDIT)),
      item("steel-grade", "Grade", t("[Editable]", "[Editable]", "[Editable]", "[Editable]")),
      item("steel-reinforcement", "Structural reinforcement", t("Per structural drawings", "Per structural drawings", "Per structural drawings", "Per structural drawings")),
      item("steel-spec", "Approximate specification", t("[Editable]", "[Editable]", "[Editable]", "[Editable]")),
    ],
  },
  {
    id: "walls",
    name: "Walls",
    summary: "Masonry chosen for strength, thermal comfort and finish quality.",
    items: [
      item("wall-type", "Brick / block type", t("Solid blocks or red bricks", "Red bricks or AAC blocks", "AAC blocks", "AAC blocks / as per design")),
      item("wall-internal", "Internal walls", t("100 mm [Editable]", "100 mm [Editable]", "100–150 mm [Editable]", "As per design")),
      item("wall-external", "External walls", t("200 mm [Editable]", "200 mm [Editable]", "200 mm [Editable]", "As per design")),
      item("wall-mortar", "Mortar specification", t("Cement mortar [ratio editable]", "Cement mortar [ratio editable]", "Cement mortar / block adhesive", "Block adhesive / as per design")),
    ],
  },
  {
    id: "flooring",
    name: "Flooring",
    summary: "Floor finishes room by room — material, size and finish.",
    items: [
      item("floor-living", "Living room", t("Vitrified tiles", "Premium vitrified tiles", "Large-format vitrified / marble-finish slab", "Italian marble / natural stone"), { sizes: ["600 × 600 mm", "600 × 1200 mm", "800 × 1600 mm"], finishes: ["Matt", "Gloss"] }),
      item("floor-bedrooms", "Bedrooms", t("Vitrified tiles", "Premium vitrified tiles", "Large-format vitrified / engineered wood", "Engineered wood / natural stone"), { sizes: ["600 × 600 mm", "600 × 1200 mm"], finishes: ["Matt", "Satin"] }),
      item("floor-kitchen", "Kitchen", t("Vitrified tiles", "Anti-skid vitrified tiles", "Premium anti-skid tiles", "As per design"), { sizes: ["600 × 600 mm"], finishes: ["Matt", "Anti-skid"] }),
      item("floor-bathrooms", "Bathrooms", t("Anti-skid ceramic tiles", "Anti-skid vitrified tiles", "Premium anti-skid tiles", "Designer tiles / stone"), { sizes: ["300 × 300 mm", "600 × 600 mm"], finishes: ["Anti-skid"] }),
      item("floor-balcony", "Balcony", t("Anti-skid tiles", "Anti-skid tiles", "Outdoor-rated tiles", "Stone / deck finish")),
      item("floor-outdoor", "Outdoor areas", t("Paver blocks", "Paver blocks", "Natural stone / pavers", "Landscaped hardscape")),
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    summary: "Platform, sink, storage and hardware for a kitchen that works hard.",
    items: [
      item("k-countertop", "Countertop", t("Granite", "Granite", "Granite / quartz", "Quartz / natural stone")),
      item("k-platform", "Kitchen platform", t("RCC platform", "RCC platform", "RCC / modular base", "Modular base")),
      item("k-sink", "Sink", t("Stainless steel, single bowl", "Stainless steel, bowl + drain board", "Premium stainless / quartz sink", "Designer sink")),
      item("k-backsplash", "Backsplash", t("Ceramic tiles, 600 mm above platform", "Full-height tiles", "Designer tiles", "Stone / glass backsplash")),
      item("k-cabinets", "Cabinets", t(null, null, "Modular — laminate [optional]", "Modular — acrylic / PU")),
      item("k-hardware", "Hardware", t(null, "Standard hardware", "Soft-close hardware", "Premium soft-close hardware")),
      item("k-storage", "Storage", t("Open shelves", "Loft & open shelves", "Tall unit + drawers", "Full modular storage")),
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    summary: "Tiles, sanitaryware, fittings and waterproofing for every bathroom.",
    items: [
      item("b-floor", "Floor tiles", t("Anti-skid ceramic", "Anti-skid vitrified", "Premium anti-skid", "Designer / stone")),
      item("b-wall", "Wall tiles", t("Ceramic, up to 7 ft", "Ceramic, full height", "Large-format, full height", "Designer, full height")),
      item("b-sanitary", "Sanitaryware", t("Floor-mounted EWC", "Wall-hung EWC", "Wall-hung EWC with concealed cistern", "Designer sanitaryware")),
      item("b-faucets", "Faucets", t("Branded CP fittings", "Upgraded CP fittings", "Premium CP fittings", "Designer fittings")),
      item("b-shower", "Shower", t("Overhead shower", "Overhead + hand shower", "Rain shower + glass partition", "Rain shower + thermostatic mixer")),
      item("b-accessories", "Accessories", t("Basic set", "Standard set", "Premium set", "Designer set")),
      item("b-waterproofing", "Waterproofing", t("Floor & 300 mm up walls", "Floor & shower walls", "Full wet-area membrane", "Full wet-area membrane")),
    ],
  },
  {
    id: "doors",
    name: "Doors",
    summary: "Main door, internal doors, frames and locks.",
    items: [
      item("d-main", "Main door", t("Hardwood frame, flush shutter", "Teak frame, veneer shutter", "Teak frame & shutter", "Designer teak / pivot door")),
      item("d-internal", "Internal doors", t("Flush doors, laminate finish", "Flush doors, veneer finish", "Designer flush doors", "Custom doors")),
      item("d-frames", "Door frames", t("Hardwood", "Hardwood", "Teak / engineered", "Teak / concealed frames")),
      item("d-hardware", "Hardware", t("SS hardware", "SS hardware", "Premium hardware", "Designer hardware")),
      item("d-locks", "Locks", t("Mortise locks", "Mortise locks", "Premium mortise locks", "Digital lock on main door")),
    ],
  },
  {
    id: "windows",
    name: "Windows",
    summary: "Frames, glazing and mesh for light, ventilation and security.",
    items: [
      item("w-frame", "Window frame", t("UPVC", "UPVC", "UPVC / aluminium system", "Aluminium system / as per design")),
      item("w-glass", "Glass", t("Clear float glass", "Clear toughened glass", "Toughened glass", "Toughened / DGU as required")),
      item("w-hardware", "Hardware", t("Standard", "Standard", "Premium", "Premium")),
      item("w-mesh", "Mosquito mesh", t("Fixed mesh", "Sliding mesh", "Sliding / pleated mesh", "Pleated mesh")),
      item("w-system", "Sliding / opening systems", t("Sliding", "Sliding / casement", "Sliding / casement", "Lift-and-slide / as per design")),
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    summary: "Safe wiring, protection and enough points for how you actually live.",
    items: [
      item("e-wiring", "Wiring", t("FR copper wiring", "FRLS copper wiring", "FRLS copper wiring", "FRLS / ZHFR copper wiring")),
      item("e-switches", "Switches", t("Modular switches", "Modular switches", "Premium modular switches", "Designer / smart switches")),
      item("e-db", "Distribution board", t("Branded DB", "Branded DB", "Branded DB with RCCB", "Branded DB with RCCB & SPD")),
      item("e-mcb", "MCB", t("Branded MCBs", "Branded MCBs", "Branded MCBs + RCCB", "Branded MCBs + RCCB")),
      item("e-earthing", "Earthing", t("Standard earthing", "Standard earthing", "Chemical earthing", "Chemical earthing")),
      item("e-lighting", "Lighting points", t("Per room [count editable]", "Enhanced [count editable]", "With cove & profile lights", "Layered lighting plan")),
      item("e-ac", "AC points", t("Master bedroom", "All bedrooms", "All bedrooms + living", "All rooms as per design")),
      item("e-internet", "Internet points", t("1 point", "Living + master bedroom", "All rooms", "Structured cabling")),
      item("e-tv", "TV points", t("Living", "Living + master bedroom", "Living + all bedrooms", "As per design")),
      item("e-cctv", "CCTV provisions", t(null, "Conduit provision", "Conduit + power points", "Full provision")),
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing",
    summary: "Water supply and drainage built and tested before it is covered.",
    items: [
      item("p-supply", "Water supply", t("CPVC pipes", "CPVC pipes", "CPVC / PPR pipes", "PPR pipes")),
      item("p-drainage", "Drainage", t("PVC pipes", "PVC pipes", "PVC pipes", "Low-noise drainage pipes")),
      item("p-pipes", "Pipes", t("Branded [Editable]", "Branded [Editable]", "Branded [Editable]", "Branded [Editable]")),
      item("p-fittings", "Fittings", t("Standard fittings", "Standard fittings", "Premium fittings", "Premium fittings")),
      item("p-testing", "Pressure testing", t("Before concealing", "Before concealing", "Before concealing", "Before concealing")),
      item("p-tank", "Water tank connections", t("Overhead tank + sump", "Overhead tank + sump", "Overhead tank + sump", "Overhead tank + sump + pressure pump")),
    ],
  },
  {
    id: "painting",
    name: "Painting",
    summary: "Surface preparation and paint systems inside and out.",
    items: [
      item("pt-putty", "Putty", t("Wall putty, 2 coats", "Wall putty, 2 coats", "Wall putty, 2 coats", "Wall putty, 2 coats")),
      item("pt-int-primer", "Interior primer", t("1 coat", "1 coat", "1 coat", "1 coat")),
      item("pt-int", "Interior paint", t("Tractor emulsion", "Premium emulsion", "Luxury emulsion", "Luxury emulsion / textures")),
      item("pt-ext-primer", "Exterior primer", t("1 coat", "1 coat", "1 coat", "1 coat")),
      item("pt-ext", "Exterior weather coating", t("Exterior emulsion", "Weatherproof emulsion", "Premium weather coating", "Premium weather coating + texture")),
      item("pt-coats", "Number of coats", t("2 coats", "2 coats", "2–3 coats", "3 coats")),
    ],
  },
  {
    id: "ceiling",
    name: "Ceiling",
    summary: "False ceilings, cove lighting and integrated services.",
    items: [
      item("c-false", "False ceiling options", t(null, "Living room [optional]", "Living, dining & master bedroom", "As per interior design")),
      item("c-gypsum", "Gypsum", t(null, "Gypsum board", "Gypsum board", "Gypsum / specialty boards")),
      item("c-cove", "Cove lighting", t(null, null, "Included in ceilinged areas", "Included")),
      item("c-decor", "Decorative ceiling", t(null, null, "Selected areas", "As per design")),
      item("c-electrical", "Electrical integration", t(null, "Light points", "Lights, cove & AC provisions", "Fully integrated")),
    ],
  },
  {
    id: "staircase",
    name: "Staircase",
    summary: "Structure, finishes and railings.",
    items: [
      item("s-structure", "Structure", t("RCC", "RCC", "RCC / as per design", "RCC / steel / as per design")),
      item("s-flooring", "Flooring", t("Granite", "Granite", "Granite / marble", "Natural stone / wood")),
      item("s-railing", "Railing", t("MS railing", "SS railing", "SS + glass railing", "Designer railing")),
      item("s-handrail", "Handrail", t("MS", "SS", "SS / wood", "Wood / designer")),
    ],
  },
  {
    id: "exterior",
    name: "Exterior",
    summary: "The face of your home — elevation, boundary and landscape.",
    items: [
      item("x-elevation", "Exterior elevation", t("Standard elevation", "Designed elevation", "Architect-designed elevation", "Bespoke architectural elevation")),
      item("x-texture", "Texture", t(null, "Selected areas", "Feature walls", "As per design")),
      item("x-cladding", "Cladding", t(null, null, "Stone / tile cladding on feature walls", "Natural stone / HPL / as per design")),
      item("x-compound", "Compound wall", t("Front side [Editable]", "All sides [Editable]", "All sides with finish", "All sides, designed")),
      item("x-gate", "Gate", t("MS gate", "MS gate, designed", "MS / SS designer gate", "Automated designer gate")),
      item("x-landscape", "Landscaping options", t(null, null, "Basic landscaping", "Landscape design")),
    ],
  },
  {
    id: "smart-home",
    name: "Smart Home",
    summary: "Optional additions — available on any package, included in Luxury.",
    items: [
      item("sh-switches", "Smart switches", t(null, "Add-on", "Add-on", "Included [scope editable]")),
      item("sh-lighting", "Smart lighting", t(null, "Add-on", "Add-on", "Included [scope editable]")),
      item("sh-cctv", "CCTV", t("Add-on", "Add-on", "Add-on", "Included [scope editable]")),
      item("sh-doorbell", "Video doorbell", t("Add-on", "Add-on", "Included", "Included")),
      item("sh-locks", "Smart locks", t(null, "Add-on", "Add-on", "Included")),
      item("sh-sensors", "Sensors", t(null, null, "Add-on", "Included [scope editable]")),
      item("sh-automation", "Home automation", t(null, null, "Add-on", "Included [scope editable]")),
      item("sh-network", "Wi-Fi / networking", t("Add-on", "Add-on", "Mesh Wi-Fi provision", "Structured network + mesh Wi-Fi")),
    ],
  },
];
