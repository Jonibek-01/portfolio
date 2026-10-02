// =====================================================
// EDUCATION
// Add new entries here – cards are generated automatically.
// =====================================================
import type { LText } from "../i18n/localize";

export interface EducationEntry {
  id: string;
  year: string;
  institution: string;
  department?: string;
  field: LText;
}

export const education: EducationEntry[] = [
  {
    id: "edu-2010",
    year: "2010",
    institution: "Academy of Internal Affairs of the Republic of Uzbekistan",
    field: { en: "Legal education", uz: "Yuridik taʼlim" },
  },
  {
    id: "edu-2014",
    year: "2014",
    institution: "Higher School for Strategic Analysis and Prognosis of the Republic of Uzbekistan",
    field: { en: "Strategic analysis and forecasting", uz: "Strategik tahlil va prognozlash" },
  },
  {
    id: "edu-2021",
    year: "2021",
    institution: "King’s College London",
    department: "Department of War Studies",
    field: { en: "War Studies", uz: "Urush tadqiqotlari (War Studies)" },
  },
];
