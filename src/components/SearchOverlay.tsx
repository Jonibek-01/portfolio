import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { useDialog } from "../hooks/useDialog";
import { useLanguage } from "../hooks/useLanguage";
import { useGlobalSearch } from "../hooks/useSearch";
import { useUI } from "../hooks/useUI";
import type { SearchKind, SearchResult } from "../utils/search";

const GROUP_ORDER: SearchKind[] = ["publication", "media", "speaking", "research"];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  if (!searchOpen) return null;
  return <Overlay onClosed={closeSearch} />;
}

function Overlay({ onClosed }: { onClosed: () => void }) {
  const { t } = useLanguage();
  const { openPublication, openMedia, scrollTo } = useUI();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const results = useGlobalSearch(query);
  const close = useDialog(rootRef, panelRef, { onClosed, initialFocus: ".gs-input", panelFrom: "none" });

  // Flatten for keyboard navigation, grouped for display.
  const flat = useMemo(() => GROUP_ORDER.flatMap((k) => results.filter((r) => r.kind === k)), [results]);

  useEffect(() => setCursor(0), [query]);
  useEffect(() => {
    rootRef.current?.querySelector(".gs-result.is-active")?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const open = (r: SearchResult) => {
    close();
    window.setTimeout(() => {
      if (r.kind === "publication") {
        openPublication(r.id);
      } else if (r.kind === "media") {
        openMedia(r.id);
      } else if (r.kind === "speaking") {
        navigate("/speaking");
      } else {
        scrollTo("research");
      }
    }, 320);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!flat.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      open(flat[cursor]);
    }
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div ref={rootRef} className="search-overlay" role="dialog" aria-modal="true" aria-label={t.search.label}>
      <div ref={panelRef} className="search-panel" onKeyDown={onKeyDown}>
        <div className="gs-bar">
          <FiSearch aria-hidden className="gs-icon" />
          <input
            className="gs-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            aria-label={t.search.label}
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded={flat.length > 0}
            aria-controls="gs-results"
            aria-activedescendant={flat.length ? `gs-opt-${cursor}` : undefined}
          />
          <button type="button" className="icon-btn" onClick={close} aria-label={t.common.close}>
            <FiX aria-hidden />
          </button>
        </div>

        <div id="gs-results" className="gs-results" role="listbox" aria-label={t.search.label}>
          {!hasQuery && <p className="gs-empty">{t.search.prompt}</p>}
          {hasQuery && flat.length === 0 && <p className="gs-empty" role="status">{t.search.noResults}</p>}
          {GROUP_ORDER.map((kind) => {
            const group = results.filter((r) => r.kind === kind);
            if (!group.length) return null;
            return (
              <div key={kind} role="presentation" className="gs-group">
                <h2 className="gs-group-title">{t.search.groups[kind]}</h2>
                {group.map((r) => {
                  const idx = flat.indexOf(r);
                  return (
                    <button
                      key={`${r.kind}-${r.id}`}
                      id={`gs-opt-${idx}`}
                      role="option"
                      aria-selected={idx === cursor}
                      type="button"
                      className={idx === cursor ? "gs-result is-active" : "gs-result"}
                      onMouseEnter={() => setCursor(idx)}
                      onClick={() => open(r)}
                    >
                      <span className="gs-result-meta">
                        {t.search.groups[r.kind]}{r.year ? ` · ${r.year}` : ""}
                      </span>
                      <span className="gs-result-title">{r.title}</span>
                      <span className="gs-result-text">{r.text}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <p className="gs-hints" aria-hidden="true">
          <span>{t.search.hintNav}</span>
          <span>{t.search.hintEnter}</span>
          <span>{t.search.hintEsc}</span>
        </p>
      </div>
    </div>
  );
}
