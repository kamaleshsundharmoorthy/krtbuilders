"use client";

import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { ProcessStep } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-driven construction timeline. A GSAP ScrollTrigger scrubs the red
 * progress line and marks the active stage; the sticky panel on the left
 * swaps image and number to match.
 */
export function ProcessTimeline({ steps, heading = true }: { steps: ProcessStep[]; heading?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (line.current && !reduce) {
        gsap.fromTo(line.current, { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el.querySelector("[data-steps]"), start: "top 60%", end: "bottom 60%", scrub: true },
        });
      } else if (line.current) {
        gsap.set(line.current, { scaleY: 1 });
      }
      el.querySelectorAll<HTMLElement>("[data-step]").forEach((node, i) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, el);
    return () => ctx.revert();
  }, [steps.length]);

  const current = steps[active];

  return (
    <section className="section bg-surface" aria-labelledby="process-title" ref={root}>
      <div className="container-x">
        {heading && (
          <SectionHeading
            id="process-title"
            eyebrow="Construction Process"
            title={["From plot", "to home."]}
            lead="Thirteen clear stages, each with its own checks. You always know what is happening on site — and what comes next."
          />
        )}

        <div className={`grid gap-12 lg:grid-cols-12 ${heading ? "mt-16 md:mt-24" : ""}`}>
          {/* Sticky visual */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="img-frame relative aspect-[4/5]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.number}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <Photo image={current.image} sizes="40vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <p className="font-display text-[7rem] font-extrabold leading-[0.8] tracking-tighter">{current.number}</p>
                  <p className="pb-2 text-right text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                    Stage<br />{current.number} / {steps.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative lg:col-span-6 lg:col-start-7" data-steps>
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-border" aria-hidden="true" />
            <div ref={line} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-primary" aria-hidden="true" />
            <ol>
              {steps.map((s, i) => (
                <li key={s.number} data-step className="relative pb-14 pl-12 last:pb-0 lg:pb-24">
                  <span
                    className={`absolute left-0 top-2 h-[15px] w-[15px] border-2 transition-colors duration-500 ${i <= active ? "border-primary bg-primary" : "border-border bg-surface"}`}
                    aria-hidden="true"
                  />
                  <p className={`font-display text-sm font-bold tracking-[0.1em] transition-colors duration-500 ${i === active ? "text-primary" : "text-muted"}`}>{s.number}</p>
                  <h3 className={`mt-2 font-display text-3xl font-extrabold uppercase tracking-tight transition-colors duration-500 md:text-4xl ${i === active ? "text-ink" : "text-ink/45"}`}>
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{s.text}</p>
                  <div className="img-frame relative mt-6 aspect-[16/10] lg:hidden">
                    <Photo image={s.image} sizes="100vw" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
