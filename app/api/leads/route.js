import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { workshops } from "@/content/workshops/schedule";
import { PHONE_PATTERN, clean, hasLeadStorage, insertLead, sendMetaLead } from "@/lib/landing/leads";

// POST /api/leads — заявка с формы любого лендинга воркшопов
// (/workshops, /ai-agents …; /workshops/api/leads — алиас для старых страниц).
// Сохраняет лид в Supabase вместе с атрибуцией (visitor_id, первое касание,
// лендинг), шлёт Lead в Meta CAPI и возвращает deep link в Telegram-бота
// с одноразовым токеном (бот не спрашивает данные повторно).

export const runtime = "nodejs";

const BOT_URL = "https://t.me/nempl_workshop_kop_bot";
const WORKSHOP_PRICE_BYN = 130;

function firstTouch(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const keys = ["source", "medium", "campaign", "content", "term", "referrer", "landing", "at"];
  const out = Object.fromEntries(keys.map((k) => [k, clean(value[k], 300)]).filter(([, v]) => v));
  return Object.keys(out).length ? out : null;
}

export async function POST(request) {
  if (!hasLeadStorage()) {
    console.error("Lead API is missing Supabase server credentials.");
    return NextResponse.json({ error: "Форма временно недоступна. Попробуйте позже." }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректные данные формы." }, { status: 400 });
  }

  const name = clean(payload.name, 100);
  const phone = clean(payload.phone, 30);
  const workshop = workshops.find((item) => item.id === payload.workshopId);
  const eventId = clean(payload.eventId, 100) || randomUUID();
  if (name.length < 2 || !PHONE_PATTERN.test(phone) || !workshop) {
    return NextResponse.json({ error: "Проверьте имя, телефон и выбранный воркшоп." }, { status: 400 });
  }

  const token = `lead_${randomUUID().replace(/-/g, "")}`;
  const source = `${workshop.title} · ${workshop.date}`;
  const saved = await insertLead({
    name,
    phone,
    source,
    workshop_id: workshop.id,
    registration_token: token,
    status: "new",
    utm_source: clean(payload.utm_source),
    utm_medium: clean(payload.utm_medium),
    utm_campaign: clean(payload.utm_campaign),
    utm_content: clean(payload.utm_content),
    meta_event_id: eventId,
    // Сквозная аналитика: по visitor_id заявка склеивается с визитами и шагами воронки.
    visitor_id: clean(payload.visitorId, 64) || null,
    landing: clean(payload.landing, 200) || null,
    referrer: clean(payload.referrer, 400) || null,
    first_touch: firstTouch(payload.firstTouch),
  });
  if (!saved) {
    return NextResponse.json({ error: "Не удалось сохранить заявку. Попробуйте ещё раз." }, { status: 502 });
  }

  await sendMetaLead({
    name,
    phone,
    contentName: source,
    value: WORKSHOP_PRICE_BYN,
    eventId,
    fbp: clean(payload.fbp, 250),
    fbc: clean(payload.fbc, 300),
    request,
  });

  return NextResponse.json({ telegramUrl: `${BOT_URL}?start=${token}` });
}
