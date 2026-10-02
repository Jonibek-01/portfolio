import { researchAreas, researchInitiatives } from "../data/researchTopics";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function ResearchSection() {
  const { t, l } = useLanguage();
  const ref = useReveal<HTMLElement>();
  return (
    <section id="research" ref={ref} className="section" aria-labelledby="research-title">
      <div className="container">
        <SectionHeading id="research-title" index="04" title={t.research.title} subtitle={t.research.subtitle} />

        <ul className="research-grid">
          {researchAreas.map((area, i) => (
            <li key={area.id} className="research-card" data-reveal>
              <span className="research-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{l(area.title)}</h3>
              <p>{l(area.description)}</p>
            </li>
          ))}
        </ul>

        <div className="initiatives" data-reveal>
          <h3 className="initiatives-title">{t.research.initiatives}</h3>
          <ul>
            {researchInitiatives.map((item, i) => (
              <li key={i}>{l(item)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
