import { FiDownload } from "react-icons/fi";
import { useCvFile } from "../hooks/useCvFile";
import { useLanguage } from "../hooks/useLanguage";

/** "Download CV" – renders only when a CV file exists in public/cv/ (see src/data/cv.ts). */
export default function CvButton({ variant = "button" }: { variant?: "button" | "link" }) {
  const { t } = useLanguage();
  const href = useCvFile();
  if (!href) return null;
  const className = variant === "link" ? "cv-link" : "btn btn-ghost";
  return (
    <a className={className} href={href} download aria-label={t.cv.label}>
      <FiDownload aria-hidden /> {t.cv.download}
    </a>
  );
}
