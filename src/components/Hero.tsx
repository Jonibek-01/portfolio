import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { images } from "../data/images";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import ErrorBoundary from "./ErrorBoundary";
import SocialRail from "./SocialRail";

const GlobeScene = lazy(() => import("./GlobeScene"));

export default function Hero() {
  const { t } = useLanguage();
  const { scrollTo, reducedMotion, ready } = useUI();
  const rootRef = useRef<HTMLElement>(null);
  const [showScene, setShowScene] = useState(false);

  // Mount the 3D scene after first paint so typography appears instantly.
  useEffect(() => {
    const id = window.setTimeout(() => setShowScene(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  // Entrance animation – starts when the loading screen has finished (reduced motion: simple fade)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!ready) {
        gsap.set(".hero-line-inner", { yPercent: 115 });
        gsap.set("[data-hero]", { opacity: 0 });
        gsap.set(".hero-visual", { opacity: 0 });
        return;
      }
      if (reducedMotion) {
        gsap.fromTo(".hero [data-hero], .hero-visual", { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.05 });
        gsap.set(".hero-line-inner", { yPercent: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-line-inner", { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.12 }, 0.05)
        .fromTo("[data-hero]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.3)
        .fromTo(".hero-visual", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0.15);
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion, ready]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <section id="home" ref={rootRef} className="hero hero-section" aria-labelledby="hero-title">
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-glow" />
        {images.hero ? (
          <img src={images.hero} alt="" className="hero-image" />
        ) : (
          showScene && (
            <ErrorBoundary>
              <Suspense fallback={null}>
                <GlobeScene reducedMotion={reducedMotion} />
              </Suspense>
            </ErrorBoundary>
          )
        )}
      </div>

      <div className="container hero-inner">
        <p className="eyebrow" data-hero>
          {t.hero.name}
        </p>

        <h1 id="hero-title" className="hero-title">
          <span className="sr-only">{t.hero.name} — </span>
          {[t.hero.line1, t.hero.line2, t.hero.line3].map((line) => (
            <span className="hero-line" key={line}>
              <span className="hero-line-inner">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-tagline" data-hero>
          {t.hero.tagline}
        </p>
        <p className="hero-description" data-hero>
          {t.hero.description}
        </p>

        <div className="hero-cta" data-hero>
          <a href="/#research" className="btn btn-primary" onClick={go("research")}>
            {t.hero.exploreResearch}
          </a>
          <Link to="/publications" className="btn btn-ghost">
            {t.hero.viewPublications}
          </Link>
          <Link to="/media" className="link-subtle">
            {t.hero.watchListen} <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile / tablet: compact horizontal social bar below the content */}
        <div className="hero-social-row" data-hero>
          <SocialRail variant="row" />
        </div>

        <div className="hero-info" data-hero>
          <p className="hero-info-role">{t.hero.role}</p>
          <p>{t.hero.unit}</p>
          <p>{t.hero.institute}</p>
          <p className="hero-info-location">{t.hero.location}</p>
        </div>
      </div>

      {/* Desktop: fixed vertical rail on the right, visible while the hero is */}
      <SocialRail variant="rail" />
    </section>
  );
}
