"use client"

import { useCallback, useState } from "react"

/** Copies text to the clipboard and reports `copied` for a moment afterwards. */
export function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } catch {
        window.location.href = `mailto:${text}`
      }
    },
    [timeout]
  )
  return { copied, copy }
}
