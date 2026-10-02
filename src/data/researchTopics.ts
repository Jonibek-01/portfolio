// =====================================================
// RESEARCH AREAS, APPROACH, INITIATIVES, FEATURED TOPICS
// Edit text here; components only render what is in these arrays.
// =====================================================
import type { LText } from "../i18n/localize";

export interface ResearchArea {
  id: string;
  title: LText;
  description: LText;
}

export const researchAreas: ResearchArea[] = [
  {
    id: "central-asia",
    title: { en: "Central Asia", uz: "Markaziy Osiyo" },
    description: {
      en: "Regional cooperation, diplomacy and strategic developments.",
      uz: "Mintaqaviy hamkorlik, diplomatiya va strategik oʻzgarishlar.",
    },
  },
  {
    id: "afghanistan",
    title: { en: "Afghanistan", uz: "Afgʻoniston" },
    description: {
      en: "Political, security and economic developments in Afghanistan.",
      uz: "Afgʻonistondagi siyosiy, xavfsizlik va iqtisodiy jarayonlar.",
    },
  },
  {
    id: "international-security",
    title: { en: "International Security", uz: "Xalqaro xavfsizlik" },
    description: {
      en: "Regional security dynamics, terrorism, extremism and conflict.",
      uz: "Mintaqaviy xavfsizlik dinamikasi, terrorizm, ekstremizm va mojarolar.",
    },
  },
  {
    id: "geopolitics",
    title: { en: "Geopolitics", uz: "Geosiyosat" },
    description: {
      en: "Strategic competition and changing geopolitical relationships.",
      uz: "Strategik raqobat va oʻzgaruvchan geosiyosiy munosabatlar.",
    },
  },
  {
    id: "connectivity",
    title: { en: "Regional Connectivity", uz: "Mintaqaviy bogʻlanish" },
    description: {
      en: "Transport, trade, infrastructure and Central Asia–South Asia connectivity.",
      uz: "Transport, savdo, infratuzilma hamda Markaziy va Janubiy Osiyo oʻrtasidagi bogʻlanish.",
    },
  },
  {
    id: "foreign-policy",
    title: { en: "Foreign Policy", uz: "Tashqi siyosat" },
    description: {
      en: "Uzbekistan’s foreign policy and regional diplomacy.",
      uz: "Oʻzbekistonning tashqi siyosati va mintaqaviy diplomatiyasi.",
    },
  },
];

export interface ApproachItem {
  id: string;
  title: LText;
  body: LText;
}

export const researchApproach: ApproachItem[] = [
  {
    id: "regional-analysis",
    title: { en: "Regional Analysis", uz: "Mintaqaviy tahlil" },
    body: {
      en: "Examining political, economic and security developments across Central Asia and neighbouring regions.",
      uz: "Markaziy Osiyo va qoʻshni mintaqalardagi siyosiy, iqtisodiy va xavfsizlik jarayonlarini oʻrganish.",
    },
  },
  {
    id: "security-studies",
    title: { en: "Security Studies", uz: "Xavfsizlik tadqiqotlari" },
    body: {
      en: "Analysing security challenges, conflict dynamics, terrorism, extremism and regional stability.",
      uz: "Xavfsizlik muammolari, mojaro dinamikasi, terrorizm, ekstremizm va mintaqaviy barqarorlikni tahlil qilish.",
    },
  },
  {
    id: "strategic-forecasting",
    title: { en: "Strategic Forecasting", uz: "Strategik prognozlash" },
    body: {
      en: "Using analytical approaches to examine possible regional developments and strategic scenarios.",
      uz: "Mintaqadagi ehtimoliy oʻzgarishlar va strategik stsenariylarni tahliliy usullar yordamida oʻrganish.",
    },
  },
  {
    id: "policy-research",
    title: { en: "Policy Research", uz: "Siyosat tadqiqotlari" },
    body: {
      en: "Developing analytical materials and policy-oriented research on contemporary regional issues.",
      uz: "Mintaqaning dolzarb masalalari boʻyicha tahliliy materiallar va siyosatga yoʻnaltirilgan tadqiqotlar tayyorlash.",
    },
  },
  {
    id: "media-analysis",
    title: { en: "Media Analysis", uz: "Media tahlili" },
    body: {
      en: "Following and analysing media narratives and public communication around security and geopolitical developments.",
      uz: "Xavfsizlik va geosiyosiy jarayonlar atrofidagi media narrativlari hamda jamoatchilik bilan aloqani kuzatish va tahlil qilish.",
    },
  },
];

export const researchInitiatives: LText[] = [
  {
    en: "Central Asia Media Monitoring on Radicalism and Terrorism Issues",
    uz: "Markaziy Osiyoda radikalizm va terrorizm masalalari boʻyicha media monitoringi",
  },
  { en: "Afghanistan research", uz: "Afgʻoniston boʻyicha tadqiqotlar" },
  { en: "Central Asia–Afghanistan cooperation", uz: "Markaziy Osiyo–Afgʻoniston hamkorligi" },
  { en: "Regional NGO initiatives in Central Asia", uz: "Markaziy Osiyodagi mintaqaviy NNT tashabbuslari" },
];

/**
 * Featured topics. Clicking one filters publications and media.
 * `match` keywords are compared (case-insensitively) with each item's topics,
 * title, description and category – so new content is picked up automatically.
 */
export interface FeaturedTopic {
  id: string;
  label: LText;
  match: string[];
}

export const featuredTopics: FeaturedTopic[] = [
  { id: "central-asia", label: { en: "Central Asia", uz: "Markaziy Osiyo" }, match: ["central asia"] },
  { id: "afghanistan", label: { en: "Afghanistan", uz: "Afgʻoniston" }, match: ["afghanistan"] },
  { id: "uzbekistan", label: { en: "Uzbekistan", uz: "Oʻzbekiston" }, match: ["uzbekistan"] },
  {
    id: "regional-security",
    label: { en: "Regional Security", uz: "Mintaqaviy xavfsizlik" },
    match: ["security", "terrorism", "extremism", "radicalism"],
  },
  { id: "geopolitics", label: { en: "Geopolitics", uz: "Geosiyosat" }, match: ["geopolitic"] },
  { id: "diplomacy", label: { en: "Diplomacy", uz: "Diplomatiya" }, match: ["diplomacy", "diplomatic"] },
];
