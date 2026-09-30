"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Brief branded loader, shown once per browser session. */
export function Preloader({ name }: { name: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("preloader") === "1";
      sessionStorage.setItem("preloader", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      return;
    }
    const id = window.setTimeout(() => setShow(false), 1300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="w-56">
            <div className="flex items-center gap-3">
              <span className="block h-4 w-4 bg-primary" />
              <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white">{name}</span>
            </div>
            <div className="mt-5 h-px w-full bg-white/15">
              <div className="h-px origin-left bg-primary" style={{ animation: "loader-bar 1.1s cubic-bezier(0.76,0,0.24,1) forwards" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
