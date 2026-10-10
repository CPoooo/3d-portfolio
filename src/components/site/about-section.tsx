import Image from "next/image"

import { site } from "@/content/site"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function AboutSection() {
  return (
    <section id="about" data-scene="section" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" eyebrow="About" title="How I work" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal className="space-y-6">
            {site.about.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-2xl leading-snug tracking-tight text-balance md:text-3xl"
                    : "max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.08} className="space-y-8">
            {site.portrait && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={site.portrait}
                  alt={site.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover grayscale-[30%]"
                />
              </div>
            )}
            {site.now.length > 0 && (
              <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
                <h3 className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Now
                </h3>
                <ul className="space-y-3.5 text-sm leading-relaxed">
                  {site.now.map((n) => (
                    <li key={n} className="flex gap-3">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
