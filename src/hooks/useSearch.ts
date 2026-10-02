import { useMemo, useState } from "react";
import { publications, PUBLICATION_CATEGORIES, type PublicationCategory } from "../data/publications";
import { media, type MediaType } from "../data/media";
import { byDateDesc, getYear } from "../utils/date";
import {
  matchesQuery,
  matchesTopic,
  mediaHaystack,
  publicationHaystack,
  globalSearch,
} from "../utils/search";
import { useDebounce } from "./useDebounce";
import { useLanguage } from "./useLanguage";
import { useTopicParam } from "./useTopicParam";

// Haystacks are computed once – the data is static.
const pubIndex = publications.map((p) => ({ item: p, haystack: publicationHaystack(p) }));
const mediaIndex = media.map((m) => ({ item: m, haystack: mediaHaystack(m) }));

export const publicationYears = Array.from(new Set(publications.map((p) => getYear(p.date)))).sort(
  (a, b) => b.localeCompare(a)
);

export function usePublicationSearch() {
  const { topic } = useTopicParam();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PublicationCategory | "all">("all");
  const [year, setYear] = useState<string>("all");
  const debounced = useDebounce(query, 180);

  const results = useMemo(
    () =>
      pubIndex
        .filter(({ item, haystack }) => {
          if (category !== "all" && item.category !== category) return false;
          if (year !== "all" && getYear(item.date) !== year) return false;
          if (!matchesTopic(haystack, topic)) return false;
          return !debounced.trim() || matchesQuery(haystack, debounced);
        })
        .map(({ item }) => item)
        .sort(byDateDesc),
    [debounced, category, year, topic]
  );

  const reset = () => {
    setQuery("");
    setCategory("all");
    setYear("all");
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    year,
    setYear,
    results,
    reset,
    // only show categories that are defined; order is fixed
    categories: PUBLICATION_CATEGORIES,
    years: publicationYears,
    isFiltered: !!query || category !== "all" || year !== "all" || !!topic,
  };
}

export function useMediaSearch() {
  const { topic } = useTopicParam();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<MediaType | "all">("all");
  const debounced = useDebounce(query, 180);

  const results = useMemo(
    () =>
      mediaIndex
        .filter(({ item, haystack }) => {
          if (type !== "all" && item.type !== type) return false;
          if (!matchesTopic(haystack, topic)) return false;
          return !debounced.trim() || matchesQuery(haystack, debounced);
        })
        .map(({ item }) => item)
        .sort(byDateDesc),
    [debounced, type, topic]
  );

  return { query, setQuery, type, setType, results };
}

export function useGlobalSearch(query: string) {
  const { lang, t } = useLanguage();
  const debounced = useDebounce(query, 120);
  return useMemo(() => globalSearch(debounced, lang, t), [debounced, lang, t]);
}
