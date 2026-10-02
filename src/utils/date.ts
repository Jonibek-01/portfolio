import type { Dict } from "../i18n/translations";

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: (m || 1) - 1, d: d || 1 };
}

export const getYear = (iso: string) => iso.slice(0, 4);

/** "26 March 2025" / "26 mart 2025" */
export function formatDate(iso: string, t: Dict): string {
  const { y, m, d } = parts(iso);
  return `${d} ${t.months[m]} ${y}`;
}

/** "26 MAR 2025" */
export function formatDateShort(iso: string, t: Dict): string {
  const { y, m, d } = parts(iso);
  return `${d} ${t.monthsShort[m]} ${y}`;
}

export const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);
