import type { SkillGroup } from "./types"

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Rust", "SQL", "Go", "Java", "C#", "C"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Vue", "Tailwind CSS", "shadcn/ui", "Three.js", "Motion"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "Flask", "Axum", "REST", "Auth / OAuth", "Zod"],
  },
  {
    label: "Data",
    skills: ["PostgreSQL", "Neo4j", "Drizzle", "Prisma", "Neon"],
  },
  {
    label: "AI",
    skills: ["RAG", "MCP", "Ollama", "LLM integration"],
  },
  {
    label: "Testing & Tooling",
    skills: ["Vitest", "Playwright", "Supertest", "Docker", "Git", "Vercel", "Linux", "Vim"],
  },
]
