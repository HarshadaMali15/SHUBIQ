"use client"
import { useEffect, useRef, useState } from "react"
import { Sun, Moon } from "lucide-react"

export type ColorTheme = "gold" | "cobalt" | "emerald" | "violet" | "crimson" | "silver" | "amber"
export type DisplayMode = "light" | "dark" | "system"

export const STORAGE_KEY = "shubiq-theme"
export const MODE_STORAGE_KEY = "shubiq-mode"

export const COLOR_THEMES: { id: ColorTheme; label: string }[] = [
  { id: "gold", label: "Gold Accents" },
  { id: "cobalt", label: "Cobalt Blue" },
  { id: "emerald", label: "Emerald Green" },
  { id: "violet", label: "Violet Purple" },
  { id: "crimson", label: "Crimson Red" },
  { id: "silver", label: "Silver Gray" },
  { id: "amber", label: "Amber Orange" },
]

export function applyTheme(theme: ColorTheme, withTransition = false) {
  const root = document.documentElement
  if (withTransition) {
    root.classList.add("theme-transitioning")
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 520)
  }
  if (theme === "gold") root.removeAttribute("data-theme")
  else root.setAttribute("data-theme", theme)
}

export function applyDisplayMode(mode: DisplayMode) {
  const root = document.documentElement
  if (mode === "system") {
    root.classList.remove("light", "dark")
    root.removeAttribute("data-display-mode")
  } else {
    root.classList.remove("light", "dark")
    root.classList.add(mode)
    root.setAttribute("data-display-mode", mode)
  }
}

export default function ThemeToggle() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("gold")
  const [displayMode, setDisplayMode] = useState<DisplayMode>("system")
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const migrated = saved === "cyan" ? "cobalt" : saved
    const initial: ColorTheme = COLOR_THEMES.some((t) => t.id === migrated) ? (migrated as ColorTheme) : "gold"
    setColorTheme(initial)
    applyTheme(initial)

    const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as DisplayMode | null
    const initialMode: DisplayMode = savedMode || "system"
    setDisplayMode(initialMode)
    applyDisplayMode(initialMode)
  }, [])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const onThemeSync = () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      const migrated = saved === "cyan" ? "cobalt" : saved
      const next: ColorTheme = COLOR_THEMES.some((t) => t.id === migrated) ? (migrated as ColorTheme) : "gold"
      setColorTheme(next)
      applyTheme(next, true)

      const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as DisplayMode | null
      const nextMode: DisplayMode = savedMode || "system"
      setDisplayMode(nextMode)
      applyDisplayMode(nextMode)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onEsc)
    window.addEventListener("storage", onThemeSync)
    window.addEventListener("shubiq-theme-change", onThemeSync as EventListener)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onEsc)
      window.removeEventListener("storage", onThemeSync)
      window.removeEventListener("shubiq-theme-change", onThemeSync as EventListener)
    }
  }, [])

  const setThemeAndPersist = (next: ColorTheme) => {
    setColorTheme(next)
    applyTheme(next, true)
    localStorage.setItem(STORAGE_KEY, next)
    window.dispatchEvent(new Event("shubiq-theme-change"))
    setOpen(false)
  }

  const setModeAndPersist = (next: DisplayMode) => {
    setDisplayMode(next)
    applyDisplayMode(next)
    localStorage.setItem(MODE_STORAGE_KEY, next)
    window.dispatchEvent(new Event("shubiq-theme-change"))
  }

  const activeLabel = COLOR_THEMES.find((t) => t.id === colorTheme)?.label ?? "Colors"
  const colorSwatches: Record<ColorTheme, string[]> = {
    gold: ["rgb(196, 164, 88)", "rgb(8, 10, 14)", "rgb(233, 230, 222)"],
    cobalt: ["rgb(94, 154, 233)", "rgb(8, 10, 14)", "rgb(229, 236, 247)"],
    emerald: ["rgb(34, 180, 146)", "rgb(8, 10, 14)", "rgb(220, 235, 230)"],
    violet: ["rgb(145, 118, 228)", "rgb(8, 10, 14)", "rgb(232, 227, 246)"],
    crimson: ["rgb(203, 92, 102)", "rgb(8, 10, 14)", "rgb(240, 226, 227)"],
    silver: ["rgb(178, 190, 208)", "rgb(8, 10, 14)", "rgb(235, 239, 244)"],
    amber: ["rgb(224, 152, 79)", "rgb(8, 10, 14)", "rgb(241, 233, 218)"],
  }

  return (
    <div ref={wrapRef} className="theme-toggle-wrap relative flex items-center gap-2">
      {/* Display Mode Toggle */}
      <div className="flex items-center bg-surface border border-border rounded-lg p-1">
        <button
          onClick={() => setModeAndPersist("light")}
          className={`p-2 transition-colors rounded ${
            displayMode === "light"
              ? "bg-primary text-white"
              : "text-foreground hover:bg-muted/10"
          }`}
          aria-label="Light mode"
          title="Light Mode"
          type="button"
        >
          <Sun size={18} />
        </button>
        <button
          onClick={() => setModeAndPersist("dark")}
          className={`p-2 transition-colors rounded ${
            displayMode === "dark"
              ? "bg-primary text-white"
              : "text-foreground hover:bg-muted/10"
          }`}
          aria-label="Dark mode"
          title="Dark Mode"
          type="button"
        >
          <Moon size={18} />
        </button>
        <button
          onClick={() => setModeAndPersist("system")}
          className={`p-2 text-xs font-medium transition-colors rounded ${
            displayMode === "system"
              ? "bg-primary text-white"
              : "text-foreground hover:bg-muted/10"
          }`}
          aria-label="System mode"
          title="System Default"
          type="button"
        >
          Auto
        </button>
      </div>

      {/* Color Theme Toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center text-foreground p-2 rounded-lg transition-colors duration-200 hover:bg-surface hover:text-accent"
        aria-label="Open color theme selector"
        title={`Colors: ${activeLabel}`}
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9V3z" />
        </svg>
      </button>

      {open && (
        <div className="theme-toggle-menu absolute right-0 top-full mt-2 w-80 border border-border bg-surface backdrop-blur-md p-3 z-[1000] shadow-lg rounded-lg animate-fade-in">
          <div className="text-xs font-semibold text-muted mb-3 px-2">Color Themes</div>
          {COLOR_THEMES.map((t) => {
            const active = t.id === colorTheme
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeAndPersist(t.id)}
                className={`theme-toggle-option w-full text-left px-3 py-2.5 rounded-lg font-inter text-sm transition-all duration-200 flex items-center gap-3 ${
                  active
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-foreground hover:bg-surface-2 border border-transparent"
                }`}
              >
                <div className="flex -space-x-1">
                  {colorSwatches[t.id].map((color, index) => (
                    <span
                      key={`${t.id}-${index}`}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="flex-1 font-medium">{t.label}</span>
                {active && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
