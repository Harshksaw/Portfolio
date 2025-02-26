import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import TechStack from "./TechStack";

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20  ">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            // remove icon prop
            // remove original classname condition
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          >
          {item.customComponent && <TechStack />}
          </BentoGridItem>
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
