import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import { images } from "../data/images";
import { NAV_ITEMS, SECTION_IDS, type SectionId } from "../data/sections";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { t } = useLanguage();
  const { scrollTo, openSearch } = useUI();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the home-page section currently in view.
  useEffect(() => {
    if (!onHome) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id as SectionId)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onHome]);

  const active: SectionId | undefined = onHome ? activeSection : NAV_ITEMS.find((i) => i.to !== "/" && pathname.startsWith(i.to))?.id;

  return (
    <>
      <header className={scrolled ? "navbar is-scrolled" : "navbar"}>
        <div className="navbar-inner">
          <a
            href="/"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
            aria-label={`${t.hero.name} — ${t.nav.home}`}
          >
            <img src={images.logoMark} alt="" width={44} height={32} className="brand-mark" />
            <span className="brand-name">{t.hero.name}</span>
          </a>

          <nav className="nav-links" aria-label={t.nav.primary}>
            <ul>
              {NAV_ITEMS.map((item) => {
                const cls = active === item.id ? "is-active" : undefined;
                return (
                  <li key={item.id}>
                    {item.section ? (
                      <a
                        href={`/#${item.section}`}
                        className={cls}
                        aria-current={cls ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(item.section!);
                        }}
                      >
                        {t.nav[item.id]}
                      </a>
                    ) : (
                      <Link to={item.to} className={cls} aria-current={cls ? "page" : undefined}>
                        {t.nav[item.id]}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="nav-actions">
            <button type="button" className="icon-btn" onClick={openSearch} aria-label={t.search.open} title={t.search.open}>
              <FiSearch aria-hidden />
            </button>
            <LanguageSwitcher />
            <a
              href="/#contact"
              className="nav-contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
            >
              {t.nav.contact}
            </a>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label={t.nav.openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <FiMenu aria-hidden />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <MobileMenu active={active} onClosed={() => setMenuOpen(false)} />}
    </>
  );
}
