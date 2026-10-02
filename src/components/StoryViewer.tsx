import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import { siteConfig } from "../data/siteConfig";
import { useDialog } from "../hooks/useDialog";
import { useLanguage } from "../hooks/useLanguage";
import { isRealUrl } from "../utils/links";
import { youtubeEmbed, youtubeThumb, type VideoSource } from "../utils/video";

export interface ResolvedStory {
  id: string;
  title: string;
  cover?: string;
  video: VideoSource | null;
  link?: string;
}

const IMAGE_SECONDS = 6;
const CAP = siteConfig.storyMaxSeconds;

/** Fullscreen story player (Instagram-style): progress bars, tap zones, sound toggle, "View details" link. */
export default function StoryViewer({ stories, start, onClosed }: { stories: ResolvedStory[]; start: number; onClosed: () => void }) {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useDialog(rootRef, panelRef, { onClosed, initialFocus: ".story-close", panelFrom: "none" });

  const [index, setIndex] = useState(start);
  const [progress, setProgress] = useState(0); // 0..1 for the current story
  const [muted, setMuted] = useState(false);
  const story = stories[index];

  const next = useCallback(() => {
    if (index >= stories.length - 1) close();
    else setIndex((i) => i + 1);
  }, [index, stories.length, close]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => setProgress(0), [index]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const hasMedia = story.video && story.video.kind !== "link";
  const wide = story.video?.kind === "youtube" && !story.video.short; // landscape YouTube video -> wide stage
  const details = story.link ?? (story.video?.kind === "link" ? story.video.src : undefined);
  const cover = story.cover || (story.video?.kind === "youtube" ? youtubeThumb(story.video.id) : undefined);

  return (
    <div ref={rootRef} className="story-overlay" role="dialog" aria-modal="true" aria-label={t.stories.viewer} data-cursor="disable">
      <button type="button" className="story-backdrop" aria-label={t.stories.close} tabIndex={-1} onClick={close} />

      <button type="button" className="story-arrow story-arrow-prev" onClick={prev} aria-label={t.stories.prev} disabled={index === 0}>
        <FiChevronLeft aria-hidden />
      </button>

      <div ref={panelRef} className={wide ? "story-stage is-wide" : "story-stage"}>
        {/* progress bars */}
        <div className="story-bars" aria-hidden="true">
          {stories.map((s, i) => (
            <span key={s.id} className="story-bar">
              <span className="story-bar-fill" style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }} />
            </span>
          ))}
        </div>

        <div className="story-head">
          <span className="story-head-title">{story.title}</span>
          <div className="story-head-actions">
            {hasMedia && (
              <button type="button" className="story-icon" onClick={() => setMuted((m) => !m)} aria-label={muted ? t.stories.unmute : t.stories.mute} aria-pressed={!muted}>
                {muted ? <FiVolumeX aria-hidden /> : <FiVolume2 aria-hidden />}
              </button>
            )}
            <button type="button" className="story-icon story-close" onClick={close} aria-label={t.stories.close}>
              <FiX aria-hidden />
            </button>
          </div>
        </div>

        <div className="story-media">
          <StoryMedia key={story.id} story={story} cover={cover} muted={muted} onProgress={setProgress} onEnd={next} />
        </div>

        {/* tap zones (mobile): left = previous, right = next */}
        <button type="button" className="story-tap story-tap-prev" onClick={prev} aria-label={t.stories.prev} tabIndex={-1} />
        <button type="button" className="story-tap story-tap-next" onClick={next} aria-label={t.stories.next} tabIndex={-1} />

        {isRealUrl(details) && (
          <div className="story-foot">
            <a className="btn btn-primary" href={details} target="_blank" rel="noopener noreferrer">
              {t.stories.details} <FiArrowUpRight aria-hidden />
              <span className="sr-only"> ({t.common.external})</span>
            </a>
          </div>
        )}
      </div>

      <button type="button" className="story-arrow story-arrow-next" onClick={next} aria-label={t.stories.next}>
        <FiChevronRight aria-hidden />
      </button>
    </div>
  );
}

/** Plays one story: native video, YouTube (muted/seek via postMessage) or a still cover. */
function StoryMedia({ story, cover, muted, onProgress, onEnd }: { story: ResolvedStory; cover?: string; muted: boolean; onProgress: (p: number) => void; onEnd: () => void }) {
  const src = story.video;
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const endRef = useRef(onEnd);
  const progRef = useRef(onProgress);
  endRef.current = onEnd;
  progRef.current = onProgress;
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  // Handles both sources: given (current, duration) decide progress / loop / next.
  const tick = useCallback((cur: number, dur: number, restart: () => void) => {
    const limit = dur > 0 ? Math.min(dur, CAP) : CAP;
    progRef.current(Math.min(1, cur / limit));
    if (dur > CAP && cur >= CAP) {
      // longer than the limit -> start again from the beginning
      progRef.current(0);
      restart();
    }
  }, []);

  // --- native video ---
  useEffect(() => {
    const v = videoRef.current;
    if (!v || src?.kind !== "file") return;
    v.muted = mutedRef.current;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => undefined);
    });
  }, [src]);
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // --- YouTube ---
  useEffect(() => {
    if (src?.kind !== "youtube") return;
    const frame = frameRef.current;
    const send = (func: string, args: unknown[] = []) =>
      frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
    const onMsg = (e: MessageEvent) => {
      if (e.source !== frame?.contentWindow || typeof e.data !== "string") return;
      let data: { event?: string; info?: { currentTime?: number; duration?: number; playerState?: number } };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      if (data.event !== "infoDelivery" || !data.info) return;
      const { currentTime, duration, playerState } = data.info;
      if (playerState === 0) {
        // ended: a short video moves on, a long one (should not happen before CAP) restarts
        if ((duration ?? 0) > CAP) {
          send("seekTo", [0, true]);
          send("playVideo");
        } else endRef.current();
        return;
      }
      if (typeof currentTime === "number") {
        tick(currentTime, duration ?? 0, () => {
          send("seekTo", [0, true]);
          send("playVideo");
        });
      }
    };
    window.addEventListener("message", onMsg);
    const listen = () => frame?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
    frame?.addEventListener("load", listen);
    return () => {
      window.removeEventListener("message", onMsg);
      frame?.removeEventListener("load", listen);
    };
  }, [src, tick]);
  useEffect(() => {
    if (src?.kind !== "youtube") return;
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: muted ? "mute" : "unMute", args: [] }), "*");
  }, [muted, src]);

  // --- still image (or link-only video): timed ---
  useEffect(() => {
    if (src && src.kind !== "link") return;
    const started = performance.now();
    const id = window.setInterval(() => {
      const p = (performance.now() - started) / (IMAGE_SECONDS * 1000);
      progRef.current(Math.min(1, p));
      if (p >= 1) {
        window.clearInterval(id);
        endRef.current();
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [src]);

  if (src?.kind === "file") {
    return (
      <video
        ref={videoRef}
        className="story-video"
        src={src.src}
        poster={cover}
        playsInline
        preload="auto"
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          tick(v.currentTime, v.duration || 0, () => {
            v.currentTime = 0;
            v.play().catch(() => undefined);
          });
        }}
        onEnded={() => endRef.current()}
      />
    );
  }
  if (src?.kind === "youtube") {
    return (
      <iframe
        ref={frameRef}
        className={src.short ? "story-frame is-short" : "story-frame"}
        src={youtubeEmbed(src.id, { autoplay: true, mute: mutedRef.current, controls: false, api: true })}
        title={story.title}
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    );
  }
  return cover ? <img className="story-video" src={cover} alt={story.title} /> : <div className="story-video story-empty" />;
}

