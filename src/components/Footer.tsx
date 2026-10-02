import { Link } from "react-router-dom";
import { images } from "../data/images";
import { contactEmail } from "../data/socialLinks";
import { MENU_ITEMS } from "../data/sections";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import SocialRail from "./SocialRail";

const FOOTER_LINKS = MENU_ITEMS.filter((i) => i.id !== "home");

export default function Footer() {
  const { t } = useLanguage();
  const { scrollTo } = useUI();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={images.logo} alt="" width={72} height={86} loading="lazy" decoding="async" />
          <div>
            <p className="footer-name">{t.hero.name}</p>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>
        </div>

        <nav aria-label={t.footer.navigation}>
          <h2 className="footer-heading">{t.footer.navigation}</h2>
          <ul>
            {FOOTER_LINKS.map((item) => (
              <li key={item.id}>
                {item.section ? (
                  <a href={`/#${item.section}`} onClick={(e) => { e.preventDefault(); scrollTo(item.section!); }}>{t.nav[item.id]}</a>
                ) : (
                  <Link to={item.to}>{t.nav[item.id]}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">{t.footer.social}</h2>
          <SocialRail variant="row" labels exclude={["email"]} />
        </div>

        <div>
          <h2 className="footer-heading">{t.footer.contact}</h2>
          <p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          <p className="footer-location">{t.hero.location}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Hamza Boltayev. {t.footer.rights}</p>
        <a href="/" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>{t.common.backToTop} ↑</a>
      </div>
    </footer>
  );
}
