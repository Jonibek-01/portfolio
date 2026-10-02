import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { featuredTopics } from "../data/researchTopics";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import { countForTopic } from "../utils/search";
import SectionHeading from "./SectionHeading";

/** Clickable topic tiles – each opens the Publications page already filtered by that topic. */
export default function TopicsSection() {
  const { t, l } = useLanguage();
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="section section-tight" aria-labelledby="topics-title">
      <div className="container">
        <SectionHeading id="topics-title" title={t.topics.title} subtitle={t.topics.subtitle} />
        <p className="topics-hint" data-reveal>
          <span className="pulse-dot" aria-hidden="true" />
          {t.topicsHint.tap}
        </p>
        <ul className="topic-grid">
          {featuredTopics.map((f) => {
            const c = countForTopic(f);
            const n = c.pubs + c.media;
            // open publications; if the topic only has media, open the media page instead
            const to = c.pubs === 0 && c.media > 0 ? "/media" : "/publications";
            return (
              <li key={f.id} data-reveal>
                <Link to={`${to}?topic=${f.id}`} className="topic-tile">
                  <span className="topic-count">
                    {n} <small>{n === 1 ? t.topicsHint.itemOne : t.topicsHint.items}</small>
                  </span>
                  <span className="topic-name">{l(f.label)}</span>
                  <span className="topic-cta">
                    {c.pubs === 0 && c.media > 0 ? t.topicsHint.openMedia : t.topicsHint.open}
                    <span className="topic-arrow" aria-hidden="true"><FiArrowUpRight /></span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
