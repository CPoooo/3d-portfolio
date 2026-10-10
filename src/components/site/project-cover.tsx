import Image from "next/image"

import type { Project } from "@/content/types"
import { hostname } from "@/lib/links"
import { cn } from "@/lib/utils"

/**
 * A browser window around the project's cover image.
 * With no `cover` set, it renders a generated cover in the project's accent color.
 */
export function ProjectCover({
  project,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const url = project.links.live
    ? hostname(project.links.live)
    : project.links.repo
      ? hostname(project.links.repo) + new URL(project.links.repo).pathname
      : `${project.slug}.local`

  return (
    <div
      style={{ "--p": project.accent } as React.CSSProperties}
      className={cn(
        "overflow-hidden rounded-xl bg-[color-mix(in_oklch,var(--p)_6%,var(--card))] shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--p)_45%,transparent)] ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-border bg-foreground/[0.03] px-3">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-foreground/[0.05] px-3 py-0.5 font-mono text-[10px] text-muted-foreground">
          {url}
        </span>
        <span className="w-10" />
      </div>
      <div className="relative aspect-[16/10]">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} screenshot`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        ) : (
          <GeneratedCover project={project} />
        )}
      </div>
    </div>
  )
}

function GeneratedCover({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_30%_30%,black,transparent)]" />
      <div className="absolute -top-1/3 -left-1/4 size-[90%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--p)_40%,transparent),transparent)] blur-2xl" />

      {/* Faux interface */}
      <div className="absolute top-[14%] right-[6%] bottom-[-8%] left-[46%] rounded-lg border border-border bg-background/60 p-3 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2">
          <span className="size-3 rounded-full bg-[var(--p)]" />
          <span className="h-1.5 w-16 rounded-full bg-foreground/20" />
          <span className="ml-auto h-1.5 w-8 rounded-full bg-foreground/10" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-border bg-foreground/[0.03] p-2">
              <div className="mb-2 h-1 w-1/2 rounded-full bg-foreground/15" />
              <div
                className="h-4 rounded-sm"
                style={{ background: `color-mix(in oklch, var(--p) ${40 - i * 12}%, transparent)` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {[90, 72, 84, 60, 78].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-foreground/15" />
              <span className="h-1 rounded-full bg-foreground/12" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[10%] left-[7%] max-w-[36%]">
        <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[var(--p)] uppercase">{project.category}</p>
        <p className="text-2xl leading-none font-semibold tracking-tight text-foreground md:text-3xl">{project.title}</p>
      </div>
    </div>
  )
}
