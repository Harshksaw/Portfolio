import { lazy, Suspense } from "react";
import { resume } from "../data/resume";
import CopyEmailButton from "./CopyEmailButton";
import { ArrowRightIcon, FileTextIcon, GitHubIcon, LinkedInIcon } from "./Icons";
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
          <div className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            <span>{resume.basics.location} · Open to SWE &amp; AI Systems</span>
          </div>

          <p className="landing-greeting">Hello! I&apos;m</p>
          <h1 id="hero-heading" className="landing-name" tabIndex={-1}>
            HARSH <span>SAW</span>
          </h1>

          <p className="landing-pitch">
            I build AI products that do real work — agentic assistants, RAG-powered
            search, and the backend and cloud systems that keep them fast and
            reliable in production.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <span>Explore Work</span>
              <ArrowRightIcon />
            </a>
            <a
              href="/resume"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <FileTextIcon />
              <span>View Résumé</span>
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

        <div className="landing-info">
          <p className="landing-info-kicker">Full-Stack &amp;</p>
          <div className="landing-role-rotator">
            <span className="role-primary">AI Systems Engineer</span>
            <span className="role-secondary" aria-hidden="true">
              Cloud &amp; DevOps
            </span>
          </div>

          <div className="landing-proof" aria-label="Key production metrics">
            <div className="proof-pill">
              <strong>1,500+</strong>
              <span>staff rely on my platform daily</span>
            </div>
            <div className="proof-pill">
              <strong>60%</strong>
              <span>lower LLM cost with self-hosted models</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
