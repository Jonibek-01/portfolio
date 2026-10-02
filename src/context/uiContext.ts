import { createContext } from "react";

export interface UIContextValue {
  /** Go to a section of the home page (navigates home first when needed). */
  scrollTo: (id: string) => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openPublicationId: string | null;
  openPublication: (id: string) => void;
  closePublication: () => void;
  openMediaId: string | null;
  openMedia: (id: string) => void;
  closeMedia: () => void;
  /** false while the loading screen is visible – the hero waits for it. */
  ready: boolean;
  setReady: (v: boolean) => void;
  reducedMotion: boolean;
}

export const UIContext = createContext<UIContextValue | null>(null);
