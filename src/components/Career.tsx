import { resume } from "../data/resume";
import { ArrowOutwardIcon } from "./Icons";
import "./styles/Career.css";

const Career = () => {
  return (
    <section
      className="section-wrap section-block deferred-section"
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
    >
      <div className="section-head">
        <p className="section-cmd">
          <b>$</b> git log --career
        </p>
        <h2 id="experience-heading" className="section-title">
          Career timeline
        </h2>
        <p className="section-lead">
          Recent roles across AI automation, distributed Go/Python services,
          e-commerce, and mobile platforms.
        </p>
      </div>

      <ol className="timeline-list">
        {resume.experience.map((entry) => {
          const isCurrent = entry.date.toLowerCase().includes("present");
          return (
            <li
              className={`timeline-item ${isCurrent ? "is-current" : ""}`.trim()}
              key={`${entry.company}-${entry.role}-${entry.date}`}
            >
              <div className="timeline-marker" aria-hidden="true" />
              <article className="timeline-card">
                <div className="timeline-head">
                  <div>
                    <h3 className="timeline-role">{entry.role}</h3>
                    <p className="timeline-org">
                      {entry.companyUrl ? (
                        <a
                          href={entry.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="timeline-company-link"
                        >
                          <span>{entry.company}</span>
                          <ArrowOutwardIcon width={14} height={14} />
                        </a>
                      ) : (
                        <span>{entry.company}</span>
                      )}
                      <span className="timeline-sep" aria-hidden="true">
                        {" "}
                        |{" "}
                      </span>
                      <span>{entry.location}</span>
                    </p>
                  </div>

                  <span className="timeline-date">
                    {isCurrent && (
                      <span className="timeline-current-pill">Active</span>
                    )}
                    <span>{entry.date}</span>
                  </span>
                </div>

                <p className="timeline-blurb">{entry.blurb}</p>

                {entry.bullets.length > 0 && (
                  <details className="timeline-details">
                    <summary>Key engineering highlights</summary>
                    <ul className="timeline-bullets">
                      {entry.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default Career;
