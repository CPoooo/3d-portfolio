"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import type { Project } from "@/content/types"
import { cn } from "@/lib/utils"
import { pulseScene } from "@/components/three/scene-store"
import { ProjectCover } from "./project-cover"
import { Chip, Status } from "./status"

/** Every project in a filterable grid. Each card links to its case study. */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("All")
  const reduced = useReducedMotion()
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap items-center gap-1.5">
        {categories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length
          const on = c === filter
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c)}
              className={cn(
                "relative h-9 rounded-full px-4 text-sm transition-colors",
                on ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <span className="relative">
                {c}
                <span className={cn("ml-1.5 font-mono text-[11px]", on ? "opacity-70" : "text-faint")}>{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <motion.ul layout={!reduced} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.slug}
              layout={!reduced}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <GalleryCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

function GalleryCard({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      onPointerEnter={() => pulseScene(0.6)}
      style={{ "--p": p.accent } as React.CSSProperties}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card/70 p-3 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[color-mix(in_oklch,var(--p)_45%,transparent)] hover:shadow-[0_24px_60px_-28px_color-mix(in_oklch,var(--p)_60%,transparent)]"
    >
      <ProjectCover project={p} className="rounded-lg shadow-none" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-3 pt-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-faint transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--p)]" />
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">{p.tagline}</p>
        <div className="mt-5 mb-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
          {p.stack.length > 4 && <Chip>+{p.stack.length - 4}</Chip>}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 font-mono text-[11px] text-faint">
          <span>
            {p.category} · {p.year}
          </span>
          <Status status={p.status} />
        </div>
      </div>
    </Link>
  )
}
