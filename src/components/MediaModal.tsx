import { useRef } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { media } from "../data/media";
import { useDialog } from "../hooks/useDialog";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import { formatDate } from "../utils/date";
import { isRealUrl } from "../utils/links";
import { parseVideo, youtubeThumb } from "../utils/video";
import LiteVideo from "./LiteVideo";
import MediaPlaceholder from "./MediaPlaceholder";

export default function MediaModal() {
  const { openMediaId, closeMedia } = useUI();
  const item = media.find((m) => m.id === openMediaId);
  if (!item) return null;
  return <Body key={item.id} id={item.id} onClosed={closeMedia} />;
}

function Body({ id, onClosed }: { id: string; onClosed: () => void }) {
  const { t, l, topic } = useLanguage();
  const item = media.find((m) => m.id === id)!;
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useDialog(rootRef, panelRef, { onClosed, initialFocus: ".modal-close" });

  const video = parseVideo(item.video ?? item.url);
  const playable = video && video.kind !== "link";
  const poster = item.thumbnail || (video?.kind === "youtube" ? youtubeThumb(video.id) : "");
  const title = l(item.title);

  return (
    <div ref={rootRef} className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div ref={panelRef} className="modal-panel modal-media" role="dialog" aria-modal="true" aria-labelledby="media-modal-title">
        <span className="modal-handle" aria-hidden="true" />
        <button type="button" className="icon-btn modal-close" onClick={close} aria-label={t.common.close}>
          <FiX aria-hidden />
        </button>

        <div className="modal-scroll">
          {playable ? (
            <LiteVideo url={item.video ?? item.url} title={title} poster={item.thumbnail || undefined} />
          ) : (
            <div className="video-frame">{poster ? <img src={poster} alt="" /> : <MediaPlaceholder label={t.nav.media.toUpperCase()} />}</div>
          )}

          <p className="eyebrow">
            {t.media.typeLabels[item.type]} · <time dateTime={item.date}>{formatDate(item.date, t)}</time>
          </p>
          <h2 id="media-modal-title" className="modal-title">{title}</h2>
          <p className="modal-platform">{l(item.platform)}{item.speaker ? ` · ${item.speaker}` : ""}</p>
          <p className="modal-desc">{l(item.description)}</p>
          <ul className="chip-list" aria-label={t.publications.topicsLabel}>
            {item.topics.map((tp) => (
              <li key={tp} className="chip chip-static">{topic(tp)}</li>
            ))}
          </ul>
        </div>

        <div className="modal-actions">
          {isRealUrl(item.url) ? (
            <a className="btn btn-primary" href={item.url} target="_blank" rel="noopener noreferrer">
              {t.video.watchOn} <FiArrowUpRight aria-hidden />
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
