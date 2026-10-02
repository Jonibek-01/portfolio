// Navigation structure.
//  - "section" items scroll to a block on the home page
//  - "page" items open a separate page (full lists with search & filters)
export const SECTION_IDS = ["home", "about", "research", "publications", "media", "speaking", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface NavItem {
  id: SectionId;
  to: string; // route
  /** home-page section id to scroll to (only for in-page items) */
  section?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "about", to: "/", section: "about" },
  { id: "research", to: "/", section: "research" },
  { id: "publications", to: "/publications" },
  { id: "media", to: "/media" },
  { id: "speaking", to: "/speaking" },
];

/** Every id the mobile menu / footer lists. */
export const MENU_ITEMS: NavItem[] = [
  { id: "home", to: "/", section: "home" },
  ...NAV_ITEMS,
  { id: "contact", to: "/", section: "contact" },
];
