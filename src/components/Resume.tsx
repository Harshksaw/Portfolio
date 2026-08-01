import "./styles/Resume.css";
import { resume } from "../data/resume";

const Resume = () => {
  const { basics, education, experience, projects, skills, achievements } =
    resume;
  const printableExperience = experience.filter((e) => !e.websiteOnly);

  return (
    <div className="resume-page">
      <div className="resume-actions">
        <button
          type="button"
          className="resume-btn"
          onClick={() => window.print()}
        >
          Print / Save as PDF
        </button>
        <a className="resume-btn resume-btn-ghost" href="/">
          ← Back to site
        </a>
      </div>

      <article className="resume-sheet">
        <header className="resume-header">
          <h1>{basics.name}</h1>
          <p className="resume-title">{basics.title}</p>
          <p className="resume-contact">
            <span>{basics.location}</span>
            <span aria-hidden="true">·</span>
            <a href={`tel:${basics.phone.replace(/\s/g, "")}`}>{basics.phone}</a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${basics.email}`}>{basics.email}</a>
            {basics.links.map((link) => (
              <span key={link.url} className="resume-contact-link">
                <span aria-hidden="true">·</span>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </header>

        <section className="resume-section">
          <h2>Summary</h2>
          <p>{basics.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          {printableExperience.map((entry) => (
            <div
              className="resume-entry"
              key={`${entry.company}-${entry.role}`}
            >
              <div className="resume-entry-head">
                <h3>
                  {entry.role} —{" "}
                  {entry.companyUrl ? (
                    <a href={entry.companyUrl} target="_blank" rel="noreferrer">
                      {entry.company}
                    </a>
                  ) : (
                    entry.company
                  )}
                </h3>
                <span className="resume-entry-meta">
                  {entry.location} · {entry.date}
                </span>
              </div>
              <ul>
                {entry.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          {education.map((edu) => (
            <div className="resume-entry" key={edu.degree}>
              <div className="resume-entry-head">
                <h3>{edu.degree}</h3>
                <span className="resume-entry-meta">{edu.date}</span>
              </div>
              <p className="resume-subtle">{edu.school}</p>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          {projects.map((project) => (
            <div className="resume-entry" key={project.name}>
              <div className="resume-entry-head">
                <h3>{project.name}</h3>
                <span className="resume-entry-meta">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                  {project.liveUrl && project.repoUrl && " · "}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                </span>
              </div>
              <p className="resume-stack">{project.stack}</p>
              <ul>
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <ul className="resume-skills">
            {skills.map((group) => (
              <li key={group.category}>
                <strong>{group.category}:</strong> {group.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h2>Achievements</h2>
          <ul>
            {achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default Resume;
