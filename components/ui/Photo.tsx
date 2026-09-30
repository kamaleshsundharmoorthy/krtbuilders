import Image from "next/image";
import type { ImageAsset } from "@/types/content";

/**
 * Wrapper around next/image. Always fills its parent, which must be
 * positioned and sized. The `.img-frame` graphite background shows while
 * loading, so layouts never collapse.
 */
export function Photo({
  image,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  image?: ImageAsset | null;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!image?.src) return null;
  return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}
