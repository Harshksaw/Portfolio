import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── WHAT THIS FILE DOES ────────────────────────────────────────────────────
//
//  Content-only scroll reveals. The 3D models are now PER-SECTION — each owns
//  its own canvas mounted inside its section (see Character/SectionModel.tsx)
//  and scrolls naturally with that section. So this file no longer touches any
//  canvas, camera, or model: it only drives DOM content that needs a scroll cue.
//
//  setContentTimeline() → reveals the "What I Do" cards
//  setAllTimeline()      → career section timeline
// ────────────────────────────────────────────────────────────────────────────

export function setContentTimeline() {
  // The "What I Do" cards default to display:none in CSS — reveal them once the
  // section scrolls into view (works on every viewport).
  ScrollTrigger.create({
    trigger: ".whatIDO",
    start: "top 70%",
    once: true,
    onEnter: () => gsap.set(".what-box-in", { display: "flex" }),
  });
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
