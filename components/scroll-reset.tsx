"use client"

import { useEffect } from "react"

export function ScrollReset() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual"
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [])

  return null
}
