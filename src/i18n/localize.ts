// =====================================================
// LOCALIZATION HELPERS
// Content in src/data/*.ts can be written either as a plain string
// (same text in every language) or as { en: "...", uz: "..." }.
// To add Russian later: add "ru" to LANGS below, add a `ru` block in
// translations.ts, and add `ru: "..."` wherever you want a Russian text.
// Missing translations automatically fall back to English.
// =====================================================

export const LANGS = ["en", "uz"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export type LText = string | ({ en: string } & Partial<Record<Lang, string>>);

export function localize(value: LText | undefined, lang: Lang): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en;
}

/** Every language variant of a value – used to build search text. */
export function allLocales(value: LText | undefined): string[] {
  if (value === undefined) return [];
  if (typeof value === "string") return [value];
  return Object.values(value).filter((v): v is string => typeof v === "string");
}
