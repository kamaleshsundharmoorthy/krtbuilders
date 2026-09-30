"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Testimonial } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 8000;

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, go, n]);

  const t = testimonials[i];

  return (
    <section className="section overflow-hidden bg-surface" aria-labelledby="testimonials-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="container-x">
        <SectionHeading id="testimonials-title" eyebrow="Testimonials" title={["Homes.", "Stories.", <span key="t" className="text-primary">Trust.</span>]} />

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16" aria-roledescription="carousel" aria-label="Client testimonials">
          <div className="img-frame relative aspect-[4/3] lg:col-span-5 lg:aspect-[4/5]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={t.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: EASE }}>
                <Photo image={t.image} sizes="(min-width: 1024px) 40vw, 100vw" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between lg:col-span-7">
            <div aria-live="polite" className="min-h-[300px]">
              <span className="block font-serif text-[7rem] leading-[0.6] text-primary" aria-hidden="true">&ldquo;</span>
              <AnimatePresence mode="wait">
                <motion.figure key={t.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }}>
                  <blockquote className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight md:text-[2.1rem]">{t.quote}</blockquote>
                  <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="font-display text-lg font-bold">{t.name}</span>
                    <span className="h-px w-8 bg-primary" aria-hidden="true" />
                    <span className="text-sm text-muted">{t.project} · {t.location}</span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
              <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((x, k) => (
                  <button key={x.id} role="tab" aria-selected={k === i} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className="relative h-1 w-10 overflow-hidden bg-border">
                    {k === i && (
                      <motion.span
                        key={`${i}-${paused}`}
                        className="absolute inset-0 origin-left bg-primary"
                        initial={{ scaleX: paused ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white" aria-label="Previous testimonial">
                  <Arrow className="h-3 w-4 rotate-180" />
                </button>
                <button onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center bg-primary text-white transition-colors hover:bg-primary-dark" aria-label="Next testimonial">
                  <Arrow className="h-3 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
