export type ProjectStatus = "Live" | "In progress" | "Archived"

export type ProjectCategory =
  | "Full-stack"
  | "Backend"
  | "Frontend"
  | "Systems"
  | "Game"

export type ProjectImage = {
  /** Path under /public, e.g. "/projects/rabbit-holes/feed.png" */
  src: string
  alt: string
  caption?: string
}

export type Project = {
  slug: string
  title: string
  /** One line. Shown on cards. */
  tagline: string
  /** Two or three sentences. Shown at the top of the case study. */
  summary: string
  year: string
  status: ProjectStatus
  category: ProjectCategory
  role: string
  stack: string[]
  /** Featured projects appear in the stacked showcase on the home page. */
  featured?: boolean
  /** Hex color. Tints the card, cover and the 3D scene when in view. */
  accent: string
  /** Cover image shown inside the browser frame. Falls back to a generated cover. */
  cover?: string
  gallery?: ProjectImage[]
  links: {
    live?: string
    repo?: string
    video?: string
  }
  highlights: string[]
  /** Optional case-study sections. Each renders only when present. */
  problem?: string
  approach?: string
  outcome?: string
  metrics?: { label: string; value: string }[]
}

export type Experience = {
  role: string
  org: string
  href?: string
  start: string
  end: string
  location?: string
  summary: string
  points?: string[]
  stack?: string[]
}

export type SkillGroup = {
  label: string
  skills: string[]
}
