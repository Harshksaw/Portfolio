import SectionModel from "./SectionModel";
import { aboutCamera, loadAboutModel } from "./variants/aboutModel";

const AboutScene = () => (
  <SectionModel
    className="section-model about-model"
    sectionSelector="#about"
    camera={aboutCamera}
    load={loadAboutModel}
  />
);

export default AboutScene;
