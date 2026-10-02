import { Link } from "react-router-dom";
import { media } from "../data/media";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import { byDateDesc } from "../utils/date";
import MediaCard from "./MediaCard";
import SectionHeading from "./SectionHeading";
import StoriesCarousel from "./StoriesCarousel";
import ViewAllCard from "./ViewAllCard";

/** Home page: story circles + a couple of media cards + a "view all" card. */
export default function MediaPreview() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLElement>();
  const latest = [...media].sort(byDateDesc).slice(0, siteConfig.preview.media);
  return (
    <section id="media" ref={ref} className="section" aria-labelledby="media-title">
      <div className="container">
        <SectionHeading id="media-title" index="06" title={t.media.title} subtitle={t.media.subtitle}>
          <Link to="/media" className="link-subtle heading-link">
            {t.viewAll.label} <span aria-hidden="true">→</span>
          </Link>
        </SectionHeading>
      </div>
      <div data-reveal>
        <StoriesCarousel />
      </div>
      <div className="container">
        <ul className="media-grid" data-reveal>
          {latest.map((m) => (
            <li key={m.id}>
              <MediaCard item={m} />
            </li>
          ))}
          <li>
            <ViewAllCard to="/media" title={t.viewAll.mediaTitle} sub={t.viewAll.mediaSub} count={media.length} label={t.viewAll.label} />
          </li>
        </ul>
      </div>
    </section>
  );
}
