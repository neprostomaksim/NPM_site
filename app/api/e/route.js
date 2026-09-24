import { hasLeadStorage, supabaseInsert } from "@/lib/landing/leads";

// POST /api/e — приёмник шагов воронки с лендингов (lib/landing/funnel.js).
// Пишет в public.funnel_events. Всегда отвечает 204 и молчит при ошибках:
// аналитика не должна влиять на страницу. Просмотры страниц сюда не пишутся —
// они идут в site_events через счётчик платформы.

export const runtime = "nodejs";

const BOT_UA = /bot|crawl|spider|slurp|preview|monitor|lighthouse|headless/i;

function clip(value, n) {
  if (typeof value !== "string") return null;
  const t = value.trim();
  return t ? t.slice(0, n) : null;
}

export async function POST(request) {
  const done = new Response(null, { status: 204 });
  if (!hasLeadStorage() || BOT_UA.test(request.headers.get("user-agent") || "")) return done;

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 4000) return done;
    body = JSON.parse(raw);
  } catch {
    return done;
  }

  const event = clip(body.event, 60);
  if (!event || !/^[a-z0-9_]+$/.test(event)) return done;

  let props = null;
  if (body.props && typeof body.props === "object" && !Array.isArray(body.props)) {
    const json = JSON.stringify(body.props);
    if (json.length <= 1500) props = body.props;
  }

  try {
    const result = await supabaseInsert("funnel_events", {
      site: "nempl.app",
      event,
      path: clip(body.path, 300),
      visitor_id: clip(body.vid, 64),
      workshop_id: clip(body.workshop_id, 80),
      source: clip(body.source, 120),
      medium: clip(body.medium, 120),
      campaign: clip(body.campaign, 160),
      content: clip(body.content, 160),
      props,
    });
    if (!result.ok && result.status !== 404) console.error("funnel_events insert:", result.status, result.text.slice(0, 200));
  } catch {
    /* молча */
  }
  return done;
}
