'use client'

import { motion, } from "motion/react";
import { charVariantWithDelay, containerWithDelay, staggeredVariantsWithDelay } from "../../variants/stagger";

export default function Navbar() {
  const name = "Harsh Kumar Saw".split("");

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <nav className="h-16 max-h-16 min-h-16  md:h-20 w-full md:min-h-20 md:max-h-20 fixed top-0 px-4 md:px-0   z-[99999]">
      <div className="w-full flex justify-end pt-3 h-fit py-2 items-center rounded-b-2xl bg-white-700/2 backdrop-blur-xs ">
        <motion.h2
          className="font-extrabold text-base  md:text-2xl left-4 md:left-1/2 md:-translate-x-1/2 absolute overflow-hidden whitespace-nowrap"
          variants={containerWithDelay as any}
          initial="hidden"
          animate="show"
        >
          {/* {name.map((word, i) => (
        <motion.span
          key={i}
          variants={charVariantWithDelay as any}
          className="inline-block mr-0.5"
        >
          {word}
        </motion.span>
      ))} */}
        </motion.h2>

        <motion.div
          className="w-fit md:mr-10 flex  items-center justify-end gap-2 md:gap-4"
          initial="hidden"
          animate="visible"
          variants={staggeredVariantsWithDelay as any}
        >
          <motion.a
            href="https://www.linkedin.com/in/harsh-kumar-saw-32727b247"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full p-0 h-10 w-10 cursor-pointer hover:opacity-90 relative"
            variants={variants as any}
          >
            {/* Linkedin colored circle with white icon */}
            <span className="h-full w-full flex items-center justify-center rounded-full bg-[#0A66C2]">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4.98 3.5C4.98 4.60457 4.09457 5.49 2.99 5.49C1.88543 5.49 1 4.60457 1 3.5C1 2.39543 1.88543 1.51 2.99 1.51C4.09457 1.51 4.98 2.39543 4.98 3.5Z" fill="white" />
                <path d="M1.5 8.5H4.5V23H1.5V8.5Z" fill="white" />
                <path d="M8.5 8.5H11.28V10.13H11.33C11.86 9.22 13.05 8.25 14.9 8.25C18.86 8.25 19 10.99 19 14.03V23H16V14.8C16 12.98 15.98 10.81 13.6 10.81C11.2 10.81 10.88 12.6 10.88 14.66V23H8.5V8.5Z" fill="white" />
              </svg>
            </span>
          </motion.a>

          <motion.a
            href="https://github.com/Harshksaw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full p-0 h-10 w-10 cursor-pointer hover:opacity-90 relative"
            variants={variants as any}
          >
            {/* Github circle with white mark */}
            <span className="h-full w-full flex items-center justify-center rounded-full bg-[#181717]">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.96 3.22 9.16 7.69 10.64.56.1.76-.24.76-.53 0-.26-.01-.96-.01-1.88-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.02-.69.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 .17 1.53.99 1.53.99.92 1.56 2.42 1.11 3.01.85.09-.66.35-1.11.64-1.36-2.5-.29-5.12-1.25-5.12-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.46.11-3.05 0 0 .95-.31 3.11 1.16a10.75 10.75 0 012.83-.38c.96 0 1.93.13 2.83.38 2.16-1.47 3.11-1.16 3.11-1.16.61 1.59.23 2.76.11 3.05.72.79 1.16 1.8 1.16 3.03 0 4.32-2.62 5.27-5.12 5.56.36.31.68.93.68 1.88 0 1.36-.01 2.46-.01 2.79 0 .29.19.64.77.53A10.26 10.26 0 0023.25 11.75C23.25 5.48 18.27.5 12 .5z" fill="white" />
              </svg>
            </span>
          </motion.a>

          {/* <motion.a
                href="https://drive.google.com/file/d/1iyV0euSsl0PY2wEbspc6uuIKQ_nGyyww/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                    aria-label="Resume"
                    className="rounded-full block md:hidden  p-0 h-10 w-10 cursor-pointer hover:opacity-90 relative"
                    variants={variants as any}
                >
                    <span className="h-full w-full flex items-center justify-center rounded-full bg-gradient-to-r from-primary-main to-primary-light overflow-hidden">
                      <img src="/svgs/resume.jpg" alt="Resume" className="h-full w-full object-cover" />
                    </span>
                </motion.a> */}
        </motion.div>
      </div>
    </nav>
  );
}
