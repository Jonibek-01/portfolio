// =====================================================
// MEDIA (video, podcast, interview)
// Add new items to the `media` array below – no component changes needed.
//
//   type: "video" | "podcast" | "interview"
//   thumbnail: "/images/media/your-file.webp" or "" for the generated placeholder
//   url: link to the original. Use "" or "#" while it is not confirmed.
//   video: optional – YouTube link or .mp4; plays inside the card's detail view.
//   duration: optional, e.g. "42 min"
//
// Example podcast:
//   {
//     id: "media-002",
//     type: "podcast",
//     title: "Episode title",
//     platform: "Podcast name",
//     date: "2026-09-01",
//     description: "Short description...",
//     thumbnail: "",
//     url: "https://...",
//     duration: "38 min",
//     topics: ["Central Asia"],
//   }
// =====================================================
import type { LText } from "../i18n/localize";

export type MediaType = "video" | "podcast" | "interview";

export interface MediaItem {
  id: string;
  type: MediaType;
  title: LText;
  platform: LText;
  date: string;
  speaker?: string;
  description: LText;
  thumbnail: string;
  url: string;
  /** Optional playable video (YouTube link or .mp4/.webm). Falls back to `url` if that is a YouTube link. */
  video?: string;
  duration?: string;
  topics: string[];
}

export const MEDIA_TYPES: MediaType[] = ["video", "podcast", "interview"];

export const media: MediaItem[] = [
  {
    id: "media-001",
    type: "video",
    title: {
      en: "Petro’s White House Visit and the Nuclear Race Threshold",
      uz: "Petroning Oq uyga tashrifi va yadro poygasi bosagʻasi",
    },
    platform: { en: "Kun.uz — Geopolitics", uz: "Kun.uz — Geosiyosat" },
    date: "2026-02-12",
    speaker: "Hamza Boltayev",
    description: {
      en: "Hamza Boltayev analyzed current events in global politics on the Geopolitics program of Kun.uz.",
      uz: "Hamza Boltayev Kun.uz’ning «Geosiyosat» dasturida global siyosatdagi dolzarb voqealarni tahlil qildi.",
    },
    thumbnail: "",
    // TODO: Add official video URL (direct Kun.uz / YouTube link, or the official IAIS media page)
    url: "#",
    topics: ["Geopolitics", "Nuclear"],
  },
];
