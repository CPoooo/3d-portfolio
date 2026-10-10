import type { SkillGroup } from "./types"

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Rust", "SQL", "Go", "Java", "C#", "C"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Three.js", "Motion"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "Axum", "REST", "Auth / OAuth", "Zod"],
  },
  {
    label: "Data",
    skills: ["PostgreSQL", "Drizzle", "Prisma", "Neon"],
  },
  {
    label: "Testing & Tooling",
    skills: ["Vitest", "Playwright", "Supertest", "Git", "Vercel", "Linux", "Vim"],
  },
]
