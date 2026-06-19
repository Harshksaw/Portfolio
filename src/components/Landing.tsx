import "./styles/Landing.css";
import SectionModel from "./Character/SectionModel";
import { heroCamera, loadHeroModel } from "./Character/variants/heroModel";

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            HARSH
            <br />
            <span> SAW</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>Full-Stack &</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">AI Engineer</div>
            <div className="landing-h2-2">DevOps</div>
          </h2>
          <h2>
            <div className="landing-h2-info">DevOps</div>
            <div className="landing-h2-info-1">AI Engineer</div>
          </h2>
        </div>
      </div>

      {/* Hero avatar — its own canvas, lives inside the landing section and
          scrolls away with it. Owns the loading screen. */}
      <SectionModel
        className="section-model hero-model"
        sectionSelector=".landing-section"
        camera={heroCamera}
        drivesLoading
        rimSelector=".character-rim"
        load={loadHeroModel}
      >
        <div className="character-rim" />
        <div className="character-hover" />
      </SectionModel>

      {/* Scroll affordance — hidden until the hero's first action cues it in
          (see scrollHint.ts), then dismissed once the user scrolls. */}
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint-label">Scroll</span>
        <span className="scroll-hint-chevron">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Landing;
