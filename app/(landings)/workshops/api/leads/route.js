// Алиас старого адреса: формы на страницах, открытых до переезда API,
// шлют сюда. Вся логика — в app/api/leads/route.js.
export { POST } from "@/app/api/leads/route";

// Конфиг сегмента Next читает статически — его нельзя реэкспортировать.
export const runtime = "nodejs";
