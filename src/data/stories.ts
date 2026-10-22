// =====================================================
// STORIES – round "story" circles in the Media section
// Add short videos here. If the array is empty the whole row is hidden.
//
//   id        unique string
//   title     short caption under the circle (string or { en, uz })
//   cover     optional image for the circle (/images/stories/xyz.webp).
//             YouTube videos get their thumbnail automatically. For Instagram posts a cover
//             image is recommended (Instagram does not provide one); without it the logo is shown.
//   video     video URL – YouTube (watch / youtu.be / shorts), an Instagram post/reel link, or a direct
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
//   // YouTube Shorts work the same way:
//   { id: "story-003", title: "Short", video: "https://www.youtube.com/shorts/VIDEO_ID" },
// =====================================================
import type { LText } from "../i18n/localize";

export interface Story {
  id: string;
  title: LText;
  cover?: string;
  video?: string;
  link?: string;
}

export const stories: Story[] = [
  {
    id: "story-001",
    // TODO: replace the caption with a short title of this post, and add `cover: "/images/stories/....webp"`
    title: { en: "Instagram", uz: "Instagram" },
    video: "https://www.instagram.com/p/Ddl0E-gMGgW/",
    link: "https://www.instagram.com/p/Ddl0E-gMGgW/",
  },
];
