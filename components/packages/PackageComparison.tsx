"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import type { ConstructionPackage, MaterialCategory, TierId } from "@/types/content";
import { SpecDrawer, type SpecSelection } from "./SpecDrawer";
import { Plus } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Package comparison:
 *   – category tabs across the top
 *   – desktop: 4-column comparison table with a highlightable tier
 *   – mobile: tier switcher + expandable rows
 *   – every row opens a full-specification drawer
 */
export function PackageComparison({
  packages,
  categories,
  initialTier = "signature",
}: {
  packages: ConstructionPackage[];
  categories: MaterialCategory[];
  initialTier?: TierId;
}) {
  const [active, setActive] = useState(categories[0].id);
  const [tier, setTier] = useState<TierId>(initialTier);
  const [open, setOpen] = useState<string | null>(null);
  const [selection, setSelection] = useState<SpecSelection>(null);
  const close = useCallback(() => setSelection(null), []);

  const category = categories.find((c) => c.id === active)!;

  return (
    <div>
      {/* Category tabs */}
      <div className="sticky top-[68px] z-20 -mx-4 border-b border-border bg-background/95 px-4 backdrop-blur-md sm:mx-0 sm:px-0">
        <div role="tablist" aria-label="Specification categories" className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] lg:flex-wrap" data-lenis-prevent>
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              aria-controls="spec-panel"
              onClick={() => { setActive(c.id); setOpen(null); }}
              className={`relative shrink-0 px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors ${active === c.id ? "text-white" : "text-muted hover:text-ink"}`}
            >
              {active === c.id && <motion.span layoutId="spec-tab" className="absolute inset-0 bg-ink" transition={{ duration: 0.5, ease: EASE }} />}
              <span className="relative">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          id="spec-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="pt-10"
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{category.name}</h3>
              <p className="mt-2 max-w-xl text-muted">{category.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelection({ category })}
              className="self-start text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary underline decoration-primary/40 underline-offset-8 transition hover:decoration-primary md:self-auto"
            >
              View full specifications
            </button>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <caption className="sr-only">{category.name} specifications by package</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] pb-4 align-bottom text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">Item</th>
                  {packages.map((p) => (
                    <th key={p.id} scope="col" className="pb-4 align-bottom">
                      <button
                        type="button"
                        onClick={() => setTier(p.id)}
                        aria-pressed={tier === p.id}
                        className={`w-full border-t-2 pt-3 text-left font-display text-base font-extrabold uppercase tracking-tight transition-colors ${tier === p.id ? "border-primary text-primary" : "border-ink/15 text-ink hover:border-ink"}`}
                      >
                        {p.name}
                      </button>
                    </th>
                  ))}
                  <th className="w-12" aria-hidden="true" />
                </tr>
              </thead>
              <tbody>
                {category.items.map((item) => (
                  <tr key={item.id} className="group border-t border-border transition-colors hover:bg-surface">
                    <th scope="row" className="py-5 pr-4 align-top font-semibold">{item.name}</th>
                    {packages.map((p) => (
                      <td key={p.id} className={`py-5 pr-5 align-top transition-colors ${tier === p.id ? "bg-primary/[0.05] text-ink" : "text-ink/75"}`}>
                        {item.specs[p.id] ?? <span className="text-muted/50">—</span>}
                      </td>
                    ))}
                    <td className="py-4 text-right align-top">
                      <button
                        type="button"
                        onClick={() => setSelection({ category, item })}
                        className="inline-flex h-9 w-9 items-center justify-center border border-border text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white"
                        aria-label={`View full specifications for ${item.name}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-muted">— Not included in this package; available as an upgrade.</p>
          </div>

          {/* Mobile: tier switcher + expandable rows */}
          <div className="md:hidden">
            <div className="grid grid-cols-4 border border-border" role="radiogroup" aria-label="Choose package">
              {packages.map((p) => (
                <button
                  key={p.id}
                  role="radio"
                  aria-checked={tier === p.id}
                  onClick={() => setTier(p.id)}
                  className={`py-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] transition-colors ${tier === p.id ? "bg-primary text-white" : "text-ink"}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {category.items.map((item) => {
                const isOpen = open === item.id;
                return (
                  <li key={item.id}>
                    <button type="button" onClick={() => setOpen(isOpen ? null : item.id)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-4 py-4 text-left">
                      <span>
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{item.name}</span>
                        <span className={`mt-1 block ${item.specs[tier] ? "text-ink" : "text-muted/60"}`}>{item.specs[tier] ?? "Not included — upgrade available"}</span>
                      </span>
                      <Plus className={`mt-1 h-3 w-3 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45 text-primary" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
                          <dl className="space-y-2 pb-4 text-sm">
                            {packages.map((p) => (
                              <div key={p.id} className="flex justify-between gap-4">
                                <dt className={`text-xs font-semibold uppercase tracking-[0.12em] ${p.id === tier ? "text-primary" : "text-muted"}`}>{p.name}</dt>
                                <dd className="text-right">{item.specs[p.id] ?? "—"}</dd>
                              </div>
                            ))}
                          </dl>
                          <button type="button" onClick={() => setSelection({ category, item })} className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                            View full specifications →
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      <SpecDrawer selection={selection} packages={packages} onClose={close} />
    </div>
  );
}
