import { FiPlay } from "react-icons/fi";
import type { MediaItem } from "../data/media";
import { useLanguage } from "../hooks/useLanguage";
import { useUI } from "../hooks/useUI";
import { formatDateShort } from "../utils/date";
import { parseVideo, youtubeThumb } from "../utils/video";
import MediaPlaceholder from "./MediaPlaceholder";

/** Compact card; the whole card opens a detail view (MediaModal). Content comes from src/data/media.ts */
export default function MediaCard({ item }: { item: MediaItem }) {
  const { t, l } = useLanguage();
  const { openMedia } = useUI();
  const video = parseVideo(item.video ?? item.url);
  const thumb = item.thumbnail || (video?.kind === "youtube" ? youtubeThumb(video.id) : "");
  const actionLabel = item.type === "podcast" ? t.media.listen : item.type === "video" ? t.media.watch : t.media.read;
  const title = l(item.title);

  return (
    <article className="media-card">
      <div className="media-thumb">
        {thumb ? <img src={thumb} alt="" loading="lazy" decoding="async" /> : <MediaPlaceholder label={t.nav.media.toUpperCase()} />}
        <div className="media-shade" />
        <span className="media-play" aria-hidden="true">
          <FiPlay />
        </span>
        {item.duration && <span className="media-duration">{item.duration}</span>}
      </div>

      <div className="media-body">
        <p className="media-meta">
          <span>{t.media.typeLabels[item.type]} · {t.media.appearance}</span>
          <time dateTime={item.date}>{formatDateShort(item.date, t)}</time>
        </p>
        <h3 className="media-title">
          <button type="button" className="card-open" onClick={() => openMedia(item.id)}>
            {title}
          </button>
        </h3>
        <p className="media-platform">{l(item.platform)}</p>
        <p className="media-desc">{l(item.description)}</p>
        <span className="media-action" aria-hidden="true">{actionLabel} →</span>
      </div>
    </article>
  );
}
