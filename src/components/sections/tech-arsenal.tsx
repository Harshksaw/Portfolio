import React from 'react';
import assets from '../../assets/assets'; // Import the assets array
import { Marquee } from '../shared/margue';
import { cn } from '../../lib/utils';



const TechArsenal: React.FC = () => {

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className='absolute h-full bg-gradient-to-r from-transparent to-primary-darkest top-0 bottom-0 right-0 w-10 z-50'></div>
          <div className='absolute h-full bg-gradient-to-r from-primary-darkest to-transparent top-0 bottom-0 left-0 w-10 z-50'></div>
  <Marquee pauseOnHover className="[--duration:120s]">
    {assets.map((review) => (
      <ReviewCard key={review.name} img={review.path} name={review.name} />
    ))}
  </Marquee>
  <Marquee reverse pauseOnHover className="[--duration:120s]">
    {assets.map((review) => (
      <ReviewCard key={review.name} img={review.path} name={review.name} />
    ))}
  </Marquee>

  <Marquee pauseOnHover className="[--duration:120s]">
    {assets.map((review) => (
      <ReviewCard key={review.name} img={review.path} name={review.name} />
    ))}
  </Marquee>

  <Marquee reverse pauseOnHover className="[--duration:120s]">
    {assets.map((review) => (
      <ReviewCard key={review.name} img={review.path} name={review.name} />
    ))}
  </Marquee>

  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
</div>

    );
};

export default TechArsenal;


const ReviewCard = ({
    img,
  }: {
    img: string;
    name: string;

  }) => {
    
    return (
      <figure
        className={cn(
          "relative h-full w-54 cursor-pointer overflow-hidden rounded-xl",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row relative w-48 items-center justify-center p-2 bg-gradient-to-br from-white/90 to-gray-100/80 h-24 rounded-3xl border border-primary-main/30 shadow-[0_4px_16px_rgba(18,113,255,0.2)]">
          <img className="rounded-md mx-auto  h-9 w-fit object-contain object-center absolute" alt="" src={img} />
          {/* <div className="flex flex-col"> */}
            {/* <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption> */}
          {/* </div> */}
        </div>
      </figure>
    );
  };
   
