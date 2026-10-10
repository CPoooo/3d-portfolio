import { ArrowDown, ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { projects } from "@/content/projects"
import { site } from "@/content/site"
import { socialLinks } from "@/lib/links"
import { cn } from "@/lib/utils"
import { LocalTime } from "./local-time"
import { SocialIcon } from "./social-icon"

function Headline() {
  const { headline, headlineAccent } = site
  const at = headlineAccent ? headline.indexOf(headlineAccent) : -1
  if (at < 0) return <>{headline}</>
  return (
    <>
      {headline.slice(0, at)}
      <em className="font-serif font-normal tracking-normal text-primary italic">{headlineAccent}</em>
      {headline.slice(at + headlineAccent.length)}
    </>
  )
}

/** Each child rises in after the previous one. Pure CSS, so it plays before hydration. */
function Rise({ i, className, children }: { i: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("animate-rise", className)} style={{ animationDelay: `${150 + i * 110}ms` }}>
      {children}
    </div>
  )
}

export function Hero() {
  const live = projects.filter((p) => p.status === "Live").length
  const meta = [
    { label: "Role", value: site.role },
    { label: "Focus", value: "Full-stack · Systems" },
    { label: "Shipped", value: `${projects.length} projects, ${live} live` },
    site.location
      ? { label: "Based in", value: site.location, time: site.timezone }
      : { label: "Work", value: site.remote.replace(/^Open to /, "") },
  ]

  return (
    <section data-scene="hero" className="relative flex min-h-svh flex-col justify-end px-4 pt-28 pb-10 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          {site.availability.open && (
            <Rise i={0}>
              <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-background/40 py-1 pr-3.5 pl-2.5 text-xs text-muted-foreground backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.8_0.15_160)] opacity-60" />
                  <span className="relative size-2 rounded-full bg-[oklch(0.8_0.15_160)]" />
                </span>
                {site.availability.label}
              </p>
            </Rise>
          )}

          <Rise i={1}>
            <h1 className="text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
              {site.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h1>
          </Rise>

          <Rise i={2}>
            <p className="mt-8 max-w-xl text-2xl leading-snug tracking-tight text-balance md:text-3xl">
              <Headline />
            </p>
          </Rise>
          <Rise i={3}>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground">{site.subline}</p>
          </Rise>

          <Rise i={4} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className={buttonVariants({ className: "group h-11 gap-2 rounded-xl px-5 text-sm" })}>
              View selected work
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
            {site.resume && (
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", className: "h-11 rounded-xl px-5 text-sm" })}
              >
                Résumé
              </a>
            )}
            {socialLinks.map((l) => (
              <a
                key={l.key}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className={buttonVariants({ variant: "ghost", size: "icon-lg", className: "size-11 rounded-xl" })}
              >
                <SocialIcon name={l.key} className="size-5" />
              </a>
            ))}
          </Rise>
        </div>

        <Rise i={6}>
          <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6 md:grid-cols-[repeat(4,1fr)_auto]">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">{m.label}</dt>
                <dd className="mt-1.5 text-sm">
                  {m.value}
                  {"time" in m && m.time && (
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      <LocalTime timeZone={m.time} />
                    </span>
                  )}
                </dd>
              </div>
            ))}
            <a
              href="#snapshot"
              aria-label="Scroll to content"
              className="hidden size-10 place-items-center self-end rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary md:grid"
            >
              <ArrowDown className="size-4 animate-[bob_2.4s_ease-in-out_infinite]" />
            </a>
          </dl>
        </Rise>
      </div>
    </section>
  )
}
