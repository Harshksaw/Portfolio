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
    </div>
  );
};

export default Landing;
