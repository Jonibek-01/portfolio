// =====================================================
// SEARCH ENGINE (client-side)
// Every text variant (English + Uzbek + ...) of an item is indexed, so a
// query in either language finds the item, whichever language is active.
// All words of the query must match (AND), accents/apostrophes ignored.
// =====================================================
import { allLocales, localize, type Lang, type LText } from "../i18n/localize";
import type { Dict } from "../i18n/translations";
import { publications, type Publication } from "../data/publications";
import { media, type MediaItem } from "../data/media";
import { speaking, type SpeakingEvent } from "../data/speaking";
import { researchAreas, type FeaturedTopic } from "../data/researchTopics";
import { getYear } from "./date";

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ʻʼ'’‘`´ʹ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type Field = LText | string | string[] | undefined;

export function buildHaystack(...fields: Field[]): string {
  const out: string[] = [];
  for (const f of fields) {
    if (!f) continue;
    if (Array.isArray(f)) out.push(...f);
    else out.push(...allLocales(f));
  }
  return normalize(out.join(" | "));
}

export function matchesQuery(haystack: string, query: string): boolean {
  const tokens = normalize(query).split(" ").filter(Boolean);
  return tokens.every((tok) => haystack.includes(tok));
}

// ---------- Publications / media (section-level search) ----------

export const publicationHaystack = (p: Publication) =>
  buildHaystack(p.title, p.authors, p.description, p.publisher, p.topics, p.category, getYear(p.date));

export const mediaHaystack = (m: MediaItem) =>
  buildHaystack(m.title, m.platform, m.description, m.topics, m.type, m.speaker, getYear(m.date));

export function matchesTopic(haystack: string, topic: FeaturedTopic | null): boolean {
  if (!topic) return true;
  return topic.match.some((k) => haystack.includes(normalize(k)));
}

// ---------- Global search ----------

export type SearchKind = "publication" | "media" | "speaking" | "research";

export interface SearchResult {
  kind: SearchKind;
  id: string;
  title: string;
  text: string;
  year?: string;
  score: number;
}

interface IndexEntry {
  kind: SearchKind;
  id: string;
  haystack: string;
  titleHaystack: string;
  build: (lang: Lang, t: Dict) => Omit<SearchResult, "score">;
}

let cachedIndex: IndexEntry[] | null = null;

function getIndex(): IndexEntry[] {
  if (cachedIndex) return cachedIndex;
  const idx: IndexEntry[] = [];

  publications.forEach((p) =>
    idx.push({
      kind: "publication",
      id: p.id,
      haystack: publicationHaystack(p),
      titleHaystack: buildHaystack(p.title),
      build: (lang) => ({
        kind: "publication",
        id: p.id,
        title: localize(p.title, lang),
        text: `${p.authors.join(", ")} · ${p.publisher}`,
        year: getYear(p.date),
      }),
    })
  );

  media.forEach((m) =>
    idx.push({
      kind: "media",
      id: m.id,
      haystack: mediaHaystack(m),
      titleHaystack: buildHaystack(m.title),
      build: (lang) => ({
        kind: "media",
        id: m.id,
        title: localize(m.title, lang),
        text: localize(m.platform, lang),
        year: getYear(m.date),
      }),
    })
  );

  speaking.forEach((s: SpeakingEvent) =>
    idx.push({
      kind: "speaking",
      id: s.id,
      haystack: buildHaystack(s.title, s.description, s.type, s.location, s.topics, getYear(s.date)),
      titleHaystack: buildHaystack(s.title),
      build: (lang) => ({
        kind: "speaking",
        id: s.id,
        title: localize(s.title, lang),
        text: [localize(s.type, lang), localize(s.location, lang)].filter(Boolean).join(" · "),
        year: getYear(s.date),
      }),
    })
  );

  researchAreas.forEach((r) =>
    idx.push({
      kind: "research",
      id: r.id,
      haystack: buildHaystack(r.title, r.description),
      titleHaystack: buildHaystack(r.title),
      build: (lang) => ({
        kind: "research",
        id: r.id,
        title: localize(r.title, lang),
        text: localize(r.description, lang),
      }),
    })
  );

  cachedIndex = idx;
  return idx;
}

export function globalSearch(query: string, lang: Lang, t: Dict, limitPerKind = 6): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter(Boolean);
  const results: SearchResult[] = [];
  const counts: Record<SearchKind, number> = { publication: 0, media: 0, speaking: 0, research: 0 };

  const scored = getIndex()
    .filter((e) => tokens.every((tok) => e.haystack.includes(tok)))
    .map((e) => {
      const inTitle = tokens.filter((tok) => e.titleHaystack.includes(tok)).length;
      return { e, score: inTitle * 2 + (e.titleHaystack.startsWith(tokens[0]) ? 1 : 0) };
    })
    .sort((a, b) => b.score - a.score);

  for (const { e, score } of scored) {
    if (counts[e.kind] >= limitPerKind) continue;
    counts[e.kind]++;
    results.push({ ...e.build(lang, t), score });
  }
  return results;
}

/** How many publications / media items match a featured topic (shown on the topic tiles). */
export function countForTopic(topic: FeaturedTopic): { pubs: number; media: number } {
  return {
    pubs: publications.filter((p) => matchesTopic(publicationHaystack(p), topic)).length,
    media: media.filter((m) => matchesTopic(mediaHaystack(m), topic)).length,
  };
}
