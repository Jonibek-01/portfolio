# Hamza Boltayev — Personal Website

Premium bilingual (EN / UZ) professional website for Hamza Boltayev — lawyer, strategic analyst and researcher
(international security, geopolitics, Central Asia, Afghanistan).

## Tech Stack

- React 18 + TypeScript
- Vite
- Three.js + React Three Fiber (lightweight atmospheric globe, lazy-loaded)
- GSAP + ScrollTrigger (reveals, accordion, modal / search transitions, timelines)
- react-icons

No backend. All content lives in `src/data/*.ts` and `src/i18n/translations.ts`.

## How to run

```bash
npm install
npm run dev        # development
npm run build      # production build (type-check + bundle)
npm run preview    # preview the production build
npm run lint
```

## Where to change things

| What | File |
|---|---|
| Publications | `src/data/publications.ts` |
| Media / podcasts / interviews | `src/data/media.ts` |
| Speaking events | `src/data/speaking.ts` |
| Social links | `src/data/socialLinks.ts` |
| Images | `public/images/` + `src/data/images.ts` |
| **Story circles** (Media section) | `src/data/stories.ts` |
| Show / hide CAPIF, preview counts | `src/data/siteConfig.ts` |
| UI translations (EN / UZ) | `src/i18n/translations.ts` |
| Career timeline + hero milestones | `src/data/career.ts` |
| Education | `src/data/education.ts` |
| Research areas, approach, initiatives, featured topics | `src/data/researchTopics.ts` |
| About text, CAPIF | `src/data/profile.ts` |
| SEO / meta / JSON-LD | `index.html` |

### Add a publication (`src/data/publications.ts`)

Add one object to the `publications` array. Nothing else needs to change — it appears in the list,
search, category/year filters, topic filters and global search automatically.

```ts
{
  id: "publication-007",
  title: "New Research Title",                 // or { en: "...", uz: "..." }
  authors: ["Hamza Boltayev"],
  date: "2026-09-01",                          // YYYY-MM-DD
  category: "Research Article",                // "Policy Brief" | "Research Article" | "Report" | "Commentary"
  publisher: "IAIS",
  description: "Short description...",         // or { en: "...", uz: "..." }
  url: "https://example.com",                  // optional – leave "" while unavailable
  topics: ["Central Asia", "Security"],
}
```

Set `featured: true` on one item to show it in the "Featured research" block.
Year filter buttons are generated from the dates automatically.

### Add media / a podcast (`src/data/media.ts`)

```ts
{
  id: "media-002",
  type: "podcast",                 // "video" | "podcast" | "interview"
  title: "Episode title",          // or { en, uz }
  platform: "Podcast name",
  date: "2026-09-01",
  description: "Short description...",
  thumbnail: "",                   // "/images/media/ep2.webp" or "" for the generated placeholder
  url: "https://...",              // "#" or "" = button is disabled until you add the link
  duration: "38 min",              // optional
  topics: ["Central Asia"],
}
```

Put thumbnails in `public/images/media/`.

### Add a speaking event (`src/data/speaking.ts`)

Add an object with `title`, `date`, `type`, `description` and either `location` or `online: true`.
The timeline sorts by date (newest first).

### Social links (`src/data/socialLinks.ts`)

`"#"` means "not confirmed yet": the icon stays visible but does not navigate.
Currently confirmed: LinkedIn, Telegram, e-mail. **YouTube and Instagram are still `"#"`** — paste the
official URLs there (TODO comments mark the spots).

### Images (`public/images/`)

- `hamza-profile.webp` — About-section portrait (replace with a formal portrait when available)
- `hamza-logo.png`, `hamza-mark.png` — logo (footer / navigation)
- `favicon.png`
- optional: set `images.hero` in `src/data/images.ts` to show a photo in the hero **instead of** the 3D globe
- optional: `public/images/og-image.png` (1200×630) for social sharing

### Translations (`src/i18n/translations.ts`)

All interface text lives in the `en` and `uz` objects (TypeScript requires both to have the same keys).
Content in `src/data/*.ts` can be a plain string or `{ en: "...", uz: "..." }`; missing Uzbek text falls back to English.
Topic names (e.g. "Central Asia") are translated through `topicNames` in the `uz` block.

**Adding Russian later:** add `"ru"` to `LANGS` in `src/i18n/localize.ts`, add an `ru` block in `translations.ts`,
and add `ru: "..."` to any content you want translated.

## Pages

| URL | Content |
|---|---|
| `/` | Home: hero → about → career → education → research → featured → topics → publications preview → media (stories + cards) → speaking → research approach → contact |
| `/publications` | Full archive: search, category / year / topic filters, "show more" paging |
| `/media` | All media: stories, search, type + topic filters |
| `/speaking` | All speaking events |

Home shows only a few cards and a **"View all"** card (counts in `siteConfig.ts`), so the home page never gets long
however much content you add. Clicking a topic tile opens `/publications?topic=...` (or `/media?...` if the topic only has media).

### Stories (`src/data/stories.ts`)
Round circles above the media cards. They scroll sideways automatically and fill the screen width. A circle with a
`video` gets a coloured ring; the first circle plays its video silently in a loop. Tapping opens a fullscreen viewer;
**View details** opens `link` (Instagram, Telegram, YouTube, any URL). Videos longer than 30 s restart from the beginning
(`storyMaxSeconds`). Supported `video` sources: YouTube links (watch / youtu.be / shorts) and direct `.mp4` / `.webm`
(put files in `public/videos/`). Instagram / Telegram posts cannot be embedded – use `cover` (image) + `link`.
If the array is empty, nothing is shown.

### Speaking videos
In `speaking.ts` add `video: "https://youtu.be/..."` (and/or `url`) to an event. Events without them look unchanged.

### CAPIF
Hidden by default. Set `showCapif: true` in `src/data/siteConfig.ts` to show it (content in `src/data/profile.ts`).

## Architecture notes

- `src/components/` — presentational components; they never contain content.
- `src/hooks/useSearch.ts`, `src/utils/search.ts` — client-side search (title, authors, description, publisher,
  topics, category, year; indexes every language, ignores apostrophes/accents).
- `src/components/GlobeScene.tsx` — the 3D hero: a lightly realistic Earth (NASA Blue Marble texture in
  `public/images/earth/`, country borders drawn from `world-atlas`, Central Asia highlighted). It follows the cursor.
  No postprocessing, small texture, paused when off-screen, static under `prefers-reduced-motion`.
- `Loader.tsx` (loading screen), `Cursor.tsx` + `SocialRail.tsx` (glowing cursor that wraps the social icons).
- Accessibility: semantic landmarks, focus-visible, ARIA labels on icon buttons, ESC closes dialogs, focus trap,
  `prefers-reduced-motion` support.

## Deploy

The site uses real URLs (`/publications`), so the host must send every path to `index.html`.
`public/staticwebapp.config.json` (Azure Static Web Apps) and `public/_redirects` (Netlify) already do this.

`npm run build` outputs a static site to `dist/`. Before going live, replace `https://example.com` in `index.html`
(canonical, Open Graph, Twitter) with the real domain.
The `.github/workflows/*azure*` files are leftovers from the original template — update or delete them.
