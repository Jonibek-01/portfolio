import { FiArrowUpRight } from "react-icons/fi";
import { capif } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";

/** Small professional affiliation – intentionally lower-key than the main IAIS role. */
export default function Capif() {
  const { t, l } = useLanguage();
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="section section-tight" aria-labelledby="capif-title">
      <div className="container">
        <div className="capif" data-reveal>
          <h2 id="capif-title" className="capif-title">{t.capif.title}</h2>
          <div>
            <p className="capif-name">{capif.name}</p>
            <p className="capif-role">{l(capif.role)}</p>
            <p className="capif-desc">{l(capif.description)}</p>
          </div>
          <a className="link-subtle" href={capif.url} target="_blank" rel="noopener noreferrer">
            {t.capif.visit} <FiArrowUpRight aria-hidden />
            <span className="sr-only"> ({t.common.external})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
