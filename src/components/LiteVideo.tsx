import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { useLanguage } from "../hooks/useLanguage";
import { parseVideo, youtubeEmbed, youtubeThumb } from "../utils/video";

/**
 * Plays a video from any supported source:
 *  - YouTube link  -> light poster, loads the player only after a click
 *  - .mp4 / .webm  -> native player
 *  - anything else -> renders nothing (the caller shows a link button instead)
 */
export default function LiteVideo({ url, title, poster }: { url?: string; title: string; poster?: string }) {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const src = parseVideo(url);
  if (!src || src.kind === "link") return null;

  if (src.kind === "file") {
    return (
      <div className="video-frame">
        <video controls playsInline preload="metadata" poster={poster} src={src.src} aria-label={title} />
      </div>
    );
  }

  return (
    <div className="video-frame">
      {playing ? (
        <iframe
          src={youtubeEmbed(src.id, { autoplay: true })}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={`${t.video.play}: ${title}`}>
          <img src={poster || youtubeThumb(src.id)} alt="" loading="lazy" decoding="async" />
          <span className="video-poster-play" aria-hidden="true">
            <FiPlay />
          </span>
        </button>
      )}
    </div>
  );
}
