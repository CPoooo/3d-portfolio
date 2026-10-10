import { ArrowUp } from "lucide-react"

import { site } from "@/content/site"
import { socialLinks } from "@/lib/links"
import { CurrentYear, LocalTime } from "./local-time"

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © <CurrentYear /> {site.name}
          {site.timezone && (
            <span className="ml-3 text-faint">
              Local time <LocalTime timeZone={site.timezone} />
            </span>
          )}
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {socialLinks.map((l) => (
            <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              {l.label}
            </a>
          ))}
          {site.source && (
            <a href={site.source} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              Source
            </a>
          )}
          <span className="text-faint">Next.js · Three.js · Tailwind</span>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-foreground">
            Top <ArrowUp className="size-3" />
          </a>
        </p>
      </div>
    </footer>
  )
}
