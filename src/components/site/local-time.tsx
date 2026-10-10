"use client"

import { useSyncExternalStore } from "react"

const noop = () => () => {}

function subscribeMinute(onChange: () => void) {
  const id = setInterval(onChange, 15_000)
  return () => clearInterval(id)
}

/** The current time in `timeZone`. Renders a placeholder on the server. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribeMinute,
    () => new Date().toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit" }),
    () => null
  )
  if (!time) return <span className="opacity-0">00:00</span>
  return <time>{time}</time>
}

export function CurrentYear() {
  return <>{useSyncExternalStore(noop, () => new Date().getFullYear(), () => null)}</>
}
