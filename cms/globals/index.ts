import type { GlobalConfig } from "payload";
import { image, loggedIn, namedRows, revalidateGlobal, textList } from "../shared";

const access = { read: () => true, update: loggedIn };
const hooks = { afterChange: [revalidateGlobal] };

/* ------------------------------------------------------------------------- */

export const CompanySettings: GlobalConfig = {
  slug: "company",
  label: "Company details",
  admin: { group: "Settings" },
  access,
  hooks,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Company",
          fields: [
            { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "shortName", type: "text", required: true }] },
            { name: "legalName", type: "text" },
            { name: "tagline", type: "text" },
            { name: "description", type: "textarea", admin: { description: "Used in the footer and for Google." } },
            { name: "siteUrl", label: "Website address", type: "text", admin: { description: "e.g. https://www.yourcompany.com" } },
            {
              type: "row",
              fields: [
                { ...image("logoOnLight", "Logo for light backgrounds"), admin: { description: "SVG or PNG with transparency." } },
                { ...image("logoOnDark", "Logo for dark backgrounds"), admin: { description: "Used in the navigation and footer." } },
              ],
            },
          ],
        },
        {
          label: "Contact",
          name: "contact",
          fields: [
            { type: "row", fields: [{ name: "phone", type: "text" }, { name: "whatsapp", type: "text" }, { name: "email", type: "email" }] },
            { name: "address", type: "textarea", admin: { description: "One line per row." } },
            { name: "hours", label: "Office hours", type: "text" },
            { name: "mapsUrl", label: "Google Maps link", type: "text" },
            { name: "mapsEmbed", label: "Google Maps embed URL", type: "text", admin: { description: "From Google Maps → Share → Embed a map → the src=\"…\" address." } },
          ],
        },
        {
          label: "Social & areas",
          fields: [
            { name: "social", type: "array", fields: [{ type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "href", label: "URL", type: "text", required: true }] }] },
            textList("serviceAreas", "Service areas", "City"),
          ],
        },
        {
          label: "Statistics",
          fields: [
            {
              name: "stats",
              type: "array",
              maxRows: 4,
              admin: { ...namedRows, description: "Shown under “Built around your life”. Only publish verified figures." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "number", admin: { description: "Animated number. Leave empty to show text instead." } },
                    { name: "suffix", type: "text", admin: { description: "e.g. + or %" } },
                    { name: "display", type: "text", admin: { description: "Text shown when there is no number, e.g. Multiple" } },
                  ],
                },
                { name: "label", type: "text", required: true },
                { name: "placeholder", type: "checkbox", label: "Placeholder figure (not yet verified)" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------------- */

const sectionToggles = [
  ["services", "What we build"],
  ["featured", "Featured project"],
  ["projects", "Selected homes"],
  ["packages", "Materials & packages"],
  ["process", "Construction process"],
  ["why", "Why choose us"],
  ["quality", "Built to last"],
  ["testimonials", "Testimonials"],
  ["faq", "FAQ"],
] as const;

export const HomePage: GlobalConfig = {
  slug: "home",
  label: "Home & page content",
  admin: { group: "Website" },
  access,
  hooks,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            { name: "eyebrow", type: "text" },
            { type: "row", fields: [{ name: "titleLine1", type: "text", required: true }, { name: "titleLine2", type: "text", required: true }] },
            textList("subtitle", "Subtitle steps (Dream → Design → Reality)", "Step"),
            { name: "description", type: "textarea" },
            image("image", "Background image"),
            {
              type: "row",
              fields: [
                { name: "primaryLabel", type: "text", defaultValue: "Start a Project" },
                { name: "primaryHref", type: "text", defaultValue: "/contact" },
                { name: "secondaryLabel", type: "text", defaultValue: "View Our Homes" },
                { name: "secondaryHref", type: "text", defaultValue: "/projects" },
              ],
            },
          ],
        },
        {
          label: "About",
          name: "about",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            { name: "lead", type: "textarea" },
            { name: "body", type: "textarea" },
            textList("factors", "Factors", "Factor"),
            { type: "row", fields: [image("image", "Main image"), image("secondaryImage", "Secondary image")] },
          ],
        },
        {
          label: "Positioning",
          name: "positioning",
          fields: [
            { name: "statement", type: "textarea" },
            textList("flow", "Delivery flow (Design → … → Handover)", "Step"),
            { name: "pricingDisclaimer", type: "textarea", admin: { description: "Shown wherever packages or quotes appear." } },
          ],
        },
        {
          label: "Quality",
          name: "quality",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text" },
            { name: "lead", type: "textarea" },
            { type: "row", fields: [image("image", "Main image"), image("secondaryImage", "Secondary image")] },
            { name: "points", type: "array", admin: namedRows, fields: [{ name: "title", type: "text", required: true }, { name: "text", type: "textarea" }] },
          ],
        },
        {
          label: "Page images",
          name: "pageImages",
          description: "Hero images for inner pages and the closing “Ready to build” section.",
          fields: [
            { type: "row", fields: [image("about", "About"), image("services", "Services"), image("projects", "Projects")] },
            { type: "row", fields: [image("packages", "Packages"), image("process", "Process"), image("whyUs", "Why us")] },
            { type: "row", fields: [image("testimonials", "Testimonials"), image("faq", "FAQ"), image("contact", "Contact")] },
            image("cta", "Closing call-to-action"),
          ],
        },
        {
          label: "Sections",
          name: "sections",
          description: "Show or hide home-page sections.",
          fields: sectionToggles.map(([name, label]) => ({ name, label, type: "checkbox" as const, defaultValue: true })),
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------------- */

export const Customizer: GlobalConfig = {
  slug: "customizer",
  label: "Package customiser",
  admin: { group: "Packages & Materials", description: "Steps in “Customise your package”. The first step (choose package) is created automatically from Packages." },
  access,
  hooks,
  fields: [
    {
      name: "steps",
      type: "array",
      admin: namedRows,
      fields: [
        { type: "row", fields: [{ name: "key", type: "text", required: true, admin: { description: "Short id, e.g. flooring" } }, { name: "title", type: "text", required: true }] },
        { name: "question", type: "text", required: true },
        { name: "multiple", type: "checkbox", label: "Allow multiple choices" },
        {
          name: "options",
          type: "array",
          fields: [{ type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "note", type: "text" }] }],
        },
      ],
    },
  ],
};
