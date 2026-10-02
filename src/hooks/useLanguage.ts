import { useContext } from "react";
import { LanguageContext } from "../i18n/context";

/** const { lang, setLang, t, l } = useLanguage();  t = UI strings, l(value) = localize content */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
