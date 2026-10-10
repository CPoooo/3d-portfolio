/**
 * Everything personal lives here. Edit freely.
 * Anything left as an empty string is hidden in the UI.
 */
export const site = {
  name: "Cameron Pool",
  initials: "CP",
  role: "Software Engineer",
  /** Shown under the name in the hero. Keep it to one line. */
  headline: "I design and build full-stack applications.",
  /** Part of the headline set in the accent serif. Must appear in `headline`. */
  headlineAccent: "full-stack applications.",
  /** Short supporting line under the headline. */
  subline:
    "TypeScript, Next.js and Python AI backends. Schema to interface, shipped to production.",

  /** Leave empty to hide. */
  location: "",
  /** IANA zone, e.g. "America/Chicago". Shows your local time. Leave empty to hide. */
  timezone: "",
  remote: "Open to remote, hybrid or on-site",

  availability: {
    open: true,
    label: "Open to full-time roles",
  },

  /** The roles you are targeting. Shown in the recruiter snapshot. */
  seeking: ["Full-stack Engineer", "Frontend Engineer", "Backend Engineer"],

  /** The handful of technologies you most want a recruiter to see. */
  coreStack: ["TypeScript", "React", "Next.js", "Python", "PostgreSQL", "Neo4j"],

  /** Public contact email. Leave empty to hide the email buttons. */
  email: "",
  /** Drop your résumé at /public/resume.pdf and set this to "/resume.pdf". Empty hides every résumé button. */
  resume: "",
  /** Drop a portrait at /public/portrait.jpg and set this to "/portrait.jpg" */
  portrait: "",

  /** Your deployed URL. Used for SEO and social cards. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://3d-portfolio.vercel.app",

  /** Source code for this site. Shown in the footer. */
  source: "https://github.com/CPoooo/3d-portfolio",

  socials: {
    github: "https://github.com/CPoooo",
    linkedin: "",
    x: "",
  },

  about: [
    "I build software end to end: data models, APIs, auth, and interfaces people enjoy using.",
    "Most of my work lives in TypeScript and Next.js. On the side I go deep on Rust, operating systems and interpreters, because understanding the layer below makes the layer above better.",
  ],

  /** What you are focused on right now. */
  now: [
    "Shipping Rabbit Holes, a social blogging platform",
    "Working through Crafting Interpreters in Rust",
    "Reading OSTEP and writing the exercises in C",
  ],

  education: [
    // { school: "University", degree: "B.S. Computer Science", year: "2025" },
  ] as { school: string; degree: string; year: string }[],

  certifications: [
    // { name: "AWS Certified Developer", issuer: "Amazon", year: "2026", href: "" },
  ] as { name: string; issuer: string; year: string; href?: string }[],
}

export type Site = typeof site
