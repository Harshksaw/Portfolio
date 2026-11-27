import { lazy, Suspense } from "react";
import { resume } from "../data/resume";
import CopyEmailButton from "./CopyEmailButton";
import { ArrowRightIcon, FileTextIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import TerminalSession from "./TerminalSession";
import { useHero3DReady } from "./utils/useProgressive3D";
import "./styles/Landing.css";

const HeroScene = lazy(() => import("./Character/HeroScene"));

const Landing = () => {
  const hero3DReady = useHero3DReady();
  const githubUrl =
    resume.basics.links.find((l) => l.label === "GitHub")?.url ??
    "https://github.com/Harshksaw";
  const linkedinUrl =
    resume.basics.links.find((l) => l.label === "LinkedIn")?.url ??
    "https://www.linkedin.com/in/harsh-kumar-s-32727b247/";

  return (
    <section className="landing-section" id="top" aria-labelledby="hero-heading">
      <div className="hero-stage" aria-hidden="true">
        <div className="character-rim" />
        {hero3DReady && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="section-wrap landing-grid">
        <div className="landing-intro">
          <p className="hero-loc">
            {resume.basics.location} | Open to SWE &amp; AI Systems
          </p>
          <p className="section-cmd">
            <b>$</b> whoami
          </p>
          <h1 id="hero-heading" className="landing-name" tabIndex={-1}>
            {resume.basics.name}
          </h1>
          <p className="landing-role-line">{resume.basics.title}</p>

          <p className="landing-pitch">
            RAG agents, Go services, and cloud infrastructure built for production.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <span>Explore work</span>
              <ArrowRightIcon />
            </a>
            <a
              href="/Harsh-Saw-Resume.pdf"
              download="Harsh-Saw-Resume.pdf"
              className="btn btn-secondary"
            >
              <FileTextIcon />
              <span>Download résumé</span>
            </a>
          </div>

          <div className="hero-links">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <span id="hero-email-source" className="visually-hidden">
              {resume.basics.email}
            </span>
            <CopyEmailButton
              email={resume.basics.email}
              targetId="hero-email-source"
            />
          </div>
        </div>

        <div className="landing-terminal-col">
          <TerminalSession />
        </div>
      </div>
    </section>
  );
};

export default Landing;
