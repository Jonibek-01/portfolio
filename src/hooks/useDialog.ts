import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { lockScroll, unlockScroll } from "../utils/scrollLock";
import { getReducedMotion } from "./useReducedMotion";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

interface Options {
  /** Called once the exit animation has finished (unmount the dialog here). */
  onClosed: () => void;
  /** Selector inside the dialog that should be focused first. */
  initialFocus?: string;
  /** Slide direction of the panel. "none" = fade only. */
  panelFrom?: "bottom" | "none";
}

/**
 * Shared behaviour for modal, search overlay and mobile menu:
 * animated open/close (GSAP), ESC to close, focus trap, focus restore, scroll lock.
 * Returns `close()` – always call it instead of unmounting directly.
 */
export function useDialog(
  rootRef: RefObject<HTMLElement>,
  panelRef: RefObject<HTMLElement>,
  { onClosed, initialFocus, panelFrom = "bottom" }: Options
) {
  const closingRef = useRef(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  // Open
  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    lockScroll();
    const reduced = getReducedMotion();
    const tl = gsap.timeline();
    tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: reduced ? 0.15 : 0.35, ease: "power2.out" });
    if (panel && !reduced && panelFrom === "bottom") {
      const from = window.innerWidth <= 560 ? Math.round(window.innerHeight * 0.4) : 36; // mobile: slides up like a bottom sheet
      tl.fromTo(panel, { y: from, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.05);
    }
    const target =
      (initialFocus && root.querySelector<HTMLElement>(initialFocus)) ||
      root.querySelector<HTMLElement>(FOCUSABLE);
    window.setTimeout(() => target?.focus({ preventScroll: true }), 30);

    return () => {
      tl.kill();
      unlockScroll();
      previouslyFocused.current?.focus?.({ preventScroll: true });
    };
  }, [rootRef, panelRef, initialFocus, panelFrom]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const root = rootRef.current;
    if (!root) return onClosedRef.current();
    const reduced = getReducedMotion();
    gsap.to(root, {
      opacity: 0,
      duration: reduced ? 0.1 : 0.3,
      ease: "power2.in",
      onComplete: () => onClosedRef.current(),
    });
  }, [rootRef]);

  // ESC + focus trap
  useEffect(() => {
    const root = rootRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [rootRef, close]);

  return close;
}
