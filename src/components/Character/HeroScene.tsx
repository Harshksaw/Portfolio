import SectionModel from "./SectionModel";
import { heroCamera, loadHeroModel } from "./variants/heroModel";

const HeroScene = () => (
  <SectionModel
    className="section-model hero-model"
    sectionSelector="#top"
    camera={heroCamera}
    rimSelector=".character-rim"
    load={loadHeroModel}
  />
);

export default HeroScene;
