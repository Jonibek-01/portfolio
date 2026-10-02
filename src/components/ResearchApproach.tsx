import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMinus, FiPlus } from "react-icons/fi";
import { researchApproach, type ApproachItem } from "../data/researchTopics";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import { useUI } from "../hooks/useUI";
import SectionHeading from "./SectionHeading";

function AccordionItem({ item, open, onToggle }: { item: ApproachItem; open: boolean; onToggle: () => void }) {
  const { t, l } = useLanguage();
  const { reducedMotion } = useUI();
  const panel = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // GSAP height animation. Each card toggles independently (others stay as they are).
  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      gsap.set(el, { height: open ? "auto" : 0 });
      el.hidden = !open;
      return;
    }
    const d = reducedMotion ? 0.2 : 0.55;
    if (open) {
      el.hidden = false;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: d, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: d * 0.8, ease: "power3.inOut", onComplete: () => { el.hidden = true; } });
    }
  }, [open, reducedMotion]);

  const id = `approach-${item.id}`;
  return (
    <li className={open ? "acc-item is-open" : "acc-item"} data-reveal>
      <h3>
        <button type="button" className="acc-trigger" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span>{l(item.title)}</span>
          <span className="acc-icon" aria-hidden="true">{open ? <FiMinus /> : <FiPlus />}</span>
          <span className="sr-only">{open ? t.approach.collapse : t.approach.expand}</span>
        </button>
      </h3>
      <div id={id} ref={panel} className="acc-panel" role="region" aria-label={l(item.title)}>
        <p>{l(item.body)}</p>
      </div>
    </li>
  );
}

export default function ResearchApproach() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState<Set<string>>(() => new Set([researchApproach[0]?.id]));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section ref={ref} className="section" aria-labelledby="approach-title">
      <div className="container">
        <SectionHeading id="approach-title" index="08" title={t.approach.title} subtitle={t.approach.subtitle} />
        <ul className="accordion">
          {researchApproach.map((it) => (
            <AccordionItem key={it.id} item={it} open={open.has(it.id)} onToggle={() => toggle(it.id)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
