import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import SmoothScroll from "./components/SmoothScroll"
import ThemeInit from "./components/ThemeInit"
import LayoutShell from "./components/LayoutShell"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ScrollProgress"
import BackToTop from "./components/BackToTop"
import LoadingScreen from "./components/LoadingScreen"
import CustomCursor from "./components/CustomCursor"
import MobileNav from "./components/MobileNav"
import AnimationGate from "./components/AnimationGate"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"], display: "swap" })
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://NexGravision.com"),
  title: {
    default: "NexGravision",
    template: "%s | NexGravision",
  },
  description:
    "NexGravision builds high-performance web platforms, productivity apps, and intelligent systems.",
  keywords: ["web development", "AI integration", "NexGravision", "Next.js", "premium web design"],
  authors: [{ name: "Shubham", url: "https://NexGravision.com/founder" }],
  creator: "Shubham",
  alternates: {
    canonical: "https://NexGravision.com",
  },
  icons: {
    icon: [{ url: "/nexgravision-logo.png", type: "image/png", sizes: "any" }],
    apple: [{ url: "/nexgravision-logo.png", type: "image/png", sizes: "any" }],
    shortcut: ["/nexgravision-logo.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://NexGravision.com",
    siteName: "NexGravision",
    title: "NexGravision",
    description:
      "High-performance web platforms, AI systems, and productivity apps.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexGravision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGravision",
    description: "High-performance web platforms, AI systems, and productivity apps.",
    creator: "@neuralshubh",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} bg-background text-foreground transition-colors duration-300`}>
        <ThemeInit />
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <AnimationGate>
            <LayoutShell>
              {children}
            </LayoutShell>
          </AnimationGate>
        </SmoothScroll>
        <MobileNav />
        <BackToTop />
        <Footer />
      </body>
    </html>
  )
}

