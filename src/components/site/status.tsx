import type { ProjectStatus } from "@/content/types"
import { cn } from "@/lib/utils"

const tone: Record<ProjectStatus, string> = {
  Live: "bg-[oklch(0.8_0.15_160)] shadow-[0_0_10px_oklch(0.8_0.15_160)]",
  "In progress": "bg-primary shadow-[0_0_10px_var(--primary)]",
  Archived: "bg-faint",
}

export function Status({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground", className)}>
      <span className={cn("size-1.5 rounded-full", tone[status])} />
      {status}
    </span>
  )
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border border-border bg-foreground/[0.03] px-2 font-mono text-[11px] text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}
