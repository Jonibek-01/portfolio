import { createContext } from "react";
import type { Lang, LText } from "./localize";
import type { Dict } from "./translations";

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  /** Resolve a content value (string or {en, uz}) in the active language. */
  l: (value: LText | undefined) => string;
  /** Display name of a topic (e.g. "Central Asia" -> "Markaziy Osiyo"). */
  topic: (name: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
