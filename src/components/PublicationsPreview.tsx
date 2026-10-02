import { Link } from "react-router-dom";
import { publications } from "../data/publications";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import { byDateDesc } from "../utils/date";
import PublicationCard from "./PublicationCard";
import SectionHeading from "./SectionHeading";
import ViewAllCard from "./ViewAllCard";

/** Home page: the latest few publications + a "view all" card that opens the Publications page. */
export default function PublicationsPreview() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLElement>();
  const latest = [...publications].sort(byDateDesc).slice(0, siteConfig.preview.publications);
  return (
    <section id="publications" ref={ref} className="section" aria-labelledby="publications-title">
      <div className="container">
        <SectionHeading id="publications-title" index="05" title={t.publications.title} subtitle={t.publications.subtitle}>
          <Link to="/publications" className="link-subtle heading-link">
            {t.viewAll.label} <span aria-hidden="true">→</span>
          </Link>
        </SectionHeading>
        <ul className="pub-grid" data-reveal>
          {latest.map((p) => (
            <li key={p.id}>
              <PublicationCard publication={p} />
            </li>
          ))}
          <li>
            <ViewAllCard
              to="/publications"
              title={t.viewAll.publicationsTitle}
              sub={t.viewAll.publicationsSub}
              count={publications.length}
              label={t.viewAll.label}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
