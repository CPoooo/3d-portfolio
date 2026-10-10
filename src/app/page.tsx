import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AboutSection } from "@/components/site/about-section"
import { AsideSection } from "@/components/site/aside-section"
import { ContactSection } from "@/components/site/contact-section"
import { ExperienceSection } from "@/components/site/experience-section"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/site/hero"
import { ProjectGallery } from "@/components/site/project-gallery"
import { SectionHeading } from "@/components/site/section-heading"
import { Snapshot } from "@/components/site/snapshot"
import { StackSection } from "@/components/site/stack-section"
import { WorkStack } from "@/components/site/work-stack"
import { featuredProjects, projects } from "@/content/projects"

export default function Home() {
  return (
    <>
      <Hero />
      <AsideSection />
      <Snapshot />

      <section id="work" data-scene="work" className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Things I've shipped"
            description="Production apps and services, built end to end. Each one has a full write-up."
          />
          <WorkStack projects={featuredProjects} />
        </div>
      </section>

      <section id="projects" data-scene="section" className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="02"
            eyebrow="All projects"
            title="Everything I've built"
            description="Full-stack apps, APIs, systems work and experiments. Filter by area."
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View as index
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </SectionHeading>
          <ProjectGallery projects={projects} />
        </div>
      </section>

      <ExperienceSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  )
}
