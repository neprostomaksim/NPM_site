import { createHash } from "node:crypto";

// Общая серверная часть воронки лендингов: запись заявки в Supabase
// (таблица public.workshop_leads) и server-side событие Lead в Meta CAPI.
// Используется из route-хендлеров app/(landings)/<лендинг>/api/leads.
// Секреты читаются только из env сервера и в браузер не попадают.

export const PHONE_PATTERN = /^[+\d()\s.-]{9,30}$/;

export function clean(value, maxLength = 160) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sha256(value) {
  return createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

function normalizePhone(value) {
  const digits = String(value).replace(/\D/g, "");
  if (digits.length === 9) return `375${digits}`;
  if (digits.length === 11 && digits.startsWith("80")) return `375${digits.slice(2)}`;
  return digits;
}

/** true, если на сервере заданы ключи Supabase. Без них форма отвечает 503. */
export function hasLeadStorage() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Вставляет заявку в workshop_leads. Возвращает true при успехе. */
export async function insertLead(lead) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/workshop_leads`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!response.ok) {
    console.error("Supabase website lead insert error:", response.status, (await response.text()).slice(0, 500));
    return false;
  }
  return true;
}

/**
 * Server-side Lead в Meta Conversions API. Молча выходит, если META_PIXEL_ID /
 * META_CONVERSIONS_API_TOKEN не заданы. eventId должен совпадать с eventID
 * браузерного fbq('track','Lead') — по нему Meta склеивает дубликаты.
 */
export async function sendMetaLead({ name, phone, contentName, value, currency = "BYN", eventId, fbp, fbc, request }) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  if (!pixelId || !token) return;

  const version = process.env.META_GRAPH_API_VERSION
    ? `${process.env.META_GRAPH_API_VERSION.replace(/^\/+|\/+$/g, "")}/`
    : "";
  const endpoint = new URL(`https://graph.facebook.com/${version}${pixelId}/events`);
  endpoint.searchParams.set("access_token", token);
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: process.env.META_EVENT_SOURCE_URL || request.headers.get("origin") || undefined,
    user_data: {
      ph: [sha256(normalizePhone(phone))],
      fn: [sha256(name)],
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      client_ip_address: clientIp || undefined,
      client_user_agent: request.headers.get("user-agent") || undefined,
    },
    custom_data: {
      content_name: contentName,
      content_category: "workshop",
      currency,
      value,
    },
  };

  try {
    const body = { data: [event] };
    if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.error("Meta CAPI website Lead error:", response.status);
  } catch (error) {
    console.error("Meta CAPI website Lead request error:", error.message || error);
  }
}
