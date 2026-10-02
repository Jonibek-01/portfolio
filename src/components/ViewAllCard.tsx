import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

/** The last card of a home-page preview grid: leads to the full page. */
export default function ViewAllCard({ to, title, sub, count, label }: { to: string; title: string; sub: string; count: number; label: string }) {
  return (
    <Link to={to} className="viewall-card">
      <span className="viewall-count" aria-hidden="true">{count}</span>
      <span className="viewall-text">
        <span className="viewall-title">{title}</span>
        <span className="viewall-sub">{sub}</span>
      </span>
      <span className="viewall-cta">
        {label}
        <span className="viewall-arrow" aria-hidden="true"><FiArrowRight /></span>
      </span>
    </Link>
  );
}
