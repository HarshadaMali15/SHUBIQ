"use client"
import { useEffect } from "react"

export default function ThemeInit() {
  useEffect(() => {
    const root = document.documentElement

    // Initialize color theme
    const saved = localStorage.getItem("shubiq-theme")
    const migrated = saved === "cyan" ? "cobalt" : saved
    const valid = ["gold", "cobalt", "emerald", "violet", "crimson", "silver", "amber"]
    if (migrated && valid.includes(migrated)) {
      if (migrated === "gold") root.removeAttribute("data-theme")
      else root.setAttribute("data-theme", migrated)
    } else {
      root.removeAttribute("data-theme")
    }

    // Initialize display mode (light/dark)
    const savedMode = localStorage.getItem("shubiq-mode")
    const modeValid = ["light", "dark", "system"]
    let displayMode = (savedMode && modeValid.includes(savedMode) ? savedMode : "system") as string

    if (displayMode === "system") {
      root.classList.remove("light", "dark")
      root.removeAttribute("data-display-mode")
      // Apply system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark")
      } else {
        root.classList.add("light")
      }
    } else {
      root.classList.remove("light", "dark")
      root.classList.add(displayMode)
      root.setAttribute("data-display-mode", displayMode)
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      const currentMode = localStorage.getItem("shubiq-mode")
      if (currentMode === "system" || !currentMode) {
        root.classList.remove("light", "dark")
        root.classList.add(e.matches ? "dark" : "light")
      }
    }
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return null
}
