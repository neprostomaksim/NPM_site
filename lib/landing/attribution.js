// Клиентская атрибуция: кто этот посетитель и откуда он пришёл впервые.
// Хранится в localStorage (без cookies), поэтому общая для всех страниц
// nempl.app — сайта и лендингов. По visitor_id заявка склеивается с историей
// визитов (site_events) и шагами воронки (funnel_events).

const VID_KEY = "vid"; // тот же ключ, что исторически использует счётчик визитов
const FIRST_TOUCH_KEY = "ft";

function storage() {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null; // приватный режим / запрет хранилища
  }
}

/** Стабильный анонимный id посетителя (создаётся при первом визите). */
export function getVisitorId() {
  const ls = storage();
  let vid = ls?.getItem(VID_KEY);
  if (!vid) {
    vid =
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2)) + Date.now().toString(36);
    try {
      ls?.setItem(VID_KEY, vid);
    } catch {}
  }
  return vid;
}

function clip(value, n = 120) {
  return typeof value === "string" && value ? value.slice(0, n) : undefined;
}

/**
 * Запоминает первое касание: UTM/реферер/страницу входа при самом первом визите.
 * Повторные визиты его не перезаписывают — так видно, какой канал привёл человека,
 * даже если заявку он оставил через неделю, зайдя напрямую.
 */
export function captureFirstTouch() {
  const ls = storage();
  if (!ls || typeof window === "undefined") return;
  try {
    if (ls.getItem(FIRST_TOUCH_KEY)) return;
    const p = new URLSearchParams(window.location.search);
    let ref;
    try {
      const r = document.referrer ? new URL(document.referrer) : null;
      // переходы внутри самого сайта — не источник
      ref = r && r.hostname !== window.location.hostname ? r.hostname.replace(/^www\./, "") : undefined;
    } catch {}
    const ft = {
      source: clip(p.get("utm_source")) || (p.get("fbclid") ? "facebook" : undefined) || ref || "direct",
      medium: clip(p.get("utm_medium")),
      campaign: clip(p.get("utm_campaign")),
      content: clip(p.get("utm_content")),
      term: clip(p.get("utm_term")),
      referrer: clip(document.referrer, 300),
      landing: clip(window.location.pathname, 200),
      at: new Date().toISOString(),
    };
    ls.setItem(FIRST_TOUCH_KEY, JSON.stringify(ft));
  } catch {}
}

/** Первое касание или null. */
export function getFirstTouch() {
  try {
    const raw = storage()?.getItem(FIRST_TOUCH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
