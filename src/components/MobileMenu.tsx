import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FiSearch, FiX } from "react-icons/fi";
import { MENU_ITEMS, type NavItem, type SectionId } from "../data/sections";
import { useDialog } from "../hooks/useDialog";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialRail from "./SocialRail";

export default function MobileMenu({ active, onClosed }: { active?: SectionId; onClosed: () => void }) {
  const { t } = useLanguage();
  const { scrollTo, openSearch, reducedMotion } = useUI();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useDialog(rootRef, panelRef, { onClosed, initialFocus: ".menu-close", panelFrom: "none" });

  // Staggered link reveal
  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".menu-link", { y: 30, opacity: 0, duration: 0.7, stagger: 0.05, ease: "power3.out", delay: 0.1 });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const go = (item: NavItem) => (e: React.MouseEvent) => {
    e.preventDefault();
    close();
    window.setTimeout(() => (item.section ? scrollTo(item.section) : navigate(item.to)), 340);
  };

  return (
    <div ref={rootRef} className="menu-overlay" role="dialog" aria-modal="true" aria-label={t.nav.openMenu}>
      <div ref={panelRef} className="menu-panel">
        <div className="menu-top">
          <LanguageSwitcher />
          <div className="menu-top-actions">
            <button
              type="button"
              className="icon-btn"
              aria-label={t.search.open}
              onClick={() => {
                close();
                window.setTimeout(openSearch, 340);
              }}
            >
              <FiSearch aria-hidden />
            </button>
            <button type="button" className="icon-btn menu-close" onClick={close} aria-label={t.nav.closeMenu}>
              <FiX aria-hidden />
            </button>
          </div>
        </div>

        <nav aria-label={t.nav.primary}>
          <ul className="menu-list">
            {MENU_ITEMS.map((item, i) => (
              <li key={item.id}>
                <a href={item.section ? `/#${item.section}` : item.to} className={active === item.id ? "menu-link is-active" : "menu-link"} onClick={go(item)}>
                  <span className="menu-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialRail variant="row" />
      </div>
    </div>
  );
}
