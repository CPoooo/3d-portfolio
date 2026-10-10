import { ImageResponse } from "next/og"

import { projects } from "@/content/projects"
import { site } from "@/content/site"

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  const live = projects.filter((p) => p.status === "Live").length
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0d14",
          backgroundImage:
            "radial-gradient(circle at 78% 45%, rgba(240,160,96,0.55), rgba(155,134,242,0.18) 22%, transparent 45%)",
          color: "#f3eee4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a9adbd" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#5fd4a0" }} />
          {site.availability.open ? site.availability.label : site.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -6, lineHeight: 0.95 }}>{site.name}</div>
          <div style={{ fontSize: 40, marginTop: 24, color: "#d8d4cc", maxWidth: 820 }}>{site.headline}</div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 22, color: "#a9adbd" }}>
          <span>{site.role}</span>
          <span>{projects.length} projects</span>
          <span>{live} live</span>
          <span>{site.coreStack.slice(0, 4).join(" · ")}</span>
        </div>
      </div>
    ),
    size
  )
}
