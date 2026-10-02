import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface TimelineItem {
  id: string;
  marker: string; // year / period shown on the left (above on mobile)
  markerSub?: string;
  title: string;
  body?: string;
  note?: string;
  meta?: string[];
  current?: boolean;
  /** optional extra content under the text (video, link...) */
  extra?: ReactNode;
}

/**
 * Generic vertical timeline (career, speaking). Renders whatever items it is given;
 * content lives in src/data/*.ts. Desktop: marker left, line, content right.
 * Mobile: marker above, line, content below.
 */
export default function Timeline({ items, label }: { items: TimelineItem[]; label: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = getReducedMotion();
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".tl-item", root);
      gsap.set(rows, { opacity: 0, x: reduced ? 0 : 24 });
      ScrollTrigger.batch(rows, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, duration: reduced ? 0.4 : 0.8, stagger: 0.12, ease: "power3.out", overwrite: true }),
      });
      // Progress line fills as the section scrolls past
      if (!reduced) {
        gsap.fromTo(
          ".tl-progress",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 70%", scrub: true } }
        );
      }
    }, root);
    return () => ctx.revert();
  }, [items.length]);

  return (
    <ol className="timeline" ref={ref} aria-label={label}>
      <li className="tl-line" aria-hidden="true" role="presentation">
        <span className="tl-progress" />
      </li>
      {items.map((it) => (
        <li key={it.id} className={it.current ? "tl-item is-current" : "tl-item"}>
          <div className="tl-marker">
            <span className="tl-year">{it.marker}</span>
            {it.markerSub && <span className="tl-sub">{it.markerSub}</span>}
          </div>
          <span className="tl-dot" aria-hidden="true" />
          <div className="tl-content">
            <h3 className="tl-title">{it.title}</h3>
            {it.meta && it.meta.length > 0 && (
              <p className="tl-meta">
                {it.meta.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </p>
            )}
            {it.body && <p className="tl-body">{it.body}</p>}
            {it.note && <p className="tl-note">{it.note}</p>}
            {it.extra}
          </div>
        </li>
      ))}
    </ol>
  );
}
