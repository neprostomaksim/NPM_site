-- Сквозная аналитика лендингов: визит → шаги воронки → заявка → бот → оплата.
-- Запустить один раз в Supabase → SQL Editor (проект yiaugigxfdmkicaruhsw).
-- Идемпотентно: повторный запуск ничего не ломает.
--
-- Как это связано:
--   site_events     — просмотры страниц (пишет /api/track SMM-платформы), уже есть
--   funnel_events   — шаги воронки с лендингов: клик CTA, форма увидена/начата/
--                     отправлена, заявка, переход в Telegram (пишет /api/e на nempl.app)
--   workshop_leads  — заявки; новые колонки ниже связывают заявку с посетителем
-- Ключ склейки — visitor_id (анонимный id из localStorage, общий для всего nempl.app).

-- 1. Шаги воронки
create table if not exists public.funnel_events (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  site        text        not null,
  path        text,
  event       text        not null,   -- cta_clicked, form_viewed, form_started, form_submit_attempted, lead_created, telegram_handoff_started, form_submit_failed, telegram_registration_clicked
  visitor_id  text,
  workshop_id text,
  source      text,                   -- первое касание: utm_source / реферер / direct
  medium      text,
  campaign    text,
  content     text,
  props       jsonb
);

create index if not exists funnel_events_created_at_idx on public.funnel_events (created_at desc);
create index if not exists funnel_events_visitor_idx    on public.funnel_events (visitor_id);
create index if not exists funnel_events_event_idx      on public.funnel_events (event);

-- Доступ только через service_role (сервер). Политик нет — anon/authenticated ничего не видят.
alter table public.funnel_events enable row level security;

-- 2. Атрибуция заявок
alter table public.workshop_leads add column if not exists visitor_id  text;  -- склейка с site_events / funnel_events
alter table public.workshop_leads add column if not exists landing     text;  -- страница, где оставлена заявка (/ai-agents, /workshops)
alter table public.workshop_leads add column if not exists referrer    text;  -- реферер в момент заявки
alter table public.workshop_leads add column if not exists first_touch jsonb; -- первое касание: source, medium, campaign, content, term, referrer, landing, at

create index if not exists workshop_leads_visitor_idx on public.workshop_leads (visitor_id);

-- 3. Индекс для истории визитов по посетителю (таблица site_events уже существует)
create index if not exists site_events_visitor_idx on public.site_events (visitor_id);
