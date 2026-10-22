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
    // Official IAIS media page. TODO (optional): add `video: "<Kun.uz / YouTube link>"` to play it inside the card.
    url: "https://iais.uz/en/outputnew/petros-white-house-visit-and-the-nuclear-race-threshold",
    topics: ["Geopolitics", "Nuclear"],
  },
  {
    id: "media-002",
    type: "video",
    title: { en: "The Pakistan Factor and Unusual Changes in China", uz: "Pokiston omili va Xitoydagi odatiy boʻlmagan oʻzgarishlar" },
    platform: { en: "Kun.uz — Geopolitics", uz: "Kun.uz — Geosiyosat" },
    date: "2026-02-10",
    speaker: "Hamza Boltaev",
    description: {
      en: "On the Geopolitics program of Kun.uz, Hamza Boltaev emphasized that Pakistan’s role in today’s international politics is becoming increasingly significant.",
      uz: "Kun.uz’ning «Geosiyosat» dasturida Hamza Boltaev bugungi xalqaro siyosatda Pokiston roli tobora ortib borayotganini taʼkidladi.",
    },
    thumbnail: "",
    url: "https://iais.uz/en/outputnew/the-pakistan-factor-and-unusual-changes-in-china",
    topics: ["Geopolitics", "Pakistan", "China"],
  },
  {
    id: "media-003",
    type: "interview",
    title: {
      en: "Uzbekistan’s Initiatives to Ensure Stability and Development in Afghanistan",
      uz: "Oʻzbekistonning Afgʻonistonda barqarorlik va rivojlanishni taʼminlash tashabbuslari",
    },
    platform: { en: "UzA news agency", uz: "OʻzA axborot agentligi" },
    date: "2025-10-06",
    speaker: "Hamza Boltaev",
    description: {
      en: "In an interview with the UzA news agency, Hamza Boltaev comments on Uzbekistan’s initiatives for stability and development in Afghanistan, including the importance of the “Termez Dialogue”.",
      uz: "OʻzA axborot agentligiga bergan intervyusida Hamza Boltaev Oʻzbekistonning Afgʻonistonda barqarorlik va rivojlanishni taʼminlash tashabbuslarini, jumladan «Termiz dialogi»ning ahamiyatini sharhlaydi.",
    },
    thumbnail: "",
    url: "https://iais.uz/en/outputnew/uzbekistans-initiatives-to-ensure-stability-and-development-in-afghanistan",
    topics: ["Afghanistan", "Uzbekistan", "Diplomacy"],
  },
  {
    id: "media-004",
    type: "interview",
    title: {
      en: "Will the Confrontation Between India and Pakistan Turn into a War?",
      uz: "Hindiston va Pokiston oʻrtasidagi qarama-qarshilik urushga aylanadimi?",
    },
    platform: { en: "Paradigma.uz", uz: "Paradigma.uz" },
    date: "2025-05-15",
    speaker: "Hamza Boltaev",
    description: {
      en: "An interview on Paradigma.uz about the likelihood of further escalation of the Kashmir conflict amid a series of regional wars.",
      uz: "Paradigma.uz’dagi intervyu: bir qator mintaqaviy urushlar fonida Kashmir mojarosining yanada keskinlashish ehtimoli haqida.",
    },
    thumbnail: "",
    url: "https://iais.uz/en/outputnew/will-the-confrontation-between-india-and-pakistan-turn-into-a-war",
    topics: ["Pakistan", "India", "Security", "Geopolitics"],
  },
  {
    id: "media-005",
    type: "interview",
    title: { en: "Pakistan–India War: YES, or NO?", uz: "Pokiston–Hindiston urushi: HA yoki YOʻQ?" },
    platform: { en: "Interview (IAIS media appearance)", uz: "Intervyu (IAIS media chiqishi)" },
    date: "2025-05-06",
    speaker: "Hamza Boltaev",
    description: {
      en: "An in-depth interview on international relations and geopolitical threats, with insights into the sources of tension between Pakistan and India.",
      uz: "Xalqaro munosabatlar va geosiyosiy tahdidlarning chuqur tahliliga bagʻishlangan intervyu: Pokiston va Hindiston oʻrtasidagi keskinlik manbalari haqida.",
    },
    thumbnail: "",
    url: "https://iais.uz/en/outputnew/pakistan-india-war-yes-or-no",
    topics: ["Pakistan", "India", "Security", "Geopolitics"],
  },
  {
    id: "media-006",
    type: "video",
    title: { en: "The US and the Taliban: IAIS Researchers’ Views", uz: "AQSh va Tolibon: IAIS tadqiqotchilari nazari" },
    platform: { en: "Kun.uz — Geopolitics", uz: "Kun.uz — Geosiyosat" },
    date: "2025-04-10",
    speaker: "Hamza Boltaev",
    description: {
      en: "On Kun.uz’s Geopolitics, Hamza Boltaev and Dr. Islomkhon Gafarov discussed relations between the US and the Taliban and the West’s approach to Afghanistan.",
      uz: "Kun.uz’ning «Geosiyosat» dasturida Hamza Boltaev va dr. Islomxon Gʻafarov AQSh–Tolibon munosabatlari hamda Gʻarbning Afgʻonistonga yondashuvini muhokama qildi.",
    },
    thumbnail: "",
    url: "https://iais.uz/en/outputnew/the-us-and-the-taliban-iais-researchers-views",
    topics: ["Afghanistan", "Geopolitics", "Diplomacy"],
  },
  {
    id: "media-007",
    type: "interview",
    title: { en: "“Security talks are important”", uz: "«Xavfsizlik boʻyicha muloqotlar muhim»" },
    platform: { en: "Kun.uz", uz: "Kun.uz" },
    date: "2024-09-13",
    speaker: "Hamza Boltaev",
    description: {
      en: "An interview with Kun.uz on the regional security dialogues held in Tashkent in September 2024, including the RATS SCO conference.",
      uz: "Kun.uz bilan intervyu: 2024-yil sentabrida Toshkentda oʻtgan mintaqaviy xavfsizlik muloqotlari, jumladan ShHT RATS konferensiyasi haqida.",
    },
    thumbnail: "",
    url: "https://iais.uz/en/outputnew/security-talks-are-important-says-hamza-boltaev-in-his-recent-interview-with-kunuz",
    topics: ["Security", "Central Asia", "Terrorism"],
  },
];
