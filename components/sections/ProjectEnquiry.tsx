"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { ConstructionPackage } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "sent" | "error";

const projectTypes = ["Independent house", "Villa", "Custom home", "Turnkey construction", "Renovation", "Interior design", "Architectural design only"];
const floors = ["G", "G + 1", "G + 2", "G + 3 or more"];
const bedrooms = ["1", "2", "3", "4", "5+"];
const budgets = ["Under ₹50 lakh", "₹50 lakh – ₹1 crore", "₹1 – 2 crore", "₹2 crore +", "Not decided yet"];
const starts = ["Within 3 months", "3 – 6 months", "6 – 12 months", "Just exploring"];

export function ProjectEnquiry({ packages }: { packages: ConstructionPackage[] }) {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const prefill = useMemo(() => {
    const pkg = params.get("package") ?? "";
    const labels: Record<string, string> = { flooring: "Flooring", kitchen: "Kitchen", bathroom: "Bathroom", openings: "Doors & windows", electrical: "Electrical", smart: "Smart home" };
    const custom = Object.keys(labels)
      .map((k) => (params.get(k) ? `${labels[k]}: ${params.get(k)}` : null))
      .filter(Boolean);
    return {
      package: packages.find((p) => p.name.toLowerCase() === pkg.toLowerCase())?.name ?? "",
      requirements:
        (params.get("projectType") ? `Interested in: ${params.get("projectType")}\n\n` : "") +
        (custom.length ? `Package customisation\n${custom.join("\n")}\n\n` : ""),
    };
  }, [params, packages]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{7,}$/.test(data.phone ?? "")) errs.phone = "Please enter a valid phone number";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Please enter a valid email";
    if (!data.location?.trim()) errs.location = "Where is your plot?";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, source: params.get("source") ?? "website" }) });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="enquiry" className="relative scroll-mt-28">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border border-border bg-background p-10 md:p-14" role="status">
            <span className="flex h-14 w-14 items-center justify-center bg-primary text-white"><Check className="h-5 w-5" /></span>
            <h3 className="mt-8 font-display text-4xl font-extrabold uppercase tracking-tight">Thank you.</h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted">We&apos;ve received your enquiry. A member of our team will call you within one working day to arrange a consultation.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary underline underline-offset-8">Send another enquiry</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-7 border border-border bg-background p-6 sm:grid-cols-2 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Legend>Your details</Legend>
            {/* Honeypot for spam bots — hidden from people */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <Field label="Name" name="name" required error={errors.name} autoComplete="name" />
            <Field label="Phone" name="phone" type="tel" required error={errors.phone} autoComplete="tel" inputMode="tel" />
            <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
            <Field label="Plot location" name="location" required error={errors.location} placeholder="City / area" />

            <Legend>Your project</Legend>
            <Select label="Project type" name="projectType" options={projectTypes} />
            <Field label="Plot size" name="plotSize" placeholder="e.g. 2,400 sq.ft or 40 × 60 ft" />
            <Field label="Expected built-up area" name="builtUpArea" placeholder="sq.ft" inputMode="numeric" />
            <Select label="Number of floors" name="floors" options={floors} />
            <Select label="Bedrooms" name="bedrooms" options={bedrooms} />
            <Select label="Preferred package" name="package" options={[...packages.map((p) => p.name), "Not sure yet"]} defaultValue={prefill.package} />
            <Select label="Estimated budget" name="budget" options={budgets} />
            <Select label="Expected start date" name="startDate" options={starts} />
            <label className="sm:col-span-2">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">Requirements</span>
              <textarea
                name="requirements"
                rows={5}
                defaultValue={prefill.requirements}
                placeholder="Tell us about your family, how you live, and anything you already know you want."
                className="mt-2 w-full resize-y border-b border-ink/25 bg-transparent py-3 outline-none transition-colors placeholder:text-muted/50 focus:border-primary"
              />
            </label>

            <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-muted">By submitting, you agree to be contacted about your project. We never share your details.</p>
              <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a Consultation"}</Button>
            </div>
            {status === "error" && <p className="text-sm text-primary sm:col-span-2" role="alert">Something went wrong. Please call or WhatsApp us instead.</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Legend({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-ink sm:col-span-2 [&:not(:first-child)]:mt-6">{children}</p>;
}

const inputCls = "mt-2 w-full border-b bg-transparent py-3 outline-none transition-colors placeholder:text-muted/50 focus:border-primary";

function Field({ label, name, error, required, ...rest }: { label: string; name: string; error?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      <input name={name} required={required} aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined} className={`${inputCls} ${error ? "border-primary" : "border-ink/25"}`} {...rest} />
      {error && <span id={`${name}-err`} className="mt-1.5 block text-xs text-primary">{error}</span>}
    </label>
  );
}

function Select({ label, name, options, defaultValue = "" }: { label: string; name: string; options: string[]; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
      <select name={name} defaultValue={defaultValue} key={defaultValue} className={`${inputCls} cursor-pointer appearance-none border-ink/25 bg-[length:10px] bg-[right_4px_center] bg-no-repeat`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23c8102e' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
