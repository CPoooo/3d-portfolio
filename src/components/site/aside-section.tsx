import { ArrowUpRight, Mail } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { site } from "@/content/site"
import { socialLinks } from "@/lib/links"
import { Reveal } from "./reveal"
import { SocialIcon } from "./social-icon"

/** A short personal note under the hero, plus an open door for other developers. */
export function AsideSection() {
  if (!site.offTheRecord.length && !site.forDevs.length) return null

  return (
    <section aria-label="A little more about me" data-scene="hero" className="px-4 pt-16 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.35fr_1fr]">
        {site.offTheRecord.length > 0 && (
          <Reveal as="article" className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl md:p-8">
            <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--iris)_22%,transparent),transparent)]" />
            <h2 className="relative font-serif text-3xl tracking-normal text-primary italic">Off the record</h2>
            <div className="relative mt-5 space-y-4 leading-relaxed text-pretty">
              {site.offTheRecord.map((p, i) => (
                <p key={i} className={i === 0 ? "text-foreground/90" : "text-muted-foreground"}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {site.forDevs.length > 0 && (
          <Reveal as="article" delay={0.08} className="flex flex-col rounded-3xl border border-dashed border-[color-mix(in_oklch,var(--glacier)_35%,transparent)] p-6 md:p-8">
            <p className="font-mono text-[11px] tracking-[0.18em] text-glacier uppercase">Not a recruiter?</p>
            <div className="mt-4 space-y-3 leading-relaxed text-pretty text-muted-foreground">
              {site.forDevs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-foreground/90" : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {site.email && (
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Saw your site")}`}
                  className={buttonVariants({ variant: "outline", className: "h-10 gap-2 rounded-lg px-4" })}
                >
                  <Mail />
                  Say hi
                </a>
              )}
              {socialLinks.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "ghost", className: "h-10 gap-2 rounded-lg px-4" })}
                >
                  <SocialIcon name={l.key} />
                  {l.label}
                  <ArrowUpRight className="opacity-60" />
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
