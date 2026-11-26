import { resume } from "../data/resume";
import CopyEmailButton from "./CopyEmailButton";
import { ArrowRightIcon, FileTextIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import "./styles/Landing.css";

const IMPACT_METRICS = [
  {
    value: "1,500+",
    label: "Daily staff & instructors on OC LMS migration platform",
  },
  {
    value: "-60%",
    label: "LLM inference cost via self-hosted Qwen3-4B QLoRA",
  },
  {
    value: "30s → 1.5s",
    label: "Video seek latency via FFmpeg HLS & CloudFront",
  },
  {
    value: "30K+",
    label: "Users orchestrated via Kafka & BullMQ marketing engine",
  },
];

const Landing = () => {
  const githubUrl =
    resume.basics.links.find((l) => l.label === "GitHub")?.url ??
    "https://github.com/Harshksaw";
  const linkedinUrl =
    resume.basics.links.find((l) => l.label === "LinkedIn")?.url ??
    "https://www.linkedin.com/in/harsh-kumar-s-32727b247/";

  return (
    <section className="hero-section section-wrap" id="top" aria-labelledby="hero-heading">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            <span>{resume.basics.location} · Open to SWE &amp; AI Systems roles</span>
          </div>

          <h1 id="hero-heading" className="hero-title" tabIndex={-1}>
            Harsh Saw
            <span className="hero-role">Full-Stack &amp; AI Systems Engineer</span>
          </h1>

          <p className="hero-pitch">
            Building production RAG pipelines, Go/Node microservices, and cloud
            infrastructure — from institution-wide agentic platforms to low-latency
            inference and distributed systems.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <span>View Featured Work</span>
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

        <aside className="hero-snapshot" aria-label="Engineering impact snapshot">
          <div className="snapshot-head">
            <span className="snapshot-title">Production Impact</span>
            <span className="snapshot-tag">Verified in production</span>
          </div>

          <div className="snapshot-metrics">
            {IMPACT_METRICS.map((item) => (
              <div className="metric-card" key={item.value}>
                <div className="metric-value">{item.value}</div>
                <p className="metric-label">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="snapshot-foot">
            <span className="snapshot-foot-k">Currently</span>
            <span className="snapshot-foot-v">
              OC Connect (Azure AI Foundry RAG) &amp; Ommuse (Go gRPC · Bedrock)
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Landing;
