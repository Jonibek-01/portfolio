// =====================================================
// CAREER TIMELINE + QUICK MILESTONES
// Only verified entries. Do NOT add dates or job titles that are not
// supported by the published biography.
// Add a new entry to `career` (oldest first) – it appears automatically.
// Organisation names are kept in their original English form.
// =====================================================
import type { LText } from "../i18n/localize";

export interface CareerEntry {
  id: string;
  period: string; // "2010", "2010–2018", or "Current" (shown as "Now" label via current:true)
  current?: boolean;
  organization: string;
  detail: LText;
  note?: LText;
}

export const career: CareerEntry[] = [
  {
    id: "career-2010",
    period: "2010",
    organization: "Academy of Internal Affairs of the Republic of Uzbekistan",
    detail: {
      en: "Graduated in 2010 with a legal education.",
      uz: "2010-yilda yuridik taʼlim olib tamomlagan.",
    },
  },
  {
    id: "career-2010-2018",
    period: "2010–2018",
    organization: "Ministry of Internal Affairs of the Republic of Uzbekistan",
    detail: {
      en: "Worked in the internal affairs system, including roles related to counterterrorism and counter-extremism.",
      uz: "Ichki ishlar tizimida, jumladan terrorizm va ekstremizmga qarshi kurash bilan bogʻliq lavozimlarda ishlagan.",
    },
    note: {
      en: "According to the published biography, he served in both staff and leadership positions.",
      uz: "Eʼlon qilingan tarjimai holiga koʻra, u xodim va rahbarlik lavozimlarida xizmat qilgan.",
    },
  },
  {
    id: "career-2014",
    period: "2014",
    organization: "Higher School for Strategic Analysis and Prognosis",
    detail: {
      en: "Completed a Master's-level programme focused on strategic analysis and forecasting.",
      uz: "Strategik tahlil va prognozlashga yoʻnaltirilgan magistratura darajasidagi dasturni tamomlagan.",
    },
  },
  {
    id: "career-2018-2020",
    period: "2018–2020",
    organization: "Agency for Information and Mass Communications",
    detail: {
      en: "Worked as a senior analyst at the Centre for Mass Communications under the Agency for Information and Mass Communications under the Administration of the President of Uzbekistan.",
      uz: "Oʻzbekiston Prezidenti Administratsiyasi huzuridagi Axborot va ommaviy kommunikatsiyalar agentligining Ommaviy kommunikatsiyalar markazida katta tahlilchi boʻlib ishlagan.",
    },
  },
  {
    id: "career-2021",
    period: "2021",
    organization: "King's College London",
    detail: {
      en: "Department of War Studies. Completed postgraduate study in War Studies.",
      uz: "Department of War Studies. Urush tadqiqotlari (War Studies) yoʻnalishida magistrlik darajasidan keyingi oʻqishni tamomlagan.",
    },
  },
  {
    id: "career-2022",
    period: "2022",
    organization: "University of Public Security of Uzbekistan",
    detail: {
      en: "Worked as a leading research fellow at the Centre for Scientific and Applied Research.",
      uz: "Ilmiy va amaliy tadqiqotlar markazida yetakchi ilmiy xodim boʻlib ishlagan.",
    },
  },
  {
    id: "career-current",
    period: "Current",
    current: true,
    organization: "Institute for Advanced International Studies",
    detail: {
      en: "Senior Research Fellow at the Centre for Afghanistan and South Asian Studies.",
      uz: "Centre for Afghanistan and South Asian Studies’da katta ilmiy xodim.",
    },
  },
];

/** Quick milestones strip under the hero. */
export interface Milestone {
  value: string;
  label: LText;
  current?: boolean;
}

export const milestones: Milestone[] = [
  {
    value: "2010",
    label: { en: "Academic & professional career begins", uz: "Akademik va kasbiy faoliyat boshlanadi" },
  },
  {
    value: "2014",
    label: { en: "Strategic analysis & forecasting", uz: "Strategik tahlil va prognozlash" },
  },
  { value: "2021", label: { en: "King's College London", uz: "King's College London" } },
  {
    value: "Current",
    current: true,
    label: { en: "Senior Research Fellow", uz: "Katta ilmiy xodim" },
  },
];
