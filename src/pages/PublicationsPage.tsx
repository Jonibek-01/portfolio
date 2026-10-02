import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { publications } from "../data/publications";
import { usePublicationSearch } from "../hooks/useSearch";
import { useStagger } from "../hooks/useStagger";
import { useTopicParam } from "../hooks/useTopicParam";
import PageHeader from "../components/PageHeader";
import PublicationCard from "../components/PublicationCard";
import SearchField from "../components/SearchField";
import TopicFilter from "../components/TopicFilter";

const PAGE_SIZE = 12;

/** Full publications archive: search, category / year / topic filters, "show more" paging. */
export default function PublicationsPage() {
  const { t } = useLanguage();
  const s = usePublicationSearch();
  const { setTopic } = useTopicParam();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filterKey = `${s.query}|${s.category}|${s.year}|${s.results.length}`;
  useEffect(() => setVisible(PAGE_SIZE), [filterKey]);

  const shown = s.results.slice(0, visible);
  const listRef = useStagger<HTMLUListElement>(".pub-card", filterKey);

  const resetAll = () => {
    s.reset();
    setTopic(null);
  };

  return (
    <main id="main" className="page">
      <div className="container">
        <PageHeader title={t.publications.title} subtitle={t.publications.subtitle} count={publications.length} />

        <div className="toolbar">
          <SearchField value={s.query} onChange={s.setQuery} placeholder={t.publications.searchPlaceholder} label={t.publications.searchLabel} clearLabel={t.publications.clearSearch} />

          <div className="filter-row" role="group" aria-label={t.publications.category}>
            <button type="button" className={s.category === "all" ? "chip is-active" : "chip"} aria-pressed={s.category === "all"} onClick={() => s.setCategory("all")}>
              {t.publications.all}
            </button>
            {s.categories.map((c) => (
              <button key={c} type="button" className={s.category === c ? "chip is-active" : "chip"} aria-pressed={s.category === c} onClick={() => s.setCategory(c)}>
                {t.publications.categoryFilters[c]}
              </button>
            ))}
          </div>

          <div className="filter-row" role="group" aria-label={t.publications.year}>
            <button type="button" className={s.year === "all" ? "chip chip-year is-active" : "chip chip-year"} aria-pressed={s.year === "all"} onClick={() => s.setYear("all")}>
              {t.publications.allYears}
            </button>
            {s.years.map((y) => (
              <button key={y} type="button" className={s.year === y ? "chip chip-year is-active" : "chip chip-year"} aria-pressed={s.year === y} onClick={() => s.setYear(y)}>
                {y}
              </button>
            ))}
          </div>

          <TopicFilter />
        </div>

        <p className="result-count" aria-live="polite">
          {s.results.length} {s.results.length === 1 ? t.publications.result : t.publications.results}
        </p>

        {s.results.length ? (
          <>
            <ul className="pub-grid" ref={listRef}>
              {shown.map((p) => (
                <li key={p.id}>
                  <PublicationCard publication={p} />
                </li>
              ))}
            </ul>
            {visible < s.results.length && (
              <div className="show-more">
                <p>{t.pages.showing} {shown.length} {t.pages.of} {s.results.length}</p>
                <button type="button" className="btn btn-ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  {t.pages.showMore}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state" role="status">
            <p>{t.publications.noResults}</p>
            {s.isFiltered && (
              <button type="button" className="btn btn-ghost" onClick={resetAll}>
                {t.publications.resetFilters}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
