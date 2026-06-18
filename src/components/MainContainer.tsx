import { lazy, Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { setContentTimeline, setAllTimeline } from "./utils/GsapScroll";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  // DOM-only scroll reveals (cards + career). The 3D models drive their own
  // per-section scroll effects internally, so nothing here touches a canvas.
  // Set up once; ScrollTrigger refreshes handle resize. gsap.context → clean
  // teardown across HMR / StrictMode remounts.
  useEffect(() => {
    const ctx = gsap.context(() => {
      setContentTimeline();
      setAllTimeline();
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About enable3D={isDesktopView} />
            <WhatIDo enable3D={isDesktopView} />
            <Career />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
