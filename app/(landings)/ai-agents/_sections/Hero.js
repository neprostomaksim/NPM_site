import Image from "next/image";
import Countdown from "@/components/landing/Countdown";
import { Icon } from "@/components/landing/icons";
import { site } from "@/content/workshops/config";
import { agents, workshop } from "../_content/content";

// Первый экран: обещание + «окно приложения» с агентами за работой —
// человек сразу видит, что именно он унесёт с воркшопа.
export default function Hero() {
  return (
    <section className="aa-hero" id="top">
      <div className="grid-bg hero-grid" aria-hidden="true" />
      <div className="container aa-hero-inner">
        <p className="eyebrow aa-center">Воркшоп по ИИ-агентам · {workshop.date} · {site.city} · 3 часа</p>
        <h1 className="aa-title">
          Личные <span className="aa-nowrap">ИИ-агенты</span> <span className="lime">за один вечер</span>
        </h1>
        <p className="aa-sub">
          Соберите ИИ-помощников, которые знают ваши задачи и стиль, и отдайте им рутину:
          встречи, контент, документы и поиск информации. Без кода — вы уходите
          не с конспектом, а с работающими агентами.
        </p>
        <div className="aa-cta-row">
          <a className="btn btn-primary aa-btn-lg" href="#register" data-analytics-event="cta_clicked" data-analytics-location="hero" data-workshop-id={workshop.id}>
            Забронировать место на {workshop.date} <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-text-link" href="#agents">Каких агентов соберёте <span aria-hidden="true">↓</span></a>
        </div>
        <div className="aa-proof">
          <Image src="/workshops/speaker.jpg" alt="" width={40} height={40} sizes="40px" />
          <p><b>{site.trainedCount} человек</b> уже прошли обучение у Максима Леонова</p>
        </div>

        <div className="scene glass-strong aa-scene" aria-label="Пример: ваши ИИ-агенты за работой">
          <div className="scene-bar">
            <span className="scene-dot" /><span className="scene-dot" /><span className="scene-dot" />
            <span className="scene-url mono">мои-агенты · 4 работают</span>
            <span className="scene-live mono"><span className="pulse-dot" /> онлайн</span>
          </div>
          <div className="scene-body">
            {agents.map((a) => (
              <div className="agent" key={a.name}>
                <div className="agent-ico"><Icon name={a.icon} /></div>
                <div className="agent-name">{a.name}</div>
                <div className="aa-agent-out mono">{a.output}</div>
                <div className="agent-lines">
                  <span className="line fill w90" />
                  <span className="line w70" />
                </div>
                {a.status === "done" ? (
                  <span className="agent-status tag-done mono">✓ готово</span>
                ) : (
                  <span className="agent-status tag-run mono">работает <span className="dots"><i /><i /><i /></span></span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="aa-countdown">
          <p className="mono aa-countdown-label">До старта · осталось {site.seatsLeft} места из {site.seatsTotal}</p>
          <Countdown iso={workshop.startsAt} />
        </div>
      </div>
    </section>
  );
}
