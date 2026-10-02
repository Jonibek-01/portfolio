import { FiArrowUpRight } from "react-icons/fi";
import { publications } from "../data/publications";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import { useUI } from "../hooks/useUI";
import { formatDate } from "../utils/date";
import { isRealUrl } from "../utils/links";

export default function FeaturedResearch() {
  const { t, l, topic } = useLanguage();
  const { openPublication } = useUI();
  const ref = useReveal<HTMLElement>();
  const pub = publications.find((p) => p.featured) ?? publications[0];
  if (!pub) return null;

  return (
    <section ref={ref} className="section section-tight" aria-labelledby="featured-title">
      <div className="container">
        <p className="eyebrow" data-reveal id="featured-title">{t.featured.title}</p>
        <article className="featured" data-reveal>
          <div className="featured-meta">
            <span>{pub.publisher}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={pub.date}>{formatDate(pub.date, t)}</time>
          </div>
          <h3 className="featured-title">{l(pub.title)}</h3>
          <p className="featured-authors">
            {t.featured.by}: {pub.authors.join(", ")}
          </p>
          <p className="featured-desc">{l(pub.description)}</p>
          <ul className="chip-list" aria-label={t.publications.topicsLabel}>
            {pub.topics.map((tp) => (
              <li key={tp} className="chip chip-static">{topic(tp)}</li>
            ))}
          </ul>
          <div className="featured-actions">
            {isRealUrl(pub.url) ? (
              <a className="btn btn-primary" href={pub.url} target="_blank" rel="noopener noreferrer">
                {t.featured.read} <FiArrowUpRight aria-hidden />
                <span className="sr-only"> ({t.common.external})</span>
              </a>
            ) : (
              <button type="button" className="btn btn-primary" disabled title={t.common.linkSoon}>
                {t.featured.read}
              </button>
            )}
            <button type="button" className="link-subtle" onClick={() => openPublication(pub.id)}>
              {t.publications.readFull} <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
