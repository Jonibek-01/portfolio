import { useEffect, useRef, useState } from "react";

/**
 * Glowing cursor blob (desktop / mouse only).
 * - follows the mouse with a soft delay
 * - over an element with data-cursor="icons" it morphs into a tall pill that wraps the icons
 * - over inputs / video / data-cursor="disable" it hides
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current!;
    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let pinned = false;
    let raf = 0;
    let current: Element | null = null;

    const loop = () => {
      if (!pinned) {
        pos.x += (mouse.x - pos.x) / 6;
        pos.y += (mouse.y - pos.y) / 6;
      }
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const leave = () => {
      el.classList.remove("cursor-disable", "cursor-icons");
      pinned = false;
      current = null;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      el.classList.add("is-active");
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const zone = target?.closest<HTMLElement>('[data-cursor="icons"]') ?? null;
      const off = target?.closest('input, textarea, video, iframe, [data-cursor="disable"]');
      if (zone === current && !off) return;
      leave();
      if (zone) {
        const rect = zone.getBoundingClientRect();
        el.classList.add("cursor-icons");
        el.style.setProperty("--cursorH", `${rect.height}px`);
        pos.x = rect.left;
        pos.y = rect.top;
        pinned = true;
        current = zone;
      } else if (off) {
        el.classList.add("cursor-disable");
      }
    };

    const onLeaveWindow = () => el.classList.remove("is-active");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div className="cursor-main" ref={ref} aria-hidden="true" />;
}
