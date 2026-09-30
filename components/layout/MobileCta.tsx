"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Sticky bottom CTA bar on small screens, shown after the hero. */
export function MobileCta({ phoneHref, whatsappHref }: { phoneHref: string; whatsappHref: string }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/contact")) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_2fr] border-t border-white/10 bg-secondary/95 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-lg transition-transform duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={phoneHref} className="flex items-center justify-center py-4">Call</a>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center border-l border-white/10 py-4">WhatsApp</a>
      <Link href="/contact" className="flex items-center justify-center bg-primary py-4">Start a Project</Link>
    </div>
  );
}
