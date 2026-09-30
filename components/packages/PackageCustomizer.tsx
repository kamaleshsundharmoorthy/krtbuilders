"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { CustomizerStep } from "@/types/content";
import { Check } from "@/components/ui/Icons";
import { Button, ButtonLink } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

type Selections = Record<string, string[]>;

/**
 * Step-by-step package customiser. It does NOT calculate a price — it
 * collects preferences and hands them to the enquiry form as a quote request.
 */
export function PackageCustomizer({ steps, disclaimer, initialPackage }: { steps: CustomizerStep[]; disclaimer: string; initialPackage?: string }) {
  const [current, setCurrent] = useState(0);
  const [sel, setSel] = useState<Selections>(initialPackage ? { package: [initialPackage] } : {});
  const done = current >= steps.length;
  const step = steps[Math.min(current, steps.length - 1)];

  const toggle = (s: CustomizerStep, id: string) =>
    setSel((prev) => {
      const cur = prev[s.id] ?? [];
      if (s.multiple) return { ...prev, [s.id]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
      return { ...prev, [s.id]: [id] };
    });

  const labelFor = (s: CustomizerStep) =>
    (sel[s.id] ?? []).map((id) => s.options.find((o) => o.id === id)?.label).filter(Boolean).join(", ");

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams();
    steps.forEach((s) => {
      const v = labelFor(s);
      if (v) params.set(s.id, v);
    });
    params.set("source", "customiser");
    return `/contact?${params.toString()}#enquiry`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel, steps]);

  const canContinue = step.multiple || (sel[step.id]?.length ?? 0) > 0;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Flow rail */}
      <ol className="lg:col-span-4" aria-label="Customisation steps">
        {steps.map((s, i) => {
          const state = i < current ? "done" : i === current ? "current" : "todo";
          return (
            <li key={s.id} className="relative flex gap-5 pb-6 last:pb-0">
              {i < steps.length && <span className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px ${i < current ? "bg-primary" : "bg-border"}`} aria-hidden="true" />}
              <button
                type="button"
                onClick={() => i <= current && setCurrent(i)}
                disabled={i > current}
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold transition-colors ${
                  state === "done" ? "bg-primary text-white" : state === "current" ? "bg-ink text-white" : "border border-border bg-background text-muted"
                }`}
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-current={state === "current" ? "step" : undefined}
              >
                {state === "done" ? <Check className="h-3 w-3" /> : i + 1}
              </button>
              <div className="pt-1">
                <p className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${state === "todo" ? "text-muted" : "text-ink"}`}>Choose {s.title}</p>
                {labelFor(s) && <p className="mt-1 text-sm text-muted">{labelFor(s)}</p>}
              </div>
            </li>
          );
        })}
        <li className="flex gap-5">
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold ${done ? "bg-primary text-white" : "border border-dashed border-border text-muted"}`}>→</span>
          <p className={`pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${done ? "text-primary" : "text-muted"}`}>Request quotation</p>
        </li>
      </ol>

      {/* Step panel */}
      <div className="lg:col-span-8">
        <div className="min-h-[420px] border border-border bg-background p-6 md:p-10">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}>
                <p className="eyebrow text-muted">Step {current + 1} of {steps.length}</p>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">{step.question}</h3>
                {step.multiple && <p className="mt-2 text-sm text-muted">Select any that apply — or skip.</p>}
                <div className={`mt-8 grid gap-3 ${step.options.length > 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`} role={step.multiple ? "group" : "radiogroup"} aria-label={step.title}>
                  {step.options.map((o) => {
                    const on = sel[step.id]?.includes(o.id);
                    return (
                      <button
                        key={o.id}
                        type="button"
                        role={step.multiple ? "checkbox" : "radio"}
                        aria-checked={!!on}
                        onClick={() => toggle(step, o.id)}
                        className={`group relative flex min-h-[88px] flex-col justify-between border p-5 text-left transition-all duration-300 ${on ? "border-primary bg-primary text-white" : "border-border hover:border-ink"}`}
                      >
                        <span className="font-display text-lg font-bold leading-tight">{o.label}</span>
                        {o.note && <span className={`mt-2 text-xs ${on ? "text-white/80" : "text-muted"}`}>{o.note}</span>}
                        <span className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center border ${on ? "border-white bg-white text-primary" : "border-border"}`}>
                          {on && <Check className="h-2.5 w-2.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-10 flex items-center justify-between gap-4">
                  <button type="button" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-ink disabled:opacity-30">
                    ← Back
                  </button>
                  <Button type="button" variant="dark" onClick={() => setCurrent((c) => c + 1)} disabled={!canContinue}>
                    {current === steps.length - 1 ? "Review" : "Continue"}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="summary" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="eyebrow text-muted">Your selection</p>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">Ready for a custom quote.</h3>
                <dl className="mt-8 divide-y divide-border border-y border-border">
                  {steps.map((s, i) => (
                    <div key={s.id} className="flex items-baseline justify-between gap-6 py-3.5 text-sm">
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{s.title}</dt>
                      <dd className="flex items-baseline gap-4 text-right">
                        <span>{labelFor(s) || "—"}</span>
                        <button type="button" onClick={() => setCurrent(i)} className="text-xs text-primary underline underline-offset-4">Edit</button>
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={quoteHref}>Get a custom quote</ButtonLink>
                  <Button type="button" variant="outline" arrow={false} onClick={() => { setSel({}); setCurrent(0); }}>Start over</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-5 flex gap-3 text-xs leading-relaxed text-muted">
          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
          This is not a binding quotation. {disclaimer}
        </p>
      </div>
    </div>
  );
}
