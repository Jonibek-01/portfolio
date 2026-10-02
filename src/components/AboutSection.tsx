import { images } from "../data/images";
import { about } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  const { t, l } = useLanguage();
  const ref = useReveal<HTMLElement>();
  return (
    <section id="about" ref={ref} className="section" aria-labelledby="about-title">
      <div className="container about-grid">
        <figure className="portrait" data-reveal>
          <div className="portrait-frame">
            {images.profile ? (
              <img src={images.profile} alt={t.about.portraitAlt} width={464} height={903} loading="lazy" decoding="async" />
            ) : (
              <div className="portrait-placeholder" role="img" aria-label={t.about.portraitAlt}>HB</div>
            )}
          </div>
          <figcaption>{t.about.portraitCaption}</figcaption>
        </figure>

        <div className="about-text">
          <SectionHeading id="about-title" index="01" title={t.about.title} />
          <p className="about-intro" data-reveal>{l(about.intro)}</p>

          <div className="role-box" data-reveal>
            <h3 className="eyebrow">{t.about.currentRole}</h3>
            <p className="role-title">{t.hero.role}</p>
            <p>{t.hero.unit}</p>
            <p>{t.hero.institute}</p>
            <p className="role-body">{l(about.roleBody)}</p>
          </div>

          {about.paragraphs.map((p, i) => (
            <p key={i} className="about-para" data-reveal>{l(p)}</p>
          ))}

          <dl className="facts" data-reveal>
            <div><dt>{t.about.location}</dt><dd>{t.hero.location}</dd></div>
            <div><dt>{t.about.affiliation}</dt><dd>{t.hero.institute}</dd></div>
            <div><dt>{t.about.focus}</dt><dd>{l(about.focus)}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
