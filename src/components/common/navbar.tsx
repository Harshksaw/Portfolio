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
      {name.map((word, i) => (
        <motion.span
          key={i}
          variants={charVariantWithDelay as any}
          className="inline-block mr-0.5"
        >
          {word}
        </motion.span>
      ))}
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
                    className="rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-neutral-100 relative"
                    variants={variants as any}
                >
                    <img src="/svgs/linkedin.svg" className="h-full w-full z-10" />
                </motion.a>

                <motion.a
                href="https://github.com/Harshksaw"
                target="_blank"
                    className="rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-neutral-100 relative"
                    variants={variants as any}
                >
                    <img src="/svgs/github.svg" className="h-full w-full z-10" />
                </motion.a>
                <motion.a
                href="https://drive.google.com/file/d/1iyV0euSsl0PY2wEbspc6uuIKQ_nGyyww/view?usp=sharing"
                target="_blank"
                    className="rounded-full block md:hidden  p-2 h-10 w-10 cursor-pointer hover:bg-neutral-100 relative"
                    variants={variants as any}
                >
                    <img src="/svgs/resume.jpg" className="h-full w-full z-10 rounded-full" />
                </motion.a>



                <motion.a
                href="https://drive.google.com/file/d/1iyV0euSsl0PY2wEbspc6uuIKQ_nGyyww/view?usp=sharing"
                target="_blank"
                    className="px-6 py-2 md:block hidden bg-black rounded-[32px] text-white"
                    variants={variants as any}
                >
                    Resume
                </motion.a>
            </motion.div>
           </div>
        </nav>
    );
}
