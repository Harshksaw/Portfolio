import Image from "next/image";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

interface WebMockupProps {
  screenshot: string;
  name: string;
  description: string;

}

const WebMockup = ({ screenshot, name, description }: WebMockupProps) => {
  return (
    <div className="relative    md:-top-20 inset-0 overflow-hidden h-full w-full">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              <span className="text-2xl md:text-[4rem] font-bold mt-1 leading-none">
              {name}
              </span>
            </h1>
          </>
        }
        description={description}

      >
        <Image
          src={screenshot}
          alt="Web Screenshot"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
           

      </ContainerScroll>
    </div>
  );
};

export default WebMockup;
