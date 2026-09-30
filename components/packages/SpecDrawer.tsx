"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ConstructionPackage, MaterialCategory, MaterialItem } from "@/types/content";
import { Close } from "@/components/ui/Icons";

const EASE = [0.76, 0, 0.24, 1] as const;

export type SpecSelection = { category: MaterialCategory; item?: MaterialItem } | null;

/** Side drawer that shows the full specification for a category or a single item. */
export function SpecDrawer({ selection, packages, onClose }: { selection: SpecSelection; packages: ConstructionPackage[]; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selection) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [selection, onClose]);

  const items = selection ? (selection.item ? [selection.item] : selection.category.items) : [];

  return (
    <AnimatePresence>
      {selection && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="spec-title">
          <motion.button
            type="button"
            aria-label="Close specifications"
            className="absolute inset-0 h-full w-full cursor-default bg-secondary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-background"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <header className="flex items-start justify-between gap-6 border-b border-border px-6 py-6 md:px-10 md:py-8">
              <div>
                <p className="eyebrow text-muted">Full specifications</p>
                <h2 id="spec-title" className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                  {selection.category.name}
                  {selection.item && <span className="serif-accent block text-2xl normal-case text-primary md:text-3xl">{selection.item.name}</span>}
                </h2>
              </div>
              <button ref={closeRef} type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center border border-border transition-colors hover:border-ink hover:bg-ink hover:text-white" aria-label="Close">
                <Close className="h-3.5 w-3.5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10" data-lenis-prevent>
              {!selection.item && <p className="mb-10 leading-relaxed text-muted">{selection.category.summary}</p>}
              <div className="space-y-12">
                {items.map((item) => {
                  const availableIn = packages.filter((p) => item.specs[p.id]);
                  return (
                    <section key={item.id}>
                      {!selection.item && <h3 className="mb-5 font-display text-xl font-bold tracking-tight">{item.name}</h3>}
                      <dl className="divide-y divide-border border-y border-border">
                        {packages.map((p) => (
                          <div key={p.id} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-sm">
                            <dt className="font-semibold uppercase tracking-[0.14em] text-muted">{p.name}</dt>
                            <dd className={item.specs[p.id] ? "text-ink" : "text-muted/60"}>{item.specs[p.id] ?? "Not included — available as an upgrade"}</dd>
                          </div>
                        ))}
                      </dl>
                      {item.details && (
                        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                          {item.details.sizes && <Detail label="Available sizes" value={item.details.sizes.join(" · ")} />}
                          {item.details.finishes && <Detail label="Finish" value={item.details.finishes.join(" / ")} />}
                          {item.details.brand && <Detail label="Brand" value={item.details.brand} />}
                          {item.details.estimatedRange && <Detail label="Estimated range" value={item.details.estimatedRange} />}
                          {item.details.notes && <Detail label="Notes" value={item.details.notes} wide />}
                        </dl>
                      )}
                      <div className="mt-6">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">Available in</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {packages.map((p) => (
                            <span key={p.id} className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${availableIn.includes(p) ? "bg-ink text-white" : "border border-dashed border-border text-muted/60 line-through"}`}>
                              {p.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
              <p className="mt-12 border-t border-border pt-6 text-xs leading-relaxed text-muted">
                Specifications shown are indicative placeholders. Brands, grades, sizes and ranges are confirmed in your project estimate and agreement.
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Detail({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className="mt-1.5 text-ink">{value}</dd>
    </div>
  );
}
