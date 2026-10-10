import { ArrowUpRight, FileText } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { site } from "@/content/site"
import { socialLinks } from "@/lib/links"
import { EmailButton } from "./email-button"
import { Reveal } from "./reveal"
import { SocialIcon } from "./social-icon"

export function ContactSection() {
  return (
    <section
      id="contact"
      data-scene="contact"
      className="relative flex min-h-[90svh] items-center px-4 py-32 md:px-8"
    >
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <span className="text-primary">06</span>
          <span className="h-px w-8 bg-border" />
          Contact
        </p>
        <h2 className="text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-balance">
          Let&apos;s build the <em className="font-serif font-normal tracking-normal text-primary italic">next one</em>.
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-pretty text-muted-foreground">
          {site.availability.open ? `${site.availability.label}. ` : ""}
          {site.remote}.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {site.email && <EmailButton email={site.email} />}
          {site.resume && (
            <a
              href={site.resume}
              download
              className={buttonVariants({ className: "h-11 gap-2 rounded-lg px-5" })}
            >
              <FileText />
              Résumé
            </a>
          )}
          {socialLinks.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: site.email || site.resume ? "outline" : "default",
                className: "h-11 gap-2 rounded-lg px-5",
              })}
            >
              <SocialIcon name={l.key} />
              {l.label}
              <ArrowUpRight className="opacity-60" />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
