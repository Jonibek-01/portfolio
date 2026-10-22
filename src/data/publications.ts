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
//   body         optional – the FULL TEXT of the article (string or { en, uz }).
//                When present, the card's detail view shows it as a scrollable article under the
//                summary and the card gets a "Full text" badge. Leave it out to show only the summary.
//                Format: paragraphs separated by a blank line; a line starting with "## " becomes a heading.
//
// Source of the starter list: Hamza Boltaev's IAIS expert page (iais.uz) and The Diplomat author page.
// Only items where he is a listed author are included.
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
  /** Full article text (optional) – see the note at the top of this file. */
  body?: LText;
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
    url: "https://iais.uz/en/outputnew/the-myth-of-the-trans-afghan-corridor",
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
    url: "https://iais.uz/en/outputnew/central-asia-afghanistan-cooperation-challenges-and-opportunities",
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
    url: "https://iais.uz/en/outputnew/central-asia-media-monitoring-on-radicalism-and-terrorism-issues",
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
    url: "https://thediplomat.com/2025/12/are-uzbekistans-peacebuilding-efforts-sustainable-in-central-asia/",
    topics: ["Uzbekistan", "Central Asia", "Diplomacy", "Peacebuilding"],
  },

  // ---------------- 2026 ----------------
  {
    id: "publication-007",
    title: "Afghanistan’s Northward Pivot: New Regional Equation of Taliban",
    authors: ["Hamza Boltaev", "Shokhrukh Saidov"],
    date: "2026-06-21",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "Examines the Russia–Taliban military-technical cooperation agreement and how the Pakistan–Afghanistan standoff and China–Russia positioning shape Kabul’s northward diplomacy.",
      uz: "Rossiya va Tolibon oʻrtasidagi harbiy-texnik hamkorlik kelishuvi hamda Pokiston–Afgʻoniston keskinligi va Xitoy–Rossiya oʻrtasidagi raqobat Kobulning shimolga yoʻnalgan diplomatiyasiga qanday taʼsir qilishi tahlil qilinadi.",
    },
    url: "https://iais.uz/en/outputnew/afghanistans-northward-pivot-new-regional-equation-of-taliban",
    topics: ["Afghanistan", "Russia", "Pakistan", "China", "Security", "Geopolitics"],
  },
  {
    id: "publication-008",
    title: "The Contemporary Evolution of the Iran–Afghanistan Relationship",
    authors: ["Hamza Boltaev"],
    date: "2026-06-05",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "Argues that Tehran–Kabul ties are neither purely adversarial nor genuinely strategic, but a mix of pragmatic cooperation, mutual suspicion and competing security and migration concerns.",
      uz: "Tehron–Kobul munosabatlari na butunlay dushmanlik, na haqiqiy strategik hamkorlik ekani, balki pragmatik hamkorlik, oʻzaro shubha hamda xavfsizlik va migratsiya borasidagi qarama-qarshi manfaatlar aralashmasi ekani asoslanadi.",
    },
    url: "https://iais.uz/en/outputnew/the-contemporary-evolution-of-the-iran-afghanistan-relationship",
    topics: ["Afghanistan", "Iran", "Security", "Geopolitics", "Diplomacy"],
  },
  {
    id: "publication-009",
    title: "Afghanistan: Contemporary Developments & Alternative Perspectives. 2025 edition",
    authors: ["Centre for Afghanistan and South Asian Studies, IAIS"],
    date: "2026-01-21",
    category: "Report",
    publisher: "IAIS",
    description: {
      en: "The annual report of the Centre for Afghanistan and South Asian Studies, offering a policy-relevant overview of developments in and around Afghanistan.",
      uz: "Afgʻoniston va Janubiy Osiyo tadqiqotlari markazining yillik hisoboti: Afgʻonistondagi va uning atrofidagi jarayonlarning siyosatga yoʻnaltirilgan sharhi.",
    },
    url: "https://iais.uz/en/outputnew/afghanistan-contemporary-developments-alternative-perspectives-2025-edition",
    topics: ["Afghanistan", "Regional Cooperation", "Security"],
  },

  // ---------------- 2025 ----------------
  {
    id: "publication-010",
    title: "CPEC on the Threshold of Central Asia: New Horizons for Uzbekistan via Afghanistan",
    authors: ["Hamza Boltaev", "Aziza Mukhammedova"],
    date: "2025-08-29",
    category: "Commentary",
    publisher: "IAIS",
    description: {
      en: "Looks at the August 2025 China–Pakistan–Afghanistan foreign ministers’ meeting in Kabul and what extending CPEC to Afghanistan could mean for Uzbekistan’s trade routes and the UAP railway.",
      uz: "2025-yil avgustda Kobulda oʻtgan Xitoy–Pokiston–Afgʻoniston tashqi ishlar vazirlari uchrashuvi va CPECni Afgʻonistonga kengaytirish Oʻzbekistonning savdo yoʻllari hamda UAP temir yoʻli uchun nimani anglatishi koʻrib chiqiladi.",
    },
    url: "https://iais.uz/en/outputnew/cpec-on-the-threshold-of-central-asia-new-horizons-for-uzbekistan-via-afghanistan",
    topics: ["Afghanistan", "Pakistan", "China", "Connectivity", "Uzbekistan", "Transport"],
  },
  {
    id: "publication-011",
    title: "Breaking Old Alliances: How the EU Is Rethinking Its Foreign Policy",
    authors: ["Hamza Boltaev", "Islomkhon Gafarov"],
    date: "2025-02-25",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "Argues that the Munich Security Conference signalled a major shift in the global order and a rethink of the European Union’s foreign policy.",
      uz: "Myunxen xavfsizlik konferensiyasi jahon tartibidagi katta siljish va Yevropa Ittifoqi tashqi siyosatining qayta koʻrib chiqilishidan darak berganini asoslaydi.",
    },
    url: "https://iais.uz/en/outputnew/breaking-old-alliances-how-the-eu-is-rethinking-its-foreign-policy",
    topics: ["Geopolitics", "EU", "Security", "Foreign Policy"],
  },
  {
    id: "publication-012",
    title: "Overview and Analysis of Regional Non-Governmental Initiatives in Central Asia",
    authors: ["Hamza Boltaev", "and co-authors"],
    date: "2025-01-27",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "A PeaceNexus-supported study of civil society initiatives across Central Asia – climate, gender, religion, migration and development – with recommendations for policymakers and partners.",
      uz: "PeaceNexus fondi koʻmagida tayyorlangan, Markaziy Osiyodagi fuqarolik jamiyati tashabbuslari (iqlim, gender, din, migratsiya, rivojlanish) tahlili va siyosatchilar hamda hamkorlar uchun tavsiyalar.",
    },
    url: "https://iais.uz/en/outputnew/overview-and-analysis-of-regional-non-governmental-initiatives-in-central-asia",
    topics: ["Central Asia", "Civil Society", "Regional Cooperation", "Peacebuilding"],
  },

  // ---------------- 2024 ----------------
  {
    id: "publication-013",
    title: "In the Grip of the Dragon? Uzbekistan’s Technological Dependence on China as a Strategic Challenge for the Green Transition",
    authors: ["Hamza Boltaev", "Alexander Schrier"],
    date: "2024-10-18",
    category: "Research Article",
    publisher: "Länder-Analysen",
    description: {
      en: "Weighs Uzbekistan’s choice between cheap Chinese green technology and building domestic industry, and what each path means for energy security and economic sovereignty.",
      uz: "Oʻzbekistonning arzon xitoy “yashil” texnologiyalari bilan ichki sanoatni rivojlantirish oʻrtasidagi tanlovi va har bir yoʻlning energetika xavfsizligi hamda iqtisodiy suverenitetga taʼsiri baholanadi.",
    },
    url: "https://iais.uz/en/outputnew/in-the-grip-of-the-dragon-uzbekistans-technological-dependence-on-china-as-a-strategic-challenge-for-the-green-transition",
    topics: ["Uzbekistan", "China", "Energy", "Economy"],
  },
  {
    id: "publication-014",
    title: "Rising Pragmatism: What Does Aripov’s Visit Mean?",
    authors: ["Hamza Boltaev", "Aziza Mukhammedova"],
    date: "2024-08-22",
    category: "Commentary",
    publisher: "IAIS",
    description: {
      en: "Reads Prime Minister Aripov’s Kabul visit as part of Uzbekistan’s economy-first engagement with the Taliban-led government, with water security as a key motive.",
      uz: "Bosh vazir Aripovning Kobulga tashrifi Oʻzbekistonning Tolibon boshqaruvi bilan iqtisodiyotni ustun qoʻyuvchi hamkorligining bir qismi sifatida, suv xavfsizligi esa asosiy sabab sifatida tahlil qilinadi.",
    },
    url: "https://iais.uz/en/outputnew/rising-pragmatism-what-does-aripovs-visit-mean",
    topics: ["Uzbekistan", "Afghanistan", "Diplomacy", "Economy", "Water"],
  },
  {
    id: "publication-015",
    title: "Forging Regional Alliances: A Path to Advancing Women’s Rights in Afghanistan",
    authors: ["Hamza Boltaev", "Aziza Mukhammedova"],
    date: "2024-08-21",
    category: "Research Article",
    publisher: "CRSS",
    description: {
      en: "Explores how Western countries and Afghanistan’s Central Asian neighbours could cooperate to address the denial of women’s rights under Taliban rule.",
      uz: "Tolibon hukmronligi ostida ayollar huquqlarining rad etilishiga qarshi Gʻarb davlatlari va Afgʻonistonning Markaziy Osiyodagi qoʻshnilari qanday hamkorlik qilishi mumkinligi oʻrganiladi.",
    },
    url: "https://crss.pk/forging-regional-alliances-a-path-to-advancing-womens-rights-in-afghanistan/",
    topics: ["Afghanistan", "Central Asia", "Women’s Rights", "Diplomacy"],
  },
  {
    id: "publication-016",
    title: "Afghanistan: Contemporary Developments & Alternative Perspectives",
    authors: ["Centre for Afghanistan and South Asian Studies, IAIS"],
    date: "2024-03-29",
    category: "Report",
    publisher: "IAIS",
    description: {
      en: "The centre’s annual flagship report with 13 policy briefs offering an alternative view of developments in and around Afghanistan.",
      uz: "Markazning yillik asosiy hisoboti: Afgʻoniston va uning atrofidagi voqealarga muqobil nuqtai nazar beruvchi 13 ta siyosiy maʼruzani oʻz ichiga oladi.",
    },
    url: "https://iais.uz/en/outputnew/afghanistan-contemporary-developments-alternative-perspectives",
    topics: ["Afghanistan", "Regional Cooperation", "Security"],
  },
  {
    id: "publication-017",
    title: "On the Cusp of Diplomatic Realignment: Uzbekistan’s Engagement Strategy with the Taliban",
    authors: ["Hamza Boltaev"],
    date: "2024-03-27",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "Uses Foreign Minister Saidov’s March 2024 Kabul visit to explain why continued, pragmatic engagement on trade, transport and water matters for Uzbekistan.",
      uz: "Tashqi ishlar vaziri Saidovning 2024-yil mart oyidagi Kobul tashrifi orqali Oʻzbekiston uchun savdo, transport va suv masalalarida doimiy pragmatik muloqot nega muhimligi tushuntiriladi.",
    },
    url: "https://iais.uz/en/outputnew/on-the-cusp-of-diplomatic-realignment-uzbekistans-engagement-strategy-with-the-taliban",
    topics: ["Uzbekistan", "Afghanistan", "Diplomacy", "Connectivity", "Water"],
  },
  {
    id: "publication-018",
    title: "Central Asia’s Relations with Taliban-Ruled Afghanistan",
    authors: ["Hamza Boltaev"],
    date: "2024-03-07",
    category: "Research Article",
    publisher: "IAIS",
    description: {
      en: "Surveys how the Central Asian states have adapted to Taliban rule since 2021, with trade-driven pragmatism as the shared feature of their policies.",
      uz: "Markaziy Osiyo davlatlari 2021-yildan beri Tolibon hokimiyatiga qanday moslashgani, ularning siyosatidagi umumiy jihat — savdoga asoslangan pragmatizm — tahlil qilinadi.",
    },
    url: "https://iais.uz/en/outputnew/central-asias-relations-with-taliban-ruled-afghanistan",
    topics: ["Central Asia", "Afghanistan", "Diplomacy", "Regional Cooperation"],
  },
  {
    id: "publication-019",
    title: "Tajikistan and the Taliban-led Afghanistan: Pragmatism over Arrogance",
    authors: ["Hamza Boltaev"],
    date: "2024-02-06",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "Looks at the transfer of the Afghan consulate in Khorog to Taliban control and what it shows about Dushanbe’s pragmatic approach to Kabul.",
      uz: "Xorogdagi Afgʻoniston konsulligining Tolibon nazoratiga oʻtishi va bu Dushanbening Kobulga pragmatik yondashuvi haqida nimani koʻrsatishi tahlil qilinadi.",
    },
    url: "https://iais.uz/en/outputnew/tajikistan-and-the-taliban-led-afghanistan-pragmatism-over-arrogance",
    topics: ["Central Asia", "Afghanistan", "Diplomacy"],
  },
  {
    id: "publication-020",
    title: "Taliban’s Economic Governance and the Interests of Uzbekistan",
    authors: ["Hamza Boltaev"],
    date: "2024-02-06",
    category: "Policy Brief",
    publisher: "IAIS",
    description: {
      en: "Assesses how the Taliban have kept the Afghan economy from collapse and what that means for Uzbekistan’s security and long-term export interests.",
      uz: "Tolibon Afgʻoniston iqtisodiyotining qulashiga qanday yoʻl qoʻymagani va bu Oʻzbekistonning xavfsizligi hamda uzoq muddatli eksport manfaatlari uchun nimani anglatishi baholanadi.",
    },
    url: "https://iais.uz/en/outputnew/talibans-economic-governance-and-the-interests-of-uzbekistan",
    topics: ["Uzbekistan", "Afghanistan", "Economy", "Security"],
  },

  // ---------------- 2023 ----------------
  {
    id: "publication-021",
    title: "Is Iran Distancing Itself From the Taliban Government?",
    authors: ["Hamza Boltaev"],
    date: "2023-03-08",
    category: "Commentary",
    publisher: "The Diplomat",
    description: {
      en: "Suggests Tehran’s expectations of the Taliban have not been met, yet pragmatic cooperation – from water to migration and drugs – is likely to continue.",
      uz: "Tehronning Tolibondan kutganlari oqlanmagani, biroq suv, migratsiya va giyohvand moddalar kabi masalalardagi pragmatik hamkorlik davom etishi taxmin qilinadi.",
    },
    url: "https://thediplomat.com/2023/03/is-iran-distancing-itself-from-the-taliban-government/",
    topics: ["Afghanistan", "Iran", "Diplomacy", "Security"],
  },
];
