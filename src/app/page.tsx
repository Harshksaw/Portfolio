import Navbar from "../components/common/navbar";
import ExperienceSection from "../components/shared/experience-section";
import Projects from "../components/sections/projects";
import TechArsenal from "../components/sections/tech-arsenal";
import Hero from "../components/sections/hero";
import Cta from "../components/sections/cta";
import IntroSection from "../components/sections/intro-section";
import InitialLoader from "../components/shared/InitialLoader";

export default function Home() {
  return (
    <InitialLoader>
      <Navbar />

      {/* Hero Section */}
      <header
        className="relative h-svh min-h-svh max-h-svh w-full overflow-hidden gpu-accelerated"
        role="banner"
      >
        <IntroSection />
        <Hero />
      </header>

      {/* Main Content */}
      <main
        className="md:pt-12 px-4 md:px-14 overflow-hidden pb-8 h-full bg-primary-darkest w-full space-y-32 md:space-y-48 z-100 relative"
        role="main"
      >
        {/* Subtle animated gradient background */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-violet/10 rounded-full blur-[150px] animate-ambient-pulse pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-main/10 rounded-full blur-[150px] animate-ambient-pulse pointer-events-none"
          style={{ animationDelay: '2s' }}
          aria-hidden="true"
        />

        {/* Projects Section */}
        <section
          id="projects"
          className="bg-transparent h-full w-full flex flex-col justify-end rounded-[32px] relative mb-0 z-10"
          aria-labelledby="projects-heading"
        >
          <h2
            id="projects-heading"
            className="text-3xl md:text-6xl block tracking-[0.12em] md:tracking-[0.2em] font-bold text-white"
          >
            Featured Projects
          </h2>
          <Projects />
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="bg-transparent h-full w-full flex flex-col justify-end rounded-[32px] relative z-10"
          aria-labelledby="experience-heading"
        >
          <h2
            id="experience-heading"
            className="text-3xl md:text-6xl block leading-32 mb-12 md:mb-0 md:leading-48 tracking-[0.12em] md:tracking-[0.2em] font-bold text-white"
          >
            Work Experience
          </h2>
          <ExperienceSection />
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="flex bg-transparent h-full w-full flex-col justify-end rounded-[32px] relative z-10"
          aria-labelledby="skills-heading"
        >
          <h2
            id="skills-heading"
            className="text-3xl md:text-6xl block leading-32 mt-8 md:mt-0 md:leading-48 tracking-[0.12em] md:tracking-[0.2em] font-bold text-white"
          >
            Tech Arsenal
          </h2>
          <TechArsenal />
        </section>

        {/* CTA Section */}
        <Cta />
      </main>
    </InitialLoader>
  )
}
