"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ImageAsset } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { RevealLines } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";

type HeroProps = {
  eyebrow: string;
  title: string[];
  subtitle: string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: ImageAsset;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ eyebrow, title, subtitle, description, primaryCta, secondaryCta, image }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-secondary text-white" aria-label="Introduction">
      <motion.div className="img-frame absolute inset-0" style={{ y: imgY }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.2 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.8, ease: EASE }}
        >
          <Photo image={image} priority sizes="100vw" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/45 to-secondary/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 via-transparent to-transparent" />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative flex h-full flex-col justify-end pb-24 md:pb-28">
        <motion.p
          className="eyebrow mb-8 text-white/75"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        >
          {eyebrow}
        </motion.p>

        <h1 className="display-xl">
          <RevealLines
            immediate
            delay={0.35}
            lines={title.map((line, i) =>
              i === title.length - 1 ? (
                <span key={line}>
                  {line.replace(/\.$/, "")}
                  <span className="text-primary">.</span>
                </span>
              ) : (
                line
              ),
            )}
          />
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <motion.p
              className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-sm font-bold uppercase tracking-[0.28em] md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              aria-label={`From ${subtitle.join(" to ")}`}
            >
              <span className="text-white/50">From</span>
              {subtitle.map((s, i) => (
                <span key={s} className="flex items-center gap-4">
                  <span>{s}</span>
                  {i < subtitle.length - 1 && <span className="text-primary" aria-hidden="true">→</span>}
                </span>
              ))}
            </motion.p>
            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            >
              {description}
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
          >
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="outline-light">{secondaryCta.label}</ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-primary" />
        </span>
      </div>
    </section>
  );
}
