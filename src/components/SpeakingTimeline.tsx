import type { SpeakingEvent } from "../data/speaking";
import { useLanguage } from "../hooks/useLanguage";
import { byDateDesc, formatDate, getYear } from "../utils/date";
import { isRealUrl } from "../utils/links";
import { parseVideo } from "../utils/video";
import LiteVideo from "./LiteVideo";
import Timeline, { type TimelineItem } from "./Timeline";

/** Timeline of speaking events. A video / link appears only when the event has one. */
export default function SpeakingTimeline({ events, label }: { events: SpeakingEvent[]; label: string }) {
  const { t, l } = useLanguage();

  const items: TimelineItem[] = [...events].sort(byDateDesc).map((e) => {
    const video = parseVideo(e.video);
    const playable = video && video.kind !== "link";
    const link = isRealUrl(e.url) ? e.url : video?.kind === "link" ? video.src : undefined;
    const title = l(e.title);
    return {
      id: e.id,
      marker: getYear(e.date),
      markerSub: formatDate(e.date, t).replace(` ${getYear(e.date)}`, ""),
      title,
      meta: [l(e.type), e.online ? t.speaking.online : l(e.location)].filter(Boolean),
      body: l(e.description),
      extra:
        playable || link ? (
          <div className="tl-extra">
            {playable && <LiteVideo url={e.video} title={title} />}
            {link && (
              <a className="btn btn-ghost btn-sm" href={link} target="_blank" rel="noopener noreferrer">
                {t.video.openLink}
                <span className="sr-only"> — {title} ({t.common.external})</span>
              </a>
            )}
          </div>
        ) : undefined,
    };
  });

  return <Timeline items={items} label={label} />;
}
