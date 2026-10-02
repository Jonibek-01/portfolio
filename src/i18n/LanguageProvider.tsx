import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { LanguageContext } from "./context";
import { DEFAULT_LANG, LANGS, localize, type Lang, type LText } from "./localize";
import { translations } from "./translations";

const STORAGE_KEY = "hb-lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && LANGS.includes(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_LANG; // default language: English
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const t = translations[lang];

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  // Keep <html lang>, <title> and meta description in sync with the language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const setMeta = (sel: string, value: string) =>
      document.head.querySelector(sel)?.setAttribute("content", value);
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:title"]', t.meta.title);
    setMeta('meta[property="og:description"]', t.meta.description);
    setMeta('meta[name="twitter:title"]', t.meta.title);
    setMeta('meta[name="twitter:description"]', t.meta.description);
  }, [lang, t]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      l: (v: LText | undefined) => localize(v, lang),
      topic: (name: string) => t.topicNames[name] ?? name,
    }),
    [lang, setLang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
