import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/scrollTo";
import { useUI } from "../hooks/useUI";

/**
 * - new page  -> scroll to top
 * - home page + navigation state / #hash -> scroll to that section after mount
 */
export default function ScrollManager() {
  const { pathname, hash, state } = useLocation();
  const { reducedMotion, ready } = useUI();
  const target: string | undefined = (state as { scrollTo?: string } | null)?.scrollTo ?? (hash ? hash.slice(1) : undefined);

  useEffect(() => {
    if (pathname !== "/" || !target) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    if (!ready) return; // wait for the loading screen before jumping
    const id = window.setTimeout(() => scrollToSection(target, reducedMotion), 120);
    return () => window.clearTimeout(id);
  }, [pathname, target, ready, reducedMotion]);

  return null;
}
