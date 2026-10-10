import type { Project } from "./types"

/**
 * Projects, in display order.
 *
 * - `featured: true` puts a project in the stacked showcase on the home page.
 * - Images go in /public/projects/<slug>/ and are referenced as "/projects/<slug>/file.png".
 * - Optional fields (problem, approach, outcome, metrics, gallery) render only when filled in.
 */
export const projects: Project[] = [
  {
    slug: "rabbit-holes",
    title: "Rabbit Holes",
    tagline: "A social blogging platform with feeds, discovery and real auth.",
    summary:
      "A full social publishing app: write with a rich text editor, follow people, and browse a feed, a discover page and personalised picks. Built to production standards and deployed on Vercel.",
    year: "2026",
    status: "Live",
    category: "Full-stack",
    role: "Design, engineering, deployment",
    stack: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "Neon Postgres",
      "Tiptap",
      "shadcn/ui",
      "Vercel Blob",
      "Playwright",
    ],
    featured: true,
    accent: "#e8915a",
    links: {
      live: "https://simple-blog-app-flax.vercel.app",
      repo: "https://github.com/CPoooo/simple-blog-app",
    },
    highlights: [
      "JWT sessions in httpOnly cookies with versioned tokens, so “sign out everywhere” works without a session store",
      "OAuth with state and PKCE; accounts link only on provider-verified email",
      "Feed, following, discover and weighted “for you” picks with infinite scroll",
      "Image uploads resized on-device, stored in Vercel Blob, cleaned up on delete",
      "Postgres-backed rate limiting, notifications, bookmarks and full account deletion",
      "14 end-to-end Playwright suites against a real server and database",
    ],
    problem:
      "Build something large enough that it can't be faked: auth, a relational data model, rich content, uploads and a polished UI.",
    approach:
      "Next.js App Router with server components and server actions, Drizzle over Neon Postgres, and a small set of well-tested primitives for auth and media.",
    metrics: [
      { label: "E2E suites", value: "14" },
      { label: "Auth providers", value: "3" },
    ],
  },
  {
    slug: "typesafe-todo-api",
    title: "Typesafe Todo API",
    tagline: "A strictly typed REST API with JWT auth and 48 passing tests.",
    summary:
      "A REST API where types flow from the database schema to request validation to responses. Express, Drizzle and Zod, covered end to end with Vitest and Supertest.",
    year: "2026",
    status: "Archived",
    category: "Backend",
    role: "Engineering",
    stack: ["TypeScript", "Express", "Drizzle", "Zod", "Neon Postgres", "Vitest"],
    featured: true,
    accent: "#7cc4d8",
    links: {
      repo: "https://github.com/CPoooo/typesafe-todo-api",
    },
    highlights: [
      "Strict TypeScript with schema-derived types; no hand-written DTOs",
      "Zod validation on every body, param and query",
      "JWT + bcrypt authentication with per-user resource scoping",
      "Filtering and sorting via typed query params",
      "48 integration tests with Vitest and Supertest",
    ],
    metrics: [
      { label: "Tests", value: "48" },
      { label: "Type coverage", value: "Strict" },
    ],
  },
  {
    slug: "tanks",
    title: "Tanks",
    tagline: "A browser tank battler with local multiplayer and an AI opponent.",
    summary:
      "A Wii Play–style tanks game that runs in the browser. Two players on one keyboard, or one player against a computer opponent.",
    year: "2026",
    status: "In progress",
    category: "Game",
    role: "Engineering",
    stack: ["TypeScript", "Next.js", "Canvas"],
    featured: true,
    accent: "#a3c27a",
    links: {
      repo: "https://github.com/CPoooo/tank_game",
    },
    highlights: [
      "Real-time game loop with collision and ricochet",
      "Same-keyboard local multiplayer",
      "Computer-controlled opponent",
    ],
  },
  {
    slug: "social-media",
    title: "Social Media",
    tagline: "A social platform designed from first principles, docs only.",
    summary:
      "A traditional social network built without AI assistance: auth, posts, follows, comments, likes and feed fan-out, designed from the schema up.",
    year: "2026",
    status: "In progress",
    category: "Full-stack",
    role: "System design, engineering",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    accent: "#9d8cf0",
    links: {
      repo: "https://github.com/CPoooo/social-media",
    },
    highlights: [
      "Relational schema for users, posts, follows, comments and likes",
      "REST routes for auth, feed and follow graph",
      "Feed fan-out design for followers",
    ],
  },
  {
    slug: "crafting-interpreters",
    title: "Lox Interpreter",
    tagline: "A tree-walking interpreter for Lox, written in Rust.",
    summary:
      "Working through Crafting Interpreters in Rust instead of Java: scanner, parser, AST and evaluator.",
    year: "2026",
    status: "In progress",
    category: "Systems",
    role: "Engineering",
    stack: ["Rust"],
    accent: "#e07a5f",
    links: {
      repo: "https://github.com/CPoooo/crafting_interpreters",
    },
    highlights: [
      "Hand-written scanner and recursive-descent parser",
      "Idiomatic Rust enums for tokens and AST nodes",
    ],
  },
  {
    slug: "todo-axum-api",
    title: "Axum Todo API",
    tagline: "A REST API in Rust with Axum and Tokio.",
    summary: "A todo service in Rust exploring Axum routing, extractors and async handlers.",
    year: "2026",
    status: "Archived",
    category: "Backend",
    role: "Engineering",
    stack: ["Rust", "Axum", "Tokio"],
    accent: "#f2b766",
    links: {
      repo: "https://github.com/CPoooo/todo-axum-api",
    },
    highlights: ["Typed extractors and JSON handlers", "Async runtime with Tokio"],
  },
  {
    slug: "quicklift",
    title: "QuickLift",
    tagline: "A fast workout logger for the gym floor.",
    summary: "A lightweight lifting tracker built with Next.js and deployed on Vercel.",
    year: "2026",
    status: "Live",
    category: "Frontend",
    role: "Design, engineering",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    accent: "#6fd0a8",
    links: {
      live: "https://quicklift-chi.vercel.app",
      repo: "https://github.com/CPoooo/quicklift",
    },
    highlights: ["Mobile-first interface", "Deployed on Vercel"],
  },
  {
    slug: "ostep",
    title: "OSTEP Exercises",
    tagline: "Operating systems, three easy pieces, in C.",
    summary:
      "Notes and exercises from Operating Systems: Three Easy Pieces covering processes, scheduling, memory and concurrency.",
    year: "2026",
    status: "In progress",
    category: "Systems",
    role: "Study",
    stack: ["C", "Make", "Linux"],
    accent: "#8fb3ff",
    links: {
      repo: "https://github.com/CPoooo/ostep",
    },
    highlights: ["Process API, scheduling and virtual memory exercises"],
  },
  {
    slug: "cli-todo",
    title: "CLI Todo",
    tagline: "A command-line todo manager in Rust.",
    summary: "Add, list and delete todos from the terminal. A small exercise in Rust ownership and structs.",
    year: "2025",
    status: "Archived",
    category: "Systems",
    role: "Engineering",
    stack: ["Rust"],
    accent: "#c9a46b",
    links: {
      repo: "https://github.com/CPoooo/cli_todo_app",
    },
    highlights: ["Argument parsing and persistent storage"],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export const categories = Array.from(new Set(projects.map((p) => p.category)))
