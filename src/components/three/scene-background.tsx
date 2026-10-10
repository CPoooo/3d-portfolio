"use client"

import dynamic from "next/dynamic"
import { useSyncExternalStore } from "react"

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false })

let webgl: boolean | undefined

function hasWebGL() {
  if (webgl !== undefined) return webgl
  try {
    const canvas = document.createElement("canvas")
    webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
  } catch {
    webgl = false
  }
  return webgl
}

/** Fixed, full-viewport WebGL layer that sits behind the whole page. */
export function SceneBackground() {
  const supported = useSyncExternalStore(
    () => () => {},
    hasWebGL,
    () => false
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Static fallback and loading state */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_45%,oklch(0.79_0.145_58/0.14),transparent_70%)]" />
      {supported && <HeroScene />}
      {/* Vignette keeps text crisp at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_40%,var(--ink)_100%)]" />
    </div>
  )
}
