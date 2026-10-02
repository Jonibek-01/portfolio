// =====================================================
// SOCIAL LINKS
// Only confirmed links are filled in. A value of "#" means "not confirmed yet":
// the icon is still shown, but it does not navigate anywhere.
// Replace "#" with the real URL and the site updates everywhere
// (hero rail, mobile bar, footer, contact).
// =====================================================

export const socialLinks = {
  // Handle provided by the site owner: hamzaboltaev_analysis
  // TODO: open the link once and confirm it is the right channel.
  youtube: "https://www.youtube.com/@hamzaboltaev_analysis",
  linkedin: "https://uz.linkedin.com/in/hamza-boltaev-569944186",
  telegram: "https://t.me/hamzaboltaev_analysis",
  // Handle provided by the site owner: hamzaboltaev_analysis
  // TODO: open the link once and confirm it is the right account.
  instagram: "https://www.instagram.com/hamzaboltaev_analysis/",
  email: "mailto:hamza.boltaev@iais.uz",
};

export type SocialKey = keyof typeof socialLinks;

/** Order in which icons appear in the rail / footer. */
export const socialOrder: SocialKey[] = ["youtube", "linkedin", "telegram", "instagram", "email"];

export const contactEmail = "hamza.boltaev@iais.uz";
