import { contactEmail } from "../data/socialLinks";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import CvButton from "./CvButton";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} className="section contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <h2 id="contact-title" className="contact-title" data-reveal>{t.contact.title}</h2>
        <p className="contact-text" data-reveal>{t.contact.text}</p>
        <a className="contact-email" href={`mailto:${contactEmail}`} data-reveal>{contactEmail}</a>
        <div className="contact-actions" data-reveal>
          <a className="btn btn-primary" href={`mailto:${contactEmail}`}>{t.contact.button}</a>
          <CvButton />
        </div>
      </div>
    </section>
  );
}
