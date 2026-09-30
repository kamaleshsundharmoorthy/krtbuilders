"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import type { Company, NavItem } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";

const EASE = [0.76, 0, 0.24, 1] as const;

export function Navbar({ items, company }: { items: NavItem[]; company: Company }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,height,border-color,backdrop-filter] duration-700 ease-[var(--ease-out-expo)] ${
          scrolled && !open ? "h-[68px] border-b border-white/10 bg-secondary/85 backdrop-blur-xl" : "h-[88px] border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-x flex h-full items-center justify-between gap-6" aria-label="Main">
          <Link href="/" className="relative z-10 block shrink-0" aria-label={`${company.name} — home`}>
            <Image
              src={company.logo.onDark}
              alt={company.logo.alt}
              width={220}
              height={44}
              priority
              className={`h-auto transition-[width] duration-700 ease-[var(--ease-out-expo)] ${scrolled ? "w-[150px]" : "w-[172px]"}`}
            />
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive(item.href) ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-primary" transition={{ duration: 0.5, ease: EASE }} />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" variant="primary" className="!hidden !px-5 !py-3 sm:!inline-flex">
              Start a Project
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 flex h-11 w-11 items-center justify-center xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-7">
                <span className={`absolute left-0 h-[2px] w-full bg-white transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? "top-[5px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[2px] bg-white transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? "top-[5px] w-full -rotate-45" : "top-[10px] w-2/3"}`} />
              </span>
            </button>
          </div>
        </nav>
        {/* Scroll progress indicator */}
        <motion.div className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-secondary pt-[88px] text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="container-x flex flex-1 flex-col justify-between overflow-y-auto pb-10 pt-8">
              <ul className="flex flex-col">
                {items.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-white/10">
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.05 }}>
                      <Link href={item.href} className="group flex items-baseline justify-between py-4">
                        <span className={`font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl ${isActive(item.href) ? "text-primary" : "group-hover:text-primary"} transition-colors`}>
                          {item.label}
                        </span>
                        <span className="text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div className="mt-10 flex flex-col gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <ButtonLink href="/contact" className="w-full">Start a Project</ButtonLink>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
                  <a href={company.contact.phoneHref}>{company.contact.phone}</a>
                  <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
