import { projects } from "@/content/projects"
import { skills } from "@/content/skills"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

/** Skills grouped by area. A skill used in a project shows how many projects use it. */
export function StackSection() {
  const usage = new Map<string, number>()
  for (const p of projects) for (const s of p.stack) usage.set(s, (usage.get(s) ?? 0) + 1)

  return (
    <section id="stack" data-scene="section" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Stack"
          title="Tools I reach for"
          description="Numbers show how many projects on this page use each one."
        />

        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal
              key={group.label}
              delay={i * 0.05}
              className={cn(
                "bg-card/90 p-6 backdrop-blur md:p-8",
                i === 0 && "lg:row-span-2",
                skills.length % 2 === 1 && i === skills.length - 1 && "md:max-lg:col-span-2"
              )}
            >
              <h3 className="mb-6 font-mono text-[11px] tracking-[0.18em] text-faint uppercase">{group.label}</h3>
              <ul className={cn("grid gap-x-6 gap-y-3", i === 0 && "lg:gap-y-5")}>
                {group.skills.map((s) => {
                  const n = usage.get(s)
                  return (
                    <li key={s} className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-3 last:border-0">
                      <span className={cn("text-[15px]", i === 0 && "lg:text-xl lg:font-medium lg:tracking-tight")}>{s}</span>
                      {n ? <span className="font-mono text-[11px] text-primary tabular-nums">{n}</span> : null}
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
