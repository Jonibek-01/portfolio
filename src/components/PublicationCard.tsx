import type { Publication } from "../data/publications";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import { getYear } from "../utils/date";

/** Presentational only – all content comes from src/data/publications.ts */
export default function PublicationCard({ publication: p }: { publication: Publication }) {
  const { t, l, topic } = useLanguage();
  const { openPublication } = useUI();
  return (
    <article className="pub-card">
      <div className="pub-card-top">
        <span className="pub-category">{t.publications.categoryLabels[p.category]}</span>
        <span className="pub-year">{getYear(p.date)}</span>
      </div>
      <h3 className="pub-title">
        {/* stretched button: the whole card opens the detail modal */}
        <button type="button" className="pub-open" onClick={() => openPublication(p.id)}>
          {l(p.title)}
        </button>
      </h3>
      <p className="pub-authors">{p.authors.join(", ")}</p>
      <p className="pub-desc">{l(p.description)}</p>
      <ul className="pub-topics" aria-label={t.publications.topicsLabel}>
        {p.topics.slice(0, 4).map((tp) => (
          <li key={tp}>{topic(tp)}</li>
        ))}
      </ul>
      <div className="pub-foot">
        <span className="pub-publisher">{p.publisher}</span>
        <span className="pub-read" aria-hidden="true">{t.publications.read} →</span>
      </div>
    </article>
  );
}
