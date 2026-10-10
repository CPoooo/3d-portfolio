"use client"

// three.js objects are mutated every frame inside useFrame, and particle layouts are
// seeded with Math.random once per mount. Both are idiomatic R3F, so the compiler
// purity rules are turned off for this file only.
/* eslint-disable react-hooks/immutability, react-hooks/purity */

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { sceneStore, type SceneMode } from "./scene-store"
import {
  coreFragment,
  coreVertex,
  haloFragment,
  haloVertex,
  particlesFragment,
  particlesVertex,
} from "./shaders"

const PALETTE = {
  deep: "#14131f",
  ember: "#f0a060",
  iris: "#9b86f2",
  rim: "#9fdcef",
  bone: "#f3eee4",
}

const damp = THREE.MathUtils.damp
const clamp = THREE.MathUtils.clamp

function useReducedMotion() {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  )
}

function Core({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const size = useThree((s) => s.size)
  const detail = size.width < 768 ? 28 : 52

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0 },
      uFreq: { value: 0.85 },
      uDeep: { value: new THREE.Color(PALETTE.deep) },
      uEmber: { value: new THREE.Color(PALETTE.ember) },
      uIris: { value: new THREE.Color(PALETTE.iris) },
      uRim: { value: new THREE.Color(PALETTE.rim) },
      uAccent: { value: new THREE.Color(PALETTE.ember) },
      uAccentMix: { value: 0 },
    }),
    []
  )
  const tint = useMemo(() => new THREE.Color(), [])

  useFrame((state, delta) => {
    const u = uniforms
    const speed = reduced ? 0.15 : 1
    u.uTime.value += delta * speed

    // Materialize on load, then breathe.
    const t = state.clock.elapsedTime
    const intro = clamp(t / 2.2, 0, 1)
    const settle = 0.22 + Math.sin(t * 0.4) * 0.03
    sceneStore.pulse = damp(sceneStore.pulse, 0, 1.6, delta)
    const target = (intro < 1 ? 0.5 * (1 - intro) + settle : settle) + sceneStore.pulse * 0.28
    u.uAmp.value = damp(u.uAmp.value, target, 2.5, delta)

    if (sceneStore.accent) {
      tint.set(sceneStore.accent)
      u.uAccent.value.lerp(tint, 1 - Math.exp(-3 * delta))
      u.uAccentMix.value = damp(u.uAccentMix.value, 1, 2, delta)
    } else {
      u.uAccentMix.value = damp(u.uAccentMix.value, 0, 2, delta)
    }

    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.08 * speed
      mesh.current.rotation.x += delta * 0.03 * speed
      const s = damp(mesh.current.scale.x, intro, 3, delta)
      mesh.current.scale.setScalar(s)
    }
  })

  return (
    <mesh ref={mesh} scale={0.001}>
      <icosahedronGeometry args={[1.25, detail]} />
      <shaderMaterial
        vertexShader={coreVertex}
        fragmentShader={coreFragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function Halo() {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(PALETTE.ember) },
      uIntensity: { value: 0.22 },
    }),
    []
  )
  const target = useMemo(() => new THREE.Color(), [])
  useFrame((_, delta) => {
    target.set(sceneStore.accent ?? PALETTE.ember)
    uniforms.uColor.value.lerp(target, 1 - Math.exp(-2 * delta))
  })
  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[9, 9]} />
      <shaderMaterial
        vertexShader={haloVertex}
        fragmentShader={haloFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function Orbit({
  radius,
  tilt,
  speed,
  phase,
}: {
  radius: number
  tilt: [number, number, number]
  speed: number
  phase: number
}) {
  const moon = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => {
    const pts = new THREE.EllipseCurve(0, 0, radius, radius).getPoints(256)
    return new THREE.BufferGeometry().setFromPoints(
      pts.map((p) => new THREE.Vector3(p.x, p.y, 0))
    )
  }, [radius])

  useFrame((state) => {
    const a = state.clock.elapsedTime * speed + phase
    moon.current?.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0)
  })

  return (
    <group rotation={tilt}>
      <lineLoop geometry={geometry}>
        <lineBasicMaterial color={PALETTE.bone} transparent opacity={0.12} />
      </lineLoop>
      <mesh ref={moon}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={PALETTE.bone} />
      </mesh>
    </group>
  )
}

function Particles({ count }: { count: number }) {
  const dpr = useThree((s) => s.viewport.dpr)
  const { positions, scales, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const speeds = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const palette = [PALETTE.bone, PALETTE.bone, PALETTE.bone, PALETTE.ember, PALETTE.rim].map(
      (c) => new THREE.Color(c)
    )
    for (let i = 0; i < count; i++) {
      // Two populations: a flattened disc around the core, and a sparse far field.
      const disc = i < count * 0.6
      const r = disc ? 2.2 + Math.pow(Math.random(), 1.5) * 3.2 : 4 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = disc ? Math.PI / 2 + (Math.random() - 0.5) * 0.35 : Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      scales[i] = 0.4 + Math.random() * 1.6
      speeds[i] = (disc ? 1 : 0.25) * (0.4 + Math.random())
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors.set([c.r, c.g, c.b], i * 3)
    }
    return { positions, scales, speeds, colors }
  }, [count])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: 1 } }),
    []
  )
  useFrame((_, delta) => {
    uniforms.uTime.value += delta
    uniforms.uPixelRatio.value = dpr
  })

  return (
    <points rotation={[0.35, 0, 0.12]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particlesVertex}
        fragmentShader={particlesFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

type Pose = { x: number; y: number; scale: number; opacity: number }

/** Where the composition rests for each scene mode. */
const POSES: Record<SceneMode, { desktop: Pose; mobile: Pose }> = {
  hero: {
    desktop: { x: 1.75, y: 0, scale: 1, opacity: 1 },
    mobile: { x: 0, y: 0.75, scale: 0.78, opacity: 0.9 },
  },
  work: {
    desktop: { x: 3.1, y: -0.2, scale: 0.9, opacity: 0.55 },
    mobile: { x: 0, y: 0.4, scale: 0.7, opacity: 0.35 },
  },
  section: {
    desktop: { x: 2.9, y: 0.1, scale: 0.75, opacity: 0.4 },
    mobile: { x: 0, y: 0.4, scale: 0.7, opacity: 0.25 },
  },
  contact: {
    desktop: { x: 0, y: 0, scale: 1.3, opacity: 0.5 },
    mobile: { x: 0, y: 0, scale: 0.95, opacity: 0.4 },
  },
  detail: {
    desktop: { x: 2.7, y: 0.9, scale: 0.7, opacity: 0.6 },
    mobile: { x: 0, y: 1.1, scale: 0.6, opacity: 0.35 },
  },
}

/** Glides the whole composition between poses and tilts it toward the pointer. */
function Rig({
  children,
  reduced,
  wrapper,
}: {
  children: React.ReactNode
  reduced: boolean
  wrapper: React.RefObject<HTMLDivElement | null>
}) {
  const group = useRef<THREE.Group>(null)
  const opacity = useRef(0)
  const size = useThree((s) => s.size)

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const pose = POSES[sceneStore.mode][size.width >= 1024 ? "desktop" : "mobile"]
    const lambda = reduced ? 8 : 2.2

    g.position.x = damp(g.position.x, pose.x, lambda, delta)
    g.position.y = damp(g.position.y, pose.y, lambda, delta)
    g.scale.setScalar(damp(g.scale.x, pose.scale, lambda, delta))

    // Slow drift with scroll so the scene never feels pinned to the glass.
    const drift = (window.scrollY / Math.max(window.innerHeight, 1)) * 0.12
    const px = reduced ? 0 : sceneStore.pointer.x
    const py = reduced ? 0 : sceneStore.pointer.y
    g.rotation.y = damp(g.rotation.y, px * 0.35 + drift, 2.5, delta)
    g.rotation.x = damp(g.rotation.x, -py * 0.25 + drift * 0.3, 2.5, delta)

    opacity.current = damp(opacity.current, pose.opacity, 2, delta)
    if (wrapper.current) wrapper.current.style.opacity = opacity.current.toFixed(3)
  })

  return <group ref={group}>{children}</group>
}

export default function HeroScene() {
  const reduced = useReducedMotion()
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      sceneStore.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      sceneStore.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0" style={{ opacity: 0 }}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Rig reduced={reduced} wrapper={wrapper}>
          <Halo />
          <Core reduced={reduced} />
          <Orbit radius={2.05} tilt={[1.2, 0.2, 0]} speed={0.35} phase={0} />
          <Orbit radius={2.6} tilt={[1.45, -0.5, 0.3]} speed={-0.22} phase={2} />
          <Particles count={2400} />
        </Rig>
      </Canvas>
    </div>
  )
}
