import { useEffect, useState } from "react";
import { MEDIA_TYPES, media } from "../data/media";
import { useLanguage } from "../hooks/useLanguage";
import { useMediaSearch } from "../hooks/useSearch";
import { useStagger } from "../hooks/useStagger";
import MediaCard from "../components/MediaCard";
import PageHeader from "../components/PageHeader";
import SearchField from "../components/SearchField";
import StoriesCarousel from "../components/StoriesCarousel";
import TopicFilter from "../components/TopicFilter";

const PAGE_SIZE = 12;

export default function MediaPage() {
  const { t } = useLanguage();
  const s = useMediaSearch();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const filterKey = `${s.query}|${s.type}|${s.results.length}`;
  useEffect(() => setVisible(PAGE_SIZE), [filterKey]);
  const listRef = useStagger<HTMLUListElement>(".media-card", filterKey);
  const shown = s.results.slice(0, visible);

  return (
    <main id="main" className="page">
      <div className="container">
        <PageHeader title={t.media.title} subtitle={t.media.subtitle} count={media.length} />
      </div>
      <StoriesCarousel />
      <div className="container">
        <div className="toolbar">
          <SearchField value={s.query} onChange={s.setQuery} placeholder={t.media.searchPlaceholder} label={t.media.searchLabel} clearLabel={t.media.clearSearch} />
          <div className="filter-row" role="group" aria-label={t.media.title}>
            <button type="button" className={s.type === "all" ? "chip is-active" : "chip"} aria-pressed={s.type === "all"} onClick={() => s.setType("all")}>
              {t.media.tabs.all}
            </button>
            {MEDIA_TYPES.map((type) => (
              <button key={type} type="button" className={s.type === type ? "chip is-active" : "chip"} aria-pressed={s.type === type} onClick={() => s.setType(type)}>
                {t.media.tabs[type]}
              </button>
            ))}
          </div>
          <TopicFilter />
        </div>

        {s.results.length ? (
          <>
            <ul className="media-grid" ref={listRef}>
              {shown.map((m) => (
                <li key={m.id}>
                  <MediaCard item={m} />
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
            <p>{t.media.noResults}</p>
          </div>
        )}
      </div>
    </main>
  );
}
