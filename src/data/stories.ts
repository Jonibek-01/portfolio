// =====================================================
// STORIES – round "story" circles in the Media section
// Add short videos here. If the array is empty the whole row is hidden.
//
//   id        unique string
//   title     short caption under the circle (string or { en, uz })
//   cover     optional image for the circle (/images/stories/xyz.webp).
//             YouTube videos get their thumbnail automatically.
//   video     video URL – YouTube (watch / youtu.be / shorts) or a direct
//             .mp4 / .webm file (put files in public/videos/ and use "/videos/x.mp4").
//             Omit for an image-only story.
//   link      where "View details" goes (Instagram, Telegram, YouTube, any URL).
//             Defaults to `video` when that is a normal web URL.
//
// A circle that has a video gets a coloured ring, and the first circle plays
// its video silently in a loop. Videos longer than 30 s restart from the
// beginning (limit: siteConfig.storyMaxSeconds).
//
// Example:
//   {
//     id: "story-001",
//     title: { en: "Afghanistan briefing", uz: "Afgʻoniston brifingi" },
//     video: "https://www.youtube.com/watch?v=VIDEO_ID",
//     link: "https://www.instagram.com/reel/XXXXXXXX/",
//   },
// =====================================================

export interface Story {
  id: string;
  title: { en: string; uz: string };
  cover?: string;
  video?: string;
  link?: string;
}

export const stories: Story[] = []; 