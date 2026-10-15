import { NextResponse } from "next/server";
import { cmsEnabled, getCms } from "@/lib/cms";


const FIELDS = ["name", "phone", "email", "location", "projectType", "plotSize", "builtUpArea", "floors", "bedrooms", "package", "budget", "startDate", "requirements", "source"] as const;

/**
 * Enquiry endpoint for the "Start a Project" form.
 * Saves each enquiry to the CMS (Admin → Leads → Enquiries).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  // Simple honeypot: real visitors never fill this hidden field.
  if (body.company_website) return NextResponse.json({ ok: true });

  const data = Object.fromEntries(FIELDS.map((k) => [k, String(body[k] ?? "").trim().slice(0, 2000)])) as Record<(typeof FIELDS)[number], string>;
  if (!data.name || !/^[+\d][\d\s-]{7,}$/.test(data.phone)) {
    return NextResponse.json({ ok: false, error: "Name and a valid phone number are required" }, { status: 422 });
  }
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) data.email = "";

  if (!cmsEnabled) {
    console.info("[enquiry]", new Date().toISOString(), data);
    return NextResponse.json({ ok: true });
  }
  try {
    const payload = await getCms();
    await payload.create({ collection: "enquiries", data: { ...data, email: data.email || undefined, status: "new" } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[enquiry] failed to save", e);
    return NextResponse.json({ ok: false, error: "Could not save enquiry" }, { status: 500 });
  }
}
