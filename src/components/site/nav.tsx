"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Command, Download, Mail, Menu } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { site } from "@/content/site"
import { sections, socialLinks } from "@/lib/links"
import { cn } from "@/lib/utils"
import { openCommandMenu } from "./command-menu"
import { SocialIcon } from "./social-icon"

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
  return enabled ? active : null
}

export function Nav() {
  const pathname = usePathname()
  const home = pathname === "/"
  const active = useActiveSection(home)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const href = (id: string) => (home ? `#${id}` : `/#${id}`)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "flex h-12 w-full max-w-6xl items-center justify-between rounded-2xl border px-2 pl-3 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span className="grid size-7 place-items-center rounded-lg bg-foreground font-mono text-[11px] font-semibold text-background transition-colors group-hover:bg-primary">
            {site.initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={href(s.id)}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active === s.id && "text-foreground"
                )}
              >
                {s.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-500",
                    active === s.id && "scale-x-100"
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={openCommandMenu}
            className="hidden gap-2 text-muted-foreground sm:inline-flex"
            aria-label="Open command menu"
          >
            <span className="text-xs">Search</span>
            <Kbd className="gap-0.5">
              <Command className="size-3" />K
            </Kbd>
          </Button>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              className={buttonVariants({ variant: "ghost", size: "sm", className: "gap-2 text-muted-foreground" })}
            >
              <Mail />
              <span className="hidden font-mono text-xs xl:inline">{site.email}</span>
            </a>
          )}
          {site.resume && (
            <a
              href={site.resume}
              download
              className={buttonVariants({ size: "sm", className: "hidden gap-1.5 px-3 sm:inline-flex" })}
            >
              <Download />
              Résumé
            </a>
          )}

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6">
              <SheetTitle className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Menu
              </SheetTitle>
              <ul className="mt-6 flex flex-col">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={href(s.id)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 border-b border-border py-4 text-2xl font-medium tracking-tight"
                    >
                      <span className="font-mono text-xs text-primary">0{i + 1}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                {site.email && (
                  <a
                    href={`mailto:${site.email}`}
                    className={buttonVariants({ variant: "outline", className: "h-10 gap-2 font-mono text-xs" })}
                  >
                    <Mail />
                    {site.email}
                  </a>
                )}
                {site.resume && (
                  <a
                    href={site.resume}
                    download
                    className={buttonVariants({ className: "h-10 gap-2" })}
                  >
                    <Download />
                    Download résumé
                  </a>
                )}
                <div className="flex gap-2">
                  {socialLinks.map((l) => (
                    <a
                      key={l.key}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={l.label}
                      className={buttonVariants({ variant: "outline", size: "icon-lg" })}
                    >
                      <SocialIcon name={l.key} />
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
