import { ArrowUpRight, FileText } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { experience } from "@/content/experience"
import { projects } from "@/content/projects"
import { site } from "@/content/site"
import { socialLinks } from "@/lib/links"
import { EmailButton } from "./email-button"
import { Reveal } from "./reveal"
import { SocialIcon } from "./social-icon"
import { Chip } from "./status"

/** A one-screen summary for recruiters: what, where, when, and how to reach out. */
export function Snapshot() {
  const live = projects.filter((p) => p.status === "Live").length
  const technologies = new Set(projects.flatMap((p) => p.stack)).size

  const stats = [
    { value: projects.length, label: "Projects built" },
    { value: live, label: "Live in production" },
    { value: technologies, label: "Technologies used" },
    { value: experience.length, label: experience.length === 1 ? "Role" : "Roles" },
  ]

  return (
    <section id="snapshot" data-scene="section" className="px-4 py-24 md:px-8 md:py-32">
      <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-xl">
        <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">At a glance</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">The short version</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {site.email && <EmailButton email={site.email} />}
            {site.resume && (
              <a
                href={site.resume}
                download
                className={buttonVariants({ className: "h-11 gap-2 rounded-lg px-4" })}
              >
                <FileText />
                Résumé
              </a>
            )}
            {socialLinks.map((l) => (
              <a
                key={l.key}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", className: "h-11 gap-2 rounded-lg px-4" })}
              >
                <SocialIcon name={l.key} />
                {l.label}
                <ArrowUpRight className="text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        <dl className="grid divide-border md:grid-cols-3 md:divide-x [&>div]:border-b [&>div]:border-border">
          <Cell label="Looking for">
            <ul className="space-y-1">
              {site.seeking.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Cell>
          <Cell label="Availability">
            <p>{site.availability.label}</p>
            <p className="mt-1 text-muted-foreground">{site.remote}</p>
            {site.location && <p className="mt-1 text-muted-foreground">{site.location}</p>}
          </Cell>
          <Cell label="Core stack">
            <div className="flex flex-wrap gap-1.5">
              {site.coreStack.map((s) => (
                <Chip key={s} className="text-foreground">
                  {s}
                </Chip>
              ))}
            </div>
          </Cell>
        </dl>

        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-border p-6 md:p-8 max-md:[&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r md:[&:not(:last-child)]:border-r"
            >
              <dd className="text-4xl font-semibold tracking-tight tabular-nums md:text-5xl">{s.value}</dd>
              <dt className="mt-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-6 text-sm leading-relaxed md:p-8">
      <dt className="mb-3 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
