import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useLanguage } from "../hooks/useLanguage";

export default function PageHeader({ title, subtitle, count }: { title: string; subtitle: string; count?: number }) {
  const { t } = useLanguage();
  return (
    <header className="page-header">
      <Link to="/" className="back-link">
        <FiArrowLeft aria-hidden /> {t.pages.back}
      </Link>
      <h1 className="page-title">{title}</h1>
      <p className="section-subtitle">{subtitle}</p>
      {count !== undefined && <span className="page-count" aria-hidden="true">{count}</span>}
    </header>
  );
}
