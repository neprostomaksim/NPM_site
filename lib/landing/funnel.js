import { getFirstTouch, getVisitorId } from "./attribution";

// Шаги воронки → POST /api/e → таблица funnel_events (Supabase).
// Отдельно от просмотров страниц (site_events), чтобы клики не считались визитами.
// Персональные данные (имя, телефон) сюда не передаются никогда.

const ENDPOINT = "/api/e";

export function sendFunnelEvent(event, props = {}) {
  if (typeof window === "undefined" || !event) return;
  try {
    const ft = getFirstTouch();
    const { workshop_id, ...rest } = props;
    const payload = JSON.stringify({
      event,
      path: window.location.pathname,
      vid: getVisitorId(),
      workshop_id,
      source: ft?.source,
      medium: ft?.medium,
      campaign: ft?.campaign,
      content: ft?.content,
      props: rest,
    });
    // text/plain — без CORS-preflight, sendBeacon переживает уход со страницы
    const blob = new Blob([payload], { type: "text/plain" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) return;
    fetch(ENDPOINT, { method: "POST", body: payload, keepalive: true }).catch(() => {});
  } catch {
    /* аналитика не должна мешать странице */
  }
}
