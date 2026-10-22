import { useEffect, useState } from "react";
import { cvFiles } from "../data/cv";
import { useLanguage } from "./useLanguage";

const cache = new Map<string, boolean>();

/** True only if the URL really serves a document (not the SPA's index.html fallback). */
async function exists(url: string): Promise<boolean> {
  if (cache.has(url)) return cache.get(url)!;
  let ok = false;
  try {
    const res = await fetch(url, { method: "HEAD" });
    const type = res.headers.get("content-type") ?? "";
    ok = res.ok && !type.includes("text/html");
  } catch {
    ok = false;
  }
  cache.set(url, ok);
  return ok;
}

/** Returns the CV file for the current language (falls back to English), or null if none was uploaded. */
export function useCvFile(): string | null {
  const { lang } = useLanguage();
  const [href, setHref] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      for (const url of [cvFiles[lang], cvFiles.en]) {
        if (url && (await exists(url))) {
          if (alive) setHref(url);
          return;
        }
      }
      if (alive) setHref(null);
    })();
    return () => {
      alive = false;
    };
  }, [lang]);
  return href;
}
