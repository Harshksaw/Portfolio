import gsap from "gsap";
import { smoother } from "../Navbar";

// One-time scroll affordance, fired in sync with the hero model's first action
// (its arm "swipe"). Two parts:
//   1. Fade in the bottom-center "scroll" chevron.
//   2. Once the page is interactive (the smoother starts PAUSED during the
//      loading screen), give a small teaser dip-and-return so the user sees the
//      page actually moves — "scroll a little, so they get the idea".
// Fires at most once per page load; bails out the moment the user takes over.

let cued = false;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function cueScrollHint(): void {
  if (cued) return;
  cued = true;

  const hint = document.querySelector<HTMLElement>(".scroll-hint");
  if (hint) gsap.to(hint, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });

  if (!prefersReducedMotion()) nudgeWhenReady();
}

// The smoother is paused while the loading screen is up, so poll briefly until
// it goes live before nudging (give up after ~6s so we never poll forever).
function nudgeWhenReady(attempt = 0): void {
  if (!smoother || smoother.paused()) {
    if (attempt > 60) return;
    setTimeout(() => nudgeWhenReady(attempt + 1), 100);
    return;
  }
  if (smoother.scrollTop() > 10) return; // user already scrolling — don't yank them

  // "A little": ~9vh, capped so it stays well under the dismiss threshold (110px).
  const dip = Math.min(window.innerHeight * 0.09, 70);
  smoother.scrollTo(dip, true);
  setTimeout(() => {
    if (smoother.scrollTop() > dip + 40) return; // user took over — leave them be
    smoother.scrollTo(0, true);
  }, 750);
}
