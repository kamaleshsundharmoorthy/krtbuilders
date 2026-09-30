import Link from "next/link";
import type { ConstructionPackage } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { Arrow, Check } from "@/components/ui/Icons";

/**
 * Package "chapter" card — reads like an editorial spread rather than a
 * pricing card. Works on dark (default) or light backgrounds.
 */
export function PackageCard({ pkg, tone = "dark" }: { pkg: ConstructionPackage; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className={`group relative flex h-full flex-col border-t-2 pt-8 transition-colors duration-500 ${dark ? "border-white/15 hover:border-primary" : "border-ink/15 hover:border-primary"}`}
      aria-label={`${pkg.name} package — view details`}
    >
      <div className="flex items-baseline justify-between">
        <span className={`font-display text-sm font-bold tracking-[0.1em] ${dark ? "text-white/40" : "text-muted"}`}>{pkg.index}</span>
        {pkg.id === "luxury" && <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-primary-light">Fully bespoke</span>}
      </div>
      <h3 className={`mt-5 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl ${dark ? "text-white" : "text-ink"}`}>{pkg.name}</h3>
      <p className={`serif-accent mt-2 text-xl ${dark ? "text-white/70" : "text-muted"}`}>{pkg.tagline}</p>

      <div className="img-frame relative mt-7 aspect-[16/10]">
        <Photo image={pkg.image} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="grayscale-[35%] transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0" />
      </div>

      <p className={`mt-6 text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>{pkg.description}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {pkg.highlights.map((h) => (
          <li key={h} className={`flex gap-3 text-sm ${dark ? "text-white/85" : "text-ink/85"}`}>
            <Check className="mt-1 h-3 w-3 shrink-0 text-primary" />
            {h}
          </li>
        ))}
      </ul>
      <div className={`mt-8 flex items-end justify-between border-t pt-5 ${dark ? "border-white/10" : "border-border"}`}>
        <div>
          <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/40" : "text-muted"}`}>Starting from</p>
          <p className={`mt-1 font-display text-lg font-bold ${dark ? "text-white" : "text-ink"}`}>{pkg.startingRate}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center bg-primary text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
          <Arrow className="h-3 w-4" />
        </span>
      </div>
    </Link>
  );
}
