import { resume } from "../data/resume";
import "./styles/TechStack.css";

const TechStack = () => {
  return (
    <section
      className="section-wrap section-block deferred-section"
      id="stack"
      tabIndex={-1}
      aria-labelledby="stack-heading"
    >
      <div className="section-head">
        <span className="section-eyebrow">Technical Stack</span>
        <h2 id="stack-heading" className="section-title">
          Languages, frameworks &amp; infrastructure
        </h2>
        <p className="section-lead">
          Synchronized directly with my engineering résumé across AI/ML,
          distributed backend services, cloud infrastructure, and client apps.
        </p>
      </div>

      <div className="skills-matrix" aria-label="Technical skills by category">
        {resume.skills.map((group) => (
          <article className="skill-group" key={group.category}>
            <h3 className="skill-group-title">{group.category}</h3>
            <ul className="skill-pills">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
