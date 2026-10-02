import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { featuredTopics, type FeaturedTopic } from "../data/researchTopics";

/** Active topic filter lives in the URL (?topic=central-asia) so it can be linked and shared. */
export function useTopicParam() {
  const [params, setParams] = useSearchParams();
  const id = params.get("topic");
  const topic: FeaturedTopic | null = useMemo(() => featuredTopics.find((t) => t.id === id) ?? null, [id]);

  const setTopic = useCallback(
    (next: FeaturedTopic | null) => {
      setParams(
        (prev) => {
          const n = new URLSearchParams(prev);
          if (next) n.set("topic", next.id);
          else n.delete("topic");
          return n;
        },
        { replace: true, preventScrollReset: true }
      );
    },
    [setParams]
  );

  return { topic, setTopic };
}
