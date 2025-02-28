"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";

import Loader from "./loader";
import FourStepClosingTransition from "@/components/Transition";


const Home = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [Transition, setTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000); // Loader runs for 4s
  }, []);

  useEffect(() => {
    if (!loading) {
      setTransition(true);
      setTimeout(() => setTransition(false), 1200); // Water effect lasts 1.2s for smooth transition
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader setLoading={setLoading} />
        ) : (
          <>
            <AnimatePresence>
              {Transition && <FourStepClosingTransition isActive={Transition} />}
            </AnimatePresence>

            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
                <div className="max-w-7xl w-full">
                  <Hero />
                  <Grid />
                  <Experience />
                  <Approach />
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
