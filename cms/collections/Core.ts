import type { CollectionAfterChangeHook, CollectionConfig } from "payload";
import { isAdmin, loggedIn } from "../shared";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", group: "Settings", defaultColumns: ["name", "email", "role"] },
  auth: true,
  access: {
    read: loggedIn,
    create: isAdmin,
    update: ({ req, id }) => (req.user as { role?: string } | null)?.role === "admin" || req.user?.id === id,
    delete: isAdmin,
    // The very first account is created from the /admin welcome screen.
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin — everything, including users", value: "admin" },
        { label: "Editor — website content and enquiries", value: "editor" },
      ],
      access: { update: ({ req }) => (req.user as { role?: string } | null)?.role === "admin" },
      hooks: {
        // The first user ever created becomes an admin.
        beforeChange: [
          async ({ req, operation, value }) => {
            if (operation !== "create") return value;
            const { totalDocs } = await req.payload.count({ collection: "users", req });
            return totalDocs === 0 ? "admin" : value;
          },
        ],
      },
    },
  ],
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Media library" },
  admin: { group: "Settings", useAsTitle: "alt", description: "All photos used on the website." },
  access: { read: () => true, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    // Very large camera files are scaled down on upload; the site then serves
    // responsive sizes automatically.
    // resizeOptions: { width: 2800, withoutEnlargement: true },
    adminThumbnail: ({ doc }) => (doc?.url as string) ?? null,
  },
  fields: [
    {
      name: "alt",
      label: "Description (alt text)",
      type: "text",
      required: true,
      admin: { description: "Describe the photo for screen readers and Google, e.g. “Double-height living room with teak ceiling”." },
    },
  ],
};

/** Emails the team when a new enquiry arrives (needs SMTP_* and ENQUIRY_NOTIFY_EMAIL in .env). */
const notifyTeam: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  const to = process.env.ENQUIRY_NOTIFY_EMAIL;
  if (operation !== "create" || !to || !process.env.SMTP_HOST) return doc;
  const rows = ["name", "phone", "email", "location", "projectType", "package", "plotSize", "builtUpArea", "floors", "bedrooms", "budget", "startDate", "source"]
    .filter((k) => doc[k])
    .map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><b>${String(doc[k]).replace(/</g, "&lt;")}</b></td></tr>`)
    .join("");
  const admin = `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/admin/collections/enquiries/${doc.id}`;
  try {
    await req.payload.sendEmail({
      to,
      subject: `New enquiry: ${doc.name} — ${doc.location || "location not given"}`,
      replyTo: doc.email || undefined,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px">
        <h2 style="margin:0 0 12px;color:#C8102E">New project enquiry</h2>
        <table>${rows}</table>
        ${doc.requirements ? `<p style="white-space:pre-wrap;border-left:3px solid #C8102E;padding-left:12px">${String(doc.requirements).replace(/</g, "&lt;")}</p>` : ""}
        <p><a href="tel:${String(doc.phone).replace(/[^\d+]/g, "")}">Call ${doc.phone}</a> · <a href="https://wa.me/${String(doc.phone).replace(/\D/g, "")}">WhatsApp</a> · <a href="${admin}">Open in admin</a></p>
      </div>`,
    });
  } catch (e) {
    req.payload.logger.error({ err: e, msg: "Enquiry notification email failed" });
  }
  return doc;
};

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    group: "Leads",
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "location", "projectType", "status", "createdAt"],
    description: "Submissions from the “Start a Project” form.",
  },
  // Created only by the website form (server-side). Staff can read and update the status.
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [notifyTeam] },
  defaultSort: "-createdAt",
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "contacted", "site-visit", "quoted", "won", "lost"].map((v) => ({ label: v.replace("-", " "), value: v })),
      admin: { position: "sidebar" },
    },
    { name: "notes", type: "textarea", admin: { position: "sidebar", description: "Internal notes — not visible to the client." } },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "phone", type: "text", required: true },
        { name: "email", type: "email" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "location", type: "text" },
        { name: "projectType", type: "text" },
        { name: "package", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "plotSize", type: "text" },
        { name: "builtUpArea", type: "text" },
        { name: "floors", type: "text" },
        { name: "bedrooms", type: "text" },
      ],
    },
    { type: "row", fields: [{ name: "budget", type: "text" }, { name: "startDate", type: "text" }, { name: "source", type: "text" }] },
    { name: "requirements", type: "textarea" },
  ],
};
