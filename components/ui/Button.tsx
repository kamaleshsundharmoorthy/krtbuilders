import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Arrow } from "./Icons";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "light" | "text" | "text-light";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-out-expo)] disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white px-7 py-4 hover:bg-primary-dark",
  dark: "bg-secondary text-white px-7 py-4 hover:bg-primary",
  outline: "border border-ink/25 text-ink px-7 py-4 hover:border-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/35 text-white px-7 py-4 hover:bg-white hover:text-ink hover:border-white",
  light: "bg-white text-ink px-7 py-4 hover:bg-primary hover:text-white",
  text: "text-ink py-2 hover:text-primary",
  "text-light": "text-white py-2 hover:text-primary-light",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative inline-flex h-3 w-4 overflow-hidden">
          <Arrow className="absolute inset-0 h-3 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[140%]" />
          <Arrow className="absolute inset-0 h-3 w-4 -translate-x-[140%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
        </span>
      )}
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={buttonClass(variant, className)} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  arrow = true,
  className = "",
  ...rest
}: { children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & ComponentProps<"button">) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
