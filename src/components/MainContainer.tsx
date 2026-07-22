import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
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

// The tech-stack playground pulls in ~850KB of Rapier physics WASM. It sits near
// the bottom of the page, so we hold off importing that chunk until the user
// scrolls within a screen of it. The placeholder keeps the section's full height
// (`.techstack` is `height: var(--vh)`), so the swap causes no layout shift and
// ScrollSmoother's content height / downstream trigger positions stay correct.
//
// The gate uses ScrollTrigger rather than IntersectionObserver: ScrollSmoother
// drives scrolling with a CSS transform on #smooth-content, which IO does not
// track reliably, whereas ScrollTrigger shares the smoother's coordinate space.
function DeferredTechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fire once, ~a screen before the section reaches the viewport, so the
    // physics chunk is fetched and warm by the time the user arrives.
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom+=600",
      once: true,
      onEnter: () => setInView(true),
    });
    return () => st.kill();
  }, []);

  if (inView) {
    return (
      <Suspense fallback={<div className="techstack" />}>
        <TechStack />
      </Suspense>
    );
  }
  return <div className="techstack" ref={ref} />;
}

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
            {isDesktopView && <DeferredTechStack />}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
