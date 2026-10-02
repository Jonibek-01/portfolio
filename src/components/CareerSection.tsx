import { career } from "../data/career";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";
import Timeline, { type TimelineItem } from "./Timeline";

export default function CareerSection() {
  const { t, l } = useLanguage();
  const ref = useReveal<HTMLElement>();
  const items: TimelineItem[] = career.map((c) => ({
    id: c.id,
    marker: c.current ? t.common.current : c.period,
    title: c.organization,
    body: l(c.detail),
    note: c.note ? l(c.note) : undefined,
    current: c.current,
  }));
  return (
    <section ref={ref} className="section" aria-labelledby="career-title">
      <div className="container">
        <SectionHeading id="career-title" index="02" title={t.career.title} subtitle={t.career.subtitle} />
        <Timeline items={items} label={t.career.title} />
      </div>
    </section>
  );
}
