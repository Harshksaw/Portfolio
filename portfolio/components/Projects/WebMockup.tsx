import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { ContainerScroll } from "../ui/container-scroll-animation";

interface WebMockupProps {
  screenshots: string[]; // Accept multiple screenshots
  name: string;
  description: string;
}

const WebMockup = ({ screenshots, name, description }: WebMockupProps) => {
  return (
    <div className="relative md:-top-20 inset-0 overflow-hidden h-full w-full">
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
        {/* Swiper for Auto-Sliding Web Screenshots */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1200}
          className="rounded-2xl w-full h-full"
        >
          {screenshots.map((screenshot, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div className="relative w-full h-full aspect-video">
                <Image
                  src={screenshot}
                  alt={`Web Screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="rounded-2xl object-cover object-left-top"
                  draggable={false}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ContainerScroll>
    </div>
  );
};

export default WebMockup;