import { useRef } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { publications } from "../data/publications";
import { useDialog } from "../hooks/useDialog";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import { formatDate } from "../utils/date";
import { isRealUrl } from "../utils/links";

export default function PublicationModal() {
  const { openPublicationId, closePublication } = useUI();
  const pub = publications.find((p) => p.id === openPublicationId);
  if (!pub) return null;
  // key forces a fresh mount (and open animation) per publication
  return <ModalBody key={pub.id} id={pub.id} onClosed={closePublication} />;
}

function ModalBody({ id, onClosed }: { id: string; onClosed: () => void }) {
  const { t, l, topic } = useLanguage();
  const pub = publications.find((p) => p.id === id)!;
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useDialog(rootRef, panelRef, { onClosed, initialFocus: ".modal-close" });

  return (
    <div
      ref={rootRef}
      className="modal-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div ref={panelRef} className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="pub-modal-title">
        <span className="modal-handle" aria-hidden="true" />
        <button type="button" className="icon-btn modal-close" onClick={close} aria-label={t.common.close}>
          <FiX aria-hidden />
        </button>
        <div className="modal-scroll">

        <p className="eyebrow">
          {t.publications.categoryLabels[pub.category]} · {pub.date.slice(0, 4)}
        </p>
        <h2 id="pub-modal-title" className="modal-title">{l(pub.title)}</h2>

        <dl className="modal-meta">
          <div>
            <dt>{t.publications.by}</dt>
            <dd>{pub.authors.join(", ")}</dd>
          </div>
          <div>
            <dt>{t.publications.date}</dt>
            <dd><time dateTime={pub.date}>{formatDate(pub.date, t)}</time></dd>
          </div>
          <div>
            <dt>{t.publications.publisher}</dt>
            <dd>{pub.publisher}</dd>
          </div>
        </dl>

        <p className="modal-desc">{l(pub.description)}</p>

        <ul className="chip-list" aria-label={t.publications.topicsLabel}>
          {pub.topics.map((tp) => (
            <li key={tp} className="chip chip-static">{topic(tp)}</li>
          ))}
        </ul>
        </div>

        <div className="modal-actions">
          {isRealUrl(pub.url) ? (
            <a className="btn btn-primary" href={pub.url} target="_blank" rel="noopener noreferrer">
              {t.publications.readFull} <FiArrowUpRight aria-hidden />
              <span className="sr-only"> ({t.common.external})</span>
            </a>
          ) : (
            <button type="button" className="btn btn-primary" disabled>
              {t.common.linkSoon}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
