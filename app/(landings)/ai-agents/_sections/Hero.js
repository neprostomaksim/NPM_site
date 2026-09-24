import Image from "next/image";
import Countdown from "@/components/landing/Countdown";
import { site } from "@/content/workshops/config";
import { workshop } from "../_content/content";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Воркшоп · {workshop.date} · {site.city}</p>
            <h1 className="hero-title">
              ИИ-агенты <span className="lime">для руководителя</span>
            </h1>
            <p className="lead hero-lead">
              {workshop.tagline}. За 3 часа вы соберёте ИИ-помощников, которые разбирают встречи,
              помогают с договорами и готовят документы, — без кода, на своих задачах.
            </p>
            <div className="hero-btns">
              <a className="btn btn-primary" href="#register" data-analytics-event="cta_clicked" data-analytics-location="hero" data-workshop-id={workshop.id}>
                Записаться на {workshop.date} <span aria-hidden="true">↗</span>
              </a>
              <a className="hero-text-link" href="#program">Программа <span aria-hidden="true">↘</span></a>
            </div>
            <div style={{ marginTop: 28 }}>
              <Countdown iso={workshop.startsAt} />
            </div>
          </div>
          <div className="hero-visual">
            <Image
              className="hero-workshop-photo"
              src="/workshops/hero-bg.jpg"
              alt="Участники воркшопа по ИИ-агентам в Минске работают с ноутбуками"
              width={1024}
              height={571}
              priority
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1050px) 48vw, 560px"
            />
            <div className="photo-label mono"><span className="pulse-dot" /> ОСТАЛОСЬ {site.seatsLeft} МЕСТА ИЗ {site.seatsTotal}</div>
          </div>
        </div>
        <div className="hero-facts">
          <div><span className="mono">01 / КОГДА</span><strong>{workshop.date}, {workshop.time.split("–")[0]}</strong></div>
          <div><span className="mono">02 / ГДЕ</span><strong>{site.city}, «Молоко»</strong></div>
          <div><span className="mono">03 / ФОРМАТ</span><strong>3 часа практики</strong></div>
          <a href="#register" data-analytics-event="cta_clicked" data-analytics-location="hero_facts" data-workshop-id={workshop.id}>
            <span className="mono">СТОИМОСТЬ</span>
            <strong>{site.price} <span aria-hidden="true">↓</span></strong>
          </a>
        </div>
      </div>
    </section>
  );
}
