import { milestones } from "../data/career";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";

export default function Milestones() {
  const { t, l } = useLanguage();
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="milestones" aria-label={t.milestones.title}>
      <div className="container">
        <ul className="milestones-list">
          {milestones.map((m) => (
            <li key={m.value} className="milestone" data-reveal>
              <span className="milestone-value">{m.current ? t.common.current : m.value}</span>
              <span className="milestone-label">{l(m.label)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
