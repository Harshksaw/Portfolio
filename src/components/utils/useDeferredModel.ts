import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "../../context/LoadingProvider";

// Each below-the-fold section owns a heavy character model (3-4MB GLB, plus the
// desk's FBX animations). Mounting them all on first render makes them race the
// hero model for bandwidth, which is exactly the download the loading screen
// waits on — so the reveal is slower than it needs to be.
//
// This hook holds a section's model until BOTH:
//   1. the hero has finished and the page has revealed (isLoading === false), and
//   2. the section is within ~a screen of the viewport.
// So the hero streams in alone (faster reveal), and each section model loads just
// before it's needed. `.section-model` is position:absolute, so a late mount
// causes no layout shift. ScrollTrigger is used (not IntersectionObserver)
// because ScrollSmoother scrolls via CSS transform, which IO doesn't track.
export function useDeferredModel(
  sectionSelector: string,
  preloadPx = 900
): boolean {
  const { isLoading } = useLoading();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (isLoading || mount) return;
    const el = document.querySelector<HTMLElement>(sectionSelector);
    if (!el) return;

    // Already close enough at reveal time (e.g. the first section below the
    // fold) → mount now; otherwise arm a one-shot trigger for the approach.
    if (el.getBoundingClientRect().top - window.innerHeight < preloadPx) {
      setMount(true);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: `top bottom+=${preloadPx}`,
      once: true,
      onEnter: () => setMount(true),
    });
    return () => st.kill();
  }, [isLoading, mount, sectionSelector, preloadPx]);

  return mount;
}
