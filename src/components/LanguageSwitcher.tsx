import { useLanguage } from "../hooks/useLanguage";
import { LANGS } from "../i18n/localize";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {LANGS.map((code, i) => (
        <span key={code} className="lang-switch-item">
          {i > 0 && <span className="lang-sep" aria-hidden="true">|</span>}
          <button
            type="button"
            className={lang === code ? "lang-btn is-active" : "lang-btn"}
            aria-pressed={lang === code}
            lang={code}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
