import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useUI } from "./useUI";

/** Fades the cards of a grid in (staggered) whenever `signature` changes – e.g. after a search or filter. */
export function useStagger<T extends HTMLElement>(selector: string, signature: string) {
  const ref = useRef<T>(null);
  const { reducedMotion } = useUI();
  useLayoutEffect(() => {
    const cards = ref.current?.querySelectorAll(selector);
    if (!cards?.length) return;
    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: reducedMotion ? 0 : 22 },
      { opacity: 1, y: 0, duration: reducedMotion ? 0.3 : 0.55, stagger: reducedMotion ? 0 : 0.05, ease: "power3.out", clearProps: "transform,opacity" }
    );
    return () => {
      tween.kill();
    };
  }, [selector, signature, reducedMotion]);
  return ref;
}
