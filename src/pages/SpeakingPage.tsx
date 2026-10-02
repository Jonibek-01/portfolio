import { useMemo, useState } from "react";
import { speaking } from "../data/speaking";
import { useDebounce } from "../hooks/useDebounce";
import { useLanguage } from "../hooks/useLanguage";
import { buildHaystack, matchesQuery } from "../utils/search";
import { getYear } from "../utils/date";
import PageHeader from "../components/PageHeader";
import SearchField from "../components/SearchField";
import SpeakingTimeline from "../components/SpeakingTimeline";

export default function SpeakingPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const q = useDebounce(query, 180);
  const events = useMemo(
    () => speaking.filter((e) => !q.trim() || matchesQuery(buildHaystack(e.title, e.description, e.type, e.location, e.topics, getYear(e.date)), q)),
    [q]
  );
  return (
    <main id="main" className="page">
      <div className="container">
        <PageHeader title={t.speaking.title} subtitle={t.speaking.subtitle} count={speaking.length} />
        <div className="toolbar">
          <SearchField value={query} onChange={setQuery} placeholder={`${t.nav.search}...`} label={t.nav.search} clearLabel={t.publications.clearSearch} />
        </div>
        {events.length ? (
          <SpeakingTimeline key={events.map((e) => e.id).join()} events={events} label={t.speaking.title} />
        ) : (
          <div className="empty-state" role="status"><p>{t.speaking.noResults}</p></div>
        )}
      </div>
    </main>
  );
}
