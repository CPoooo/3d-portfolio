# 3d-portfolio

Personal portfolio of Cameron Pool. Built with Next.js 16, Tailwind CSS 4, shadcn/ui (Base UI), React Three Fiber and Motion.

A single WebGL scene sits behind the whole site. It moves between sections and takes on each project's accent color as you scroll through the work.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it yours

Everything personal lives in `src/content/`. You shouldn't need to touch any components.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, headline, availability, roles you're targeting, email, résumé, portrait, socials, about, "now", education, certifications |
| `projects.ts` | Every project: copy, stack, links, accent color, cover, gallery, case-study sections |
| `experience.ts` | Jobs, most recent first |
| `skills.ts` | Skill groups for the Stack section |

Empty strings and empty arrays are hidden, so you can fill things in gradually.

### Résumé, email, portrait

- Put your résumé at `public/resume.pdf`, then set `resume: "/resume.pdf"` in `site.ts`.
- Set `email` to show the email and copy buttons.
- Put a photo at `public/portrait.jpg`, then set `portrait: "/portrait.jpg"`.
- Set `location` and `timezone` (for example `"America/Chicago"`) to show where you are and your local time.
- Set `NEXT_PUBLIC_SITE_URL` in your host's environment once the site is deployed. Social cards and the sitemap use it.

### Project images

Put images in `public/projects/<slug>/`. Then, in `projects.ts`:

```ts
cover: "/projects/rabbit-holes/cover.png",          // shown in the browser frame; 16:10 works best
gallery: [
  { src: "/projects/rabbit-holes/feed.png", alt: "Home feed", caption: "Infinite-scroll feed" },
],
links: { live: "…", repo: "…", video: "…" },
```

Without a `cover`, the site draws one in the project's `accent` color.

### Adding a project

Copy an entry in `projects.ts` and give it a unique `slug`. Set `featured: true` to add it to the stacked showcase on the home page. Every project also appears in the filterable gallery, the `/projects` index, the ⌘K menu and the sitemap, and gets its own case-study page at `/projects/<slug>`. `problem`, `approach`, `outcome` and `metrics` show up on that page when you fill them in.

## Structure

```
src/
  app/                  routes, metadata, OG image, sitemap, robots
  components/
    site/               page sections and shared pieces
    three/              WebGL scene, shaders, scene director
    ui/                 shadcn/ui components
  content/              your data
```

## Notes

- The 3D scene loads only on the client, after a WebGL check. Without WebGL you get a static gradient.
- `prefers-reduced-motion` turns off smooth scrolling, entrance animations and pointer tilt, and slows the scene down.
- Press ⌘K (Ctrl K) anywhere to search projects and sections.
