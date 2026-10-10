import type { Experience } from "./types"

/** Most recent first. Add jobs, internships, freelance or open-source roles. */
export const experience: Experience[] = [
  {
    role: "Software Engineer",
    org: "Knowledge Based Systems, Inc. (KBSI)",
    href: "https://www.kbsi.com",
    start: "Feb 2025",
    end: "Present",
    progression: [
      { role: "Software Engineer Intern", date: "Feb 2025" },
      { role: "Junior Software Engineer", date: "Apr 2025" },
      { role: "Software Engineer", date: "Aug 2026" },
    ],
    summary:
      "Building full-stack web applications and Python AI backends with retrieval-augmented generation, largely on SBIR-funded R&D contracts.",
    points: [
      "Deliver software on Small Business Innovation Research (SBIR) contracts, taking federal R&D work from concept to working application",
      "Frontends in Next.js/React and Vue, backed by TypeScript and Express services",
      "RAG backends in Python with Flask and FastAPI, retrieving from Neo4j and PostgreSQL",
      "MCP servers that connect models to internal tools and data",
      "Local LLM inference with Ollama, with services containerized in Docker",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Vue",
      "Express",
      "Python",
      "FastAPI",
      "Flask",
      "Neo4j",
      "PostgreSQL",
      "MCP",
      "Ollama",
      "Docker",
    ],
  },
]
