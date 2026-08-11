# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Next.js 16.2.7 / React 19.2.4, plain JavaScript (no TypeScript). `node_modules/` is not checked in — run `npm install` before anything else, including before reading the Next.js docs that AGENTS.md points you at.

This working copy is **not a git repository**: there is no history to diff against and no revert. Read a file before overwriting it, and don't rely on version control to undo anything.

[jsconfig.json](jsconfig.json) maps `@/*` to the project root, but nothing uses it — every import is relative (`../sanity/client`, `../../home-client`). Match the surrounding style rather than introducing the alias piecemeal.

## Commands

```bash
npm install      # required first; node_modules is absent from a fresh checkout
npm run dev      # dev server on :3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals)
```

There is no test suite and no test tooling installed. `npm run lint` reports ~11 pre-existing errors (mostly `react/jsx-no-comment-textnodes`, because the `// метка` section labels look like comments to ESLint) — wrap new ones as `{"// метка"}` to avoid adding more.

**Turbopack + the Cyrillic path.** The project lives under `…/Основная/Вайб-кодинг/…` and a stray `package-lock.json` in the home directory made Next infer `~/` as the workspace root, so internal asset ids embedded that Cyrillic path and Turbopack panicked truncating them mid-UTF-8-character (`start byte index N is not a char boundary`). [next.config.mjs](next.config.mjs) pins `turbopack.root` to fix it. If that panic ever returns, the trigger is path length, so it appears when a *new route name* pushes an id over the limit — do not "fix" it by renaming the route.

## Environment

Sanity reads two vars, both with hardcoded fallbacks in [sanity/client.js](sanity/client.js) and [sanity.config.js](sanity.config.js):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (falls back to the literal `"replace-with-your-project-id"`)
- `NEXT_PUBLIC_SANITY_DATASET` (falls back to `"production"`)

No `.env*` file is committed. Without a real project ID every Sanity fetch throws, and the code swallows the error: the homepage silently renders three hardcoded `fallbackPosts` from [app/page.js](app/page.js) and `/blog` renders its empty state. An apparently-working homepage is not evidence that Sanity is connected — check `/blog`.

## Architecture

Content site for a Russian-language personal brand (Максим Леонов, AI-наставник). All UI copy, Sanity schema titles, and Studio labels are in Russian — keep new strings in Russian.

**Routes** (App Router, `app/`):
- `/` — [app/page.js](app/page.js) is a server component that queries the 3 newest posts, then hands them to [app/home-client.js](app/home-client.js).
- `/blog` and `/blog/[slug]` — server components querying Sanity directly with GROQ.
- `/corporate` and `/workshops` — [app/corporate/page.js](app/corporate/page.js) and [app/workshops/page.js](app/workshops/page.js), the two service detail pages. Both are fully static: no Sanity, no client JS. All copy lives in plain arrays at the top of each file, the FAQ is native `<details>`, and each carries its own `Service` + `FAQPage` JSON-LD. Reached from the `[03]` and `[01]` cards in `Services`. `/workshops` reuses the `.corp-*` styles wholesale and routes signups to Telegram plus `/blog` (workshop announcements are published as articles).
- `/admin/[[...tool]]` — the Sanity Studio itself, embedded via `NextStudio` and mounted at `basePath: "/admin"` in [sanity.config.js](sanity.config.js). Editing the schema changes this route's UI.

**home-client.js is the component library.** One ~640-line `"use client"` file holds every homepage section (`Nav`, `Hero`, `Marquee`, `Numbers`, `Services`, `About`, `EventsStrip`, `BlogSection`, `CTASection`, `Footer`) plus the `useScrollReveal` / `useCountUp` hooks. `Nav` and `Footer` are named-exported at the bottom and imported by both blog routes — changing either affects every page. New shared chrome belongs here or it won't be reachable from the blog pages.

`Services` cards take an optional `href`: with one the "подробнее" link becomes a `next/link` to that route, without one it keeps the old smooth-scroll to `#cta`. Only card `[03]` sets it (`/corporate`); give a card an `href` to hang a detail page off it.

`Nav`'s section links are absolute (`/#about`, `/#services`, `/#cta`) with an `onClick` that only intercepts for smooth-scroll when `window.location.pathname === "/"` — that is what lets the same component work as in-page navigation on `/` and as a link back home from `/blog`. Keep both halves in sync when adding a section link.

**Data flow.** Every Sanity read is a GROQ query written inline in the route file, wrapped in try/catch that logs and returns `null`/`[]`, with `{ next: { revalidate: 60 } }` for 60-second ISR. `client.useCdn` is `true`, so edits in Studio surface after the CDN plus revalidate window, not instantly. Images go through `urlFor()` ([sanity/client.js](sanity/client.js)); `cdn.sanity.io` is the only host allowlisted in [next.config.mjs](next.config.mjs).

**Post schema** ([sanity/schemas/post.js](sanity/schemas/post.js)) has `body` as Portable Text with `block`, `image`, and `code` members. `/blog/[slug]` renders it with custom `PortableText` serializers for images and code blocks; adding a new block type to the schema requires a matching serializer there or it renders as nothing.

## Styling

Hand-written CSS in [app/globals.css](app/globals.css) — global class names (`.container`, `.btn`, `.hero`, `.blog-card`, …) and CSS custom properties on `:root` (`--chalk`, `--coal`, `--lime`, `--container`, `--section-pad`, `--side-pad`). Fonts are loaded via `next/font/google` in [app/layout.js](app/layout.js) and exposed as `--font-main` / `--font-mono`. Both declare `subsets: ["latin", "cyrillic"]` — any font added here needs the `cyrillic` subset or the Russian copy falls back to a system face.

The detail pages add a self-contained `.corp-*` block at the end of `globals.css` — shared by both `/corporate` and `/workshops`, so a change there hits both. Note `ul{list-style:none}` in the reset does **not** cover `ol`: any `<ol>` needs its own `list-style:none` or the browser markers show up next to the styled `[01]` counters. This block — it carries its own mono/sans font-family assignments and its own media queries, so it must stay last in the file.

Tailwind v4 and `@tailwindcss/postcss` are installed and wired into [postcss.config.mjs](postcss.config.mjs), but `globals.css` never imports Tailwind and no utility classes are used anywhere. Follow the existing convention: extend `globals.css`, or use inline `style={{}}` objects as the blog routes do. Don't introduce Tailwind utilities without deciding to migrate.

## SEO

[app/layout.js](app/layout.js) carries the site-wide `metadata` export (OG, Twitter, canonical `https://neprostomaksim.com/`) and a hand-built `Person` JSON-LD blob injected via `dangerouslySetInnerHTML`. It hardcodes stats (40 000+ audience, 350+ students, 2500+ M.AI.N community) that also appear in `Numbers` in `home-client.js` — update both together. `/blog/[slug]` builds per-article metadata in `generateMetadata`, preferring the schema's `seoTitle`/`seoDescription` over `title`/`excerpt`.

OG/Twitter images in `layout.js` are absolute production URLs (`https://neprostomaksim.com/uploads/...`) served from [public/uploads/](public/uploads/) — they will 404 in preview against any other host, and renaming a file there silently breaks the social card.

## Design-source files (reference only, not build inputs)

`index.html.bak`, `npm_project_*.bak`, `npm_README.md`, `npm_chats_chat1.md`, `design.zip`, `design_decompressed.tar` are the original Claude Design handoff bundle — standalone HTML/Babel prototypes the current app was ported from. `npm_chats_chat1.md` records the user's intent and later corrections. Consult them for design intent; the React app is the source of truth.
