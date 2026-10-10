> **2 Contributors!** Finally got a contributor on my open source software... Claude or not, I'll take it.

# 3d-portfolio

The portfolio of **Cameron Pool**, a full-stack software engineer. Built with Next.js 16, Tailwind CSS 4, shadcn/ui, React Three Fiber and Motion.

[LinkedIn](https://www.linkedin.com/in/cameron-pool-9b1a6b313/) · [GitHub](https://github.com/CPoooo) · [cameronpool2019@gmail.com](mailto:cameronpool2019@gmail.com) · [Résumé (PDF)](public/Cameron-Pool-Resume.pdf)

## Off the record

I got into software convinced I'd be a great game developer, like every young nerd does. These days I specialize in full-stack, with a quiet yearning to go embedded someday. Rust hypeboy.

Side quest: using AI to work out optimal pitching mechanics and training. Maybe one day we see 110+ mph off the mound.

Also a competitive programmer wannabe. Hand me a hard problem and a timer.

Not a recruiter? If you're building something open source or have something interesting to show me, reach out.

## Résumé

**Software Engineer, Knowledge Based Systems, Inc. (KBSI)** · Feb 2025 – Present
- Full-stack apps and Python AI backends, mostly on SBIR-funded R&D contracts
- Frontends in Next.js/React and Vue, with TypeScript and Express services
- RAG backends in Flask and FastAPI over Neo4j and PostgreSQL
- MCP servers, local LLMs with Ollama, everything in Docker

**Projects**
- [Rabbit Holes](https://github.com/CPoooo/simple-blog-app): social blogging platform with OAuth, feeds, uploads and 14 Playwright E2E suites
- [Typesafe Todo API](https://github.com/CPoooo/typesafe-todo-api): strictly typed REST API with Express, Drizzle and Zod, and 48 integration tests
- [Axum Todo API](https://github.com/CPoooo/todo-axum-api): REST API in Rust with Axum and Tokio

**Stack:** TypeScript, Python, Rust, SQL · React, Next.js, Vue · Node.js, Express, FastAPI, Flask · PostgreSQL, Neo4j · RAG, MCP, Ollama · Docker, Playwright, Vitest

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing

All content lives in `src/content/`, so you shouldn't need to touch any components.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, headline, availability, target roles, email, résumé, socials, about, the "off the record" aside, "now" |
| `projects.ts` | Projects: copy, stack, links, accent color, cover, gallery, case-study sections |
| `experience.ts` | Jobs, most recent first |
| `skills.ts` | Skill groups for the Stack section |

Empty strings and empty arrays are hidden.

- **Résumé:** replace `public/Cameron-Pool-Resume.pdf`, keeping the same filename.
- **Project images:** put them in `public/projects/<slug>/`, then set `cover` and `gallery` in `projects.ts`. Without a cover, the site draws one in the project's accent color.
- **New project:** copy an entry in `projects.ts` and give it a unique `slug`. Add `featured: true` to put it in the home page showcase. Each project gets its own page at `/projects/<slug>`.
- **Deploying:** set `NEXT_PUBLIC_SITE_URL` to the live URL. Social cards and the sitemap use it.

## Notes

- A single WebGL scene sits behind the whole site. It moves between sections and takes on each project's accent color as you scroll.
- Without WebGL you get a static gradient. With `prefers-reduced-motion`, animations and smooth scrolling are turned off.
- Press ⌘K (Ctrl K) to search projects and sections.
