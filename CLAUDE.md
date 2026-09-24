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
    workshops/         schedule of all workshops (multi-workshop form)
    ai-agents/         single-event landing for «ИИ-агенты для руководителя»
      layout.js        its own <html>, fonts, theme CSS, metadata, Pixel, analytics
      page.js          composes the sections
      landing.css      small additions on top of the shared theme
      _content/        copy for this landing (facts, program, FAQ…)
      _sections/       landing-specific sections + StructuredData (JSON-LD)
      opengraph-image.js  generated 1200×630 social preview (next/og)
  api/leads/           POST /api/leads — signup from any landing (/workshops/api/leads is an alias)
  api/e/               POST /api/e — funnel-step collector → funnel_events
  global-not-found.js  404 for unmatched URLs (see below)
  sitemap.js, robots.js
content/workshops/     single source of truth: schedule.js (dates, titles, optional `landing`), config.js (price, venue, seats, links), faq.js
components/landing/    shared blocks: glass-theme.css (the dark landing design system), RegistrationForm, Speaker, Gallery, Faq, Footer, Reveal, Countdown, icons, MetaPixel, MarketingAnalytics
lib/landing/           leads.js (Supabase insert + Meta CAPI Lead), attribution.js (visitor id + first touch), funnel.js (step events), marketingAnalytics.js (GA4/Метрика/Pixel + funnel)
components/Analytics.js pageview counter → SMM platform /api/track (site_events); also captures first touch
public/workshops/      shared landing photos; public/llms.txt — site summary for AI search
assets/fonts/          Montserrat TTF with Cyrillic, read by opengraph-image.js (next/og's default font has no Cyrillic)
bot/                   Telegram signup bot (separate Node service, not part of the Next build)
supabase/              SQL: workshop_leads, bot_events, funnel_tracking
```

**Why route groups with separate root layouts.** The site (light, `--lime:#C8E620`, Anonymous Pro) and landings (dark glass, `--lime:#C6F432`, JetBrains Mono) both define global classes like `.container`, `.btn`, `.hero`. Each group has its own root `layout.js`, so Next does a **full page load** when crossing between them and the stylesheets never meet. Consequences: there is no top-level `app/layout.js`; a `next/link` from the site to a landing is a hard navigation (fine); and 404s for unmatched URLs come from [app/global-not-found.js](app/global-not-found.js), enabled by `experimental.globalNotFound` in [next.config.mjs](next.config.mjs). Two groups must never define the same URL. Each landing is its own root layout too (`(landings)` has no shared layout), so every landing's `layout.js` imports `components/landing/glass-theme.css` itself.

`_content` and `_sections` start with `_`, which makes them private folders — never routed. (Same reason a test route named `__something` 404s.)

## Creating a new landing

The closest template for a single event is `app/(landings)/ai-agents/`; for a multi-event page, `workshops/`.

1. Copy the folder to `app/(landings)/<slug>/` — the folder name is the URL (`nempl.app/<slug>`). Check it doesn't collide with a route in `app/(site)`.
2. Rewrite `_content/`. Dates, prices, venue and seats come from `content/workshops/` — add the event to `schedule.js` (and set its `landing: "/<slug>"` so /workshops links to it) instead of hardcoding them.
3. `layout.js`: `metadata` (title, description, `alternates.canonical: "/<slug>"`), the `Analytics site="nempl.app"` label. `opengraph-image.js` builds the social preview; don't put its URL in JSON-LD (Next appends a hash; the bare path 404s).
4. `_sections/StructuredData.js`: event (dates, `offers` with price/currency/availability, `location`, capacity), FAQPage from the same FAQ array the page renders, BreadcrumbList, WebPage with `dateModified`.
5. Use the shared `RegistrationForm` (posts to `/api/leads`); pass `workshops={[oneWorkshop]}` to hide the selector.
6. Add `/<slug>` to [app/sitemap.js](app/sitemap.js) and a line to [public/llms.txt](public/llms.txt).
7. **Update the bot's `WORKSHOPS` list** in [bot/index.js](bot/index.js) if the event is new.
8. `npm run build`, then check the page, `/`, a 404 and the OG image in the browser.

## Funnel & tracking

Meta Ads → landing (`?utm_…`) → form → `POST /api/leads` → row in Supabase `public.workshop_leads` + server `Lead` to Meta CAPI (deduplicated with the browser `fbq('track','Lead')` by `eventId`) → response is a Telegram deep link `t.me/nempl_workshop_kop_bot?start=lead_<token>` → the bot recognises the token, confirms the workshop and sends the payment link (`status=payment_link_sent`). Actual payment is **not** recorded anywhere. If the API fails, the form shows a direct link to the bot, which can collect name/phone itself.

End-to-end attribution, joined on an anonymous `visitor_id` (localStorage `vid`, shared by every page on nempl.app):
- pageviews → `site_events` via the SMM platform's `/api/track` ([components/Analytics.js](components/Analytics.js));
- first touch (utm/referrer/landing page of the very first visit) → localStorage `ft`, never overwritten ([lib/landing/attribution.js](lib/landing/attribution.js));
- funnel steps (`cta_clicked`, `form_viewed`, `form_started`, `form_submit_attempted`, `lead_created`, `telegram_handoff_started`, `form_submit_failed`) → every `trackMarketingEvent` call also goes to `/api/e` → `funnel_events`. Kept out of `site_events` so clicks never count as visits. Tag new CTAs with `data-analytics-event="cta_clicked"` and `data-analytics-location`;
- the lead row gets `visitor_id`, `landing`, `referrer`, `first_touch`.

The report lives in the SMM platform: Статистика → «📈 Воронка» (`/api/stats/funnel`). It needs [supabase/funnel_tracking.sql](supabase/funnel_tracking.sql) applied; until then `/api/e` drops events silently and `insertLead` retries without the attribution columns (PostgREST `PGRST204`), so leads are never lost to analytics.

Edit dates, price, seats and links in [content/workshops/config.js](content/workshops/config.js) and the schedule in [content/workshops/schedule.js](content/workshops/schedule.js). **The bot keeps its own copy of the workshop list** (`WORKSHOPS` in [bot/index.js](bot/index.js)) — update both, or the bot greets the lead with a stale title.

## Telegram bot (`bot/`)

A standalone `grammy` Node process (`cd bot && npm install && npm start`), deployed on a NetGrid VPS under PM2 as `workshop-tg-bot` — **not** on Vercel, and not built by `next build`. Its secrets live in `bot/.env` on the server (template: [bot/.env.example](bot/.env.example)); `bot/.env` is gitignored and must never be committed. See [bot/README.md](bot/README.md).

## Environment

Sanity reads two vars, both with hardcoded fallbacks in [sanity/client.js](sanity/client.js) and [sanity.config.js](sanity.config.js):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (falls back to the literal `"replace-with-your-project-id"`)
- `NEXT_PUBLIC_SANITY_DATASET` (falls back to `"production"`)

Without a real project ID every Sanity fetch throws, and the code swallows the error: the homepage silently renders three hardcoded `fallbackPosts` from [app/(site)/page.js](app/(site)/page.js) and `/blog` renders its empty state. An apparently-working homepage is not evidence that Sanity is connected — check `/blog`.

Landing signups need server-only vars on the Vercel project (never `NEXT_PUBLIC_`): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `META_PIXEL_ID`, `META_CONVERSIONS_API_TOKEN`, `META_EVENT_SOURCE_URL`, optionally `META_GRAPH_API_VERSION` / `META_TEST_EVENT_CODE`. Without the Supabase pair `/api/leads` returns 503 and `/api/e` drops events. Client analytics IDs (`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, `NEXT_PUBLIC_YANDEX_METRIKA_ID`) have hardcoded fallbacks. No `.env*` file is committed; `.env.example` templates are.

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

[app/(site)/layout.js](app/(site)/layout.js) carries the site-wide `metadata` (`metadataBase: https://www.nempl.app`, OG, Twitter, canonical) and a hand-built `Person` JSON-LD blob. It hardcodes stats (40 000+ audience, 350+ students) that also appear in `Numbers` in `home-client.js` — update both together. (The M.AI.N community brand was fully scrubbed — name, founder claim, community link, and its 2500+ stat — don't reintroduce it.) `/blog/[slug]` builds per-article metadata in `generateMetadata`, preferring `seoTitle`/`seoDescription` over `title`/`excerpt`. Landings set their own metadata and JSON-LD in their `layout.js` / `_sections/StructuredData.js`.

OG/Twitter images are served from [public/uploads/](public/uploads/); renaming a file there silently breaks the social card.

**Canonical host is `https://www.nempl.app`.** Vercel 308-redirects the bare `nempl.app` to `www`, so every absolute URL (metadataBase, canonical, sitemap, robots, JSON-LD, llms.txt, `LANDING_URL`) must use `www` — a canonical pointing at a redirect confuses indexing. Analytics labels like `site="nempl.app"` are names, not URLs; leave them.

**Performance rules (Lighthouse mobile ≥ 95 on `/` and `/ai-agents`).** Photos go through `next/image` (`fill` + `sizes`, `priority` only on the LCP image) — never a raw `<img>` for files in `public/uploads`, some are 2–3 MB. Sanity images get `auto("format")` inside `urlFor()`. Fonts are loaded as variable fonts without a `weight` list (one file per alphabet); the mono font has `preload: false`.

## Design-source files (reference only, not build inputs)

`index.html.bak`, `npm_project_*.bak`, `npm_README.md`, `npm_chats_chat1.md`, `design.zip`, `design_decompressed.tar` are the original Claude Design handoff bundle for the site. `npm_chats_chat1.md` records the user's intent and later corrections. Consult them for design intent; the React app is the source of truth.
