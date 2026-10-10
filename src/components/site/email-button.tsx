"use client"

import { Check, Copy } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { useCopy } from "@/hooks/use-copy"
import { cn } from "@/lib/utils"

/** Opens the mail client, with a small button beside it that copies the address. */
export function EmailButton({ email, className }: { email: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <div className={cn("inline-flex items-center", className)}>
      <a
        href={`mailto:${email}`}
        className={buttonVariants({ variant: "outline", className: "h-11 rounded-r-none px-4 font-mono text-[13px]" })}
      >
        {email}
      </a>
      <button
        type="button"
        onClick={() => copy(email)}
        aria-label={copied ? "Copied" : "Copy email address"}
        className={buttonVariants({
          variant: "outline",
          className: "-ml-px h-11 w-11 rounded-l-none",
        })}
      >
        {copied ? <Check className="text-primary" /> : <Copy />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  )
}
