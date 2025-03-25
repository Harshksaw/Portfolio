"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
// Lazy load components that aren't needed immediately
const Grid = lazy(() => import("@/components/Grid"));
const Footer = lazy(() => import("@/components/Footer"));
const Experience = lazy(() => import("@/components/Experience"));
const ProjectShowcase = lazy(() => import("@/components/Projects/ShowCase"));

// Dynamic import with SSR disabled for the loader
const Loader = dynamic(() => import("./loader"), { ssr: false });

const Home = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Reduce loader time to improve performance
    const timer = setTimeout(() => setLoading(false), 3500); // Reduced from 4500ms to 2000ms
    
    // Preload components after loader starts
    const preload = async () => {
      const promises = [
        import("@/components/Grid"),
        import("@/components/Experience"),
        import("@/components/Projects/ShowCase")
      ];
      await Promise.all(promises);
    };
    
    preload();
    
    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader setLoading={setLoading} />
      ) : (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3, // Reduced animation time
            ease: "easeOut",
          }}
        >
          <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-5 px-5">
            <div className="max-w-7xl w-full">
              <Hero />
              <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading experience...</div>}>
                <Experience />
              </Suspense>
              <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading grid...</div>}>
                <Grid />
              </Suspense>
              <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading projects...</div>}>
                <ProjectShowcase />
              </Suspense>
              <Suspense fallback={<div className="h-24 w-full"></div>}>
                <Footer />
              </Suspense>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home;
