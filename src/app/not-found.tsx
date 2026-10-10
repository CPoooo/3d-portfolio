import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section data-scene="contact" className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">Nothing here.</h1>
      <p className="mt-4 text-muted-foreground">The page you&apos;re after doesn&apos;t exist or has moved.</p>
      <Link href="/" className={buttonVariants({ className: "mt-10 h-11 rounded-lg px-5" })}>
        Back home
      </Link>
    </section>
  )
}
