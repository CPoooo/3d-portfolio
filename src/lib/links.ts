import { site } from "@/content/site"

export type SocialLink = { label: string; href: string; key: "github" | "linkedin" | "x" }

/** Socials that have a URL filled in, in display order. */
export const socialLinks: SocialLink[] = (
  [
    { key: "github", label: "GitHub", href: site.socials.github },
    { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin },
    { key: "x", label: "X", href: site.socials.x },
  ] as SocialLink[]
).filter((l) => l.href)

/** Home page sections, used by the nav and the command menu. */
export const sections = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}
