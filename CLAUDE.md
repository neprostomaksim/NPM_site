# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Next.js 16.2.7 / React 19.2.4, plain JavaScript (no TypeScript). `node_modules/` is not checked in — run `npm install` before anything else, including before reading the Next.js docs that AGENTS.md points you at.

This repo is the whole **nempl.app ecosystem**: the personal-brand site, every sales landing, and the Telegram bot that closes landing signups. It absorbed the former `workshopkopeek` repo (Sept 2026); that repo is now only a redirect shell to `nempl.app/workshops`.

[jsconfig.json](jsconfig.json) maps `@/*` to the project root. The site code under `app/(site)` uses relative imports (`../../sanity/client`); shared landing code is imported via the alias (`@/components/landing/Reveal`, `@/lib/landing/leads`). Keep to whichever style the surrounding file uses.

## Commands

```bash
npm install      # required first; node_modules is absent from a fresh checkout
npm run dev      # dev server on :3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals)
```

There is no test suite. `npm run lint` reports ~11 pre-existing errors, all in `app/(site)` (mostly `react/jsx-no-comment-textnodes`, because the `// метка` section labels look like comments to ESLint) — wrap new ones as `{"// метка"}` to avoid adding more. The React-compiler rule `react-hooks/set-state-in-effect` is new in this Next version; code ported from older projects trips it.

**Turbopack + the Cyrillic path.** The project lives under `…/Основная/Вайб-кодинг/…` and a stray `package-lock.json` in the home directory made Next infer `~/` as the workspace root, so internal asset ids embedded that Cyrillic path and Turbopack panicked truncating them mid-UTF-8-character (`start byte index N is not a char boundary`). [next.config.mjs](next.config.mjs) pins `turbopack.root` to fix it. If that panic ever returns, the trigger is path length, so it appears when a *new route name* pushes an id over the limit — do not "fix" it by renaming the route.

## Layout of the ecosystem

```
app/
  (site)/              personal-brand site — its own root layout, light theme
    layout.js          <html>, fonts, globals.css, Person JSON-LD
    page.js, home-client.js, blog/, corporate/, admin/
  (landings)/
    workshops/         one folder = one landing, fully self-contained
      layout.js        its own <html>, fonts, CSS, Meta Pixel, analytics
      page.js          composes the sections
      landing.css      the landing's whole design system
      _content/        editable copy & data (config, schedule, FAQ)
      _sections/       landing-specific sections
      api/leads/       POST /workshops/api/leads
      llms.txt/        /workshops/llms.txt
  global-not-found.js  404 for unmatched URLs (see below)
  sitemap.js, robots.js
components/landing/    building blocks any landing can reuse (Reveal, Countdown, icons, MetaPixel, MarketingAnalytics)
lib/landing/           funnel plumbing: leads.js (Supabase insert + Meta CAPI Lead), marketingAnalytics.js (GA4/Метрика/Pixel events)
components/Analytics.js visit counter → SMM platform /api/track, used by the site and landings
public/workshops/      a landing's assets live under public/<landing>/
bot/                   Telegram signup bot (separate Node service, not part of the Next build)
supabase/              SQL for workshop_leads / bot_events
```

**Why route groups with separate root layouts.** The site (light, `--lime:#C8E620`, Anonymous Pro) and landings (dark glass, `--lime:#C6F432`, JetBrains Mono) both define global classes like `.container`, `.btn`, `.hero`. Each group has its own root `layout.js`, so Next does a **full page load** when crossing between them and the stylesheets never meet. Consequences: there is no top-level `app/layout.js`; a `next/link` from the site to a landing is a hard navigation (fine); and 404s for unmatched URLs come from [app/global-not-found.js](app/global-not-found.js), enabled by `experimental.globalNotFound` in [next.config.mjs](next.config.mjs). Two groups must never define the same URL.

`_content` and `_sections` start with `_`, which makes them private folders — never routed. (Same reason a test route named `__something` 404s.)

## Creating a new landing

1. Copy `app/(landings)/workshops/` to `app/(landings)/<slug>/` — the folder name is the URL (`nempl.app/<slug>`). Check it doesn't collide with a route in `app/(site)`.
2. Rewrite `_content/` (copy, dates, prices, links) and the sections in `_sections/`; restyle `landing.css`. Keep reusable pieces in `components/landing/` rather than copying them.
3. In `layout.js`: set `metadata` (title, description, `alternates.canonical: "/<slug>"`, OG image under `/<slug>/…`) and the `Analytics site="…"` label.
4. Assets go to `public/<slug>/` and are referenced as `/<slug>/file.jpg`.
5. If the landing collects signups, keep `api/leads/route.js` and point the form's `fetch` at `/<slug>/api/leads`. The route uses `lib/landing/leads.js`; change the price, bot URL and what goes into `source`/`workshop_id`.
6. Add `/<slug>` to [app/sitemap.js](app/sitemap.js).
7. `npm run build`, then check the page, `/`, and a 404 in the browser.

## The /workshops funnel

Meta Ads → `nempl.app/workshops?utm_…` → form (workshop + name + phone) → `POST /workshops/api/leads` → row in Supabase `public.workshop_leads` + server `Lead` to Meta CAPI (deduplicated with the browser `fbq('track','Lead')` by `eventId`) → response is a Telegram deep link `t.me/nempl_workshop_kop_bot?start=lead_<token>` → the bot recognises the token, confirms the chosen workshop and sends the payment link. The person types name/phone once, on the site. If the API fails, the form shows a direct link to the bot, which can collect name/phone itself.

Edit dates, price, seats and links in [`_content/config.js`](app/(landings)/workshops/_content/config.js) and the schedule in [`_content/workshops.js`](app/(landings)/workshops/_content/workshops.js). **The bot keeps its own copy of the workshop list** (`WORKSHOPS` in [bot/index.js](bot/index.js)) — when you add or rename a workshop, update both, or the bot will greet the lead with a stale title.

## Telegram bot (`bot/`)

A standalone `grammy` Node process (`cd bot && npm install && npm start`), deployed on a NetGrid VPS under PM2 as `workshop-tg-bot` — **not** on Vercel, and not built by `next build`. Its secrets live in `bot/.env` on the server (template: [bot/.env.example](bot/.env.example)); `bot/.env` is gitignored and must never be committed. See [bot/README.md](bot/README.md).

## Environment

Sanity reads two vars, both with hardcoded fallbacks in [sanity/client.js](sanity/client.js) and [sanity.config.js](sanity.config.js):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (falls back to the literal `"replace-with-your-project-id"`)
- `NEXT_PUBLIC_SANITY_DATASET` (falls back to `"production"`)

Without a real project ID every Sanity fetch throws, and the code swallows the error: the homepage silently renders three hardcoded `fallbackPosts` from [app/(site)/page.js](app/(site)/page.js) and `/blog` renders its empty state. An apparently-working homepage is not evidence that Sanity is connected — check `/blog`.

Landing signups need server-only vars on the Vercel project (never `NEXT_PUBLIC_`): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `META_PIXEL_ID`, `META_CONVERSIONS_API_TOKEN`, `META_EVENT_SOURCE_URL`, optionally `META_GRAPH_API_VERSION` / `META_TEST_EVENT_CODE`. Without the Supabase pair `/workshops/api/leads` returns 503. Client analytics IDs (`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, `NEXT_PUBLIC_YANDEX_METRIKA_ID`) have hardcoded fallbacks. No `.env*` file is committed; `.env.example` templates are.

## The site (`app/(site)`)

Content site for a Russian-language personal brand (Максим Леонов, AI-наставник). All UI copy, Sanity schema titles, and Studio labels are in Russian — keep new strings in Russian.

**Routes:**
- `/` — [page.js](app/(site)/page.js) is a server component that queries the 3 newest posts, then hands them to [home-client.js](app/(site)/home-client.js).
- `/blog` and `/blog/[slug]` — server components querying Sanity directly with GROQ.
- `/corporate` — [corporate/page.js](app/(site)/corporate/page.js), a fully static service detail page: copy in plain arrays at the top, FAQ as native `<details>`, its own `Service` + `FAQPage` JSON-LD.
- `/admin/[[...tool]]` — the Sanity Studio itself, embedded via `NextStudio` and mounted at `basePath: "/admin"` in [sanity.config.js](sanity.config.js). Editing the schema changes this route's UI.

**home-client.js is the component library.** One ~640-line `"use client"` file holds every homepage section (`Nav`, `Hero`, `Marquee`, `Numbers`, `Services`, `About`, `EventsStrip`, `BlogSection`, `CTASection`, `Footer`) plus the `useScrollReveal` / `useCountUp` hooks. `Nav` and `Footer` are named-exported at the bottom and imported by the blog and corporate routes — changing either affects every site page. They are **not** used by landings, which have their own header/footer.

`Services` cards take an optional `href`: with one the "подробнее" link becomes a `next/link` to that route, without one it keeps the old smooth-scroll to `#cta`. Card `[01]` points at the `/workshops` landing and `[03]` at `/corporate`.

`Nav`'s section links are absolute (`/#about`, `/#services`, `/#cta`) with an `onClick` that only intercepts for smooth-scroll when `window.location.pathname === "/"` — that is what lets the same component work as in-page navigation on `/` and as a link back home from `/blog`. Keep both halves in sync when adding a section link.

**Data flow.** Every Sanity read is a GROQ query written inline in the route file, wrapped in try/catch that logs and returns `null`/`[]`, with `{ next: { revalidate: 60 } }` for 60-second ISR. `client.useCdn` is `true`, so edits in Studio surface after the CDN plus revalidate window, not instantly. Images go through `urlFor()` ([sanity/client.js](sanity/client.js)); `cdn.sanity.io` is the only remote host allowlisted in [next.config.mjs](next.config.mjs).

**Post schema** ([sanity/schemas/post.js](sanity/schemas/post.js)) has `body` as Portable Text with `block`, `image`, `code` and `table` (`@sanity/table`) members. `/blog/[slug]` renders it with custom `PortableText` serializers; adding a new block type to the schema requires a matching serializer there or it renders as nothing.

### Styling (site)

Hand-written CSS in [app/(site)/globals.css](app/(site)/globals.css) — global class names (`.container`, `.btn`, `.hero`, `.blog-card`, …) and CSS custom properties on `:root` (`--chalk`, `--coal`, `--lime`, `--container`, `--section-pad`, `--side-pad`). Fonts are loaded via `next/font/google` in the group's `layout.js` and exposed as `--font-main` / `--font-mono`. Every font here and in landings declares `subsets: ["latin", "cyrillic"]` — a font without `cyrillic` makes the Russian copy fall back to a system face.

`/corporate` uses a self-contained `.corp-*` block at the end of `globals.css`, with its own font-family assignments and media queries, so it must stay last in the file. `ul{list-style:none}` in the reset does **not** cover `ol`: any `<ol>` needs its own `list-style:none` or browser markers appear next to the styled `[01]` counters.

Tailwind v4 is installed and wired into [postcss.config.mjs](postcss.config.mjs), but no stylesheet imports it and no utility classes are used. Extend the CSS files or use inline `style={{}}`; don't introduce Tailwind utilities without deciding to migrate.

### SEO (site)

[app/(site)/layout.js](app/(site)/layout.js) carries the site-wide `metadata` (`metadataBase: https://nempl.app`, OG, Twitter, canonical) and a hand-built `Person` JSON-LD blob. It hardcodes stats (40 000+ audience, 350+ students) that also appear in `Numbers` in `home-client.js` — update both together. (The M.AI.N community brand was fully scrubbed — name, founder claim, community link, and its 2500+ stat — don't reintroduce it.) `/blog/[slug]` builds per-article metadata in `generateMetadata`, preferring `seoTitle`/`seoDescription` over `title`/`excerpt`. Landings set their own metadata and JSON-LD in their `layout.js` / `_sections/StructuredData.js`.

OG/Twitter images are served from [public/uploads/](public/uploads/); renaming a file there silently breaks the social card.

## Design-source files (reference only, not build inputs)

`index.html.bak`, `npm_project_*.bak`, `npm_README.md`, `npm_chats_chat1.md`, `design.zip`, `design_decompressed.tar` are the original Claude Design handoff bundle for the site. `npm_chats_chat1.md` records the user's intent and later corrections. Consult them for design intent; the React app is the source of truth.
