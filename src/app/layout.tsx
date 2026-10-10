import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import { CommandMenu } from "@/components/site/command-menu"
import { Nav } from "@/components/site/nav"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { SceneBackground } from "@/components/three/scene-background"
import { SceneDirector } from "@/components/three/scene-director"
import { site } from "@/content/site"
import { socialLinks } from "@/lib/links"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
})

const description = `${site.name}, ${site.role.toLowerCase()}. ${site.headline} ${site.subline}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description },
}

export const viewport: Viewport = {
  themeColor: "#0b0d14",
  colorScheme: "dark",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  ...(site.email && { email: `mailto:${site.email}` }),
  sameAs: socialLinks.map((l) => l.href),
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body id="top" className="grain min-h-svh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SceneBackground />
          <SceneDirector />
          <Nav />
          <main id="main">{children}</main>
          <CommandMenu />
        </SmoothScroll>
      </body>
    </html>
  )
}
