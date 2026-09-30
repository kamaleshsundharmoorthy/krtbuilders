import type { CollectionConfig, Field } from "payload";
import { contentAccess, image, namedRows, orderField, placeholderField, revalidateHooks, slugField, textList } from "../shared";

const tierOptions = [
  { label: "Essential", value: "essential" },
  { label: "Signature", value: "signature" },
  { label: "Premium", value: "premium" },
  { label: "Luxury", value: "luxury" },
];

/* ------------------------------------------------------------------------- */

export const Services: CollectionConfig = {
  slug: "services",
  admin: { group: "Website", useAsTitle: "title", defaultColumns: ["title", "order", "updatedAt"] },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "short", label: "Short description (cards)", type: "textarea", required: true },
    { name: "description", label: "Full description (Services page)", type: "textarea", required: true },
    textList("includes", "What's included", "Item"),
    image("image", "Image"),
    slugField("title"),
    orderField,
    placeholderField,
  ],
};

/* ------------------------------------------------------------------------- */

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    group: "Projects",
    useAsTitle: "name",
    defaultColumns: ["name", "location", "type", "year", "featured"],
    preview: (doc) => `/projects/${doc.slug}`,
  },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "name", type: "text", required: true },
            { type: "row", fields: [{ name: "location", type: "text", required: true }, { name: "type", label: "Project type", type: "text", required: true, admin: { description: "e.g. Luxury Villa" } }] },
            {
              type: "row",
              fields: [
                { name: "area", label: "Built-up area", type: "text", required: true, admin: { description: "e.g. 2,800 sq.ft" } },
                { name: "bedrooms", type: "number", required: true },
                { name: "floors", type: "text", required: true, admin: { description: "e.g. G + 1" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "year", label: "Year completed", type: "number", required: true },
                { name: "duration", label: "Construction duration", type: "text", required: true },
                { name: "package", label: "Package basis", type: "select", options: tierOptions },
              ],
            },
            { name: "summary", type: "textarea", required: true },
            image("cover", "Cover image"),
          ],
        },
        {
          label: "Story",
          fields: [
            { name: "concept", label: "Design concept", type: "textarea", required: true },
            textList("requirements", "Client requirements", "Requirement"),
            {
              name: "stages",
              label: "Construction stages",
              type: "array",
              admin: namedRows,
              fields: [{ name: "title", type: "text", required: true }, { name: "text", type: "textarea" }, image("image")],
            },
            {
              name: "materials",
              label: "Selected materials",
              type: "array",
              admin: namedRows,
              fields: [{ type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "value", type: "text", required: true }] }],
            },
          ],
        },
        {
          label: "Gallery",
          fields: [{ name: "gallery", type: "upload", relationTo: "media", hasMany: true, admin: { description: "Drag to reorder." } }],
        },
      ],
    },
    { name: "featured", type: "checkbox", label: "Feature on home page", admin: { position: "sidebar" } },
    slugField("name"),
    orderField,
    placeholderField,
  ],
};

/* ------------------------------------------------------------------------- */

export const Packages: CollectionConfig = {
  slug: "packages",
  labels: { singular: "Package", plural: "Packages" },
  admin: { group: "Packages & Materials", useAsTitle: "name", defaultColumns: ["name", "tier", "startingRate"], preview: (doc) => `/packages/${doc.slug}` },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "tier", type: "select", required: true, unique: true, options: tierOptions, admin: { description: "Links this package to its column in the material specifications." } },
      ],
    },
    { name: "tagline", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "idealFor", label: "Ideal for", type: "textarea" },
    textList("highlights", "Highlights", "Highlight"),
    { name: "startingRate", label: "Starting rate", type: "text", admin: { description: "Shown as written, e.g. “₹ 2,450 / sq.ft”." } },
    image("image"),
    slugField("name"),
    orderField,
    placeholderField,
  ],
};

/* ------------------------------------------------------------------------- */

const specsPerTier: Field = {
  name: "specs",
  label: "Specification per package",
  type: "group",
  admin: { description: "Leave a package blank if the item is not included (shown as “available as an upgrade”)." },
  fields: [
    { type: "row", fields: [{ name: "essential", type: "text" }, { name: "signature", type: "text" }] },
    { type: "row", fields: [{ name: "premium", type: "text" }, { name: "luxury", type: "text" }] },
  ],
};

export const MaterialCategories: CollectionConfig = {
  slug: "material-categories",
  labels: { singular: "Material category", plural: "Material specifications" },
  admin: {
    group: "Packages & Materials",
    useAsTitle: "name",
    defaultColumns: ["name", "order", "updatedAt"],
    description: "Each category is a tab in the package comparison (Structure, Flooring, Kitchen…).",
  },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "summary", type: "textarea" },
    {
      name: "items",
      type: "array",
      labels: { singular: "Item", plural: "Items" },
      admin: namedRows,
      fields: [
        { name: "name", type: "text", required: true, admin: { description: "e.g. Living room, Main door, Wiring" } },
        specsPerTier,
        {
          name: "details",
          label: "Full-specification details",
          type: "group",
          fields: [
            { type: "row", fields: [{ name: "sizes", type: "text", admin: { description: "Comma separated, e.g. 600 × 600 mm, 600 × 1200 mm" } }, { name: "finishes", type: "text", admin: { description: "Comma separated, e.g. Matt, Gloss" } }] },
            { type: "row", fields: [{ name: "brand", type: "text" }, { name: "estimatedRange", label: "Estimated range", type: "text" }] },
            { name: "notes", type: "textarea" },
          ],
        },
      ],
    },
    slugField("name"),
    orderField,
    placeholderField,
  ],
};

/* ------------------------------------------------------------------------- */

export const ProcessSteps: CollectionConfig = {
  slug: "process-steps",
  labels: { singular: "Process step", plural: "Construction process" },
  admin: { group: "Website", useAsTitle: "title", defaultColumns: ["order", "title"] },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [{ name: "title", type: "text", required: true }, { name: "text", type: "textarea", required: true }, image("image"), { ...orderField, required: true, admin: { position: "sidebar", description: "Step number (1, 2, 3…)." } }],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { group: "Website", useAsTitle: "name", defaultColumns: ["name", "project", "location"] },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [
    { type: "row", fields: [{ name: "name", label: "Client name", type: "text", required: true }, { name: "project", type: "text" }, { name: "location", type: "text" }] },
    { name: "quote", type: "textarea", required: true, admin: { description: "Publish only with the client's permission." } },
    image("image"),
    orderField,
    placeholderField,
  ],
};

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: { group: "Website", useAsTitle: "question", defaultColumns: ["question", "order"] },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    { name: "showOnPackages", type: "checkbox", label: "Also show on Packages page", admin: { position: "sidebar" } },
    orderField,
  ],
};

export const Reasons: CollectionConfig = {
  slug: "reasons",
  labels: { singular: "Reason", plural: "Why choose us" },
  admin: { group: "Website", useAsTitle: "title", defaultColumns: ["title", "order"] },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "text", type: "textarea", required: true },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "check",
      options: ["rupee", "layers", "team", "clipboard", "compass", "check", "clock", "route", "headset", "chat"],
    },
    orderField,
  ],
};
