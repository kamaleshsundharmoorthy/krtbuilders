import type { IconName } from "@/types/content";
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function Arrow(props: P) {
  return (
    <svg viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M0 6h15M10 1l5 5-5 5" />
    </svg>
  );
}

export function ArrowUpRight(props: P) {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M2 12 12 2M4 2h8v8" />
    </svg>
  );
}

export function Plus(props: P) {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M7 0v14M0 7h14" />
    </svg>
  );
}

export function Close(props: P) {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M1 1l12 12M13 1 1 13" />
    </svg>
  );
}

export function Check(props: P) {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" {...props}>
      <path d="M1.5 7.5 5 11l7.5-8" />
    </svg>
  );
}

/**
 * Architectural line icons — drawn on a 32px grid with square caps to match
 * the geometry of the logo mark. Deliberately minimal.
 */
const paths: Record<IconName, string> = {
  rupee: "M9 7h14M9 13h14M13 7c6 0 6 12 0 12H9l11 7",
  layers: "M4 12 16 6l12 6-12 6-12-6ZM4 18l12 6 12-6M4 24l12 6 12-6",
  team: "M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 27c0-5 3.5-8 8-8s8 3 8 8M22 14a3.5 3.5 0 1 0 0-7M24 19c3 .7 5 3.3 5 8",
  clipboard: "M10 6H7v22h18V6h-3M11 4h10v5H11zM11 16h10M11 21h7",
  compass: "M16 4v4M16 8l-8 20M16 8l8 20M10 20h12",
  check: "M5 5h22v22H5zM10 16l4 4 8-9",
  clock: "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM16 9v7l5 3",
  route: "M8 27a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM24 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 21V14c0-3 2-5 5-5h8M24 11v7c0 3-2 5-5 5h-8",
  headset: "M6 20v-4a10 10 0 0 1 20 0v4M6 18h4v8H6zM22 18h4v8h-4zM26 26c0 2-2 3-6 3h-3",
  chat: "M5 6h22v15H14l-6 5v-5H5zM10 12h12M10 16h8",
};

export function LineIcon({ name, className = "h-8 w-8" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
