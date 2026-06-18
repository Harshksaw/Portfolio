import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── WHAT THIS FILE DOES ────────────────────────────────────────────────────
//
//  Three GSAP timelines tied to scroll position (scrub: true = scroll-driven):
//
//  tl1  landing section scrolls out → character rotates, slides left, text fades
//  tl2  about section → BIG camera zoom out to reveal full body + desk
//  tl3  whatIDO section → character slides off top of screen
//
//  setAllTimeline() → career section timeline (separate, DOM-only)
//
//  Camera positions are tuned for Avaturn model (head at Y≈1.65, 1 unit = 1m)
// ────────────────────────────────────────────────────────────────────────────

interface ScrollCallbacks {
  toTyping: () => void;
  toWave:   () => void;
}

export function setCharTimeline(
  character: THREE.Object3D | null,
  camera: THREE.PerspectiveCamera,
  onScroll?: ScrollCallbacks,
  laptop?: THREE.Object3D | null,
  intro?: THREE.Object3D | null
) {
  // ── Timeline 1: Landing section scroll ──────────────────────────────────
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // Hero → body swap + animation switch, both pinned to the about-section edge:
  //   • landing/hero → intro avatar (harshfirst) visible, holding its flex pose
  //   • about onward → main avatar (character) visible, typing
  // Both sit at the same spot with the same skeleton, so toggling visibility is
  // enough. These are discrete onEnter/back events (no scrub needed).
  const toBody = () => {
    onScroll?.toTyping();
    if (intro) intro.visible = false;
    if (character) character.visible = true;
  };
  const toHero = () => {
    onScroll?.toWave();
    if (intro) intro.visible = true;
    if (character) character.visible = false;
  };
  ScrollTrigger.create({
    trigger: ".about-section",
    start: "top 85%",
    onEnter: toBody,
    onEnterBack: toBody,
    onLeaveBack: toHero,
  });

  // ── Timeline 2: About section ────────────────────────────────────────────
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // ── Timeline 3: WhatIDo section ──────────────────────────────────────────
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const neckBone = character?.getObjectByName("Neck");

  if (window.innerWidth > 1024) {
    if (character) {
      // tl1 — character rotates right, shifts left, landing text fades
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .fromTo(camera.position, { z: 2.8 }, { z: 2.2 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-20%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      // tl2 — zoom WAY out to reveal full body sitting at desk
      tl2
        .fromTo(
          camera.position,
          { z: 2.2, y: 1.65 },
          { z: 8.0, y: 0.85, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .fromTo(".about-section", { y: "0%" }, { y: "30%", duration: 6 }, 0)
        .fromTo(".about-section", { opacity: 1 }, { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit", x: "-20%", y: "0%" },
          { pointerEvents: "none", x: "-20%", delay: 2, duration: 5 },
          0
        )
        // fromTo (not .to) so scroll-up always returns to the known start state,
        // even if scrub captures stale values after async loads / refreshes.
        .fromTo(
          character.rotation,
          { y: 0.7, x: 0 },
          { y: 0.92, x: 0.12, delay: 3, duration: 3 },
          0
        )
        .fromTo(neckBone!.rotation, { x: 0 }, { x: 0.4, delay: 2, duration: 3 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      // DEBUG: opacity fade temporarily disabled so the laptop is visible
      // from page load. Re-enable once you've confirmed it renders & tuned
      // its transform — see the commented block below.
      if (laptop) {
        laptop.visible = true;
        laptop.traverse((c) => {
          const mesh = c as THREE.Mesh;
          if (!mesh.isMesh) return;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if (mat && "opacity" in mat) {
              mat.transparent = false;
              mat.opacity = 1;
            }
          });
        });
        // To re-enable scroll-gated fade later:
        //   const materials: THREE.Material[] = []; collect as before
        //   tl2.fromTo(materials, {opacity:0}, {opacity:1, duration:2, delay:2}, 0)
        //   tl3.fromTo(materials, {opacity:1}, {opacity:0, duration:1, delay:1.5}, 0)
      }

      // tl3 — character slides off screen as whatIDO comes in.
      // Slide-off must FINISH before Career section enters the viewport, or
      // the 3D canvas overlaps onto Career/Work. With tl3 total ≈ 5s,
      // delay 1.5 + duration 1.5 → done by 60% of whatIDO scroll.
      tl3
        .fromTo(
          ".character-model",
          { y: "0%", x: "-20%" },
          { y: "-100%", x: "-20%", duration: 1.5, ease: "power2.in", delay: 1.5 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .fromTo(character.rotation, { x: 0.12 }, { x: -0.04, duration: 2, delay: 1 }, 0);

      // Safety net: hide the 3D canvas from the Career section down to the
      // bottom of the page, and reliably bring it back on scroll-up.
      //
      // We drive visibility from the trigger's OWN active state via onToggle
      // (single source of truth) instead of a one-shot onEnter/onLeaveBack pair.
      // The old pair could latch the model permanently hidden: if the
      // onLeaveBack crossing was missed (ScrollSmoother momentum / a refresh
      // recreating the trigger), autoAlpha stayed 0 and the model never
      // returned — even back at the landing. onToggle re-evaluates isActive on
      // every toggle and on refresh, so it self-corrects. end:"max" keeps it
      // hidden through Work/TechStack/Contact (active = career-start → bottom).
      ScrollTrigger.create({
        trigger: ".career-section",
        start: "top 80%",
        end: "max",
        onToggle: (self) =>
          gsap.set(".character-container", { autoAlpha: self.isActive ? 0 : 1 }),
      });
    }
  } else {
    // Mobile: just show what-box-in when in view
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(".career-timeline", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      { animationIterationCount: "1", delay: 0.3, duration: 0.1 },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  }
}
