import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UIProvider } from "./context/UIProvider";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { useLanguage } from "./hooks/useLanguage";
import { useUI } from "./hooks/useUI";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import MediaModal from "./components/MediaModal";
import Navbar from "./components/Navbar";
import PublicationModal from "./components/PublicationModal";
import ScrollManager from "./components/ScrollManager";
import SearchOverlay from "./components/SearchOverlay";
import Home from "./pages/Home";
import MediaPage from "./pages/MediaPage";
import PublicationsPage from "./pages/PublicationsPage";
import SpeakingPage from "./pages/SpeakingPage";

function Site() {
  const { t, lang } = useLanguage();
  const { setReady } = useUI();
  const [loading, setLoading] = useState(true);

  // Recalculate scroll positions after fonts load and when the language changes (text length differs).
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <>
      {loading && (
        <Loader
          onDone={() => {
            setLoading(false);
            setReady(true);
          }}
        />
      )}
      <a className="skip-link" href="#main">{t.common.skip}</a>
      <Navbar />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/speaking" element={<SpeakingPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <PublicationModal />
      <MediaModal />
      <SearchOverlay />
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <UIProvider>
        <Site />
      </UIProvider>
    </LanguageProvider>
  );
}
