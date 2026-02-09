import Navbar from "../components/common/navbar";
import ExperienceSection from "../components/shared/experience-section";
import Projects from "../components/sections/projects";
import TechArsenal from "../components/sections/tech-arsenal";
import Hero from "../components/sections/hero";
import Cta from "../components/sections/cta";
import IntroSection from "../components/sections/intro-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-svh min-h-svh max-h-svh w-full overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <IntroSection />
        <Hero />
      </div>

      <div className="md:pt-12 px-4 md:px-14 overflow-hidden pb-8 h-full bg-primary-darkest w-full space-y-32 md:space-y-48 z-100 relative">
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-violet/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-main/10 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
        {/* Projects */}
        <section
          className="bg-transparent h-full w-full flex flex-col justify-end rounded-[32px] relative mb-0 z-10"
        >
          <h2 className="text-3xl md:text-6xl block  tracking-[0.12em] md:tracking-[0.2em]  font-bold text-white">Featured Projects</h2>
          <Projects />
        </section>

        {/* Careers */}
        <section
          className="bg-transparent h-full w-full flex flex-col justify-end rounded-[32px] relative z-10"
        >
          <h2 className="text-3xl md:text-6xl  block leading-32 mb-12 md:mb-0 md:leading-48  tracking-[0.12em] md:tracking-[0.2em] font-bold text-white">Work Experience</h2>
          <ExperienceSection />
        </section>

        {/* Skills  */}
        <section
          className="flex bg-transparent h-full w-full flex-col justify-end rounded-[32px] relative z-10"
        >
          <h2 className="text-3xl md:text-6xl  block leading-32 mt-8 md:mt-0 md:leading-48  tracking-[0.12em] md:tracking-[0.2em] font-bold text-white">Tech Arsenal</h2>
          <TechArsenal />
        </section>
        <Cta />

      </div>
    </>
  )
}