import type { ImageAsset } from "@/types/content";
import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealLines } from "@/components/ui/Motion";
import { ParallaxImage } from "@/components/ui/Parallax";

/** Hero for inner pages — dark, image-backed, with a large display title. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode[];
  lead?: ReactNode;
  image?: ImageAsset;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`relative flex overflow-hidden bg-secondary text-white ${compact ? "min-h-[62svh]" : "min-h-[78svh]"}`}>
      {image && (
        <div className="img-frame absolute inset-0">
          <ParallaxImage amount={12}>
            <Photo image={image} priority sizes="100vw" />
          </ParallaxImage>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/30" />
        </div>
      )}
      <div className="container-x relative flex w-full flex-col justify-end pb-16 pt-36 md:pb-24">
        <Reveal immediate>
          <p className="eyebrow mb-6 text-white/70">{eyebrow}</p>
        </Reveal>
        <h1 className="display-xl max-w-[14ch]">
          <RevealLines lines={title} immediate delay={0.1} />
        </h1>
        {lead && (
          <Reveal immediate delay={0.35}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">{lead}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
