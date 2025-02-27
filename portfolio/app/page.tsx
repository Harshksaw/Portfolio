"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";

import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

import MobileShowcase from "@/components/ProjectComponent";
import { useEffect, useState } from "react";
import Loader from './loader';




const Home = () => {
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Simulating loading time
  }, []);

  return (
    <>
      {Loading ? (
      <Loader setLoading={setLoading} />
      ) : (
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
          <div className="max-w-7xl w-full">
            <FloatingNav navItems={navItems} />
            <Hero />
            <Grid />

            <Experience />
            <Approach />
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}
   



export default Home;
