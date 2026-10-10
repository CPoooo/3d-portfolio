import type { MetadataRoute } from "next"

import { site } from "@/content/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d14",
    theme_color: "#0b0d14",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  }
}
