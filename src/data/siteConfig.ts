// =====================================================
// SITE CONFIG – simple on/off switches
// =====================================================
export const siteConfig = {
  // CAPIF block (About area). Set to true to show it on the home page.
  // Content: src/data/profile.ts  •  Component: src/components/Capif.tsx
  showCapif: false,

  // How many cards the home page shows before the "View all" card.
  preview: {
    publications: 3,
    media: 2,
    speaking: 2,
  },

  // Story videos longer than this many seconds restart from the beginning.
  storyMaxSeconds: 30,
};
