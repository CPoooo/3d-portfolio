import { ArrowRight, ArrowUpRight } from "lucide-react"

import { experience } from "@/content/experience"
import { site } from "@/content/site"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { Chip } from "./status"

export function ExperienceSection() {
  return (
    <section id="experience" data-scene="section" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've worked" />

        <ol className="border-t border-border">
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.org}-${job.start}`} delay={i * 0.05}>
              <article className="grid gap-4 border-b border-border py-10 md:grid-cols-[12rem_1fr] md:gap-10">
                <p className="font-mono text-xs text-muted-foreground tabular-nums">
                  {job.start} — {job.end}
                  {job.location && <span className="mt-1 block text-faint">{job.location}</span>}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {job.role}{" "}
                    <span className="text-muted-foreground">
                      ·{" "}
                      {job.href ? (
                        <a href={job.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 hover:text-primary">
                          {job.org}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        job.org
                      )}
                    </span>
                  </h3>
                  {job.progression && job.progression.length > 1 && (
                    <ol aria-label="Promotions" className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs">
                      {job.progression.map((step, n) => {
                        const current = n === job.progression!.length - 1
                        return (
                          <li key={step.role} className="flex items-center gap-2">
                            {n > 0 && <ArrowRight aria-hidden className="size-3 text-faint" />}
                            <span
                              className={
                                current
                                  ? "rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-primary"
                                  : "rounded-md border border-border px-2 py-1 text-muted-foreground"
                              }
                            >
                              {step.role}
                              <span className={current ? "ml-2 text-primary/70" : "ml-2 text-faint"}>{step.date}</span>
                            </span>
                          </li>
                        )
                      })}
                    </ol>
                  )}
                  <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-muted-foreground">{job.summary}</p>
                  {job.points && (
                    <ul className="mt-5 max-w-2xl space-y-2.5 text-sm leading-relaxed">
                      {job.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                          <span className="text-foreground/85">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.stack && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        {(site.education.length > 0 || site.certifications.length > 0) && (
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {site.education.length > 0 && (
              <Reveal>
                <h3 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">Education</h3>
                <ul className="space-y-4">
                  {site.education.map((e) => (
                    <li key={e.school} className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                      <span>
                        <span className="block font-medium">{e.degree}</span>
                        <span className="text-sm text-muted-foreground">{e.school}</span>
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{e.year}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {site.certifications.length > 0 && (
              <Reveal delay={0.05}>
                <h3 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">Certifications</h3>
                <ul className="space-y-4">
                  {site.certifications.map((c) => (
                    <li key={c.name} className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                      <span>
                        <span className="block font-medium">
                          {c.href ? (
                            <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                              {c.name}
                            </a>
                          ) : (
                            c.name
                          )}
                        </span>
                        <span className="text-sm text-muted-foreground">{c.issuer}</span>
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{c.year}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
