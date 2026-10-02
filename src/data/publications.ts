// =====================================================
// PUBLICATIONS
// Add new publications to the `publications` array below.
// Do not modify PublicationCard.tsx or any other component:
// new items automatically appear in the list, search, filters,
// year filter, topic filtering and global search.
//
// Fields
//   id           unique string
//   title        string, or { en: "...", uz: "..." }
//   authors      string[]
//   date         "YYYY-MM-DD"
//   category     "Policy Brief" | "Research Article" | "Report" | "Commentary"
//   publisher    string
//   description  string, or { en: "...", uz: "..." }
//   url          optional – omit (or leave "") while the link is not available
//   topics       string[] – English names (Uzbek labels: translations.ts > topicNames)
//   featured     optional – the first item with featured: true is shown in "Featured research"
// =====================================================
import type { LText } from "../i18n/localize";

export const PUBLICATION_CATEGORIES = [
  "Policy Brief",
  "Research Article",
  "Report",
  "Commentary",
] as const;
export type PublicationCategory = (typeof PUBLICATION_CATEGORIES)[number];

export interface Publication {
  id: string;
  title: LText;
  authors: string[];
  date: string;
  category: PublicationCategory;
  publisher: string;
  description: LText;
  url?: string;
  topics: string[];
  featured?: boolean;
}

export const publications: Publication[] = [
  {
    id: "publication-001",
    title: "Uzbekistan’s Evolving Northern Afghanistan Strategy",
    authors: ["Hamza Boltaev", "Islomkhon Gafarov"],
    date: "2025-03-26",
    category: "Policy Brief",
    publisher: "The Diplomat",
    description: {
      en: "Tashkent’s transition from a security-oriented approach to a pragmatic, economy-first foreign policy in relation to Kabul is most evident in its engagement in northern Afghanistan.",
      uz: "Toshkentning Kobulga nisbatan xavfsizlikka yoʻnaltirilgan yondashuvdan pragmatik, iqtisodiyotni birinchi oʻringa qoʻyuvchi tashqi siyosatga oʻtishi ayniqsa Shimoliy Afgʻonistondagi faoliyatida yaqqol koʻrinadi.",
    },
    url: "https://thediplomat.com/2025/03/uzbekistans-evolving-northern-afghanistan-strategy/",
    topics: ["Uzbekistan", "Afghanistan", "Central Asia", "Diplomacy"],
    featured: true,
  },
  {
    id: "publication-002",
    title: "Uzbekistan and Afghanistan: A New Era of Limited Recognition",
    authors: ["Islomkhon Gafarov", "Hamza Boltaev", "Bobur Mingyasharov"],
    date: "2025-05-13",
    category: "Policy Brief",
    publisher: "The Diplomat",
    description: {
      en: "An analysis of Uzbekistan’s evolving practical engagement with Afghanistan and the changing dynamics of regional diplomacy.",
      uz: "Oʻzbekistonning Afgʻoniston bilan oʻzgarib borayotgan amaliy hamkorligi va mintaqaviy diplomatiya dinamikasidagi oʻzgarishlar tahlili.",
    },
    url: "https://thediplomat.com/2025/05/uzbekistan-and-afghanistan-a-new-era-of-limited-recognition/",
    topics: ["Uzbekistan", "Afghanistan", "Diplomacy", "Central Asia"],
  },
  {
    id: "publication-003",
    title: "The Myth of the Trans-Afghan Corridor",
    authors: ["Islomkhon Gafarov", "Hamza Boltaev"],
    date: "2025-06-05",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "An analytical examination of the Trans-Afghan railway concept and the gap between strategic expectations and practical realities.",
      uz: "Trans-Afgʻon temir yoʻli gʻoyasi hamda strategik kutilmalar bilan amaliy haqiqat oʻrtasidagi tafovutning tahliliy koʻrib chiqilishi.",
    },
    // TODO: Add the official URL of this IAIS publication
    url: "",
    topics: ["Afghanistan", "Connectivity", "Central Asia", "Transport"],
  },
  {
    id: "publication-004",
    title: "Central Asia – Afghanistan Cooperation: Challenges and Opportunities",
    authors: ["Hamza Boltaev", "Nargiza Umarova", "Mukhit Assanbayev"],
    date: "2025-10-23",
    category: "Report",
    publisher: "IAIS",
    description: {
      en: "A joint study examining cooperation between Central Asia and Afghanistan, including regional security, economic relations and connectivity.",
      uz: "Markaziy Osiyo va Afgʻoniston oʻrtasidagi hamkorlikni, jumladan mintaqaviy xavfsizlik, iqtisodiy munosabatlar va bogʻlanishni oʻrganuvchi qoʻshma tadqiqot.",
    },
    // TODO: Add the official URL of this IAIS report
    url: "",
    topics: ["Central Asia", "Afghanistan", "Regional Cooperation"],
  },
  {
    id: "publication-005",
    title: "Central Asia Media Monitoring on Radicalism and Terrorism Issues",
    authors: ["Hamza Boltaev"],
    date: "2025-01-10",
    category: "Report",
    publisher: "IAIS",
    description: {
      en: "A research project examining media coverage of radicalism and terrorism-related issues in Central Asia.",
      uz: "Markaziy Osiyoda radikalizm va terrorizm bilan bogʻliq masalalarning ommaviy axborot vositalarida yoritilishini oʻrganuvchi tadqiqot loyihasi.",
    },
    // TODO: Add the official URL of this IAIS report
    url: "",
    topics: ["Central Asia", "Terrorism", "Media Monitoring", "Security"],
  },
  {
    id: "publication-006",
    title: "Are Uzbekistan’s Peacebuilding Efforts Sustainable in Central Asia?",
    authors: ["Hamza Boltaev", "Shokhrukh Saidov"],
    date: "2025-12-04",
    category: "Research Article",
    publisher: "The Diplomat",
    description: {
      en: "An examination of Uzbekistan’s regional diplomacy and the challenges facing long-term peacebuilding and regional cooperation in Central Asia.",
      uz: "Oʻzbekistonning mintaqaviy diplomatiyasi hamda Markaziy Osiyoda uzoq muddatli tinchlik oʻrnatish va mintaqaviy hamkorlik oldidagi muammolarning tahlili.",
    },
    // TODO: Add the official The Diplomat URL of this article
    url: "",
    topics: ["Uzbekistan", "Central Asia", "Diplomacy", "Peacebuilding"],
  },
];
