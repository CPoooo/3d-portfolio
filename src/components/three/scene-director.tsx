"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { sceneStore, type SceneMode } from "./scene-store"

/**
 * Watches every element with a `data-scene` attribute. Whichever one crosses the
 * middle of the viewport (the deepest, if nested) sets the scene's mode and accent.
 *
 *   <section data-scene="work">
 *     <article data-scene="work" data-accent="#e8915a">…</article>
 *   </section>
 */
export function SceneDirector() {
  const pathname = usePathname()

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"))
    if (!nodes.length) return
    const active = new Set<HTMLElement>()

    const apply = () => {
      const deepest = Array.from(active).sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      )[active.size - 1]
      if (!deepest) return
      sceneStore.mode = (deepest.dataset.scene as SceneMode) ?? "section"
      sceneStore.accent = deepest.dataset.accent ?? null
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement
          if (e.isIntersecting) active.add(el)
          else active.delete(el)
        }
        apply()
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [pathname])

  return null
}
