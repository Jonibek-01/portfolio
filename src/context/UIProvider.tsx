import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UIContext } from "./uiContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { scrollToSection } from "../utils/scrollTo";

export function UIProvider({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [openPublicationId, setOpenPublicationId] = useState<string | null>(null);
  const [openMediaId, setOpenMediaId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const scrollTo = useCallback(
    (id: string) => {
      if (location.pathname !== "/") {
        // Home page picks the target up from navigation state once it has mounted.
        navigate("/", { state: { scrollTo: id } });
        return;
      }
      scrollToSection(id, reducedMotion);
    },
    [location.pathname, navigate, reducedMotion]
  );

  const value = useMemo(
    () => ({
      scrollTo,
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      openPublicationId,
      openPublication: (id: string) => setOpenPublicationId(id),
      closePublication: () => setOpenPublicationId(null),
      openMediaId,
      openMedia: (id: string) => setOpenMediaId(id),
      closeMedia: () => setOpenMediaId(null),
      ready,
      setReady,
      reducedMotion,
    }),
    [scrollTo, searchOpen, openPublicationId, openMediaId, ready, reducedMotion]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
