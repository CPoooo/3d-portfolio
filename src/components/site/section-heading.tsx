import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  index: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Reveal className={cn("mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <span className="text-primary">{index}</span>
          <span className="h-px w-8 bg-border" />
          {eyebrow}
        </p>
        <h2 className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">{title}</h2>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </Reveal>
  )
}
