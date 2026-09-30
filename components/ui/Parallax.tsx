"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Subtle scroll parallax for background images. The inner layer is scaled up
 * slightly so moving it never reveals an edge. Reduced on small screens and
 * disabled entirely for prefers-reduced-motion.
 */
export function ParallaxImage({ children, amount = 15, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  useEffect(() => setMobile(window.matchMedia("(max-width: 767px)").matches), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = reduce ? 0 : mobile ? amount / 3 : amount;
  const y = useTransform(scrollYProgress, [0, 1], [`-${a}%`, `${a}%`]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ y, top: `-${amount}%`, bottom: `-${amount}%` }}>
        {children}
      </motion.div>
    </div>
  );
}
