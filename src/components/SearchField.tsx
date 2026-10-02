import { FiSearch, FiX } from "react-icons/fi";

export default function SearchField({ value, onChange, placeholder, label, clearLabel }: { value: string; onChange: (v: string) => void; placeholder: string; label: string; clearLabel: string }) {
  return (
    <div className="search-field">
      <FiSearch aria-hidden className="search-field-icon" />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={label} autoComplete="off" spellCheck={false} />
      {value && (
        <button type="button" className="search-clear" onClick={() => onChange("")} aria-label={clearLabel}>
          <FiX aria-hidden />
        </button>
      )}
    </div>
  );
}
