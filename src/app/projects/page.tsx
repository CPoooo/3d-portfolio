import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { Footer } from "@/components/site/footer"
import { GitHubIcon } from "@/components/site/icons"
import { Status } from "@/components/site/status"
import { projects } from "@/content/projects"

export const metadata: Metadata = {
  title: "Projects",
  description: "An index of everything I've built: full-stack apps, APIs, systems work and games.",
}

export default function ProjectsIndex() {
  const byYear = Object.entries(
    projects.reduce<Record<string, typeof projects>>((acc, p) => {
      ;(acc[p.year] ??= []).push(p)
      return acc
    }, {})
  ).sort(([a], [b]) => b.localeCompare(a))

  return (
    <>
      <section data-scene="section" className="px-4 pt-32 pb-24 md:px-8 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Home
          </Link>
          <h1 className="animate-rise text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
            Index
          </h1>
          <p className="animate-rise mt-6 max-w-lg text-lg text-muted-foreground" style={{ animationDelay: "120ms" }}>
            {projects.length} projects, newest first.
          </p>

          <div className="animate-rise mt-16" style={{ animationDelay: "240ms" }}>
            <div className="hidden grid-cols-[5rem_1.2fr_1fr_1.4fr_7rem_4rem] gap-6 border-b border-border pb-3 font-mono text-[11px] tracking-[0.16em] text-faint uppercase lg:grid">
              <span>Year</span>
              <span>Project</span>
              <span>Area</span>
              <span>Built with</span>
              <span>Status</span>
              <span className="text-right">Links</span>
            </div>

            {byYear.map(([year, list]) => (
              <div key={year}>
                {list.map((p, i) => (
                  <div
                    key={p.slug}
                    style={{ "--p": p.accent } as React.CSSProperties}
                    className="group relative grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-border py-5 transition-colors hover:bg-foreground/[0.02] lg:grid-cols-[5rem_1.2fr_1fr_1.4fr_7rem_4rem]"
                  >
                    <span className="hidden font-mono text-xs text-muted-foreground lg:block">{i === 0 ? year : ""}</span>
                    <Link href={`/projects/${p.slug}`} className="font-medium after:absolute after:inset-0">
                      <span className="mr-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-[var(--p)]" />
                      <span className="transition-colors group-hover:text-[var(--p)]">{p.title}</span>
                    </Link>
                    <span className="hidden text-sm text-muted-foreground lg:block">{p.category}</span>
                    <span className="col-span-2 truncate font-mono text-xs text-muted-foreground lg:col-span-1">
                      {p.stack.join(" · ")}
                    </span>
                    <Status status={p.status} className="hidden lg:inline-flex" />
                    <span className="relative z-10 col-start-2 row-start-1 flex justify-end gap-3 text-muted-foreground lg:col-start-auto lg:row-start-auto">
                      {p.links.live && (
                        <a href={p.links.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`} className="hover:text-foreground">
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                      {p.links.repo && (
                        <a href={p.links.repo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="hover:text-foreground">
                          <GitHubIcon className="size-4" />
                        </a>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
