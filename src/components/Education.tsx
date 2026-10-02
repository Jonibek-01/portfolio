import { education } from "../data/education";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  const { t, l } = useLanguage();
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="section section-tight" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading id="education-title" index="03" title={t.education.title} subtitle={t.education.subtitle} />
        <ul className="edu-grid">
          {education.map((e) => (
            <li key={e.id} className="edu-card" data-reveal>
              <span className="edu-year">{e.year}</span>
              <h3>{e.institution}</h3>
              {e.department && <p className="edu-dept">{e.department}</p>}
              <p className="edu-field">{l(e.field)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
