"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FaqItem } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Plus } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FAQ({ faqs, limit, showAllLink = false }: { faqs: FaqItem[]; limit?: number; showAllLink?: boolean }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  const list = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="section bg-background" aria-labelledby="faq-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" eyebrow="FAQ" title={["Questions,", "answered."]} size="narrow" />
            {showAllLink && <div className="mt-10"><ButtonLink href="/faq" variant="outline">All questions</ButtonLink></div>}
          </div>
        </div>
        <ul className="border-t border-ink lg:col-span-7 lg:col-start-6">
          {list.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <li key={f.id} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${f.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${f.id}`}
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="group flex w-full items-start gap-6 py-7 text-left"
                  >
                    <span className={`pt-1 font-display text-xs font-bold transition-colors ${isOpen ? "text-primary" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-display text-xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-2xl">{f.question}</span>
                    <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-500 ${isOpen ? "rotate-45 border-primary bg-primary text-white" : "border-border"}`}>
                      <Plus className="h-3 w-3" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${f.id}`}
                      role="region"
                      aria-labelledby={`faq-q-${f.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 pl-12 leading-relaxed text-muted">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
