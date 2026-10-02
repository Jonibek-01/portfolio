import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal. Put the returned ref on a section and mark any
 * child with `data-reveal` – it fades/slides in when it enters the viewport.
 * Reduced motion: opacity only, no movement.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = getReducedMotion();
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: reduced ? 0 : 28 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.4 : 0.85,
            stagger: reduced ? 0 : 0.09,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return ref;
}
