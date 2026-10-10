"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { Project } from "@/content/types"
import { GitHubIcon } from "./icons"
import { ProjectCover } from "./project-cover"
import { Chip, Status } from "./status"

/**
 * Featured projects as a deck of sticky cards. Each card pins near the top and
 * recedes slightly as the next one slides over it.
 */
export function WorkStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <div ref={ref} className="relative">
      {projects.map((p, i) => (
        <WorkCard key={p.slug} project={p} index={i} total={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}

function WorkCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const reduced = useReducedMotion()
  const desktop = useMediaQuery("(min-width: 1024px)")
  const still = reduced || !desktop
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.035])
  const dim = useTransform(progress, [start, Math.min(start + 1 / total, 1)], [0, index === total - 1 ? 0 : 0.5])

  return (
    <div
      className="pb-6 lg:sticky lg:top-[var(--stick)] lg:pb-16"
      style={{ "--stick": `calc(5.5rem + ${index * 14}px)` } as React.CSSProperties}
    >
      <motion.article
        data-scene="work"
        data-accent={project.accent}
        style={{ scale: still ? 1 : scale, "--p": project.accent } as never}
        className="relative w-full origin-top overflow-hidden rounded-3xl border border-border bg-card shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.8)]"
      >
        <div className="pointer-events-none absolute -top-40 -left-40 size-[32rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--p)_16%,transparent),transparent)]" />

        <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="flex flex-col">
            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>
                <span className="text-[var(--p)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-faint"> / {String(total).padStart(2, "0")}</span>
                <span className="ml-3 tracking-[0.16em] uppercase">{project.category}</span>
              </span>
              <span className="flex items-center gap-4">
                <span>{project.year}</span>
                <Status status={project.status} />
              </span>
            </div>

            <h3 className="mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{project.title}</h3>
            <p className="mt-3 text-lg leading-snug text-pretty text-muted-foreground">{project.tagline}</p>

            <ul className="mt-8 space-y-3 text-sm leading-relaxed">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-px w-3 shrink-0 bg-[var(--p)]" />
                  <span className="text-foreground/85">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 6).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
              {project.stack.length > 6 && <Chip>+{project.stack.length - 6}</Chip>}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-10">
              <Link
                href={`/projects/${project.slug}`}
                className={buttonVariants({ className: "group h-10 gap-2 rounded-lg px-4" })}
              >
                Case study
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", className: "h-10 gap-2 rounded-lg px-4" })}
                >
                  Live
                  <ArrowUpRight className="text-muted-foreground" />
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "ghost", className: "h-10 gap-2 rounded-lg px-4" })}
                >
                  <GitHubIcon className="size-4" />
                  Code
                </a>
              )}
            </div>
          </div>

          <Link href={`/projects/${project.slug}`} aria-label={`${project.title} case study`} className="group block self-center">
            <ProjectCover
              project={project}
              className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:rotate-[-0.4deg]"
            />
          </Link>
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: still ? 0 : dim }}
          className="pointer-events-none absolute inset-0 bg-background"
        />
      </motion.article>
    </div>
  )
}
