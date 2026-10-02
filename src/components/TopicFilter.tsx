import { featuredTopics } from "../data/researchTopics";
import { useLanguage } from "../hooks/useLanguage";
import { useTopicParam } from "../hooks/useTopicParam";

/** Topic chips used on the Publications / Media pages. The choice lives in the URL (?topic=...). */
export default function TopicFilter() {
  const { t, l } = useLanguage();
  const { topic, setTopic } = useTopicParam();
  return (
    <div className="filter-row" role="group" aria-label={t.pages.topicLabel}>
      <button type="button" className={!topic ? "chip chip-topic is-active" : "chip chip-topic"} aria-pressed={!topic} onClick={() => setTopic(null)}>
        {t.pages.allTopics}
      </button>
      {featuredTopics.map((f) => (
        <button key={f.id} type="button" className={topic?.id === f.id ? "chip chip-topic is-active" : "chip chip-topic"} aria-pressed={topic?.id === f.id} onClick={() => setTopic(f)}>
          {l(f.label)}
        </button>
      ))}
    </div>
  );
}
