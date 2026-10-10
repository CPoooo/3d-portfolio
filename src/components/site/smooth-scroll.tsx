"use client"

import { ReactLenis } from "lenis/react"

import { useMediaQuery } from "@/hooks/use-media-query"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
  if (reduced) return <>{children}</>
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -72 } }}>
      {children}
    </ReactLenis>
  )
}
