import { useMemo, useState } from "react";
import { images } from "../data/images";
import { stories } from "../data/stories";
import { useLanguage } from "../hooks/useLanguage";
import { parseVideo, youtubeEmbed, youtubeThumb } from "../utils/video";
import StoryViewer, { type ResolvedStory } from "./StoryViewer";

const MIN_SLOTS = 12; // circles are repeated until the row is at least this long, so it always fills the screen

/**
 * Round story circles that scroll sideways by themselves.
 * A circle with a video has a coloured ring; the first one plays its video silently in a loop.
 * Renders nothing when src/data/stories.ts is empty.
 */
export default function StoriesCarousel() {
  const { t, l } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const items: ResolvedStory[] = useMemo(
    () => stories.map((s) => ({ id: s.id, title: l(s.title), cover: s.cover, video: parseVideo(s.video), link: s.link })),
    [l]
  );
  if (!items.length) return null;

  const repeat = Math.ceil(MIN_SLOTS / items.length);
  const unit = Array.from({ length: repeat }, () => items).flat();
  const duration = Math.max(24, unit.length * 4);

  return (
    <>
      <div className="stories" role="region" aria-label={t.stories.label}>
        <div className="stories-track" style={{ animationDuration: `${duration}s` }}>
          {[0, 1].map((copy) => (
            <ul className="stories-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {unit.map((s, i) => {
                const idx = i % items.length;
                const hasVideo = !!s.video && s.video.kind !== "link";
                const isFirst = copy === 0 && i === 0;
                const cover = s.cover || (s.video?.kind === "youtube" ? youtubeThumb(s.video.id) : undefined);
                return (
                  <li key={`${copy}-${i}`}>
                    <button
                      type="button"
                      className={hasVideo ? "story-circle has-video" : "story-circle"}
                      onClick={() => setOpen(idx)}
                      aria-label={`${t.stories.open}: ${s.title}`}
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      <span className="story-ring">
                        <span className="story-disc">
                          {isFirst && s.video?.kind === "file" ? (
                            <video src={s.video.src} poster={cover} muted loop autoPlay playsInline preload="metadata" aria-hidden="true" />
                          ) : isFirst && s.video?.kind === "youtube" ? (
                            <iframe
                              tabIndex={-1}
                              aria-hidden="true"
                              title=""
                              loading="lazy"
                              src={youtubeEmbed(s.video.id, { autoplay: true, mute: true, controls: false }) + `&loop=1&playlist=${s.video.id}&start=0&end=30&disablekb=1&iv_load_policy=3`}
                            />
                          ) : s.video?.kind === "file" && !s.cover ? (
                            <video src={`${s.video.src}#t=0.1`} muted playsInline preload="metadata" aria-hidden="true" />
                          ) : cover ? (
                            <img src={cover} alt="" loading="lazy" decoding="async" />
                          ) : (
                            <img className="story-fallback" src={images.logoMark} alt="" />
                          )}
                        </span>
                      </span>
                      <span className="story-label">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
      {open !== null && <StoryViewer stories={items} start={open} onClosed={() => setOpen(null)} />}
    </>
  );
}
