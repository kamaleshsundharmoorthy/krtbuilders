"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Project } from "@/types/content";
import { ProjectCard } from "./Projects";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const types = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.type)))], [projects]);
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors ${filter === t ? "bg-ink text-white" : "border border-border text-muted hover:border-ink hover:text-ink"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <ProjectCard project={p} priority={i < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
