import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-light": "rgb(var(--primary-light) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-light": "rgb(var(--accent-light) / <alpha-value>)",
        "accent-dark": "rgb(var(--accent-dark) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        
        /* Legacy colors */
        gold: "rgb(var(--gold-rgb) / <alpha-value>)",
        "gold-light": "rgb(var(--gold-light-rgb) / <alpha-value>)",
        "gold-dark": "rgb(var(--gold-dark-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        cream: "rgb(var(--cream-rgb) / <alpha-value>)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        
        /* Legacy fonts */
        cinzel: ["var(--font-poppins)", "sans-serif"],
        cormorant: ["var(--font-inter)", "sans-serif"],
        rajdhani: ["var(--font-inter)", "sans-serif"],
      },
      spacing: {
        "section-xs": "2rem",
        "section-sm": "3rem",
        "section-md": "4rem",
        "section-lg": "6rem",
        "section-xl": "8rem",
      },
    },
  },
  plugins: [],
}
export default config
