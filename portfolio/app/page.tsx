"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";

import Experience from "@/components/Experience";

import Loader from "./loader";


import ProjectShowcase from "@/components/Projects/ShowCase";



const Home = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4500); // Loader runs for 4s
  }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     setTransition(true);
  //     setTimeout(() => setTransition(false), 1200); // Background transition lasts 1.2s
  //   }
  // }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader setLoading={setLoading} />
        ) : (
          <>
            {/* <AnimatePresence>
              {transition && <FourStepClosingTransition isActive={transition} />}
            </AnimatePresence> */}

<motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 1, // Longer fade-in
                ease: "easeInOut", // Smoother motion
              }}
            >
              <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-5 px-5">
                <div className="max-w-7xl w-full">
                  <Hero />
                  <Experience />

                  <Grid />
                  <ProjectShowcase/>

                  {/* <Approach /> */}
                  <Footer />
                </div>
              </main>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
