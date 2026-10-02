import { Link } from "react-router-dom";
import { speaking } from "../data/speaking";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import { byDateDesc } from "../utils/date";
import SectionHeading from "./SectionHeading";
import SpeakingTimeline from "./SpeakingTimeline";
import ViewAllCard from "./ViewAllCard";

/** Home page: first 2 events; with 3 or more, a "view all" card leads to the Speaking page. */
export default function SpeakingPreview() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLElement>();
  const limit = siteConfig.preview.speaking;
  const shown = [...speaking].sort(byDateDesc).slice(0, limit);
  const more = speaking.length > limit;
  return (
    <section id="speaking" ref={ref} className="section" aria-labelledby="speaking-title">
      <div className="container">
        <SectionHeading id="speaking-title" index="07" title={t.speaking.title} subtitle={t.speaking.subtitle}>
          {more && (
            <Link to="/speaking" className="link-subtle heading-link">
              {t.viewAll.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </SectionHeading>
        {shown.length ? <SpeakingTimeline events={shown} label={t.speaking.title} /> : <div className="empty-state"><p>{t.speaking.noResults}</p></div>}
        {more && (
          <div className="viewall-row" data-reveal>
            <ViewAllCard to="/speaking" title={t.viewAll.speakingTitle} sub={t.viewAll.speakingSub} count={speaking.length} label={t.viewAll.label} />
          </div>
        )}
      </div>
    </section>
  );
}
