"use client";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";

import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import TechStack from "../TechStack";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-auto mx-auto ${className}`}>{children}</div>;
};


export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  customComponent, // New prop for rendering custom content
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  customComponent?: boolean; // Flag for custom content
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["VueJS", "NuxtJS", "GraphQL"];

  const [copied, setCopied] = useState(false);


  const handleCopy = () => {
    const text = "mister.harshkumar@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Custom Component (For Tech Stack) */}
      {customComponent ? (
        <TechStack />
      ) : (
        <div className={`${id === 6 && "flex justify-center"} h-full`}>
          {/* Background Image */}
          <div className="w-full h-full absolute">
            {img && (
              <img
                src={img}
                alt={img}
                className={cn(imgClassName, "object-cover object-center ")}
              />
            )}
          </div>

          {/* Spare Image (Background Effect) */}
          <div className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"}`}>
            {spareImg && (
              <img
                src={spareImg}
                alt={spareImg}
                className="object-cover object-center w-full h-full"
              />
            )}
          </div>

          {/* Background Animation (For ID:6) */}
          {/* {id === 6 && (

              <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>

          )} */}

          {/* Text Content */}
          <div
            className={cn(
              titleClassName,
              "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
            )}
          >
            {/* Description */}
            <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
              {description}
            </div>

            {/* Title */}
            <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
              {title}
            </div>

            {/* GitHub 3D Globe (For ID:2) */}
            {id === 2 && <GridGlobe />}

            {/* Tech Stack List (For ID:3) */}
            {id === 3 && (
              <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
                {/* Left Column */}
                <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                  {leftLists.map((item, i) => (
                    <span key={i} className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                      {item}
                    </span>
                  ))}
                  <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                  <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                  {rightLists.map((item, i) => (
                    <span key={i} className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Email Copy Button (For ID:6) */}
            {id === 6 && (
              <div className="mt-5 relative">
                <div className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"}`}>
                <Lottie animationData={animationData} loop={copied} style={{ height: 200, width: 400 }} />
                </div>

                <MagicButton
                  title={copied ? "Email is Copied!" : "Copy my email address"}
                  icon={<IoCopyOutline />}
                  position="left"
                  handleClick={handleCopy}
                  otherClasses="!bg-[#161A31]"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
