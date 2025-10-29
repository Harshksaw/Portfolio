import React from 'react';
import assets from '../../assets/assets'; // Import the assets array
import { Marquee } from '../shared/margue';
import { cn } from '../../lib/utils';



const TechArsenalMobile: React.FC = () => {

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee isMobile={true} pauseOnHover className="[--duration:120s]">
        {assets.map((review) => (
          <ReviewCard key={review.name} img={review.path} name={review.name} />
        ))}
      </Marquee>
      <Marquee isMobile={true} reverse pauseOnHover className="[--duration:120s]">
        {assets.map((review) => (
          <ReviewCard key={review.name} img={review.path} name={review.name} />
        ))}
      </Marquee>

      <Marquee isMobile={true} pauseOnHover className="[--duration:120s]">
        {assets.map((review) => (
          <ReviewCard key={review.name} img={review.path} name={review.name} />
        ))}
      </Marquee>

      <Marquee isMobile={true} reverse pauseOnHover className="[--duration:120s]">
        {assets.map((review) => (
          <ReviewCard key={review.name} img={review.path} name={review.name} />
        ))}
      </Marquee>
      
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
    );
};

export default TechArsenalMobile;


const ReviewCard = ({
    img,
  }: {
    img: string;
    name: string;

  }) => {
    
    return (
      <figure
        className={cn(
          "relative h-full w-28 cursor-pointer overflow-hidden rounded-xl py-2",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row relative w-24 items-center justify-center p-2 bg-neutral-300/40 dark:bg-neutral-700/60 h-20 rounded-3xl">
          <img className="rounded-md mx-auto  h-7 w-fit object-contain object-center absolute" alt="" src={img} />
          {/* <div className="flex flex-col"> */}
            {/* <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption> */}
          {/* </div> */}
        </div>
      </figure>
    );
  };
   