import AboutSection from "../components/AboutSection";
import Capif from "../components/Capif";
import CareerSection from "../components/CareerSection";
import Contact from "../components/Contact";
import Education from "../components/Education";
import FeaturedResearch from "../components/FeaturedResearch";
import Hero from "../components/Hero";
import MediaPreview from "../components/MediaPreview";
import Milestones from "../components/Milestones";
import PublicationsPreview from "../components/PublicationsPreview";
import ResearchApproach from "../components/ResearchApproach";
import ResearchSection from "../components/ResearchSection";
import SpeakingPreview from "../components/SpeakingPreview";
import TopicsSection from "../components/TopicsSection";
import { siteConfig } from "../data/siteConfig";

/**
 * Home page order:
 * hero → about → career → education → (CAPIF) → research → featured → topics →
 * publications → media → speaking → research approach → contact
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Milestones />
      <AboutSection />
      <CareerSection />
      <Education />
      {siteConfig.showCapif && <Capif />}
      <ResearchSection />
      <FeaturedResearch />
      <TopicsSection />
      <PublicationsPreview />
      <MediaPreview />
      <SpeakingPreview />
      <ResearchApproach />
      <Contact />
    </main>
  );
}
