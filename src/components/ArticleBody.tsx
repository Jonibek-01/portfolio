import { useMemo } from "react";

/**
 * Renders the full text of an article (publications.ts -> body).
 * Paragraphs are separated by a blank line; a line starting with "## " is a sub-heading.
 */
export default function ArticleBody({ text }: { text: string }) {
  const blocks = useMemo(
    () =>
      text
        .split(/\n\s*\n/)
        .map((b) => b.trim())
        .filter(Boolean),
    [text]
  );
  return (
    <div className="article-body">
      {blocks.map((b, i) =>
        b.startsWith("## ") ? (
          <h4 key={i}>{b.slice(3)}</h4>
        ) : (
          <p key={i}>{b}</p>
        )
      )}
    </div>
  );
}
