"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import ThemeToggle from "./ThemeToggle"
import { AnimatePresence, motion } from "framer-motion"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/shubiq-studio", label: "Studio" },
  { href: "/shubiq-labs", label: "Labs" },
  { href: "/blog", label: "Blog" },
  { href: "/founder", label: "Founder" },
]

export default function UnifiedNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-navbar fixed top-0 left-0 right-0 z-[9999] border-b border-border bg-background/95 backdrop-blur-md transition-colors duration-300 dark:border-border dark:bg-background/90">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Image
            src="/nexgravision-logo.png"
            alt="NexGravision"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="site-navbar-title font-poppins text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent hidden sm:inline">
            NexGravision
          </span>
        </Link>

        <nav className="site-navbar-nav hidden lg:flex items-center gap-8">
          {LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav-link font-inter text-sm font-medium transition-colors duration-200 ${
                  active ? "text-accent" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="site-menu-btn lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-muted/20"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
          <Link
            href="/#contact"
            className="site-nav-cta hidden lg:inline-flex items-center rounded-lg bg-accent px-6 py-2.5 font-poppins text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent-light hover:shadow-lg"
            onClick={() => setMenuOpen(false)}
          >
            Start Project
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-surface/95 backdrop-blur-md px-4 py-4"
          >
            <nav className="grid grid-cols-2 gap-3 mb-4">
              {LINKS.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg border px-4 py-2.5 text-center font-inter text-sm font-medium transition-colors ${
                      active
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-poppins text-sm font-semibold text-foreground transition-all hover:bg-accent-light hover:shadow-md"
            >
              Start Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

