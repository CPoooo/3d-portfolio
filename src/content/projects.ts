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
    slug: "undead-horizon",
    title: "Undead Horizon",
    tagline: "Infinite 2.5D zombie wave survival in Rust and WebAssembly.",
    summary:
      "A top-down survival game where endless waves of undead close in across a procedurally generated, infinite world. Written in Rust, compiled to WebAssembly and rendered on Canvas2D, with every sound synthesized live. Plays in the browser on desktop and mobile.",
    year: "2026",
    status: "Live",
    category: "Game",
    role: "Design, engineering",
    stack: ["Rust", "WebAssembly", "wasm-bindgen", "Canvas2D", "WebAudio", "Trunk", "GitHub Pages"],
    featured: true,
    accent: "#8fd16a",
    links: {
      live: "https://cpoooo.github.io/undead-horizon/",
      repo: "https://github.com/CPoooo/undead-horizon",
    },
    highlights: [
      "Fixed 120 Hz simulation with interpolated rendering, buffered dash input, hit-stop, screen shake and knockback",
      "Five zombie types plus a boss every 5 waves that telegraphs its charge attacks",
      "20 stackable upgrades and superpowers, three offered per level-up from weighted rolls",
      "Infinite world generated from a hash, so it costs no memory; perspective lift gives trees and rocks real parallax",
      "Every sound effect and the adaptive soundtrack synthesized in WebAudio, with positional stereo panning and no audio files",
      "Spatial hash grid for collisions, a local leaderboard, and touch controls with a virtual joystick and auto-aim",
    ],
    problem:
      "Build a game that feels good to play, with tight controls and real game feel, while running entirely in the browser from a single Rust codebase.",
    approach:
      "Rust compiled to WebAssembly via wasm-bindgen and web-sys, split into simulation, rendering, audio, upgrades and world generation modules. Built with Trunk and deployed to GitHub Pages by a CI workflow.",
    metrics: [
      { label: "Simulation", value: "120 Hz" },
      { label: "Upgrades", value: "20" },
      { label: "Audio files", value: "0" },
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
    slug: "tic-tac-toe-minimax",
    title: "Tic-Tac-Toe Minimax AI",
    tagline: "A tic-tac-toe opponent that searches every move and never loses.",
    summary:
      "A desktop tic-tac-toe game in Python and Pygame where you play X against an AI that runs minimax over the full game tree. The best you can do is a draw.",
    year: "2024",
    status: "Archived",
    category: "Game",
    role: "Engineering",
    stack: ["Python", "Pygame"],
    accent: "#b59cf0",
    links: {
      repo: "https://github.com/CPoooo/tic-tac-toe-minimax-ai-game",
    },
    highlights: [
      "Recursive minimax over the complete game tree, scoring wins, losses and draws",
      "Win, loss and draw detection with the board recolored to show the result",
      "Click to play, press R to reset",
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export const categories = Array.from(new Set(projects.map((p) => p.category)))
