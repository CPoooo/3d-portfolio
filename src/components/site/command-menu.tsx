"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Copy, CornerDownLeft, FileText, Hash, Layers } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { projects } from "@/content/projects"
import { site } from "@/content/site"
import { useCopy } from "@/hooks/use-copy"
import { sections, socialLinks } from "@/lib/links"
import { SocialIcon } from "./social-icon"

export const OPEN_COMMAND_MENU = "open-command-menu"

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU))
}

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { copy } = useCopy()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_COMMAND_MENU, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen)
    }
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    fn()
  }
  const external = (href: string) => window.open(href, "_blank", "noopener,noreferrer")
  const download = (href: string) => {
    const a = document.createElement("a")
    a.href = href
    a.download = ""
    a.click()
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command menu"
      description="Jump to a section, open a project or copy contact details."
      className="sm:max-w-lg"
    >
      <Command loop>
        <CommandInput placeholder="Search projects, sections, links…" />
        <CommandList className="max-h-[min(60vh,420px)]">
          <CommandEmpty>No results.</CommandEmpty>

          <CommandGroup heading="Sections">
            {sections.map((s) => (
              <CommandItem key={s.id} value={`section ${s.label}`} onSelect={() => run(() => router.push(`/#${s.id}`))}>
                <Hash />
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem
                key={p.slug}
                value={`project ${p.title} ${p.stack.join(" ")} ${p.category}`}
                onSelect={() => run(() => router.push(`/projects/${p.slug}`))}
              >
                <span className="size-2 rounded-full" style={{ background: p.accent }} />
                {p.title}
                <span className="truncate text-muted-foreground">{p.tagline}</span>
              </CommandItem>
            ))}
            <CommandItem value="all projects archive" onSelect={() => run(() => router.push("/projects"))}>
              <Layers />
              All projects
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Contact">
            {site.email && (
              <CommandItem value="copy email address" onSelect={() => run(() => copy(site.email))}>
                <Copy />
                Copy email
                <CommandShortcut>{site.email}</CommandShortcut>
              </CommandItem>
            )}
            {site.resume && (
              <CommandItem value="resume cv download" onSelect={() => run(() => download(site.resume))}>
                <FileText />
                Download résumé
                <CommandShortcut>PDF</CommandShortcut>
              </CommandItem>
            )}
            {socialLinks.map((l) => (
              <CommandItem key={l.key} value={`social ${l.label}`} onSelect={() => run(() => external(l.href))}>
                <SocialIcon name={l.key} />
                {l.label}
                <CommandShortcut>
                  <ArrowUpRight className="size-3.5" />
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="flex items-center justify-between border-t border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">
          <span>{site.name}</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="size-3" /> to select
          </span>
        </div>
      </Command>
    </CommandDialog>
  )
}
