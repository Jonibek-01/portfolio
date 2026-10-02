import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { images } from "../data/images";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import { lockScroll, unlockScroll } from "../utils/scrollLock";

/**
 * Loading screen: a giant marquee of words about Hamza Boltayev behind a
 * "LOADING 36%" pill. At 100% the pill expands to fill the screen and the
 * site appears.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const { t } = useLanguage();
  const { reducedMotion } = useUI();
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  const words = t.loader.words;
  const sequence = useMemo(() => [...words, ...words], [words]);

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  useEffect(() => {
    const state = { p: 0 };
    const push = () => setPct(Math.min(100, Math.round(state.p)));
    const climb = gsap.to(state, { p: 88, duration: reducedMotion ? 0.4 : 2.2, ease: "power2.out", onUpdate: push });

    const waitLoad = new Promise<void>((res) =>
      document.readyState === "complete" ? res() : window.addEventListener("load", () => res(), { once: true })
    );
    const assets = Promise.all([document.fonts?.ready, waitLoad, import("./GlobeScene")]).catch(() => undefined);
    const minTime = new Promise((res) => window.setTimeout(res, reducedMotion ? 500 : 2100));
    const maxTime = new Promise((res) => window.setTimeout(res, 7000));

    let finished = false;
    Promise.all([Promise.race([assets, maxTime]), minTime]).then(() => {
      if (finished) return;
      finished = true;
      climb.kill();
      gsap.to(state, {
        p: 100,
        duration: 0.5,
        ease: "power1.inOut",
        onUpdate: push,
        onComplete: () => {
          const root = rootRef.current;
          const pill = pillRef.current;
          if (!root || !pill) return onDone();
          if (reducedMotion) {
            gsap.to(root, { opacity: 0, duration: 0.35, onComplete: onDone });
            return;
          }
          const r = pill.getBoundingClientRect();
          const scale = Math.max(window.innerWidth / r.width, window.innerHeight / r.height) * 1.5;
          gsap
            .timeline({ onComplete: onDone })
            .to(".loader-pill-content", { opacity: 0, duration: 0.25 })
            .to(pill, { scale, duration: 0.95, ease: "power3.in" }, 0.15)
            .to(root, { opacity: 0, duration: 0.4, ease: "power1.out" }, ">-0.05");
        },
      });
    });

    return () => {
      finished = true;
      climb.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={rootRef} className="loader" role="status" aria-live="polite" aria-label={`${t.loader.loading} ${pct}%`}>
      <div className="loader-top">
        <img src={images.logoMark} alt="" width={56} height={40} className="loader-mark" />
      </div>

      <div className="loader-marquee" aria-hidden="true">
        <div className={reducedMotion ? "loader-track is-static" : "loader-track"}>
          {[0, 1].map((copy) => (
            <div className="loader-set" key={copy}>
              {sequence.map((w, i) => (
                <span className="loader-word" key={`${copy}-${i}`}>
                  {w}
                  <i className="loader-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="loader-center">
        <div ref={pillRef} className="loader-pill" onMouseMove={onMove}>
          <span className="loader-glow" />
          <div className="loader-pill-content">
            <span className="loader-label">{t.loader.loading}</span>
            <span className="loader-pct">{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
