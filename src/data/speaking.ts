// =====================================================
// SPEAKING (conferences, seminars, webinars)
// Add new events to the `speaking` array – order does not matter,
// the timeline sorts by date (newest first).
//
// Optional fields (leave out when you have nothing to attach – nothing is shown):
//   video: "https://www.youtube.com/watch?v=..."   -> inline video player
//   url:   "https://..."                            -> "Open link" button
// The home page shows the first 2 events; with 3+ a "View all" card appears.
// =====================================================
import type { LText } from "../i18n/localize";

export interface SpeakingEvent {
  id: string;
  title: LText;
  date: string;
  location?: LText; // leave undefined for online events
  online?: boolean;
  type: LText;
  description: LText;
  /** Optional video (YouTube link or direct .mp4/.webm). If omitted, nothing is shown. */
  video?: string;
  /** Optional link (event page, post, article...). If omitted, nothing is shown. */
  url?: string;
  topics?: string[];
}

export const speaking: SpeakingEvent[] = [
  {
    id: "speaking-001",
    title: {
      en: "Afghanistan – Uzbekistan Relations: Opportunities and Future Scenarios",
      uz: "Afgʻoniston – Oʻzbekiston munosabatlari: imkoniyatlar va kelajak stsenariylari",
    },
    date: "2025-12-13",
    location: { en: "Kabul", uz: "Kobul" },
    type: { en: "Seminar", uz: "Seminar" },
    description: {
      en: "Hamza Boltaev delivered a speech at a seminar focused on Afghanistan–Uzbekistan relations, opportunities and future scenarios.",
      uz: "Hamza Boltaev Afgʻoniston–Oʻzbekiston munosabatlari, imkoniyatlar va kelajak stsenariylariga bagʻishlangan seminarda nutq soʻzladi.",
    },
    topics: ["Afghanistan", "Uzbekistan", "Diplomacy"],
  },
  {
    id: "speaking-002",
    title: {
      en: "Pakistan and the Turkic States – From Shared Roots and Strategic Partnership",
      uz: "Pokiston va turkiy davlatlar — umumiy ildizlardan strategik hamkorlikka",
    },
    date: "2026-05-18",
    online: true,
    type: { en: "International Webinar", uz: "Xalqaro vebinar" },
    description: {
      en: "Hamza Boltaev participated in an online international webinar examining Pakistan’s relations with Turkic states.",
      uz: "Hamza Boltaev Pokistonning turkiy davlatlar bilan munosabatlarini oʻrganishga bagʻishlangan onlayn xalqaro vebinarda ishtirok etdi.",
    },
    topics: ["Geopolitics", "Diplomacy"],
  },
];
