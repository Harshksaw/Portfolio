import { resume } from "../data/resume";
import CopyEmailButton from "./CopyEmailButton";
import { ArrowOutwardIcon, FileTextIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import "./styles/Contact.css";

const Contact = () => {
  const githubUrl =
    resume.basics.links.find((l) => l.label === "GitHub")?.url ??
    "https://github.com/Harshksaw";
  const linkedinUrl =
    resume.basics.links.find((l) => l.label === "LinkedIn")?.url ??
    "https://www.linkedin.com/in/harsh-kumar-s-32727b247/";

  return (
    <footer
      className="site-footer deferred-section"
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
    >
      <div className="section-wrap footer-inner">
        <div className="footer-cta-panel">
          <div className="footer-copy">
            <span className="section-eyebrow">Contact</span>
            <h2 id="contact-heading" className="section-title">
              Let&apos;s build something reliable.
            </h2>
            <p className="footer-lead">
              Open to Software Engineering, Full-Stack, and AI Systems roles.
              Reach out directly by email or review my printable résumé.
            </p>
          </div>

          <div className="footer-actions">
            <a
              id="footer-email-link"
              href={`mailto:${resume.basics.email}`}
              className="btn btn-primary"
            >
              <span>{resume.basics.email}</span>
              <ArrowOutwardIcon width={16} height={16} />
            </a>
            <CopyEmailButton
              email={resume.basics.email}
              targetId="footer-email-link"
            />
            <a
              href="/Harsh-Saw-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <FileTextIcon width={16} height={16} />
              <span>View / Print Résumé</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-credit">
            Designed &amp; engineered by <span>{resume.basics.name}</span> ·{" "}
            {resume.basics.location} · © {new Date().getFullYear()}
          </p>

          <div className="footer-socials">
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <GitHubIcon width={16} height={16} />
              <span>GitHub</span>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer">
              <LinkedInIcon width={16} height={16} />
              <span>LinkedIn</span>
            </a>
            <a href="/Harsh-Saw-Resume.pdf" target="_blank" rel="noreferrer">
              <FileTextIcon width={16} height={16} />
              <span>Résumé</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
