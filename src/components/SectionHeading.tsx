import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  index?: string; // e.g. "01"
  children?: ReactNode;
}

export default function SectionHeading({ id, title, subtitle, index, children }: Props) {
  return (
    <header className="section-heading" data-reveal>
      {index && <span className="section-index" aria-hidden="true">{index}</span>}
      <div className="section-heading-text">
        <h2 id={id} className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {children}
    </header>
  );
}
