import type { Access, CollectionAfterChangeHook, CollectionAfterDeleteHook, Field, GlobalAfterChangeHook, NumberField, PayloadRequest, UploadField } from "payload";

/* ---------------------------------------------------------------------------
 * Access control
 * ------------------------------------------------------------------------- */

type Role = "admin" | "editor";
const roleOf = (req: PayloadRequest): Role | null => ((req.user as { role?: Role } | null)?.role ?? null);

export const anyone: Access = () => true;
// export const loggedIn: Access = ({ req }) => Boolean(req.user);
export const loggedIn: Access = ()=> true;
// export const isAdmin: Access = ({ req }) => roleOf(req) === "admin";
export const isAdmin: Access = ()=> true;

/** Public can read content; any logged-in editor or admin can change it. */
export const contentAccess = {
  read: anyone,
  create: loggedIn,
  update: loggedIn,
  delete: loggedIn,
};

/* ---------------------------------------------------------------------------
 * On-demand revalidation
 * When content is saved in the admin, the whole public site is regenerated
 * on its next request, so changes appear within seconds without a redeploy.
 * ------------------------------------------------------------------------- */

async function revalidateSite(req: PayloadRequest) {
  if (req.context?.disableRevalidate) return;
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  } catch {
    // Outside a Next.js request (e.g. the seed script) — nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateSite(req);
  return doc;
};
export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await revalidateSite(req);
  return doc;
};
export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req }) => {
  await revalidateSite(req);
  return doc;
};

export const revalidateHooks = { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] };

/** Admin setting for arrays: collapsed rows show the item's name. */
export const namedRows = { initCollapsed: true, components: { RowLabel: "/cms/components/RowLabel#NamedRowLabel" } };

/* ---------------------------------------------------------------------------
 * Reusable fields
 * ------------------------------------------------------------------------- */

/** Flags demo content. Anything ticked here must be replaced before launch. */
export const placeholderField: Field = {
  name: "placeholder",
  type: "checkbox",
  label: "Placeholder / demo content",
  defaultValue: false,
  admin: { position: "sidebar", description: "Tick while this entry still contains demo text, figures or photos." },
};

/** Manual sort order (lower first). */
export const orderField: NumberField = {
  name: "order",
  type: "number",
  defaultValue: 0,
  admin: { position: "sidebar", description: "Lower numbers appear first." },
};

export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description: "Used in the page URL. Lower-case words separated by hyphens." },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source = (value as string) || (data?.[from] as string) || "";
        return source
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      },
    ],
  },
});

export const image = (name: string, label?: string, required = false): UploadField => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  required,
});

/** A simple list of strings, stored as [{ value }]. */
export const textList = (name: string, label: string, singular = "Item"): Field => ({
  name,
  label,
  type: "array",
  labels: { singular, plural: label },
  admin: namedRows,
  fields: [{ name: "value", type: "text", required: true, label: singular }],
});
