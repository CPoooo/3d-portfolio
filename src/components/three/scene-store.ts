/**
 * Tiny mutable store shared between the DOM and the WebGL scene.
 * Read every frame inside useFrame, so no React re-renders are involved.
 * Kept free of three.js imports so DOM components can use it cheaply.
 */
export type SceneMode = "hero" | "work" | "section" | "contact" | "detail"

export const sceneStore = {
  /** Hex color the core should tint toward, or null for the default palette. */
  accent: null as string | null,
  /** Where the composition sits. Driven by the [data-scene] element at the viewport center. */
  mode: "hero" as SceneMode,
  /** 0..1 impulse that ripples the core. Decays inside the scene. */
  pulse: 0,
  pointer: { x: 0, y: 0 },
}

export function setSceneAccent(hex: string | null) {
  sceneStore.accent = hex
}

export function pulseScene(amount = 1) {
  sceneStore.pulse = Math.max(sceneStore.pulse, amount)
}
