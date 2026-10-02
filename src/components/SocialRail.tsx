import { useEffect, useRef, useState, type ComponentType } from "react";
import { FaInstagram, FaLinkedinIn, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { socialLinks, socialOrder, type SocialKey } from "../data/socialLinks";
import { useLanguage } from "../hooks/useLanguage";
import { isExternal, isRealUrl } from "../utils/links";

const ICONS: Record<SocialKey, ComponentType<{ "aria-hidden"?: boolean }>> = {
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
  email: FiMail,
};

/** Single icon link. Unconfirmed ("#") profiles stay visible but are inert. */
export function SocialIconLink({ name, showLabel = false }: { name: SocialKey; showLabel?: boolean }) {
  const { t } = useLanguage();
  const url = socialLinks[name];
  const Icon = ICONS[name];
  const label = t.social[name];
  const real = isRealUrl(url);
  const external = real && isExternal(url);
  return (
    <a
      className={real ? "social-link" : "social-link is-pending"}
      href={real ? url : "#"}
      aria-label={real ? label : `${label} — ${t.social.pending}`}
      title={real ? label : `${label} — ${t.social.pending}`}
      aria-disabled={real ? undefined : true}
      onClick={real ? undefined : (e) => e.preventDefault()}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Icon aria-hidden />
      {showLabel && <span>{label}</span>}
    </a>
  );
}

interface Props {
  /** "rail": fixed vertical bar with the cursor-pill effect (desktop). "row": inline horizontal bar (mobile / footer). */
  variant: "rail" | "row";
  /** Footer variant with text labels */
  labels?: boolean;
  exclude?: SocialKey[];
}

export default function SocialRail({ variant, labels = false, exclude = [] }: Props) {
  const { t } = useLanguage();
  const [heroVisible, setHeroVisible] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  // The fixed rail is shown only while the hero is in view.
  useEffect(() => {
    if (variant !== "rail") return;
    const hero = document.getElementById("home");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.intersectionRatio > 0.25), { threshold: [0, 0.25, 0.5, 1] });
    io.observe(hero);
    return () => io.disconnect();
  }, [variant]);

  // Magnetic icons: each icon drifts toward the cursor inside its cell (as in the reference design).
  useEffect(() => {
    if (variant !== "rail") return;
    const list = listRef.current;
    if (!list || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cells = Array.from(list.querySelectorAll<HTMLElement>(".si-cell"));
    const state = cells.map((cell) => ({
      cell,
      link: cell.querySelector<HTMLElement>("a")!,
      x: 25,
      y: 25,
      tx: 25,
      ty: 25,
    }));
    const mouse = { x: -999, y: -999 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      state.forEach((s) => {
        const r = s.cell.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        if (x > 8 && x < 42 && y > 4 && y < 42) {
          s.tx = x;
          s.ty = y;
        } else {
          s.tx = r.width / 2;
          s.ty = r.height / 2;
        }
      });
    };
    const loop = () => {
      state.forEach((s) => {
        s.x += (s.tx - s.x) * 0.12;
        s.y += (s.ty - s.y) * 0.12;
        s.link.style.setProperty("--siLeft", `${s.x.toFixed(2)}px`);
        s.link.style.setProperty("--siTop", `${s.y.toFixed(2)}px`);
      });
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
    };
  }, [variant]);

  const keys = socialOrder.filter((k) => !exclude.includes(k));

  return (
    <nav
      className={`social-${variant}${labels ? " has-labels" : ""}${variant === "rail" && !heroVisible ? " is-hidden" : ""}`}
      aria-label={t.hero.social}
    >
      <ul ref={listRef} data-cursor={variant === "rail" ? "icons" : undefined}>
        {keys.map((k) => (
          <li key={k} className={variant === "rail" ? "si-cell" : undefined}>
            <SocialIconLink name={k} showLabel={labels} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
