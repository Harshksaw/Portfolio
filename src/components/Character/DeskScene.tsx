import SectionModel from "./SectionModel";
import { deskCamera, loadDeskModel } from "./variants/deskModel";

const DeskScene = () => (
  <SectionModel
    className="section-model desk-model"
    sectionSelector="#capabilities"
    camera={deskCamera}
    load={loadDeskModel}
  />
);

export default DeskScene;
