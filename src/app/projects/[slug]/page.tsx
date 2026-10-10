import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react"

import { Footer } from "@/components/site/footer"
import { GitHubIcon } from "@/components/site/icons"
import { ProjectCover } from "@/components/site/project-cover"
import { Reveal } from "@/components/site/reveal"
import { Chip, Status } from "@/components/site/status"
import { buttonVariants } from "@/components/ui/button"
import { getProject, projects } from "@/content/projects"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: `${project.tagline} ${project.summary}`,
    openGraph: { title: project.title, description: project.tagline },
  }
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const i = projects.indexOf(project)
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  const sections = [
    { label: "Problem", body: project.problem },
    { label: "Approach", body: project.approach },
    { label: "Outcome", body: project.outcome },
  ].filter((s): s is { label: string; body: string } => !!s.body)

  return (
    <>
      <article
        data-scene="detail"
        data-accent={project.accent}
        style={{ "--p": project.accent } as React.CSSProperties}
        className="px-4 pt-32 pb-24 md:px-8 md:pt-40"
      >
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#work"
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>

          <header className="max-w-4xl">
            <div className="animate-rise flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground" style={{ animationDelay: "100ms" }}>
              <span className="tracking-[0.18em] text-[var(--p)] uppercase">{project.category}</span>
              <span>{project.year}</span>
              <Status status={project.status} />
            </div>
            <h1
              className="animate-rise mt-6 text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
              style={{ animationDelay: "200ms" }}
            >
              {project.title}
            </h1>
            <p
              className="animate-rise mt-6 max-w-2xl text-xl leading-snug text-pretty text-muted-foreground md:text-2xl"
              style={{ animationDelay: "300ms" }}
            >
              {project.tagline}
            </p>
            <div className="animate-rise mt-10 flex flex-wrap gap-2" style={{ animationDelay: "400ms" }}>
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ className: "h-11 gap-2 rounded-lg px-5" })}
                >
                  Visit live site
                  <ArrowUpRight />
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: project.links.live ? "outline" : "default",
                    className: "h-11 gap-2 rounded-lg px-5",
                  })}
                >
                  <GitHubIcon className="size-4" />
                  Source code
                </a>
              )}
              {project.links.video && (
                <a
                  href={project.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", className: "h-11 gap-2 rounded-lg px-5" })}
                >
                  <Play />
                  Watch demo
                </a>
              )}
            </div>
          </header>

          <div className="animate-rise mt-16" style={{ animationDelay: "500ms" }}>
            <ProjectCover project={project} priority sizes="(min-width: 1152px) 1152px, 100vw" className="rounded-2xl" />
          </div>

          <div className="mt-20 grid gap-16 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
                <Meta label="Role">{project.role}</Meta>
                <Meta label="Year">{project.year}</Meta>
                <Meta label="Status">
                  <Status status={project.status} className="text-sm text-foreground" />
                </Meta>
                <Meta label="Stack" className="col-span-2 lg:col-span-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </Meta>
              </dl>
            </aside>

            <div className="min-w-0 space-y-16">
              <Reveal>
                <p className="text-2xl leading-snug tracking-tight text-pretty md:text-3xl">{project.summary}</p>
              </Reveal>

              {project.metrics && project.metrics.length > 0 && (
                <Reveal>
                  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="bg-card p-6">
                        <dd className="text-3xl font-semibold tracking-tight text-[var(--p)] tabular-nums">{m.value}</dd>
                        <dt className="mt-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}

              {sections.map((s) => (
                <Reveal key={s.label}>
                  <h2 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">{s.label}</h2>
                  <p className="max-w-2xl text-lg leading-relaxed text-pretty text-foreground/85">{s.body}</p>
                </Reveal>
              ))}

              <Reveal>
                <h2 className="mb-6 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">Highlights</h2>
                <ul className="divide-y divide-border border-y border-border">
                  {project.highlights.map((h, n) => (
                    <li key={h} className="flex gap-6 py-5 leading-relaxed">
                      <span className="font-mono text-xs text-[var(--p)] tabular-nums">{String(n + 1).padStart(2, "0")}</span>
                      <span className="text-foreground/90">{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-10">
                  <h2 className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">Gallery</h2>
                  {project.gallery.map((img) => (
                    <Reveal key={img.src}>
                      <figure>
                        <div className="relative overflow-hidden rounded-xl border border-border">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={1600}
                            height={1000}
                            sizes="(min-width: 1024px) 800px, 100vw"
                            className="h-auto w-full"
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="mt-3 text-sm text-muted-foreground">{img.caption}</figcaption>
                        )}
                      </figure>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav aria-label="More projects" className="mt-32 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            <PagerLink href={`/projects/${prev.slug}`} dir="prev" title={prev.title} accent={prev.accent} />
            <PagerLink href={`/projects/${next.slug}`} dir="next" title={next.title} accent={next.accent} />
          </nav>
        </div>
      </article>
      <Footer />
    </>
  )
}

function Meta({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="mb-2 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">{label}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  )
}

function PagerLink({ href, dir, title, accent }: { href: string; dir: "prev" | "next"; title: string; accent: string }) {
  const next = dir === "next"
  return (
    <Link
      href={href}
      style={{ "--q": accent } as React.CSSProperties}
      className={`group flex flex-col gap-3 bg-card p-8 transition-colors hover:bg-[color-mix(in_oklch,var(--q)_7%,var(--card))] ${next ? "md:items-end md:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        {!next && <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />}
        {next ? "Next project" : "Previous project"}
        {next && <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-[var(--q)] md:text-3xl">{title}</span>
    </Link>
  )
}
