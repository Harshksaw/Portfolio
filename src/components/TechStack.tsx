import { resume } from "../data/resume";
import WhatIDo from "./WhatIDo";
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
        <span className="section-eyebrow">Capabilities &amp; Stack</span>
        <h2 id="stack-heading" className="section-title">
          What I build &amp; technologies I ship with
        </h2>
        <p className="section-lead">
          Synchronized directly with my engineering résumé across AI/ML,
          distributed backend services, cloud infrastructure, and frontend apps.
        </p>
      </div>

      <WhatIDo />

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
