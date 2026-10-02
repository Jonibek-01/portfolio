// Detects where a video URL comes from, so any source can be dropped into the data files.
export type VideoSource =
  | { kind: "youtube"; id: string; short?: boolean }
  | { kind: "file"; src: string }
  | { kind: "link"; src: string }; // Instagram, Telegram, TikTok... cannot be embedded – shown as a link

const YT_ID = /^[\w-]{11}$/;

export function parseVideo(url?: string): VideoSource | null {
  if (!url || url === "#") return null;
  const u = url.trim();
  if (/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(u)) return { kind: "file", src: u };
  try {
    const parsed = new URL(u, window.location.origin);
    const host = parsed.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      if (YT_ID.test(id)) return { kind: "youtube", id };
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = parsed.searchParams.get("v");
      if (v && YT_ID.test(v)) return { kind: "youtube", id: v };
      const m = parsed.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/);
      if (m) return { kind: "youtube", id: m[1], short: parsed.pathname.startsWith("/shorts/") };
    }
  } catch {
    /* not a URL */
  }
  return { kind: "link", src: u };
}

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export function youtubeEmbed(id: string, opts: { autoplay?: boolean; mute?: boolean; controls?: boolean; api?: boolean } = {}) {
  const q = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    autoplay: opts.autoplay ? "1" : "0",
    mute: opts.mute ? "1" : "0",
    controls: opts.controls === false ? "0" : "1",
    ...(opts.api ? { enablejsapi: "1", origin: window.location.origin } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}
