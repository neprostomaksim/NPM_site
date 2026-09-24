"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackMarketingEvent } from "@/lib/landing/marketingAnalytics";
import { getFirstTouch, getVisitorId } from "@/lib/landing/attribution";

// Общая форма записи на воркшоп для всех лендингов.
//   workshops        — список воркшопов, из которых можно выбрать
//   defaultWorkshopId — какой выбран изначально
//   price            — цена в BYN (для события Lead)
//   botUrl           — запасная ссылка на бота, если API не ответил
// Если в списке один воркшоп, поле выбора скрыто (лендинг одного события).
// После сохранения заявки браузер уходит в Telegram по deep link из ответа API.

// Коды стран для поля телефона. Беларусь — по умолчанию (основная аудитория).
// code: "" — «Другая страна»: человек вводит номер целиком, с «+» и кодом.
const COUNTRIES = [
  { id: "BY", flag: "🇧🇾", name: "Беларусь", code: "375", placeholder: "29 123-45-67" },
  { id: "RU", flag: "🇷🇺", name: "Россия", code: "7", placeholder: "912 345-67-89" },
  { id: "KZ", flag: "🇰🇿", name: "Казахстан", code: "7", placeholder: "701 234-56-78" },
  { id: "UA", flag: "🇺🇦", name: "Украина", code: "380", placeholder: "67 123-45-67" },
  { id: "PL", flag: "🇵🇱", name: "Польша", code: "48", placeholder: "512 345 678" },
  { id: "LT", flag: "🇱🇹", name: "Литва", code: "370", placeholder: "612 34567" },
  { id: "LV", flag: "🇱🇻", name: "Латвия", code: "371", placeholder: "21 234 567" },
  { id: "EE", flag: "🇪🇪", name: "Эстония", code: "372", placeholder: "5123 4567" },
  { id: "GE", flag: "🇬🇪", name: "Грузия", code: "995", placeholder: "555 12-34-56" },
  { id: "AM", flag: "🇦🇲", name: "Армения", code: "374", placeholder: "77 123456" },
  { id: "AZ", flag: "🇦🇿", name: "Азербайджан", code: "994", placeholder: "50 123-45-67" },
  { id: "UZ", flag: "🇺🇿", name: "Узбекистан", code: "998", placeholder: "90 123-45-67" },
  { id: "KG", flag: "🇰🇬", name: "Кыргызстан", code: "996", placeholder: "700 123-456" },
  { id: "MD", flag: "🇲🇩", name: "Молдова", code: "373", placeholder: "62 123 456" },
  { id: "DE", flag: "🇩🇪", name: "Германия", code: "49", placeholder: "1512 3456789" },
  { id: "AE", flag: "🇦🇪", name: "ОАЭ", code: "971", placeholder: "50 123 4567" },
  { id: "US", flag: "🇺🇸", name: "США", code: "1", placeholder: "201 555-0123" },
  { id: "OTHER", flag: "🌐", name: "Другая страна", code: "", placeholder: "+код и номер" },
];

// Склеивает код страны и номер. Терпимо к тому, что человек всё же ввёл код сам:
// «+375 29…» (в т.ч. автозаполнение браузера), «375 29…», белорусское «80 29…», российское «8 912…».
function buildPhone(country, national) {
  const raw = national.trim();
  if (raw.startsWith("+") || !country.code) return raw;
  let digits = raw.replace(/\D/g, "");
  if (country.id === "BY" && digits.startsWith("80")) digits = digits.slice(2);
  else if (country.code === "7" && digits.length === 11 && digits.startsWith("8")) digits = digits.slice(1);
  else if (digits.startsWith(country.code) && digits.length > country.code.length + 6) digits = digits.slice(country.code.length);
  return `+${country.code} ${digits}`;
}

function readCookie(name) {
  const encodedName = `${encodeURIComponent(name)}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(encodedName))
    ?.slice(encodedName.length);
}

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  const fbc = readCookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : "");

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    fbp: readCookie("_fbp") || "",
    fbc,
    eventSourceUrl: window.location.href,
  };
}

export default function RegistrationForm({ workshops, defaultWorkshopId, price, botUrl, apiUrl = "/api/leads", submitLabel = "Оставить заявку" }) {
  const formRef = useRef(null);
  const formStarted = useRef(false);
  const [workshopId, setWorkshopId] = useState(defaultWorkshopId || workshops[0]?.id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryId, setCountryId] = useState("BY");
  const country = COUNTRIES.find((c) => c.id === countryId) || COUNTRIES[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const single = workshops.length === 1;

  const workshop = useMemo(
    () => workshops.find((item) => item.id === workshopId) || workshops[0],
    [workshopId, workshops]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("workshop");
    // ?workshop= известен только в браузере; читаем после монтирования,
    // чтобы серверная и клиентская разметка формы совпали при гидратации.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (workshops.some((item) => item.id === fromUrl)) setWorkshopId(fromUrl);

    const selectWorkshop = (event) => {
      if (workshops.some((item) => item.id === event.detail)) setWorkshopId(event.detail);
    };
    window.addEventListener("workshop:choose", selectWorkshop);
    return () => window.removeEventListener("workshop:choose", selectWorkshop);
  }, [workshops]);

  useEffect(() => {
    if (!formRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      trackMarketingEvent("form_viewed", { form_id: "workshop_registration", workshop_id: workshop.id });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(formRef.current);
    return () => observer.disconnect();
    // событие «увидел форму» — один раз за визит, смена воркшопа его не повторяет
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function markFormStarted() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackMarketingEvent("form_started", {
      form_id: "workshop_registration",
      workshop_id: workshop.id,
    });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    const fullPhone = buildPhone(country, phone);
    if (fullPhone.replace(/\D/g, "").length < 9) {
      setError("Проверьте номер телефона — кажется, в нём не хватает цифр.");
      return;
    }
    setIsSubmitting(true);

    const attribution = getAttribution();
    trackMarketingEvent("form_submit_attempted", {
      form_id: "workshop_registration",
      workshop_id: workshop.id,
      utm_source: attribution.utm_source,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
    });

    const eventId = window.crypto?.randomUUID?.() || `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: fullPhone,
          workshopId: workshop.id,
          eventId,
          ...attribution,
          // сквозная аналитика: склейка заявки с историей визитов
          visitorId: getVisitorId(),
          firstTouch: getFirstTouch(),
          landing: window.location.pathname,
          referrer: document.referrer || "",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не удалось сохранить заявку.");

      window.fbq?.(
        "track",
        "Lead",
        {
          content_name: `${workshop.title} · ${workshop.date}`,
          content_category: "workshop",
          currency: "BYN",
          value: Number.parseInt(price, 10) || undefined,
        },
        { eventID: eventId }
      );

      trackMarketingEvent("lead_created", {
        form_id: "workshop_registration",
        workshop_id: workshop.id,
        utm_source: attribution.utm_source,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
      }, { meta: false });
      trackMarketingEvent("telegram_handoff_started", {
        workshop_id: workshop.id,
      });

      window.location.assign(result.telegramUrl);
    } catch (submitError) {
      trackMarketingEvent("form_submit_failed", {
        form_id: "workshop_registration",
        workshop_id: workshop.id,
        error_type: "request_failed",
      });
      setError(submitError.message || "Не удалось отправить форму. Попробуйте ещё раз.");
      setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} className="lead-form" id="register" onSubmit={submit} onInput={markFormStarted}>
      <p className="lead-form-intro">
        Оставьте контакты — в Telegram подтвердим запись и пришлём ссылку на оплату.
      </p>
      {single ? (
        <input type="hidden" name="workshop" value={workshop.id} />
      ) : (
        <label className="lead-field">
          <span>Воркшоп</span>
          <select value={workshop.id} onChange={(event) => setWorkshopId(event.target.value)}>
            {workshops.map((item) => (
              <option key={item.id} value={item.id}>
                {item.date} · {item.title}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="lead-field">
        <span>Ваше имя</span>
        <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" minLength="2" required />
      </label>
      <div className="lead-field">
        <span id="lead-phone-label">Телефон</span>
        <span className="lead-phone">
          {/* Нативный select поверх компактной «кнопки»: на телефоне открывается системный выбор. */}
          <span className="lead-cc">
            <span className="lead-cc-face" aria-hidden="true">
              {country.flag} {country.code ? `+${country.code}` : "Код"}
            </span>
            <select
              value={country.id}
              onChange={(event) => setCountryId(event.target.value)}
              aria-label="Код страны"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name}{c.code ? ` +${c.code}` : ""}
                </option>
              ))}
            </select>
          </span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete={country.code ? "tel-national" : "tel"}
            inputMode="tel"
            placeholder={country.placeholder}
            minLength="6"
            required
            aria-labelledby="lead-phone-label"
          />
        </span>
      </div>
      <label className="lead-consent">
        <input type="checkbox" required />
        <span>Согласен на обработку данных для записи и связь по заявке.</span>
      </label>
      {error && (
        <p className="lead-form-error" role="alert">
          {error}{" "}
          {/* Запасной путь: без токена бот сам спросит имя и телефон. */}
          {botUrl && (
            <a href={botUrl} target="_blank" rel="noopener" style={{ color: "var(--lime)", textDecoration: "underline" }}>
              Записаться через Telegram
            </a>
          )}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={isSubmitting} style={{ width: "100%", marginTop: 22, fontSize: 17, padding: 17 }}>
        {isSubmitting ? "Сохраняем заявку…" : submitLabel}
      </button>
      <p className="dim center" style={{ fontSize: 14, marginTop: 16 }}>
        Данные вводятся один раз: в Telegram повторно спрашивать их не будем.
      </p>
    </form>
  );
}
