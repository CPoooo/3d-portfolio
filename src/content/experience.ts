import type { Experience } from "./types"

/** Most recent first. Add jobs, internships, freelance or open-source roles. */
export const experience: Experience[] = [
  {
    role: "Software Engineer",
    org: "Independent",
    start: "2025",
    end: "Present",
    location: "Remote",
    summary:
      "Designing, building and deploying full-stack web applications and backend services.",
    points: [
      "Shipped production Next.js apps with Postgres, auth, uploads and end-to-end tests",
      "Built typed REST APIs in TypeScript and Rust",
      "Studied systems fundamentals: operating systems, interpreters, data structures",
    ],
    stack: ["TypeScript", "Next.js", "Rust", "PostgreSQL"],
  },
]
