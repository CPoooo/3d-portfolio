import type { SocialLink } from "@/lib/links"
import { GitHubIcon, LinkedInIcon, XIcon } from "./icons"

export function SocialIcon({ name, className }: { name: SocialLink["key"]; className?: string }) {
  const Icon = { github: GitHubIcon, linkedin: LinkedInIcon, x: XIcon }[name]
  return <Icon className={className} />
}
