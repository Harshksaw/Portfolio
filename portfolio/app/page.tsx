"use client";

import { usePathname } from "next/navigation"; // ✅ Correct method in App Router
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
// import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Loader from "./loader";
import WaterTransition from "@/components/WaterTransistion";



const Home = () => {
  const pathname = usePathname(); // ✅ Get the current path
  const [loading, setLoading] = useState(true);
  const [showWater, setShowWater] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // 3s for intro text animation
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowWater(true);
      setTimeout(() => setShowWater(false), 1200); // Water effect lasts 1.2s
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loader setLoading={setLoading} />
      ) : (
        <>
          {/* {showWater && <WaterTransition isActive={showWater} />} */}

          <AnimatePresence mode="wait">
            <motion.div
              key={pathname} // ✅ Now pathname is used instead of router.route
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >

              {showWater && <WaterTransition isActive={showWater} />} {/* ✅ Move WaterTransition inside AnimatePresence */}
              <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
                <div className="max-w-7xl w-full">
                  {/* <FloatingNav /> */}
                  <Hero />
                  <Grid />
                  <Experience />
                  <Approach />
                  <Footer />
                </div>
              </main>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Home;
